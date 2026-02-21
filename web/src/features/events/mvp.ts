import { getEvents, type EventItem } from "./api";

export type EventCard = {
  id: number;
  slug: string;
  title: string;
  venue: string;
  city: string;
  startAt: string;
  type: string;
  excerpt: string;
  ticketStatus: "Open" | "Limited" | "Sold Out";
  ticketPrice: string;
};

const eventTypePool = ["Skate Session", "Competition", "Pop-Up", "Workshop", "Talk + Networking"];
const excerptPool = [
  "Street-led sessions with open entry, creator filming zones, and crew challenges.",
  "Night-format experience with live DJs, deck customization booths, and trick qualifiers.",
  "Community meetup built for skaters, designers, and event teams collaborating in one venue.",
  "Hands-on practice format with instructor checkpoints and beginner-friendly lanes.",
  "Creator roundtable focused on scene growth, safety ops, and brand partnerships."
];
const statusPool: EventCard["ticketStatus"][] = ["Open", "Limited", "Sold Out", "Open", "Limited"];
const pricePool = ["$12", "$18", "$25", "$10", "$15"];

const seededEvents: EventCard[] = [
  {
    id: 7001,
    slug: "kx-street-jam-downtown-lines",
    title: "KX Street Jam: Downtown Lines",
    venue: "Repave Lot 19",
    city: "Kigali",
    startAt: "2026-03-06T18:00:00.000Z",
    type: "Skate Session",
    excerpt: "Open street lines, camera crew checkpoints, and youth battle format.",
    ticketStatus: "Open",
    ticketPrice: "$12"
  },
  {
    id: 7002,
    slug: "future-fabric-night-market",
    title: "Future Fabric Night Market",
    venue: "Avenue 05 Container Court",
    city: "Kigali",
    startAt: "2026-03-14T15:00:00.000Z",
    type: "Pop-Up",
    excerpt: "Fashion drops, styling booths, and live creator interviews.",
    ticketStatus: "Limited",
    ticketPrice: "$18"
  },
  {
    id: 7003,
    slug: "creators-roundtable-build-the-scene",
    title: "Creators Roundtable: Build The Scene",
    venue: "KX Studio Hall",
    city: "Kigali",
    startAt: "2026-03-20T17:30:00.000Z",
    type: "Talk + Networking",
    excerpt: "Cross-discipline dialogue on events, storytelling, and community growth.",
    ticketStatus: "Open",
    ticketPrice: "$10"
  },
  {
    id: 7004,
    slug: "night-wheels-open-qualifier",
    title: "Night Wheels Open Qualifier",
    venue: "Warehouse Bowl",
    city: "Kigali",
    startAt: "2026-03-28T19:00:00.000Z",
    type: "Competition",
    excerpt: "Qualifier rounds, judges panel, and city finals seeding.",
    ticketStatus: "Sold Out",
    ticketPrice: "$25"
  }
];

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeEvents(items: EventItem[]): EventCard[] {
  if (!items.length) {
    return seededEvents;
  }

  return items.map((item, index) => ({
    id: item.id,
    slug: toSlug(item.title),
    title: item.title,
    venue: item.venue,
    city: item.city,
    startAt: item.start_at,
    type: eventTypePool[index % eventTypePool.length],
    excerpt: excerptPool[index % excerptPool.length],
    ticketStatus: statusPool[index % statusPool.length],
    ticketPrice: pricePool[index % pricePool.length]
  }));
}

export async function getEventCardsMvp(): Promise<EventCard[]> {
  const fetched = await getEvents().catch(() => []);
  return normalizeEvents(fetched);
}

export async function getEventBySlugMvp(slug: string): Promise<EventCard | null> {
  const events = await getEventCardsMvp();
  return events.find((item) => item.slug === slug) ?? null;
}

export function formatEventDate(dateIso: string): string {
  return new Date(dateIso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
