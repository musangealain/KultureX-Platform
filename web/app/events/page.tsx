import { getEvents } from "@/features/events/api";

export default async function EventsPage() {
  const events = await getEvents().catch(() => []);

  return (
    <section className="stack">
      <section className="section page-header reveal">
        <span className="kicker">Events + Tickets</span>
        <h1>Discover and book sessions, tours, and festivals</h1>
        <p>Event listings, ticket types, RSVPs, and booking APIs power the live culture calendar.</p>
      </section>

      <section className="section reveal d1">
        <div className="split">
          <article className="metric">
            <strong>{events.length}</strong>
            <span>Published events</span>
          </article>
          <article className="metric">
            <strong>Bookings</strong>
            <span>Ticket booking routes live in API</span>
          </article>
        </div>
      </section>

      <section className="section reveal d2">
        <div className="data-grid">
          {events.length ? (
            events.map((eventItem, index) => (
              <article key={eventItem.id} className={`data-card reveal d${(index % 3) + 1}`}>
                <span className="badge badge-sand">Event</span>
                <h3>{eventItem.title}</h3>
                <p>
                  {eventItem.venue}, {eventItem.city}
                </p>
                <span className="data-meta">{new Date(eventItem.start_at).toLocaleString()}</span>
              </article>
            ))
          ) : (
            <article className="data-card empty-card">
              <h3>No events yet</h3>
              <p>Create events through organizer/admin flows to populate this schedule.</p>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}
