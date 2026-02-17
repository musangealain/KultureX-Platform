from django.conf import settings
from django.db import models

from apps.common.models import TimestampedModel


class OrderStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    PAID = "paid", "Paid"
    FULFILLED = "fulfilled", "Fulfilled"
    CANCELED = "canceled", "Canceled"


class Brand(TimestampedModel):
    name = models.CharField(max_length=140, unique=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="owned_brands",
    )
    description = models.TextField(blank=True)
    logo_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name


class Product(TimestampedModel):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    image_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name


class ProductVariant(TimestampedModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    sku = models.CharField(max_length=80, unique=True)
    size = models.CharField(max_length=40, blank=True)
    color = models.CharField(max_length=60, blank=True)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.sku


class Order(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self) -> str:
        return f"Order #{self.id}"
