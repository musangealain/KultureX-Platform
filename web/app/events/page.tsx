import { getEvents, type EventItem } from "@/features/events/api";

type EventCard = {
  id: number;
  title: string;
  venue: string;
  city: string;
  startAt: string;
  type: string;
};

const seededEvents: EventCard[] = [
  {
    id: 7001,
    title: "KX Street Jam: Downtown Lines",
    venue: "Repave Lot 19",
    city: "Kigali",
    startAt: "2026-03-06T18:00:00.000Z",
    type: "Skate Session"
  },
  {
    id: 7002,
    title: "Future Fabric Night Market",
    venue: "Avenue 05 Container Court",
    city: "Kigali",
    startAt: "2026-03-14T15:00:00.000Z",
    type: "Fashion Pop-Up"
  },
  {
    id: 7003,
    title: "Creators Roundtable: Build The Scene",
    venue: "KX Studio Hall",
    city: "Kigali",
    startAt: "2026-03-20T17:30:00.000Z",
    type: "Talk + Networking"
  },
  {
    id: 7004,
    title: "Night Wheels Open Qualifier",
    venue: "Warehouse Bowl",
    city: "Kigali",
    startAt: "2026-03-28T19:00:00.000Z",
    type: "Competition"
  }
];

function normalizeEvents(items: EventItem[]): EventCard[] {
  if (!items.length) {
    return seededEvents;
  }

  return items.map((item, index) => ({
    id: item.id,
    title: item.title,
    venue: item.venue,
    city: item.city,
    startAt: item.start_at,
    type: ["Skate Session", "Festival", "Workshop", "Pop-Up"][index % 4]
  }));
}

const interactionPatterns = [
  "Map + list toggle with sticky date filters.",
  "Swipe card gesture to quick RSVP for registered users.",
  "Ticket state chips (Open, Limited, Sold Out) updated in realtime.",
  "Post-event recap links to articles and skate highlights."
];

export default async function EventsPage() {
  const fetched = await getEvents().catch(() => []);
  const events = normalizeEvents(fetched);

  return (
    <section className="stack">
      <section className="section reveal">
        <span className="eyebrow">Events / Discovery</span>
        <h1 className="page-title">Find sessions, book tickets, and move with the scene.</h1>
        <p className="page-subtitle">
          The events surface is built for high-energy calendars with quick RSVP and booking actions.
        </p>
      </section>

      <section className="section reveal d1">
        <header className="section-head">
          <h2>Upcoming Calendar</h2>
          <p>Lifestyle-led content ensures listings feel editorial, not spreadsheet-like.</p>
        </header>
        <div className="cards-auto">
          {events.map((eventItem, index) => (
            <article key={eventItem.id} className={`event-card reveal d${(index % 3) + 1}`}>
              <span className="card-label orange">{eventItem.type}</span>
              <h3 className="card-title">{eventItem.title}</h3>
              <p className="card-copy">
                {eventItem.venue}, {eventItem.city}
              </p>
              <p className="card-meta">{new Date(eventItem.startAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal d2">
        <header className="section-head">
          <h2>Interaction Pattern</h2>
          <p>Designed for fast planning on both desktop and mobile.</p>
        </header>
        <ul className="timeline">
          {interactionPatterns.map((pattern) => (
            <li key={pattern}>
              <strong>UX Motion</strong>
              <span>{pattern}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
