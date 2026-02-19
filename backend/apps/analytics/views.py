from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from rest_framework import permissions
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.articles.models import Article
from apps.events.models import Event, TicketBooking
from apps.store.models import Order, Product
from apps.users.permissions import IsModeratorOrAdmin

User = get_user_model()


class AdminAnalyticsSerializer(serializers.Serializer):
    users_total = serializers.IntegerField()
    articles_total = serializers.IntegerField()
    products_total = serializers.IntegerField()
    orders_total = serializers.IntegerField()
    events_total = serializers.IntegerField()
    ticket_bookings_total = serializers.IntegerField()


class DetailErrorSerializer(serializers.Serializer):
    detail = serializers.CharField()


class AdminAnalyticsView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsModeratorOrAdmin]

    @extend_schema(responses={200: AdminAnalyticsSerializer, 403: DetailErrorSerializer})
    def get(self, request):
        payload = {
            "users_total": User.objects.count(),
            "articles_total": Article.objects.count(),
            "products_total": Product.objects.count(),
            "orders_total": Order.objects.count(),
            "events_total": Event.objects.count(),
            "ticket_bookings_total": TicketBooking.objects.count(),
        }
        return Response(payload)
