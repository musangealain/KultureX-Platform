from rest_framework import serializers

from apps.skate.models import Crew, SkateSpot, SkateVideo


class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = "__all__"
        read_only_fields = ["id", "owner", "created_at", "updated_at"]


class SkateSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkateSpot
        fields = "__all__"
        read_only_fields = ["id", "submitted_by", "created_at", "updated_at"]


class SkateVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkateVideo
        fields = "__all__"
        read_only_fields = ["id", "creator", "created_at", "updated_at"]
