import secrets

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils import timezone
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.common.audit import log_admin_action
from apps.users.permissions import IsAdmin, IsModeratorOrAdmin, IsSelfOrAdmin
from apps.users.serializers import (
    TwoFactorChallengeRequestSerializer,
    TwoFactorChallengeResponseSerializer,
    TwoFactorVerifyRequestSerializer,
    TwoFactorVerifyResponseSerializer,
    UserSerializer,
)

User = get_user_model()
TWO_FACTOR_CACHE_PREFIX = "kulturex:admin:2fa:"
TWO_FACTOR_TTL_SECONDS = 300


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "list":
            return [IsModeratorOrAdmin()]
        if self.action == "destroy":
            return [IsAdmin()]
        if self.action in {"create"}:
            return [permissions.AllowAny()]
        if self.action in {"retrieve", "update", "partial_update"}:
            return [permissions.IsAuthenticated(), IsSelfOrAdmin()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        user = serializer.save()
        log_admin_action(
            self.request,
            "users.create",
            target=user,
            metadata={"username": user.username, "role": user.role},
        )

    def perform_update(self, serializer):
        changed_fields = list(serializer.validated_data.keys())
        user = serializer.save()
        log_admin_action(
            self.request,
            "users.update",
            target=user,
            metadata={"changed_fields": changed_fields, "role": user.role},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "users.delete",
            target=instance,
            metadata={"username": instance.username, "role": instance.role},
        )
        super().perform_destroy(instance)


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class TwoFactorChallengeView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsModeratorOrAdmin]

    def post(self, request):
        if not request.user.can_access_admin_portal:
            return Response({"detail": "Admin portal role required."}, status=403)

        serializer = TwoFactorChallengeRequestSerializer(data=request.data or {})
        serializer.is_valid(raise_exception=True)

        challenge_id = secrets.token_urlsafe(24)
        code = f"{secrets.randbelow(1_000_000):06d}"
        delivery = serializer.validated_data["delivery"]

        cache_key = f"{TWO_FACTOR_CACHE_PREFIX}{challenge_id}"
        cache.set(
            cache_key,
            {"user_id": request.user.id, "code": code},
            timeout=TWO_FACTOR_TTL_SECONDS,
        )

        updates = []
        if not request.user.two_factor_enabled:
            request.user.two_factor_enabled = True
            updates.append("two_factor_enabled")
        if not request.user.two_factor_secret:
            request.user.two_factor_secret = secrets.token_hex(24)
            updates.append("two_factor_secret")
        if updates:
            updates.append("updated_at")
            request.user.save(update_fields=updates)

        payload = {
            "challenge_id": challenge_id,
            "expires_in": TWO_FACTOR_TTL_SECONDS,
            "delivery": delivery,
        }
        if settings.DEBUG:
            payload["code"] = code

        log_admin_action(
            request,
            "auth.2fa.challenge",
            metadata={"delivery": delivery},
        )
        response_serializer = TwoFactorChallengeResponseSerializer(payload)
        return Response(response_serializer.data, status=200)


class TwoFactorVerifyView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsModeratorOrAdmin]

    def post(self, request):
        if not request.user.can_access_admin_portal:
            return Response({"detail": "Admin portal role required."}, status=403)

        serializer = TwoFactorVerifyRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        challenge_id = serializer.validated_data["challenge_id"]
        code = serializer.validated_data["code"]
        cache_key = f"{TWO_FACTOR_CACHE_PREFIX}{challenge_id}"
        challenge_payload = cache.get(cache_key)
        if not challenge_payload:
            return Response({"detail": "2FA challenge expired or invalid."}, status=400)

        if challenge_payload.get("user_id") != request.user.id:
            return Response({"detail": "Challenge does not belong to current user."}, status=403)
        if challenge_payload.get("code") != code:
            return Response({"detail": "Invalid 2FA code."}, status=400)

        cache.delete(cache_key)
        request.user.two_factor_enabled = True
        request.user.two_factor_verified_at = timezone.now()
        request.user.save(update_fields=["two_factor_enabled", "two_factor_verified_at", "updated_at"])

        log_admin_action(request, "auth.2fa.verify")
        response_serializer = TwoFactorVerifyResponseSerializer(
            {"verified": True, "verified_at": request.user.two_factor_verified_at}
        )
        return Response(response_serializer.data, status=200)
