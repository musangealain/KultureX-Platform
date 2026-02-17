import Link from "next/link";

const modules = [
  {
    title: "Articles",
    href: "/articles",
    copy: "Publish youth stories with editor-driven review and approval workflows.",
    badgeClass: "badge-orange",
    badge: "Editorial"
  },
  {
    title: "Skate",
    href: "/skate",
    copy: "Document crews, clips, and spots shaping local and global skate scenes.",
    badgeClass: "badge-olive",
    badge: "Culture"
  },
  {
    title: "Store",
    href: "/store",
    copy: "Launch streetwear drops, manage cart flow, and process secure checkout.",
    badgeClass: "badge-sky",
    badge: "Commerce"
  },
  {
    title: "Events",
    href: "/events",
    copy: "List sessions and festivals, then handle bookings and attendance signals.",
    badgeClass: "badge-sand",
    badge: "Live"
  },
  {
    title: "Community",
    href: "/community",
    copy: "Build creator profiles, follows, and social identity around shared scenes.",
    badgeClass: "badge-olive",
    badge: "Network"
  }
];

export default function HomePage() {
  return (
    <section className="stack">
      <section className="section hero reveal">
        <div className="hero-copy">
          <span className="kicker">Youth Digital Platform</span>
          <h1>Stories, style, sessions, and community in one culture stack.</h1>
          <p>
            KultureX combines publishing, skate media, e-commerce, events, and creator identity for
            youth-driven ecosystems.
          </p>
        </div>
        <div className="metrics">
          <article className="metric">
            <strong>5</strong>
            <span>Core Product Domains</span>
          </article>
          <article className="metric">
            <strong>Web + Mobile</strong>
            <span>Unified API contracts</span>
          </article>
          <article className="metric">
            <strong>RBAC</strong>
            <span>Guest, Registered, Author, Editor, Admin</span>
          </article>
          <article className="metric">
            <strong>Modular</strong>
            <span>Django + Next.js + React Native architecture</span>
          </article>
        </div>
      </section>

      <section className="section reveal d1">
        <div className="page-header">
          <span className="kicker">Product Modules</span>
          <h1>Explore the platform surface</h1>
          <p>Each module is independently scalable while sharing identity, media, and analytics layers.</p>
        </div>
        <div className="cards">
          {modules.map((module, index) => (
            <article key={module.href} className={`module-card reveal d${(index % 3) + 1}`}>
              <span className={`badge ${module.badgeClass}`}>{module.badge}</span>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
              <Link className="cta-link" href={module.href}>
                Open module
              </Link>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
