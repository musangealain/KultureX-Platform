from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from apps.common.audit import log_admin_action
from apps.store.models import (
    Brand,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
    Product,
    ProductVariant,
)
from apps.store.permissions import CanManageBrandContent, CanManageOrder, IsOwnerOrAdmin
from apps.store.serializers import (
    BrandSerializer,
    CartItemSerializer,
    CartSerializer,
    OrderItemSerializer,
    OrderSerializer,
    PaymentSerializer,
    ProductSerializer,
    ProductVariantSerializer,
)
from apps.users.models import UserRole


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.select_related("owner").all()
    serializer_class = BrandSerializer
    permission_classes = [CanManageBrandContent]

    def perform_create(self, serializer):
        brand = serializer.save(owner=self.request.user)
        log_admin_action(self.request, "store.brands.create", target=brand)

    def perform_update(self, serializer):
        brand = serializer.save()
        log_admin_action(self.request, "store.brands.update", target=brand, metadata={"name": brand.name})

    def perform_destroy(self, instance):
        log_admin_action(self.request, "store.brands.delete", target=instance, metadata={"name": instance.name})
        super().perform_destroy(instance)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("brand", "brand__owner").all()
    serializer_class = ProductSerializer
    permission_classes = [CanManageBrandContent]

    def perform_create(self, serializer):
        brand = serializer.validated_data["brand"]
        if self.request.user.role not in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR} and brand.owner_id != self.request.user.id:
            raise PermissionDenied("Only brand owners can add products.")
        product = serializer.save()
        log_admin_action(self.request, "store.products.create", target=product, metadata={"brand_id": brand.id})

    def perform_update(self, serializer):
        product = serializer.save()
        log_admin_action(self.request, "store.products.update", target=product, metadata={"brand_id": product.brand_id})

    def perform_destroy(self, instance):
        log_admin_action(self.request, "store.products.delete", target=instance, metadata={"brand_id": instance.brand_id})
        super().perform_destroy(instance)


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related("product", "product__brand", "product__brand__owner").all()
    serializer_class = ProductVariantSerializer
    permission_classes = [CanManageBrandContent]

    def perform_create(self, serializer):
        product = serializer.validated_data["product"]
        if self.request.user.role not in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR} and product.brand.owner_id != self.request.user.id:
            raise PermissionDenied("Only brand owners can add variants.")
        variant = serializer.save()
        log_admin_action(
            self.request,
            "store.variants.create",
            target=variant,
            metadata={"product_id": product.id},
        )

    def perform_update(self, serializer):
        variant = serializer.save()
        log_admin_action(
            self.request,
            "store.variants.update",
            target=variant,
            metadata={"product_id": variant.product_id},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "store.variants.delete",
            target=instance,
            metadata={"product_id": instance.product_id},
        )
        super().perform_destroy(instance)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.select_related("user").prefetch_related("items", "items__product").all()
    serializer_class = CartSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN}:
            return queryset
        return queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user, checked_out=False)
        serializer = self.get_serializer(cart)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        if created:
            log_admin_action(request, "store.carts.create", target=cart)
        return Response(serializer.data, status=status_code)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def checkout(self, request, pk=None):
        cart = self.get_object()
        if cart.user_id != request.user.id and request.user.role not in {UserRole.SUPER_ADMIN, UserRole.ADMIN}:
            return Response({"detail": "Only cart owner can checkout."}, status=status.HTTP_403_FORBIDDEN)
        if cart.checked_out:
            return Response({"detail": "Cart already checked out."}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=cart.user, status="pending")
        for cart_item in cart.items.select_related("product"):
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                unit_price=cart_item.product.price,
            )
        order.recalculate_total()
        cart.checked_out = True
        cart.save(update_fields=["checked_out", "updated_at"])
        log_admin_action(
            request,
            "store.carts.checkout",
            target=cart,
            metadata={"order_id": order.id, "order_total": str(order.total_amount)},
        )
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.select_related("cart", "cart__user", "product").all()
    serializer_class = CartItemSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN}:
            return queryset
        return queryset.filter(cart__user=user, cart__checked_out=False)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user, checked_out=False)
        cart_item = serializer.save(cart=cart)
        log_admin_action(
            self.request,
            "store.cart_items.create",
            target=cart_item,
            metadata={"cart_id": cart.id, "product_id": cart_item.product_id},
        )

    def get_object(self):
        obj = super().get_object()
        if self.request.user.role not in {UserRole.SUPER_ADMIN, UserRole.ADMIN} and obj.cart.user_id != self.request.user.id:
            raise PermissionDenied("You can only manage your cart items.")
        return obj

    def perform_update(self, serializer):
        cart_item = serializer.save()
        log_admin_action(
            self.request,
            "store.cart_items.update",
            target=cart_item,
            metadata={"cart_id": cart_item.cart_id, "quantity": cart_item.quantity},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "store.cart_items.delete",
            target=instance,
            metadata={"cart_id": instance.cart_id, "product_id": instance.product_id},
        )
        super().perform_destroy(instance)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related("user").prefetch_related("items", "items__product").all()
    serializer_class = OrderSerializer
    permission_classes = [CanManageOrder]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN}:
            return queryset
        return queryset.filter(user=user)

    def get_permissions(self):
        if self.action == "create":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        log_admin_action(
            self.request,
            "store.orders.create",
            target=order,
            metadata={"status": order.status},
        )

    def perform_update(self, serializer):
        order = serializer.save()
        log_admin_action(
            self.request,
            "store.orders.update",
            target=order,
            metadata={"status": order.status},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "store.orders.delete",
            target=instance,
            metadata={"status": instance.status},
        )
        super().perform_destroy(instance)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.select_related("order", "order__user", "product").all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN}:
            return queryset
        return queryset.filter(order__user=user)

    def perform_create(self, serializer):
        order = serializer.validated_data["order"]
        if self.request.user.role not in {UserRole.SUPER_ADMIN, UserRole.ADMIN} and order.user_id != self.request.user.id:
            raise PermissionDenied("You can only add items to your orders.")
        order_item = serializer.save()
        order.recalculate_total()
        log_admin_action(
            self.request,
            "store.order_items.create",
            target=order_item,
            metadata={"order_id": order.id, "quantity": order_item.quantity},
        )

    def perform_update(self, serializer):
        item = serializer.save()
        item.order.recalculate_total()
        log_admin_action(
            self.request,
            "store.order_items.update",
            target=item,
            metadata={"order_id": item.order_id, "quantity": item.quantity},
        )

    def perform_destroy(self, instance):
        order = instance.order
        log_admin_action(
            self.request,
            "store.order_items.delete",
            target=instance,
            metadata={"order_id": instance.order_id, "product_id": instance.product_id},
        )
        super().perform_destroy(instance)
        order.recalculate_total()


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related("order", "order__user").all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN}:
            return queryset
        return queryset.filter(order__user=user)

    def perform_create(self, serializer):
        order = serializer.validated_data["order"]
        if self.request.user.role not in {UserRole.SUPER_ADMIN, UserRole.ADMIN} and order.user_id != self.request.user.id:
            raise PermissionDenied("You can only pay for your own orders.")
        payment = serializer.save(amount=order.total_amount)
        log_admin_action(
            self.request,
            "store.payments.create",
            target=payment,
            metadata={"order_id": order.id, "amount": str(payment.amount)},
        )

    def perform_update(self, serializer):
        payment = serializer.save()
        log_admin_action(
            self.request,
            "store.payments.update",
            target=payment,
            metadata={"order_id": payment.order_id, "status": payment.status},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "store.payments.delete",
            target=instance,
            metadata={"order_id": instance.order_id, "status": instance.status},
        )
        super().perform_destroy(instance)
