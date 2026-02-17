from rest_framework import permissions, viewsets
from rest_framework.exceptions import PermissionDenied

from apps.store.models import Brand, Order, Product, ProductVariant
from apps.store.permissions import CanManageBrandContent, CanManageOrder
from apps.store.serializers import (
    BrandSerializer,
    OrderSerializer,
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


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related("user").all()
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
