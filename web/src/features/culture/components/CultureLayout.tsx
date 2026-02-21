import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../pages.module.css";

type CultureNavKey = "home" | "shop" | "events" | "stories" | "community" | "skate";

type CultureLayoutProps = {
  activeNav: CultureNavKey;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroActions?: ReactNode;
  children: ReactNode;
};

const NAV_ITEMS: Array<{ key: CultureNavKey; href: string; label: string }> = [
  { key: "home", href: "/", label: "Home" },
  { key: "shop", href: "/store", label: "Shop" },
  { key: "events", href: "/events", label: "Events" },
  { key: "stories", href: "/stories", label: "Articles" },
  { key: "community", href: "/community", label: "Community" },
  { key: "skate", href: "/skate", label: "Skate" }
];

export default function CultureLayout({
  activeNav,
  eyebrow,
  title,
  subtitle,
  heroActions,
  children
}: CultureLayoutProps) {
  return (
    <main className={styles.page}>
      <header className={styles.headerBar}>
        <div className={styles.headerInner}>
          <div className={styles.logoGroup}>
            <span className={styles.logoBadge}>KX</span>
            <span className={styles.logoText}>KultureX</span>
          </div>
          <nav className={styles.topNav} aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.topNavLink} ${item.key === activeNav ? styles.topNavLinkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {heroActions ? <div className={styles.heroActions}>{heroActions}</div> : null}
      </section>

      {children}
    </main>
  );
}
