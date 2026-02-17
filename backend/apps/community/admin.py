from django.contrib import admin

from apps.community.models import CreatorProfile, Follow

admin.site.register(CreatorProfile)
admin.site.register(Follow)
