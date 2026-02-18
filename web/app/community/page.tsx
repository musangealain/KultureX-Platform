import { getProfiles, type CreatorProfile } from "@/features/community/api";

type CommunityCard = {
  id: number;
  name: string;
  tagline: string;
  discipline: string;
  handle: string;
  vibe: string;
};

const seededCommunity: CommunityCard[] = [
  {
    id: 6101,
    name: "Nia Volt",
    tagline: "Documenting rooftop sessions and midnight rails across the city.",
    discipline: "Street Skate",
    handle: "@niavolt",
    vibe: "Motion Director"
  },
  {
    id: 6102,
    name: "Kairo Lane",
    tagline: "Building capsule collections inspired by deck graphics and city signage.",
    discipline: "Fashion Design",
    handle: "@kairolane",
    vibe: "Brand Architect"
  },
  {
    id: 6103,
    name: "Mara Flux",
    tagline: "Capturing creator interviews and local crew documentaries.",
    discipline: "Editorial",
    handle: "@maraflux",
    vibe: "Story Producer"
  },
  {
    id: 6104,
    name: "Juno Grid",
    tagline: "Runs event ops, ticket drops, and community meetups.",
    discipline: "Event Ops",
    handle: "@junogrid",
    vibe: "Scene Organizer"
  }
];

function normalizeProfiles(profiles: CreatorProfile[]): CommunityCard[] {
  if (!profiles.length) {
    return seededCommunity;
  }

  return profiles.map((profile, index) => ({
    id: profile.id,
    name: profile.display_name,
    tagline: profile.tagline || "Creator profile currently updating bio.",
    discipline: profile.primary_discipline || "Creator",
    handle: `@creator${profile.id}`,
    vibe: ["Story Producer", "Skate Lead", "Designer", "Organizer"][index % 4]
  }));
}

const profileInteractions = [
  "Follow + creator score cards with weekly momentum indicators.",
  "Pinned reels of articles, event recaps, and product styling shots.",
  "Mutual crew visibility to support discovery between city scenes.",
  "Role-aware dashboard actions for Author, Editor, and Admin users."
];

export default async function CommunityPage() {
  const fetched = await getProfiles().catch(() => []);
  const profiles = normalizeProfiles(fetched);

  return (
    <section className="stack">
      <section className="section reveal">
        <span className="eyebrow">Community / Creator Profiles</span>
        <h1 className="page-title">A social layer built around crews, creators, and contribution.</h1>
        <p className="page-subtitle">
          Profile pages surface identity, content output, and event participation so users can follow culture leaders.
        </p>
      </section>

      <section className="section reveal d1">
        <header className="section-head">
          <h2>Featured Creators</h2>
          <p>Professional profile cards ready for follow and dashboard actions.</p>
        </header>
        <div className="cards-auto">
          {profiles.map((profile, index) => (
            <article key={profile.id} className={`profile-card reveal d${(index % 3) + 1}`}>
              <span className="card-label lime">{profile.vibe}</span>
              <h3 className="card-title">{profile.name}</h3>
              <p className="card-copy">{profile.tagline}</p>
              <p className="card-meta">
                {profile.discipline} - {profile.handle}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal d2">
        <header className="section-head">
          <h2>Profile UX Direction</h2>
          <p>Interaction model for both web and mobile creator dashboards.</p>
        </header>
        <ul className="timeline">
          {profileInteractions.map((item) => (
            <li key={item}>
              <strong>Dashboard Pattern</strong>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
