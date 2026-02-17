from django.contrib import admin

from apps.events.models import Event, RSVP, TicketBooking, TicketType

admin.site.register(Event)
admin.site.register(TicketType)
admin.site.register(RSVP)
admin.site.register(TicketBooking)
