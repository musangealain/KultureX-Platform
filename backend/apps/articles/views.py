from django.db.models import Q
from django.utils import timezone
from rest_framework import filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.audit import log_admin_action
from apps.articles.models import Article, ArticleStatus, Category, Tag
from apps.articles.permissions import CanManageArticle
from apps.articles.serializers import (
    ArticleSerializer,
    CategorySerializer,
    TagSerializer,
)
from apps.users.models import UserRole


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if self.request.user and self.request.user.is_authenticated and self.request.user.role in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        if self.request.user and self.request.user.is_authenticated and self.request.user.role in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related("author", "reviewed_by").prefetch_related("categories", "tags")
    serializer_class = ArticleSerializer
    permission_classes = [CanManageArticle]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "summary", "body", "categories__name", "tags__name"]
    ordering_fields = ["created_at", "published_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.filter(status=ArticleStatus.PUBLISHED)
        if user.role in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }:
            return queryset
        return queryset.filter(Q(status=ArticleStatus.PUBLISHED) | Q(author=user))

    def perform_create(self, serializer):
        user = self.request.user
        default_status = ArticleStatus.DRAFT
        if user.role == UserRole.AUTHOR:
            requested_status = self.request.data.get("status")
            if requested_status in {ArticleStatus.DRAFT, ArticleStatus.SUBMITTED}:
                default_status = requested_status
            else:
                default_status = ArticleStatus.SUBMITTED
        article = serializer.save(author=user, status=default_status)
        log_admin_action(
            self.request,
            "articles.create",
            target=article,
            metadata={"status": article.status},
        )

    def perform_update(self, serializer):
        changed_fields = list(serializer.validated_data.keys())
        article = serializer.save()
        log_admin_action(
            self.request,
            "articles.update",
            target=article,
            metadata={"changed_fields": changed_fields, "status": article.status},
        )

    def perform_destroy(self, instance):
        log_admin_action(
            self.request,
            "articles.delete",
            target=instance,
            metadata={"status": instance.status},
        )
        super().perform_destroy(instance)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def submit(self, request, pk=None):
        article = self.get_object()
        if article.author_id != request.user.id and request.user.role not in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }:
            return Response({"detail": "Only the author can submit this article."}, status=status.HTTP_403_FORBIDDEN)
        if article.status not in {ArticleStatus.DRAFT, ArticleStatus.REJECTED}:
            return Response({"detail": "Only draft or rejected articles can be submitted."}, status=status.HTTP_400_BAD_REQUEST)

        article.status = ArticleStatus.SUBMITTED
        article.review_notes = ""
        article.reviewed_by = None
        article.save(update_fields=["status", "review_notes", "reviewed_by", "updated_at"])
        log_admin_action(request, "articles.submit", target=article, metadata={"status": article.status})
        return Response(self.get_serializer(article).data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def approve(self, request, pk=None):
        if request.user.role not in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }:
            return Response({"detail": "Editor or Admin role required."}, status=status.HTTP_403_FORBIDDEN)

        article = self.get_object()
        if article.status != ArticleStatus.SUBMITTED:
            return Response({"detail": "Only submitted articles can be approved."}, status=status.HTTP_400_BAD_REQUEST)

        article.status = ArticleStatus.APPROVED
        article.reviewed_by = request.user
        article.review_notes = request.data.get("review_notes", "")
        article.save(update_fields=["status", "reviewed_by", "review_notes", "updated_at"])
        log_admin_action(request, "articles.approve", target=article, metadata={"status": article.status})
        return Response(self.get_serializer(article).data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def reject(self, request, pk=None):
        if request.user.role not in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }:
            return Response({"detail": "Editor or Admin role required."}, status=status.HTTP_403_FORBIDDEN)

        article = self.get_object()
        if article.status != ArticleStatus.SUBMITTED:
            return Response({"detail": "Only submitted articles can be rejected."}, status=status.HTTP_400_BAD_REQUEST)

        article.status = ArticleStatus.REJECTED
        article.reviewed_by = request.user
        article.review_notes = request.data.get("review_notes", "")
        article.save(update_fields=["status", "reviewed_by", "review_notes", "updated_at"])
        log_admin_action(request, "articles.reject", target=article, metadata={"status": article.status})
        return Response(self.get_serializer(article).data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def publish(self, request, pk=None):
        if request.user.role not in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.EDITOR,
        }:
            return Response({"detail": "Editor or Admin role required."}, status=status.HTTP_403_FORBIDDEN)

        article = self.get_object()
        if article.status not in {ArticleStatus.APPROVED, ArticleStatus.PUBLISHED}:
            return Response({"detail": "Only approved articles can be published."}, status=status.HTTP_400_BAD_REQUEST)

        article.status = ArticleStatus.PUBLISHED
        article.reviewed_by = request.user
        article.published_at = timezone.now()
        article.save(update_fields=["status", "reviewed_by", "published_at", "updated_at"])
        log_admin_action(request, "articles.publish", target=article, metadata={"status": article.status})
        return Response(self.get_serializer(article).data)
