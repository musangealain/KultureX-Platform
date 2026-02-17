from rest_framework import serializers

from apps.events.models import Event, RSVP, TicketType


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
