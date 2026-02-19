from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import UserRole


class CanEditSkateContent(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if request.user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}:
            return True
        for field_name in ("owner", "creator", "submitted_by"):
            if hasattr(obj, field_name) and getattr(obj, field_name) == request.user:
                return True
        return False
