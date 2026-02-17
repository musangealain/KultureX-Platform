from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import UserRole


class CanManageArticle(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.role in {
            UserRole.ADMIN,
            UserRole.EDITOR,
            UserRole.CREATOR,
        }

    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if request.user.role in {UserRole.ADMIN, UserRole.EDITOR}:
            return True
        return obj.author_id == request.user.id
