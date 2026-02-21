import Link from "next/link";
import styles from "@/features/culture/pages.module.css";
import { getStoryCardsMvp } from "@/features/articles/mvp";
import CultureLayout from "@/features/culture/components/CultureLayout";

function statusChipClass(status: "draft" | "submitted" | "approved" | "published") {
  if (status === "published") {
    return `${styles.chip} ${styles.chipSuccess}`;
  }
  if (status === "approved") {
    return `${styles.chip} ${styles.chipWarn}`;
  }
  if (status === "submitted") {
    return `${styles.chip} ${styles.chipNeutral}`;
  }
  return `${styles.chip} ${styles.chipDanger}`;
}

export default async function StoriesPage() {
  const stories = await getStoryCardsMvp();

  return (
    <CultureLayout
      activeNav="stories"
      eyebrow="Stories / Editorial"
      title="Stories list MVP for creator publishing and editorial review flow."
      subtitle="Story cards route into `/stories/[slug]` detail pages and preserve status visibility."
    >
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Top Stories</h2>
            <p className={styles.sectionMeta}>Article feed with author, status, and read-time metadata.</p>
          </div>
        </header>

        <div className={`${styles.grid} ${styles.gridThree}`}>
          {stories.map((story) => (
            <article key={story.id} className={styles.card}>
              <span className={statusChipClass(story.status)}>{story.status}</span>
              <h3 className={styles.cardTitle}>{story.title}</h3>
              <p className={styles.cardCopy}>{story.summary}</p>
              <div className={styles.metaRow}>
                <span>{story.category}</span>
                <span>{story.readTime}</span>
              </div>
              <div className={styles.metaRow}>
                <Link href={`/creators/${story.authorUsername}`} className={`${styles.linkButton} ${styles.linkButtonGhost}`}>
                  {story.author}
                </Link>
                <Link href={`/stories/${story.slug}`} className={styles.linkButton}>
                  Read Story
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </CultureLayout>
  );
}
