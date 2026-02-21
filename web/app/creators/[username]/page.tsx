import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/features/culture/pages.module.css";
import { getCreatorByUsernameMvp, getCreatorFeedMvp } from "@/features/community/mvp";
import CultureLayout from "@/features/culture/components/CultureLayout";

type CreatorProfilePageProps = {
  params: Promise<{ username: string }>;
};

function feedChipClass(type: "story" | "event" | "drop") {
  if (type === "story") {
    return `${styles.chip} ${styles.chipSuccess}`;
  }
  if (type === "event") {
    return `${styles.chip} ${styles.chipWarn}`;
  }
  return `${styles.chip} ${styles.chipNeutral}`;
}

export default async function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const { username } = await params;
  const creator = await getCreatorByUsernameMvp(username);
  if (!creator) {
    notFound();
  }

  const creatorFeed = await getCreatorFeedMvp(username);

  return (
    <CultureLayout
      activeNav="community"
      eyebrow="Creators / Profile"
      title={creator.displayName}
      subtitle={creator.tagline}
      heroActions={
        <div className={styles.metaRow}>
          <span className={styles.chip}>{creator.discipline}</span>
          <span className={styles.chip}>{creator.city}</span>
          <span className={styles.chip}>{creator.followers}</span>
        </div>
      }
    >
      <section className={styles.detailShell}>
        <article className={styles.detailMain}>
          <h2 className={styles.sectionTitle}>Creator Summary</h2>
          <p className={styles.cardCopy}>{creator.streak}</p>
          <ul className={styles.list}>
            {creator.focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.metaRow}>
            <Link href="/community" className={`${styles.linkButton} ${styles.linkButtonGhost}`}>
              Back to community
            </Link>
            <Link href="/stories" className={styles.linkButton}>
              Explore stories
            </Link>
          </div>
        </article>

        <aside className={styles.detailAside}>
          <h3 className={styles.sectionTitle}>Profile Actions</h3>
          <ul className={styles.list}>
            <li>Follow Creator</li>
            <li>View Published Stories</li>
            <li>Check Event Participation</li>
            <li>Request Collaboration</li>
          </ul>
        </aside>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
        </header>

        {!creatorFeed.length ? (
          <p className={styles.emptyState}>No feed activity yet for this creator.</p>
        ) : (
          <div className={styles.grid}>
            {creatorFeed.map((item) => (
              <article key={item.id} className={styles.feedItem}>
                <div className={styles.metaRow}>
                  <span className={feedChipClass(item.type)}>{item.type}</span>
                  <span>{item.publishedAt}</span>
                </div>
                <h3 className={styles.feedTitle}>{item.title}</h3>
                <p className={styles.cardCopy}>{item.excerpt}</p>
                <div className={styles.metaRow}>
                  <span className={styles.authorSmall}>{item.engagement}</span>
                  <Link href={item.targetHref} className={styles.linkButton}>
                    Open
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </CultureLayout>
  );
}
