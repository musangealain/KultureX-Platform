from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import UserRole


class CanManageBrandContent(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if request.user.role == UserRole.ADMIN:
            return True

        if hasattr(obj, "owner"):
            return obj.owner == request.user
        if hasattr(obj, "brand"):
            return obj.brand.owner == request.user
        if hasattr(obj, "product"):
            return obj.product.brand.owner == request.user
        return False


class CanManageOrder(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.user.role == UserRole.ADMIN:
            return True
        return obj.user == request.user
