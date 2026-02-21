import { getArticles, type Article } from "./api";

export type StoryCard = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  status: "draft" | "submitted" | "approved" | "published";
  author: string;
  authorUsername: string;
  readTime: string;
  category: string;
  body: string[];
};

const categoryPool = ["Skate Culture", "Streetwear", "Events", "Community", "Creator Economy"];
const bodyPool = [
  [
    "Local crews are turning neglected lots into shared skate spaces through coordinated cleanup sessions and micro-funding.",
    "What started as weekend patchwork projects now includes safety guides, volunteer schedules, and creator media packs."
  ],
  [
    "Reflective utility fits are moving from niche performance wear into mainstream youth identity pieces.",
    "Designers are balancing visibility, durability, and affordability for real city riding conditions."
  ],
  [
    "Event teams are using tiered passes and creator-owned promo codes to stabilize turnout and improve planning accuracy.",
    "This model helps independent organizers run sustainable sessions without sacrificing scene accessibility."
  ],
  [
    "Story-led community posts outperform raw announcements by giving context, creator voice, and actionable next steps.",
    "Editorial consistency also improves trust between moderators, contributors, and new members."
  ]
];

const seededStories: StoryCard[] = [
  {
    id: 9001,
    slug: "inside-the-diy-ramp-movement",
    title: "Inside The DIY Ramp Movement Rebuilding Local Skate Spots",
    summary: "How skaters and city crews reclaimed abandoned lots into legal mini-park zones.",
    status: "published",
    author: "Nia Volt",
    authorUsername: "nia-volt",
    readTime: "6 min read",
    category: "Skate Culture",
    body: bodyPool[0]
  },
  {
    id: 9002,
    slug: "streetwear-after-midnight",
    title: "Streetwear After Midnight: The Rise Of Reflective Utility Fits",
    summary: "From cargo layering to glow trim, creators are blending function and identity for night sessions.",
    status: "submitted",
    author: "Kairo Lane",
    authorUsername: "kairo-lane",
    readTime: "4 min read",
    category: "Streetwear",
    body: bodyPool[1]
  },
  {
    id: 9003,
    slug: "session-economics-micro-sponsorship",
    title: "Session Economics: How Small Brands Sponsor Crews Without Burning Budget",
    summary: "A practical breakdown of micro-sponsorship structures for youth teams.",
    status: "approved",
    author: "Mara Flux",
    authorUsername: "mara-flux",
    readTime: "7 min read",
    category: "Creator Economy",
    body: bodyPool[2]
  },
  {
    id: 9004,
    slug: "community-posts-that-convert",
    title: "Community Posts That Convert Into Event Attendance",
    summary: "Editorial and moderation patterns that increase trust and participation.",
    status: "published",
    author: "Juno Grid",
    authorUsername: "juno-grid",
    readTime: "5 min read",
    category: "Community",
    body: bodyPool[3]
  }
];

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toUsername(name: string, fallbackId: number): string {
  const slug = toSlug(name);
  return slug || `creator-${fallbackId}`;
}

function normalizeStories(items: Article[]): StoryCard[] {
  if (!items.length) {
    return seededStories;
  }

  return items.map((item, index) => ({
    id: item.id,
    slug: toSlug(item.title),
    title: item.title,
    summary: item.summary || "Editorial summary pending update.",
    status: (item.status as StoryCard["status"]) || "draft",
    author: ["Nyla Reed", "Jace Orin", "Luna Brooks", "Kai Turner"][index % 4],
    authorUsername: toUsername(["Nyla Reed", "Jace Orin", "Luna Brooks", "Kai Turner"][index % 4], item.id),
    readTime: `${4 + (index % 4)} min read`,
    category: categoryPool[index % categoryPool.length],
    body: bodyPool[index % bodyPool.length]
  }));
}

export async function getStoryCardsMvp(): Promise<StoryCard[]> {
  const fetched = await getArticles().catch(() => []);
  return normalizeStories(fetched);
}

export async function getStoryBySlugMvp(slug: string): Promise<StoryCard | null> {
  const stories = await getStoryCardsMvp();
  return stories.find((item) => item.slug === slug) ?? null;
}
