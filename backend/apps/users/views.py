from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, viewsets

from apps.users.permissions import IsAdmin, IsSelfOrAdmin
from apps.users.serializers import UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in {"list", "destroy"}:
            return [IsAdmin()]
        if self.action in {"create"}:
            return [permissions.AllowAny()]
        if self.action in {"retrieve", "update", "partial_update"}:
            return [permissions.IsAuthenticated(), IsSelfOrAdmin()]
        return [permissions.IsAuthenticated()]


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
