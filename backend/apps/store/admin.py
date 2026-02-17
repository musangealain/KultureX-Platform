from django.contrib import admin

from apps.store.models import Brand, Order, Product, ProductVariant

admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(ProductVariant)
admin.site.register(Order)
