from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.common.models import TimestampedModel


class UserRole(models.TextChoices):
    SUPER_ADMIN = "super_admin", "Super Admin"
    ADMIN = "admin", "Admin"
    MODERATOR = "moderator", "Moderator"
    EDITOR = "editor", "Editor"
    AUTHOR = "author", "Author"
    REGISTERED = "registered", "Registered User"


class User(AbstractUser, TimestampedModel):
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.REGISTERED)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)
    two_factor_enabled = models.BooleanField(default=False)
    two_factor_secret = models.CharField(max_length=64, blank=True)
    two_factor_verified_at = models.DateTimeField(blank=True, null=True)

    @property
    def is_admin_role(self) -> bool:
        return self.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN}

    @property
    def is_moderator_role(self) -> bool:
        return self.role in {UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR}

    @property
    def can_access_admin_portal(self) -> bool:
        return self.role in {
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.EDITOR,
        }

    def save(self, *args, **kwargs):
        if self.is_superuser and self.role != UserRole.SUPER_ADMIN:
            self.role = UserRole.SUPER_ADMIN
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.username
