from rest_framework import serializers

from apps.articles.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Article
        fields = [
            "id",
            "author",
            "author_username",
            "title",
            "slug",
            "summary",
            "body",
            "status",
            "published_at",
            "cover_image_url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "slug", "author", "created_at", "updated_at"]
