import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/features/culture/pages.module.css";
import { getStoryBySlugMvp, getStoryCardsMvp } from "@/features/articles/mvp";
import CultureLayout from "@/features/culture/components/CultureLayout";

type StoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

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

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlugMvp(slug);
  if (!story) {
    notFound();
  }

  const relatedStories = (await getStoryCardsMvp()).filter((item) => item.slug !== story.slug).slice(0, 3);

  return (
    <CultureLayout
      activeNav="stories"
      eyebrow="Stories / Detail"
      title={story.title}
      subtitle={story.summary}
      heroActions={
        <div className={styles.metaRow}>
          <span className={statusChipClass(story.status)}>{story.status}</span>
          <span className={styles.chip}>{story.readTime}</span>
        </div>
      }
    >
      <section className={styles.detailShell}>
        <article className={styles.detailMain}>
          <h2 className={styles.sectionTitle}>Article Body</h2>
          {story.body.map((paragraph) => (
            <p key={paragraph} className={styles.cardCopy}>
              {paragraph}
            </p>
          ))}
          <div className={styles.metaRow}>
            <Link href="/stories" className={`${styles.linkButton} ${styles.linkButtonGhost}`}>
              Back to stories
            </Link>
            <Link href={`/creators/${story.authorUsername}`} className={styles.linkButton}>
              View Creator
            </Link>
          </div>
        </article>

        <aside className={styles.detailAside}>
          <h3 className={styles.sectionTitle}>Story Metadata</h3>
          <div className={styles.authorRow}>
            <div className={styles.authorMeta}>
              <p className={styles.authorName}>{story.author}</p>
              <p className={styles.authorSmall}>@{story.authorUsername}</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Category: {story.category}</li>
            <li>Status: {story.status}</li>
            <li>Read time: {story.readTime}</li>
            <li>Workflow: Editorial review enabled</li>
          </ul>
        </aside>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Related Stories</h2>
        </header>
        <div className={`${styles.grid} ${styles.gridThree}`}>
          {relatedStories.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.chip}>{item.category}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardCopy}>{item.summary}</p>
              <Link href={`/stories/${item.slug}`} className={styles.linkButton}>
                Open
              </Link>
            </article>
          ))}
        </div>
      </section>
    </CultureLayout>
  );
}
