import Link from "next/link";
import styles from "@/features/culture/pages.module.css";
import { getCommunityFeedMvp, getCreatorCardsMvp } from "@/features/community/mvp";
import CultureLayout from "@/features/culture/components/CultureLayout";

function feedChipClass(type: "story" | "event" | "drop") {
  if (type === "story") {
    return `${styles.chip} ${styles.chipSuccess}`;
  }
  if (type === "event") {
    return `${styles.chip} ${styles.chipWarn}`;
  }
  return `${styles.chip} ${styles.chipNeutral}`;
}

export default async function CommunityPage() {
  const [feed, creators] = await Promise.all([getCommunityFeedMvp(), getCreatorCardsMvp()]);

  return (
    <CultureLayout
      activeNav="community"
      eyebrow="Community / Feed"
      title="Community feed MVP for stories, events, and product drops."
      subtitle="This page aggregates scene activity into one feed and routes users to event detail, story detail, and creator profile pages."
    >
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Feed Stream</h2>
            <p className={styles.sectionMeta}>Each card links to its primary destination.</p>
          </div>
        </header>
        <div className={styles.grid}>
          {feed.map((item) => (
            <article key={item.id} className={styles.feedItem}>
              <div className={styles.metaRow}>
                <span className={feedChipClass(item.type)}>{item.type}</span>
                <span>{item.publishedAt}</span>
              </div>
              <h3 className={styles.feedTitle}>{item.title}</h3>
              <p className={styles.cardCopy}>{item.excerpt}</p>
              <div className={styles.authorRow}>
                <div className={styles.authorMeta}>
                  <p className={styles.authorName}>{item.creatorName}</p>
                  <p className={styles.authorSmall}>@{item.creatorUsername}</p>
                </div>
                <span className={styles.authorSmall}>{item.engagement}</span>
              </div>
              <div className={styles.metaRow}>
                <Link href={`/creators/${item.creatorUsername}`} className={`${styles.linkButton} ${styles.linkButtonGhost}`}>
                  Creator
                </Link>
                <Link href={item.targetHref} className={styles.linkButton}>
                  Open Item
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Top Creators</h2>
            <p className={styles.sectionMeta}>Quick access to creator profile pages.</p>
          </div>
        </header>
        <div className={`${styles.grid} ${styles.gridFour}`}>
          {creators.slice(0, 4).map((creator) => (
            <article key={creator.id} className={styles.card}>
              <span className={styles.chip}>{creator.discipline}</span>
              <h3 className={styles.cardTitle}>{creator.displayName}</h3>
              <p className={styles.cardCopy}>{creator.tagline}</p>
              <div className={styles.metaRow}>
                <span>{creator.followers}</span>
                <span>{creator.city}</span>
              </div>
              <Link href={`/creators/${creator.username}`} className={styles.linkButton}>
                View Profile
              </Link>
            </article>
          ))}
        </div>
      </section>
    </CultureLayout>
  );
}
