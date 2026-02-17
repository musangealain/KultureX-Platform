from django.conf import settings
from django.db import models

from apps.common.models import TimestampedModel


class Crew(TimestampedModel):
    name = models.CharField(max_length=120, unique=True)
    city = models.CharField(max_length=120, blank=True)
    country = models.CharField(max_length=120, blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="owned_crews",
    )
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class SkateSpot(TimestampedModel):
    name = models.CharField(max_length=180)
    city = models.CharField(max_length=120)
    country = models.CharField(max_length=120)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    description = models.TextField(blank=True)
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="submitted_spots",
    )

    class Meta:
        unique_together = ("name", "city", "country")

    def __str__(self) -> str:
        return f"{self.name} ({self.city})"


class SkateVideo(TimestampedModel):
    title = models.CharField(max_length=255)
    video_url = models.URLField()
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="skate_videos",
    )
    crew = models.ForeignKey(Crew, on_delete=models.SET_NULL, null=True, blank=True, related_name="videos")
    spot = models.ForeignKey(
        SkateSpot,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="videos",
    )
    caption = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.title
