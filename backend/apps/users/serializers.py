from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.users.models import UserRole

User = get_user_model()
ADMIN_ROLES = {UserRole.SUPER_ADMIN, UserRole.ADMIN}
MODERATION_ROLES = {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}
EDITORIAL_ROLES = {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR}


def build_permission_map(user) -> dict[str, bool]:
    role = getattr(user, "role", None)
    is_authenticated = bool(user and user.is_authenticated)
    is_super_admin = role == UserRole.SUPER_ADMIN
    is_admin = role in ADMIN_ROLES
    is_moderator = role in MODERATION_ROLES
    is_editorial = role in EDITORIAL_ROLES or role == UserRole.MODERATOR
    return {
        "is_super_admin": is_super_admin,
        "is_admin": is_admin,
        "can_access_admin_portal": bool(is_authenticated and user.can_access_admin_portal),
        "can_manage_users": is_admin,
        "can_manage_roles": is_super_admin,
        "can_manage_products": is_moderator,
        "can_manage_events": is_moderator,
        "can_review_articles": is_editorial,
        "can_publish_articles": role in EDITORIAL_ROLES,
        "can_moderate_community": is_moderator,
        "can_view_analytics": is_moderator,
        "can_manage_system": is_super_admin,
    }


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=8)
    permissions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "role",
            "bio",
            "avatar_url",
            "two_factor_enabled",
            "two_factor_verified_at",
            "permissions",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "two_factor_verified_at", "permissions", "created_at", "updated_at"]

    def get_permissions(self, obj) -> dict[str, bool]:
        return build_permission_map(obj)

    def create(self, validated_data):
        request = self.context.get("request")
        password = validated_data.pop("password", None)
        requested_role = validated_data.get("role")

        if not request or not request.user.is_authenticated or request.user.role not in ADMIN_ROLES:
            validated_data["role"] = UserRole.REGISTERED
            validated_data.pop("two_factor_enabled", None)
        elif requested_role == UserRole.SUPER_ADMIN and request.user.role != UserRole.SUPER_ADMIN:
            raise serializers.ValidationError({"role": "Only super admins can assign super admin role."})

        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        request = self.context.get("request")
        password = validated_data.pop("password", None)
        requested_role = validated_data.get("role")

        if not request or not request.user.is_authenticated or request.user.role not in ADMIN_ROLES:
            validated_data.pop("role", None)
            validated_data.pop("two_factor_enabled", None)
        elif requested_role == UserRole.SUPER_ADMIN and request.user.role != UserRole.SUPER_ADMIN:
            raise serializers.ValidationError({"role": "Only super admins can assign super admin role."})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance


class TwoFactorChallengeRequestSerializer(serializers.Serializer):
    delivery = serializers.ChoiceField(choices=["app", "email"], default="app")


class TwoFactorChallengeResponseSerializer(serializers.Serializer):
    challenge_id = serializers.CharField()
    expires_in = serializers.IntegerField()
    delivery = serializers.CharField()
    code = serializers.CharField(required=False)


class TwoFactorVerifyRequestSerializer(serializers.Serializer):
    challenge_id = serializers.CharField()
    code = serializers.RegexField(regex=r"^\d{6}$")


class TwoFactorVerifyResponseSerializer(serializers.Serializer):
    verified = serializers.BooleanField()
    verified_at = serializers.DateTimeField()
