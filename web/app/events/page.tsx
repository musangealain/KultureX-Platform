import { getEvents } from "@/features/events/api";

export default async function EventsPage() {
  const events = await getEvents().catch(() => []);

  return (
    <div className="container">
      <h1>Events</h1>
      <div className="grid">
        {events.length ? (
          events.map((eventItem) => (
            <article className="card" key={eventItem.id}>
              <h3>{eventItem.title}</h3>
              <p>
                {eventItem.venue}, {eventItem.city}
              </p>
              <span className="tag">{eventItem.start_at}</span>
            </article>
          ))
        ) : (
          <article className="card">
            <h3>No events yet</h3>
            <p>Organizer workflows are scaffolded in the API and ready for UI forms.</p>
          </article>
        )}
      </div>
    </div>
  );
}
