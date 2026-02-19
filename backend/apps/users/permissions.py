from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import UserRole

ADMIN_ROLES = {UserRole.SUPER_ADMIN, UserRole.ADMIN}
MODERATION_ROLES = {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}
EDITORIAL_ROLES = {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR}


class HasAnyRole(BasePermission):
    allowed_roles: set[str] = set()

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in self.allowed_roles
        )


class IsAdmin(HasAnyRole):
    allowed_roles = ADMIN_ROLES


class IsSuperAdmin(HasAnyRole):
    allowed_roles = {UserRole.SUPER_ADMIN}


class IsModeratorOrAdmin(HasAnyRole):
    allowed_roles = MODERATION_ROLES


class IsEditorOrAdmin(HasAnyRole):
    allowed_roles = EDITORIAL_ROLES


class ScopedRolePermission(BasePermission):
    # Map DRF actions (or request methods as lowercase fallback) to allowed roles.
    action_roles: dict[str, set[str]] = {}
    default_roles: set[str] = set()
    allow_safe_methods = False

    def has_permission(self, request, view) -> bool:
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if self.allow_safe_methods and request.method in SAFE_METHODS:
            return True

        action = getattr(view, "action", None) or request.method.lower()
        allowed_roles = self.action_roles.get(action, self.default_roles)
        return bool(allowed_roles and user.role in allowed_roles)


class IsSelfOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj) -> bool:
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role in ADMIN_ROLES:
            return True
        return obj.id == request.user.id
