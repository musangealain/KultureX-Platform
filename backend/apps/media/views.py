from rest_framework import permissions, viewsets

from apps.media.models import MediaAsset
from apps.media.serializers import MediaAssetSerializer
from apps.users.models import UserRole


class MediaAssetViewSet(viewsets.ModelViewSet):
    queryset = MediaAsset.objects.select_related("uploaded_by", "content_type").all()
    serializer_class = MediaAssetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(uploaded_by=user)

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
