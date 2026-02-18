import { getSkateVideos, type SkateVideo } from "@/features/skate/api";

type SceneClip = {
  id: number;
  title: string;
  caption: string;
  crew: string;
  location: string;
};

const seededClips: SceneClip[] = [
  {
    id: 5101,
    title: "Warehouse Wallride Run",
    caption: "Three attempts, one clean line, and a full crowd pull-in at final landing.",
    crew: "Sidewalk Syndicate",
    location: "Industrial Loop"
  },
  {
    id: 5102,
    title: "Sunrise Gap Session",
    caption: "Early light clip with documentary voiceover from local youth skaters.",
    crew: "Apex Youth Crew",
    location: "Bridge Court"
  },
  {
    id: 5103,
    title: "Night Rail Montage",
    caption: "Fast-cut edit blending follow cam, fisheye angles, and crowd reactions.",
    crew: "Voltage Team",
    location: "Civic Plaza"
  }
];

function normalizeClips(videos: SkateVideo[]): SceneClip[] {
  if (!videos.length) {
    return seededClips;
  }

  return videos.map((video, index) => ({
    id: video.id,
    title: video.title,
    caption: video.caption || "Clip notes coming soon.",
    crew: ["Voltage Team", "Apex Youth Crew", "Lowline Collective"][index % 3],
    location: ["Riverside Steps", "Central Lot", "North Bridge"][index % 3]
  }));
}

const skateUXNodes = [
  "Spot cards with map pin, terrain type, and community safety notes.",
  "Clip pages with trick tags and creator attribution overlays.",
  "Crew pages linking directly to events and shop collabs.",
  "One-tap upload route for authenticated creators."
];

export default async function SkatePage() {
  const fetched = await getSkateVideos().catch(() => []);
  const clips = normalizeClips(fetched);

  return (
    <section className="stack">
      <section className="section reveal">
        <span className="eyebrow">Skate Culture / Clips + Spots</span>
        <h1 className="page-title">Capture the motion language of every crew and street line.</h1>
        <p className="page-subtitle">
          Skate pages combine media clips, location context, and creator identity into one searchable scene archive.
        </p>
      </section>

      <section className="section reveal d1">
        <header className="section-head">
          <h2>Featured Clips</h2>
          <p>Dummy content mirrors realistic skate publishing from local community crews.</p>
        </header>
        <div className="cards-auto">
          {clips.map((clip, index) => (
            <article key={clip.id} className={`glass-card reveal d${(index % 3) + 1}`}>
              <span className="card-label cyan">{clip.crew}</span>
              <h3 className="card-title">{clip.title}</h3>
              <p className="card-copy">{clip.caption}</p>
              <p className="card-meta">Spot: {clip.location}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal d2">
        <header className="section-head">
          <h2>Skate Experience Pattern</h2>
          <p>How clip, crew, and spot content should connect in production.</p>
        </header>
        <ul className="timeline">
          {skateUXNodes.map((item) => (
            <li key={item}>
              <strong>Scene Layer</strong>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
