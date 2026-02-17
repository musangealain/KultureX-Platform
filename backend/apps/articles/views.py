from rest_framework import filters, viewsets
from django.db.models import Q

from apps.articles.models import Article, ArticleStatus
from apps.articles.permissions import CanManageArticle
from apps.articles.serializers import ArticleSerializer
from apps.users.models import UserRole


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related("author").all()
    serializer_class = ArticleSerializer
    permission_classes = [CanManageArticle]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "summary", "body"]
    ordering_fields = ["created_at", "published_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.filter(status=ArticleStatus.PUBLISHED)
        if user.role in {UserRole.EDITOR, UserRole.ADMIN}:
            return queryset
        queryset = queryset.filter(
            Q(status=ArticleStatus.PUBLISHED) | Q(author=user),
        )
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
