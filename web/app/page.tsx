import Link from "next/link";

const cards = [
  { title: "Articles", href: "/articles", copy: "Creator stories, reports, and editorial features." },
  { title: "Skate", href: "/skate", copy: "Crews, spots, and trick videos from local scenes." },
  { title: "Store", href: "/store", copy: "Streetwear drops, accessories, and brand catalogs." },
  { title: "Events", href: "/events", copy: "Session listings, festivals, and ticketed activations." },
  { title: "Community", href: "/community", copy: "Profiles, follows, creator reputation, and identity." }
];

export default function HomePage() {
  return (
    <div className="container">
      <header className="topbar">
        <div className="logo">KultureX</div>
        <nav className="nav">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="pill">
              {card.title}
            </Link>
          ))}
        </nav>
      </header>
      <section className="hero">
        <h1>Youth Culture Platform</h1>
        <p>
          Baseline Next.js shell connected to a Django API architecture for publishing, commerce, events,
          skate content, and community identity.
        </p>
      </section>
      <section className="grid">
        {cards.map((card) => (
          <article key={card.href} className="card">
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <Link href={card.href} className="tag">
              Open
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
