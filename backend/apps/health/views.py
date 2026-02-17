from drf_spectacular.utils import extend_schema
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthCheckResponseSerializer(serializers.Serializer):
    status = serializers.CharField()


class HealthCheckView(APIView):
    authentication_classes = []
    permission_classes = []

    @extend_schema(responses=HealthCheckResponseSerializer)
    def get(self, request):
        return Response({"status": "ok"})
