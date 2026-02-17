from django.db.models import Q
from rest_framework import permissions, viewsets

from apps.events.models import Event, RSVP, TicketType
from apps.events.permissions import CanManageEvent, CanManageRSVP
from apps.events.serializers import EventSerializer, RSVPSerializer, TicketTypeSerializer
from apps.users.models import UserRole


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.select_related("organizer").all()
    serializer_class = EventSerializer
    permission_classes = [CanManageEvent]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.filter(is_published=True)
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(Q(is_published=True) | Q(organizer=user))

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)


class TicketTypeViewSet(viewsets.ModelViewSet):
    queryset = TicketType.objects.select_related("event", "event__organizer").all()
    serializer_class = TicketTypeSerializer
    permission_classes = [CanManageEvent]


class RSVPViewSet(viewsets.ModelViewSet):
    queryset = RSVP.objects.select_related("user", "event").all()
    serializer_class = RSVPSerializer
    permission_classes = [CanManageRSVP]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role == UserRole.ADMIN:
            return queryset
        return queryset.filter(user=user)

    def get_permissions(self):
        if self.action == "list":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
