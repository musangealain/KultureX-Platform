from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.common.models import TimestampedModel


class UserRole(models.TextChoices):
    ADMIN = "admin", "Admin"
    EDITOR = "editor", "Editor"
    CREATOR = "creator", "Creator"
    ORGANIZER = "organizer", "Organizer"
    BRAND = "brand", "Brand"
    MEMBER = "member", "Member"


class User(AbstractUser, TimestampedModel):
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.MEMBER)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)

    def save(self, *args, **kwargs):
        if self.is_superuser and self.role != UserRole.ADMIN:
            self.role = UserRole.ADMIN
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.username
