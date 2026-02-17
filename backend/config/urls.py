from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.articles.views import ArticleViewSet
from apps.community.views import CreatorProfileViewSet, FollowViewSet
from apps.events.views import EventViewSet, RSVPViewSet, TicketTypeViewSet
from apps.health.views import HealthCheckView
from apps.skate.views import CrewViewSet, SkateSpotViewSet, SkateVideoViewSet
from apps.store.views import BrandViewSet, OrderViewSet, ProductViewSet, ProductVariantViewSet
from apps.users.views import MeView, UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
router.register("articles", ArticleViewSet, basename="articles")
router.register("skate/crews", CrewViewSet, basename="skate-crews")
router.register("skate/spots", SkateSpotViewSet, basename="skate-spots")
router.register("skate/videos", SkateVideoViewSet, basename="skate-videos")
router.register("store/brands", BrandViewSet, basename="store-brands")
router.register("store/products", ProductViewSet, basename="store-products")
router.register("store/variants", ProductVariantViewSet, basename="store-variants")
router.register("store/orders", OrderViewSet, basename="store-orders")
router.register("events", EventViewSet, basename="events")
router.register("events/ticket-types", TicketTypeViewSet, basename="events-ticket-types")
router.register("events/rsvps", RSVPViewSet, basename="events-rsvps")
router.register("community/profiles", CreatorProfileViewSet, basename="community-profiles")
router.register("community/follows", FollowViewSet, basename="community-follows")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/health/", HealthCheckView.as_view(), name="health"),
    path("api/v1/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/auth/me/", MeView.as_view(), name="me"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
