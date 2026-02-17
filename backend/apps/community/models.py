from django.conf import settings
from django.db import models

from apps.common.models import TimestampedModel


class CreatorProfile(TimestampedModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="creator_profile",
    )
    display_name = models.CharField(max_length=140)
    tagline = models.CharField(max_length=180, blank=True)
    city = models.CharField(max_length=120, blank=True)
    primary_discipline = models.CharField(max_length=120, blank=True)
    social_link = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.display_name


class Follow(TimestampedModel):
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="following_links",
    )
    following = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="follower_links",
    )

    class Meta:
        unique_together = ("follower", "following")

    def __str__(self) -> str:
        return f"{self.follower.username} -> {self.following.username}"
