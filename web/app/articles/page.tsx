import { getArticles, type Article } from "@/features/articles/api";

type StoryCard = {
  id: number;
  title: string;
  summary: string;
  status: string;
  author: string;
  readTime: string;
};

const seededStories: StoryCard[] = [
  {
    id: 9001,
    title: "Inside The DIY Ramp Movement Rebuilding Local Skate Spots",
    summary: "How skaters, photographers, and city crews reclaimed abandoned lots into legal mini-park zones.",
    status: "published",
    author: "Ari N.",
    readTime: "6 min read"
  },
  {
    id: 9002,
    title: "Streetwear After Midnight: The Rise Of Reflective Utility Fits",
    summary: "From cargo layering to glow trim, creators are blending function and visual identity for night sessions.",
    status: "submitted",
    author: "Mila K.",
    readTime: "4 min read"
  },
  {
    id: 9003,
    title: "Session Economics: How Small Brands Sponsor Crews Without Burning Budget",
    summary: "A practical breakdown of micro-sponsorship structures and revenue-sharing models for youth teams.",
    status: "approved",
    author: "Tobi G.",
    readTime: "7 min read"
  }
];

function normalizeStories(articles: Article[]): StoryCard[] {
  if (!articles.length) {
    return seededStories;
  }

  return articles.map((item, index) => ({
    id: item.id,
    title: item.title,
    summary: item.summary || "Editorial summary pending update.",
    status: item.status,
    author: ["Nyla R.", "Jace O.", "Luna B.", "Kai T."][index % 4],
    readTime: `${4 + (index % 4)} min read`
  }));
}

const workflow = [
  { lane: "Draft", copy: "Author builds story body, tags, and supporting visuals." },
  { lane: "Submitted", copy: "Content waits for editor feedback and policy checks." },
  { lane: "Approved", copy: "Editors sign-off for schedule and spotlight placement." },
  { lane: "Published", copy: "Story appears in feed, profile, and search surfaces." }
];

export default async function ArticlesPage() {
  const fetched = await getArticles().catch(() => []);
  const stories = normalizeStories(fetched);

  return (
    <section className="stack">
      <section className="section reveal">
        <span className="eyebrow">Articles / Newsroom</span>
        <h1 className="page-title">Creator journalism for skate, style, and city energy.</h1>
        <p className="page-subtitle">
          This page blends editorial storytelling with moderation transparency so readers and contributors trust the
          publishing process.
        </p>
      </section>

      <section className="section reveal d1">
        <header className="section-head">
          <h2>Top Stories</h2>
          <p>Realistic seeded content appears when backend article data is empty.</p>
        </header>
        <div className="cards-auto">
          {stories.map((story, index) => (
            <article key={story.id} className={`story-card reveal d${(index % 3) + 1}`}>
              <span className="card-label pink">{story.status}</span>
              <h3 className="card-title">{story.title}</h3>
              <p className="card-copy">{story.summary}</p>
              <p className="card-meta">
                By {story.author} - {story.readTime}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal d2">
        <header className="section-head">
          <h2>Editorial Workflow</h2>
          <p>Clear state visibility for authors, editors, and admins.</p>
        </header>
        <ul className="timeline">
          {workflow.map((step) => (
            <li key={step.lane}>
              <strong>{step.lane}</strong>
              <span>{step.copy}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
