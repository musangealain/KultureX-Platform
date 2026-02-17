from rest_framework import serializers

from apps.articles.models import Article, Category, Tag


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "created_at", "updated_at"]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug", "created_at", "updated_at"]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]


class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    reviewed_by_username = serializers.CharField(source="reviewed_by.username", read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        write_only=True,
        required=False,
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
        required=False,
    )

    class Meta:
        model = Article
        fields = [
            "id",
            "author",
            "author_username",
            "reviewed_by",
            "reviewed_by_username",
            "title",
            "slug",
            "summary",
            "body",
            "status",
            "review_notes",
            "published_at",
            "cover_image_url",
            "categories",
            "tags",
            "category_ids",
            "tag_ids",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "author",
            "reviewed_by",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        category_ids = validated_data.pop("category_ids", [])
        tag_ids = validated_data.pop("tag_ids", [])
        article = super().create(validated_data)
        if category_ids:
            article.categories.set(category_ids)
        if tag_ids:
            article.tags.set(tag_ids)
        return article

    def update(self, instance, validated_data):
        category_ids = validated_data.pop("category_ids", None)
        tag_ids = validated_data.pop("tag_ids", None)
        article = super().update(instance, validated_data)
        if category_ids is not None:
            article.categories.set(category_ids)
        if tag_ids is not None:
            article.tags.set(tag_ids)
        return article
