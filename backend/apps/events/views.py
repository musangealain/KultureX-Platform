from django.db.models import Q
from rest_framework import permissions, viewsets

from apps.common.audit import log_admin_action
from apps.events.models import Event, RSVP, TicketBooking, TicketType
from apps.events.permissions import CanManageEvent, CanManageRSVP, CanManageTicketBooking
from apps.events.serializers import (
    EventSerializer,
    RSVPSerializer,
    TicketBookingSerializer,
    TicketTypeSerializer,
)
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
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}:
            return queryset
        return queryset.filter(Q(is_published=True) | Q(organizer=user))

    def perform_create(self, serializer):
        event = serializer.save(organizer=self.request.user)
        log_admin_action(
            self.request,
            "events.create",
            target=event,
            metadata={"is_published": event.is_published},
        )

    def perform_update(self, serializer):
        event = serializer.save()
        log_admin_action(
            self.request,
            "events.update",
            target=event,
            metadata={"is_published": event.is_published},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "events.delete",
            target=instance,
            metadata={"is_published": instance.is_published},
        )
        super().perform_destroy(instance)


class TicketTypeViewSet(viewsets.ModelViewSet):
    queryset = TicketType.objects.select_related("event", "event__organizer").all()
    serializer_class = TicketTypeSerializer
    permission_classes = [CanManageEvent]

    def perform_create(self, serializer):
        ticket_type = serializer.save()
        log_admin_action(
            self.request,
            "events.ticket_types.create",
            target=ticket_type,
            metadata={"event_id": ticket_type.event_id},
        )

    def perform_update(self, serializer):
        ticket_type = serializer.save()
        log_admin_action(
            self.request,
            "events.ticket_types.update",
            target=ticket_type,
            metadata={"event_id": ticket_type.event_id},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "events.ticket_types.delete",
            target=instance,
            metadata={"event_id": instance.event_id},
        )
        super().perform_destroy(instance)


class RSVPViewSet(viewsets.ModelViewSet):
    queryset = RSVP.objects.select_related("user", "event").all()
    serializer_class = RSVPSerializer
    permission_classes = [CanManageRSVP]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}:
            return queryset
        return queryset.filter(user=user)

    def get_permissions(self):
        if self.action == "list":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        rsvp = serializer.save(user=self.request.user)
        log_admin_action(
            self.request,
            "events.rsvp.create",
            target=rsvp,
            metadata={"event_id": rsvp.event_id, "status": rsvp.status},
        )

    def perform_update(self, serializer):
        rsvp = serializer.save()
        log_admin_action(
            self.request,
            "events.rsvp.update",
            target=rsvp,
            metadata={"event_id": rsvp.event_id, "status": rsvp.status},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "events.rsvp.delete",
            target=instance,
            metadata={"event_id": instance.event_id, "status": instance.status},
        )
        super().perform_destroy(instance)


class TicketBookingViewSet(viewsets.ModelViewSet):
    queryset = TicketBooking.objects.select_related("user", "event", "ticket_type").all()
    serializer_class = TicketBookingSerializer
    permission_classes = [CanManageTicketBooking]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}:
            return queryset
        return queryset.filter(user=user)

    def perform_create(self, serializer):
        booking = serializer.save(user=self.request.user)
        log_admin_action(
            self.request,
            "events.bookings.create",
            target=booking,
            metadata={"event_id": booking.event_id, "status": booking.status},
        )

    def perform_update(self, serializer):
        booking = serializer.save()
        log_admin_action(
            self.request,
            "events.bookings.update",
            target=booking,
            metadata={"event_id": booking.event_id, "status": booking.status},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "events.bookings.delete",
            target=instance,
            metadata={"event_id": instance.event_id, "status": instance.status},
        )
        super().perform_destroy(instance)
