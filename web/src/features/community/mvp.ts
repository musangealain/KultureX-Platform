import { getProfiles, type CreatorProfile } from "./api";

export type CreatorCard = {
  id: number;
  username: string;
  displayName: string;
  discipline: string;
  tagline: string;
  city: string;
  followers: string;
  streak: string;
  focusAreas: string[];
};

export type FeedItem = {
  id: string;
  type: "story" | "event" | "drop";
  title: string;
  excerpt: string;
  creatorName: string;
  creatorUsername: string;
  publishedAt: string;
  engagement: string;
  targetHref: string;
};

const seededCreators: CreatorCard[] = [
  {
    id: 6101,
    username: "nia-volt",
    displayName: "Nia Volt",
    discipline: "Street Skate",
    tagline: "Documenting rooftop sessions and midnight rails across the city.",
    city: "Kigali",
    followers: "12.4K",
    streak: "16 week publishing streak",
    focusAreas: ["Street Lines", "Video Edits", "Crew Mentoring"]
  },
  {
    id: 6102,
    username: "kairo-lane",
    displayName: "Kairo Lane",
    discipline: "Fashion Design",
    tagline: "Building capsule collections inspired by deck graphics and city signage.",
    city: "Kigali",
    followers: "9.1K",
    streak: "8 week launch streak",
    focusAreas: ["Capsule Drops", "Style Direction", "Brand Collabs"]
  },
  {
    id: 6103,
    username: "mara-flux",
    displayName: "Mara Flux",
    discipline: "Editorial",
    tagline: "Capturing creator interviews and local crew documentaries.",
    city: "Nairobi",
    followers: "6.8K",
    streak: "11 week editorial streak",
    focusAreas: ["Interviews", "Culture Reports", "Field Docs"]
  },
  {
    id: 6104,
    username: "juno-grid",
    displayName: "Juno Grid",
    discipline: "Event Ops",
    tagline: "Runs ticket drops and community meetup logistics.",
    city: "Kampala",
    followers: "5.3K",
    streak: "6 week events streak",
    focusAreas: ["Ticket Ops", "Venue Safety", "On-site Flow"]
  }
];

const seededFeed: FeedItem[] = [
  {
    id: "feed-001",
    type: "story",
    title: "How DIY Spots Become Safe Night Session Hubs",
    excerpt: "A breakdown of cleanup workflow, spot safety checks, and volunteer rotation.",
    creatorName: "Nia Volt",
    creatorUsername: "nia-volt",
    publishedAt: "2h ago",
    engagement: "1.2K interactions",
    targetHref: "/stories/inside-the-diy-ramp-movement"
  },
  {
    id: "feed-002",
    type: "event",
    title: "Night Wheels Qualifier Opens Last 80 Tickets",
    excerpt: "Final release tier goes live with on-site check-in prep and crew lineup times.",
    creatorName: "Juno Grid",
    creatorUsername: "juno-grid",
    publishedAt: "5h ago",
    engagement: "860 interactions",
    targetHref: "/events/night-wheels-open-qualifier"
  },
  {
    id: "feed-003",
    type: "drop",
    title: "Reflective Utility Capsule Preview",
    excerpt: "First look at fabric, fits, and release calendar for next month’s streetwear drop.",
    creatorName: "Kairo Lane",
    creatorUsername: "kairo-lane",
    publishedAt: "9h ago",
    engagement: "2.4K interactions",
    targetHref: "/store"
  },
  {
    id: "feed-004",
    type: "story",
    title: "Creator Interview: Building Sustainable Crew Sponsorships",
    excerpt: "Practical sponsorship structures that keep local teams active across full seasons.",
    creatorName: "Mara Flux",
    creatorUsername: "mara-flux",
    publishedAt: "1d ago",
    engagement: "1.0K interactions",
    targetHref: "/stories/session-economics-micro-sponsorship"
  }
];

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeProfiles(items: CreatorProfile[]): CreatorCard[] {
  if (!items.length) {
    return seededCreators;
  }

  return items.map((profile, index) => {
    const displayName = profile.display_name;
    const username = toSlug(displayName) || `creator-${profile.id}`;

    return {
      id: profile.id,
      username,
      displayName,
      discipline: profile.primary_discipline || "Creator",
      tagline: profile.tagline || "Creator profile currently updating bio.",
      city: ["Kigali", "Nairobi", "Kampala", "Dar es Salaam"][index % 4],
      followers: `${4 + index}.${(index % 9) + 1}K`,
      streak: `${6 + index} week activity streak`,
      focusAreas: [
        ["Street Clips", "Storytelling", "Crew Sessions"],
        ["Product Styling", "Drop Campaigns", "Visual Curation"],
        ["Editorial", "Interviews", "Community Reporting"],
        ["Events Ops", "Ticketing", "Field Coordination"]
      ][index % 4]
    };
  });
}

export async function getCreatorCardsMvp(): Promise<CreatorCard[]> {
  const fetched = await getProfiles().catch(() => []);
  return normalizeProfiles(fetched);
}

export async function getCreatorByUsernameMvp(username: string): Promise<CreatorCard | null> {
  const creators = await getCreatorCardsMvp();
  return creators.find((creator) => creator.username === username) ?? null;
}

export async function getCommunityFeedMvp(): Promise<FeedItem[]> {
  const creators = await getCreatorCardsMvp();
  if (!creators.length) {
    return seededFeed;
  }

  return seededFeed.map((item, index) => {
    const creator = creators[index % creators.length];
    return {
      ...item,
      creatorName: creator.displayName,
      creatorUsername: creator.username
    };
  });
}

export async function getCreatorFeedMvp(username: string): Promise<FeedItem[]> {
  const feed = await getCommunityFeedMvp();
  return feed.filter((item) => item.creatorUsername === username);
}
