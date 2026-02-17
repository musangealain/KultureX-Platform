from decimal import Decimal

from django.conf import settings
from django.db import models

from apps.common.models import TimestampedModel


class OrderStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    PAID = "paid", "Paid"
    FULFILLED = "fulfilled", "Fulfilled"
    CANCELED = "canceled", "Canceled"


class PaymentProvider(models.TextChoices):
    STRIPE = "stripe", "Stripe"
    MOBILE_MONEY = "mobile_money", "Mobile Money"


class PaymentStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    SUCCEEDED = "succeeded", "Succeeded"
    FAILED = "failed", "Failed"


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


class Cart(TimestampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart")
    checked_out = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Cart<{self.user.username}>"

    @property
    def total_amount(self) -> Decimal:
        return sum((item.line_total for item in self.items.select_related("product")), Decimal("0"))


class CartItem(TimestampedModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("cart", "product")

    @property
    def line_total(self) -> Decimal:
        return (self.product.price or Decimal("0")) * self.quantity

    def __str__(self) -> str:
        return f"{self.product.name} x {self.quantity}"


class Order(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self) -> str:
        return f"Order #{self.id}"

    def recalculate_total(self) -> None:
        total = sum((item.line_total for item in self.items.select_related("product")), Decimal("0"))
        self.total_amount = total
        self.save(update_fields=["total_amount", "updated_at"])


class OrderItem(TimestampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @property
    def line_total(self) -> Decimal:
        return self.unit_price * self.quantity

    def save(self, *args, **kwargs):
        if not self.unit_price and self.product_id:
            self.unit_price = self.product.price
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"Order#{self.order_id}:{self.product.name}"


class Payment(TimestampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    provider = models.CharField(max_length=20, choices=PaymentProvider.choices)
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    provider_reference = models.CharField(max_length=180, blank=True)

    def __str__(self) -> str:
        return f"Payment<{self.provider}:{self.status}>"
