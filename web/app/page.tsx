import Link from "next/link";

const cultureSignals = [
  {
    label: "Editorial Pulse",
    title: "Youth reporters publish scene stories with editor-backed credibility.",
    copy: "From city skate diaries to creator interviews, every post runs through the submit-review-publish lane.",
    tone: "pink"
  },
  {
    label: "Drop Engine",
    title: "Streetwear capsules launch with urgency windows and inventory pressure.",
    copy: "Each drop card blends product storytelling, realtime stock, and social proof from the community graph.",
    tone: "cyan"
  },
  {
    label: "Event Grid",
    title: "Sessions, park jams, and night rails become ticket-ready experiences.",
    copy: "Events move from discovery to RSVP and ticketing without forcing users out of the app ecosystem.",
    tone: "orange"
  }
];

const nowLive = [
  { name: "KX Night Rail Series", meta: "Fri 8:00 PM - Kigali Warehouse District" },
  { name: "Graffiti + Grip Tape Lab", meta: "Sat 2:00 PM - KX Creative Hub" },
  { name: "Skyline Drop #004", meta: "Limited drop opens in 18h" }
];

export default function HomePage() {
  return (
    <section className="stack">
      <section className="section hero-grid reveal">
        <div className="hero-copy">
          <span className="eyebrow">KultureX Platform</span>
          <h1 className="page-title">Own the culture signal across stories, streetwear, and sessions.</h1>
          <p className="page-subtitle">
            KultureX is a unified youth culture operating system where creators publish, skaters discover scenes, and
            brands launch products with real community energy.
          </p>
          <div className="tag-row">
            <span className="tag">Skateboarding</span>
            <span className="tag">Street Fashion</span>
            <span className="tag">Events + Tickets</span>
            <span className="tag">Creator Economy</span>
          </div>
          <div className="button-row">
            <Link href="/store" className="btn-primary">
              Explore Shop
            </Link>
            <Link href="/events" className="btn-ghost">
              Discover Events
            </Link>
          </div>
        </div>
        <div className="metric-grid">
          <article className="metric-card">
            <strong className="metric-value">5 Core Modules</strong>
            <span className="metric-label">Publishing, skate media, commerce, events, community</span>
          </article>
          <article className="metric-card">
            <strong className="metric-value">Role-Based</strong>
            <span className="metric-label">Guest, User, Author, Editor, Admin workflows</span>
          </article>
          <article className="metric-card">
            <strong className="metric-value">Web + Mobile</strong>
            <span className="metric-label">Shared Django API powering both experiences</span>
          </article>
          <article className="metric-card">
            <strong className="metric-value">Culture Data</strong>
            <span className="metric-label">Stories, clips, drops, bookings, and profile activity</span>
          </article>
        </div>
      </section>

      <section className="section reveal d1">
        <header className="section-head">
          <h2>Culture Pulse</h2>
          <p>Realistic product messaging and surface content for a premium Gen Z interface.</p>
        </header>
        <div className="cards-3">
          {cultureSignals.map((item, index) => (
            <article key={item.title} className={`glass-card reveal d${(index % 3) + 1}`}>
              <span className={`card-label ${item.tone}`}>{item.label}</span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal d2">
        <div className="spotlight-grid">
          <article className="spotlight-card">
            <span className="card-label lime">Featured Story</span>
            <h3>How Five Local Crews Turned One Empty Parking Deck Into A Weekly Session Hub</h3>
            <p>
              Long-form article with embedded clips, author commentary, and layered moderation metadata for editor
              approval states.
            </p>
            <Link href="/articles" className="btn-ghost">
              Open Articles
            </Link>
          </article>
          <article className="glass-card">
            <span className="card-label cyan">Now Live</span>
            <h3 className="card-title">Scene Timeline</h3>
            <ul className="timeline">
              {nowLive.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.meta}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </section>
  );
}
