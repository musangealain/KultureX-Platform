from django.conf import settings
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class AdminActionAudit(TimestampedModel):
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="admin_audit_logs",
    )
    action = models.CharField(max_length=64)
    target_model = models.CharField(max_length=128)
    target_id = models.CharField(max_length=64, blank=True)
    request_path = models.CharField(max_length=255, blank=True)
    request_method = models.CharField(max_length=10, blank=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.CharField(max_length=255, blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["action"]),
            models.Index(fields=["target_model", "target_id"]),
        ]

    def __str__(self) -> str:
        actor = self.actor.username if self.actor else "unknown"
        return f"{actor}::{self.action}::{self.target_model}:{self.target_id or '-'}"
