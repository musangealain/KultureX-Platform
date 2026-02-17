from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.articles.models import Article
from apps.events.models import Event, TicketBooking
from apps.store.models import Order, Product
from apps.users.models import UserRole

User = get_user_model()


class AdminAnalyticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != UserRole.ADMIN:
            return Response({"detail": "Admin access required."}, status=403)

        payload = {
            "users_total": User.objects.count(),
            "articles_total": Article.objects.count(),
            "products_total": Product.objects.count(),
            "orders_total": Order.objects.count(),
            "events_total": Event.objects.count(),
            "ticket_bookings_total": TicketBooking.objects.count(),
        }
        return Response(payload)
