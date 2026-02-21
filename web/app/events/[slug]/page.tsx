import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/features/culture/pages.module.css";
import { formatEventDate, getEventBySlugMvp, getEventCardsMvp } from "@/features/events/mvp";
import CultureLayout from "@/features/culture/components/CultureLayout";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function statusChipClass(status: "Open" | "Limited" | "Sold Out") {
  if (status === "Open") {
    return `${styles.chip} ${styles.chipSuccess}`;
  }
  if (status === "Limited") {
    return `${styles.chip} ${styles.chipWarn}`;
  }
  return `${styles.chip} ${styles.chipDanger}`;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const eventItem = await getEventBySlugMvp(slug);
  if (!eventItem) {
    notFound();
  }

  const relatedEvents = (await getEventCardsMvp()).filter((item) => item.slug !== eventItem.slug).slice(0, 3);

  return (
    <CultureLayout
      activeNav="events"
      eyebrow="Events / Detail"
      title={eventItem.title}
      subtitle={eventItem.excerpt}
      heroActions={
        <div className={styles.metaRow}>
          <span className={styles.chip}>{eventItem.type}</span>
          <span className={statusChipClass(eventItem.ticketStatus)}>{eventItem.ticketStatus}</span>
        </div>
      }
    >
      <section className={styles.detailShell}>
        <article className={styles.detailMain}>
          <h2 className={styles.sectionTitle}>Event Overview</h2>
          <p className={styles.cardCopy}>
            <strong>Location:</strong> {eventItem.venue}, {eventItem.city}
          </p>
          <p className={styles.cardCopy}>
            <strong>Date:</strong> {formatEventDate(eventItem.startAt)}
          </p>
          <p className={styles.cardCopy}>
            <strong>Entry:</strong> Starting from {eventItem.ticketPrice}
          </p>
          <p className={styles.cardCopy}>
            This MVP detail shell is ready for schedule blocks, ticket tiers, and attendee analytics widgets.
          </p>
          <div className={styles.metaRow}>
            <Link href="/events" className={`${styles.linkButton} ${styles.linkButtonGhost}`}>
              Back to events
            </Link>
            <Link href="/community" className={styles.linkButton}>
              Open Community Feed
            </Link>
          </div>
        </article>

        <aside className={styles.detailAside}>
          <h3 className={styles.sectionTitle}>Ticket Actions</h3>
          <ul className={styles.list}>
            <li>Reserve Ticket</li>
            <li>Share Event</li>
            <li>Set Reminder</li>
            <li>View Venue Map</li>
          </ul>
        </aside>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Related Events</h2>
        </header>
        <div className={`${styles.grid} ${styles.gridThree}`}>
          {relatedEvents.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.chip}>{item.type}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardCopy}>{item.excerpt}</p>
              <Link href={`/events/${item.slug}`} className={styles.linkButton}>
                Open
              </Link>
            </article>
          ))}
        </div>
      </section>
    </CultureLayout>
  );
}
