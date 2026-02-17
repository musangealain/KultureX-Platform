from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import UserRole


class CanManageEvent(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == UserRole.ADMIN
        )

    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if request.user.role == UserRole.ADMIN:
            return True

        if hasattr(obj, "organizer"):
            return obj.organizer == request.user
        if hasattr(obj, "event"):
            return obj.event.organizer == request.user
        return False


class CanManageRSVP(BasePermission):
    def has_permission(self, request, view) -> bool:
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.user.role == UserRole.ADMIN:
            return True
        return obj.user == request.user


class CanManageTicketBooking(BasePermission):
    def has_permission(self, request, view) -> bool:
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj) -> bool:
        if request.user.role == UserRole.ADMIN:
            return True
        return obj.user_id == request.user.id
