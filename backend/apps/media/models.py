from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from apps.common.models import TimestampedModel


class MediaType(models.TextChoices):
    IMAGE = "image", "Image"
    VIDEO = "video", "Video"
    FILE = "file", "File"


class MediaAsset(TimestampedModel):
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="media_assets",
    )
    file_url = models.URLField()
    media_type = models.CharField(max_length=20, choices=MediaType.choices, default=MediaType.IMAGE)
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    object_id = models.PositiveBigIntegerField(null=True, blank=True)
    related_object = GenericForeignKey("content_type", "object_id")
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self) -> str:
        return f"{self.media_type}:{self.file_url}"
