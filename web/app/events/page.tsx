import Link from "next/link";
import styles from "@/features/culture/pages.module.css";
import { formatEventDate, getEventCardsMvp } from "@/features/events/mvp";
import CultureLayout from "@/features/culture/components/CultureLayout";

function statusChipClass(status: "Open" | "Limited" | "Sold Out") {
  if (status === "Open") {
    return `${styles.chip} ${styles.chipSuccess}`;
  }
  if (status === "Limited") {
    return `${styles.chip} ${styles.chipWarn}`;
  }
  return `${styles.chip} ${styles.chipDanger}`;
}

export default async function EventsPage() {
  const events = await getEventCardsMvp();

  return (
    <CultureLayout
      activeNav="events"
      eyebrow="Events / Discovery"
      title="Events list MVP for discovery, ticket intent, and scene momentum."
      subtitle="Browse upcoming events and open the detail page for schedule, status, and action cards."
    >
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Upcoming Calendar</h2>
            <p className={styles.sectionMeta}>Each event card links to `/events/[slug]`.</p>
          </div>
        </header>
        <div className={`${styles.grid} ${styles.gridThree}`}>
          {events.map((eventItem) => (
            <article key={eventItem.id} className={styles.card}>
              <span className={styles.chip}>{eventItem.type}</span>
              <h3 className={styles.cardTitle}>{eventItem.title}</h3>
              <p className={styles.cardCopy}>{eventItem.excerpt}</p>
              <div className={styles.metaRow}>
                <span>
                  {eventItem.venue}, {eventItem.city}
                </span>
                <span>{formatEventDate(eventItem.startAt)}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={statusChipClass(eventItem.ticketStatus)}>{eventItem.ticketStatus}</span>
                <Link href={`/events/${eventItem.slug}`} className={styles.linkButton}>
                  View Detail
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <p className={styles.sectionMeta}>
        Next step after MVP: connect detail page actions (`Reserve`, `Share`, `Remind`) to real event booking endpoints.
      </p>
    </CultureLayout>
  );
}
