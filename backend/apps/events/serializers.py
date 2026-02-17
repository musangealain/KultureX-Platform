from rest_framework import serializers

from apps.events.models import Event, RSVP, TicketBooking, TicketType


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ["id", "organizer", "created_at", "updated_at"]


class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = "__all__"
        read_only_fields = ["id", "user", "created_at", "updated_at"]


class TicketBookingSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source="event.title", read_only=True)

    class Meta:
        model = TicketBooking
        fields = "__all__"
        read_only_fields = ["id", "user", "created_at", "updated_at"]
