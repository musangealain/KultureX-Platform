from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import UserRole


class CanManageCreatorProfile(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if request.user.role == UserRole.ADMIN:
            return True
        return obj.user == request.user


class CanManageFollow(BasePermission):
    def has_permission(self, request, view) -> bool:
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.user.role == UserRole.ADMIN:
            return True
        return obj.follower == request.user
