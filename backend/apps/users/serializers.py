from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.users.models import UserRole

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=8)

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
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        password = validated_data.pop("password", None)

        if not request or not request.user.is_authenticated or request.user.role != UserRole.ADMIN:
            validated_data["role"] = UserRole.MEMBER

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

        if not request or not request.user.is_authenticated or request.user.role != UserRole.ADMIN:
            validated_data.pop("role", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
