from rest_framework import viewsets

from apps.community.models import CreatorProfile, Follow
from apps.community.permissions import CanManageCreatorProfile, CanManageFollow
from apps.community.serializers import CreatorProfileSerializer, FollowSerializer
from apps.users.models import UserRole


class CreatorProfileViewSet(viewsets.ModelViewSet):
    queryset = CreatorProfile.objects.select_related("user").all()
    serializer_class = CreatorProfileSerializer
    permission_classes = [CanManageCreatorProfile]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.select_related("follower", "following").all()
    serializer_class = FollowSerializer
    permission_classes = [CanManageFollow]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(follower=user)

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)
