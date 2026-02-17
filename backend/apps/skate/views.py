from rest_framework import viewsets

from apps.skate.models import Crew, SkateSpot, SkateVideo
from apps.skate.permissions import CanEditSkateContent
from apps.skate.serializers import CrewSerializer, SkateSpotSerializer, SkateVideoSerializer


class CrewViewSet(viewsets.ModelViewSet):
    queryset = Crew.objects.select_related("owner").all()
    serializer_class = CrewSerializer
    permission_classes = [CanEditSkateContent]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SkateSpotViewSet(viewsets.ModelViewSet):
    queryset = SkateSpot.objects.select_related("submitted_by").all()
    serializer_class = SkateSpotSerializer
    permission_classes = [CanEditSkateContent]

    def perform_create(self, serializer):
        serializer.save(submitted_by=self.request.user)


class SkateVideoViewSet(viewsets.ModelViewSet):
    queryset = SkateVideo.objects.select_related("creator", "crew", "spot").all()
    serializer_class = SkateVideoSerializer
    permission_classes = [CanEditSkateContent]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
