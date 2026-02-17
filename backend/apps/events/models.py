from django.conf import settings
from django.db import models

from apps.common.models import TimestampedModel


class RSVPStatus(models.TextChoices):
    GOING = "going", "Going"
    INTERESTED = "interested", "Interested"
    CANCELED = "canceled", "Canceled"


class Event(TimestampedModel):
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="organized_events",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    venue = models.CharField(max_length=255)
    city = models.CharField(max_length=120)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    capacity = models.PositiveIntegerField(default=0)
    cover_image_url = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ["start_at"]

    def __str__(self) -> str:
        return self.title


class TicketType(TimestampedModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="ticket_types")
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("event", "name")

    def __str__(self) -> str:
        return f"{self.event.title} - {self.name}"


class RSVP(TimestampedModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="rsvps")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="rsvps")
    status = models.CharField(max_length=20, choices=RSVPStatus.choices, default=RSVPStatus.GOING)

    class Meta:
        unique_together = ("event", "user")

    def __str__(self) -> str:
        return f"{self.user.username} - {self.event.title}"
