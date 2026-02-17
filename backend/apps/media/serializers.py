from rest_framework import serializers

from apps.media.models import MediaAsset


class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = "__all__"
        read_only_fields = ["id", "uploaded_by", "created_at", "updated_at"]
