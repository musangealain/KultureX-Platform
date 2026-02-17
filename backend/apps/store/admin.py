from django.contrib import admin

from apps.store.models import (
    Brand,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
    Product,
    ProductVariant,
)

admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(ProductVariant)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
