import Link from "next/link";
import styles from "@/features/culture/pages.module.css";
import CultureLayout from "@/features/culture/components/CultureLayout";
import { getStoryCardsMvp } from "@/features/articles/mvp";
import { getEventCardsMvp } from "@/features/events/mvp";

export default async function HomePage() {
  const [stories, events] = await Promise.all([getStoryCardsMvp(), getEventCardsMvp()]);

  return (
    <CultureLayout
      activeNav="home"
      eyebrow="Youth Culture Platform"
      title="One home for skate culture, stories, events, and shopping."
      subtitle="Explore streetwear drops, upcoming sessions, and creator journalism from the same dashboard-ready ecosystem."
      heroActions={
        <>
          <Link href="/store" className={styles.linkButton}>
            Start Shopping
          </Link>
          <Link href="/events" className={styles.linkButtonGhost}>
            Discover Events
          </Link>
        </>
      }
    >
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Explore Pages</h2>
        </div>
        <div className={`${styles.grid} ${styles.gridFour}`}>
          <Link href="/store" className={styles.card}>
            <span className={styles.chip}>Shop</span>
            <h3 className={styles.cardTitle}>Streetwear & Accessories</h3>
            <p className={styles.cardCopy}>Browse products, categories, wishlist, and checkout flows.</p>
          </Link>
          <Link href="/events" className={styles.card}>
            <span className={styles.chip}>Events</span>
            <h3 className={styles.cardTitle}>Sessions & Ticketing</h3>
            <p className={styles.cardCopy}>View event calendar, ticket status, and detail pages.</p>
          </Link>
          <Link href="/stories" className={styles.card}>
            <span className={styles.chip}>Articles</span>
            <h3 className={styles.cardTitle}>Creator Stories</h3>
            <p className={styles.cardCopy}>Read editorial content and open story details.</p>
          </Link>
          <Link href="/community" className={styles.card}>
            <span className={styles.chip}>Community</span>
            <h3 className={styles.cardTitle}>Creators & Feed</h3>
            <p className={styles.cardCopy}>Follow creators and discover cross-page updates.</p>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <Link href="/events" className={styles.sectionAction}>
            View all
          </Link>
        </div>
        <div className={styles.gridThree}>
          {events.slice(0, 3).map((eventItem) => (
            <article key={eventItem.id} className={styles.card}>
              <span className={styles.chip}>{eventItem.type}</span>
              <h3 className={styles.cardTitle}>{eventItem.title}</h3>
              <p className={styles.cardCopy}>
                {eventItem.venue}, {eventItem.city}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          <Link href="/stories" className={styles.sectionAction}>
            Read all
          </Link>
        </div>
        <div className={styles.gridThree}>
          {stories.slice(0, 3).map((story) => (
            <article key={story.id} className={styles.card}>
              <span className={styles.chip}>{story.category}</span>
              <h3 className={styles.cardTitle}>{story.title}</h3>
              <p className={styles.cardCopy}>{story.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </CultureLayout>
  );
}
