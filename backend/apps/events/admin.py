from django.contrib import admin

from apps.events.models import Event, RSVP, TicketType

admin.site.register(Event)
admin.site.register(TicketType)
admin.site.register(RSVP)
