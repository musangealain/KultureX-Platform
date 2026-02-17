from rest_framework import serializers

from apps.community.models import CreatorProfile, Follow


class CreatorProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = CreatorProfile
        fields = [
            "id",
            "user",
            "username",
            "display_name",
            "tagline",
            "city",
            "primary_discipline",
            "social_link",
            "followers_count",
            "following_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]

    def get_followers_count(self, obj) -> int:
        return obj.user.follower_links.count()

    def get_following_count(self, obj) -> int:
        return obj.user.following_links.count()


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = "__all__"
        read_only_fields = ["id", "follower", "created_at", "updated_at"]

    def validate(self, attrs):
        request = self.context.get("request")
        following = attrs.get("following")
        if request and request.user and following == request.user:
            raise serializers.ValidationError("Users cannot follow themselves.")
        return attrs
