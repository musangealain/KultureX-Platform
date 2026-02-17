from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

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
        serializer.save(owner=self.request.user)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("brand", "brand__owner").all()
    serializer_class = ProductSerializer
    permission_classes = [CanManageBrandContent]

    def perform_create(self, serializer):
        brand = serializer.validated_data["brand"]
        if self.request.user.role != UserRole.ADMIN and brand.owner_id != self.request.user.id:
            raise PermissionDenied("Only brand owners can add products.")
        serializer.save()


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related("product", "product__brand", "product__brand__owner").all()
    serializer_class = ProductVariantSerializer
    permission_classes = [CanManageBrandContent]

    def perform_create(self, serializer):
        product = serializer.validated_data["product"]
        if self.request.user.role != UserRole.ADMIN and product.brand.owner_id != self.request.user.id:
            raise PermissionDenied("Only brand owners can add variants.")
        serializer.save()


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.select_related("user").prefetch_related("items", "items__product").all()
    serializer_class = CartSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user, checked_out=False)
        serializer = self.get_serializer(cart)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(serializer.data, status=status_code)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def checkout(self, request, pk=None):
        cart = self.get_object()
        if cart.user_id != request.user.id and request.user.role != UserRole.ADMIN:
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
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(cart__user=user, cart__checked_out=False)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user, checked_out=False)
        serializer.save(cart=cart)

    def get_object(self):
        obj = super().get_object()
        if self.request.user.role != UserRole.ADMIN and obj.cart.user_id != self.request.user.id:
            raise PermissionDenied("You can only manage your cart items.")
        return obj


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related("user").prefetch_related("items", "items__product").all()
    serializer_class = OrderSerializer
    permission_classes = [CanManageOrder]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(user=user)

    def get_permissions(self):
        if self.action == "create":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.select_related("order", "order__user", "product").all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(order__user=user)

    def perform_create(self, serializer):
        order = serializer.validated_data["order"]
        if self.request.user.role != UserRole.ADMIN and order.user_id != self.request.user.id:
            raise PermissionDenied("You can only add items to your orders.")
        serializer.save()
        order.recalculate_total()

    def perform_update(self, serializer):
        item = serializer.save()
        item.order.recalculate_total()

    def perform_destroy(self, instance):
        order = instance.order
        super().perform_destroy(instance)
        order.recalculate_total()


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related("order", "order__user").all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(order__user=user)

    def perform_create(self, serializer):
        order = serializer.validated_data["order"]
        if self.request.user.role != UserRole.ADMIN and order.user_id != self.request.user.id:
            raise PermissionDenied("You can only pay for your own orders.")
        serializer.save(amount=order.total_amount)
