import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./home-event-landing.module.css";

type CategoryChip = {
  label: string;
  image: string;
  ringClass: string;
};

type EventCard = {
  title: string;
  meta: string;
  price: string;
  image: string;
};

const categoryRows: CategoryChip[][] = [
  [
    { label: "Festivals", image: "https://picsum.photos/seed/festival-one/128/128", ringClass: styles.ringPink },
    { label: "Business", image: "https://picsum.photos/seed/business-night/128/128", ringClass: styles.ringCyan },
    { label: "Food & Drink", image: "https://picsum.photos/seed/food-night/128/128", ringClass: styles.ringLime },
    { label: "Fun Things", image: "https://picsum.photos/seed/fun-neon/128/128", ringClass: styles.ringCyan },
    { label: "Gigs", image: "https://picsum.photos/seed/gigs-neon/128/128", ringClass: styles.ringRed },
    { label: "Club Nights", image: "https://picsum.photos/seed/club-purple/128/128", ringClass: styles.ringMagenta },
    { label: "Music", image: "https://picsum.photos/seed/music-stage/128/128", ringClass: styles.ringLime },
    { label: "Podcast", image: "https://picsum.photos/seed/podcast-neon/128/128", ringClass: styles.ringCyan }
  ],
  [
    { label: "Dating", image: "https://picsum.photos/seed/dating-dark/128/128", ringClass: styles.ringLime },
    { label: "Comedy", image: "https://picsum.photos/seed/comedy-night/128/128", ringClass: styles.ringRed },
    { label: "Arts & Performance", image: "https://picsum.photos/seed/performance-stage/128/128", ringClass: styles.ringCyan },
    { label: "Classes", image: "https://picsum.photos/seed/classes-creative/128/128", ringClass: styles.ringMagenta },
    { label: "Sports & Fitness", image: "https://picsum.photos/seed/sports-arena/128/128", ringClass: styles.ringLime },
    { label: "Podcast", image: "https://picsum.photos/seed/podcast-room/128/128", ringClass: styles.ringCyan },
    { label: "Festivals", image: "https://picsum.photos/seed/festival-two/128/128", ringClass: styles.ringPink },
    { label: "Business", image: "https://picsum.photos/seed/business-lounge/128/128", ringClass: styles.ringCyan }
  ]
];

const featuredEvents: EventCard[] = [
  {
    title: "Originals Island Ultimate Party Weekender Dubai",
    meta: "Thu, 09 Oct · Dubai",
    price: "From £7.95 - £13.95",
    image: "https://picsum.photos/seed/featured-a/560/560"
  },
  {
    title: "Originals Island Ultimate Party Weekender Dubai",
    meta: "Thu, 09 Oct · Dubai",
    price: "From £6.85 - £12.85",
    image: "https://picsum.photos/seed/featured-b/560/560"
  },
  {
    title: "Discovery Night by The Creek",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.20 - £13.20",
    image: "https://picsum.photos/seed/featured-c/560/560"
  },
  {
    title: "Summer Soiree on the Water",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £6.60 - £12.60",
    image: "https://picsum.photos/seed/featured-d/560/560"
  }
];

const eventEvents: EventCard[] = [
  {
    title: "Bristol Boat Party Beats",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £6.75 - £12.75",
    image: "https://picsum.photos/seed/event-a/560/560"
  },
  {
    title: "Bristol Chill Vibes Boat Party",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.30 - £13.10",
    image: "https://picsum.photos/seed/event-b/560/560"
  },
  {
    title: "Bristol Summer Sound Cruise",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £8.00 - £14.50",
    image: "https://picsum.photos/seed/event-c/560/560"
  },
  {
    title: "Bristol Summer Jam Boat Bash",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.10 - £13.40",
    image: "https://picsum.photos/seed/event-d/560/560"
  }
];

const broadcastEvents: EventCard[] = [
  {
    title: "Bristol Melody Wave Cruise",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.60 - £13.60",
    image: "https://picsum.photos/seed/broadcast-a/560/560"
  },
  {
    title: "Bristol Rhythm River Bash",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £8.10 - £14.10",
    image: "https://picsum.photos/seed/broadcast-b/560/560"
  },
  {
    title: "Desert Beats Festival",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.50 - £13.00",
    image: "https://picsum.photos/seed/broadcast-c/560/560"
  },
  {
    title: "Bristol Twilight Sound Journey",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £6.95 - £12.50",
    image: "https://picsum.photos/seed/broadcast-d/560/560"
  }
];

const musicEvents: EventCard[] = [
  {
    title: "Harmony Beats by the Bay",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £9.25 - £15.75",
    image: "https://picsum.photos/seed/music-a/560/560"
  },
  {
    title: "Celebration on the Waves of Bliss",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.40 - £13.70",
    image: "https://picsum.photos/seed/music-b/560/560"
  },
  {
    title: "Summer Sound Odyssey of Adventure",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £8.30 - £14.30",
    image: "https://picsum.photos/seed/music-c/560/560"
  },
  {
    title: "Rhythm and Tides Festival of Harmony",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £8.50 - £14.00",
    image: "https://picsum.photos/seed/music-d/560/560"
  }
];

const podcastEvents: EventCard[] = [
  {
    title: "Summer Sound Voyage of Serenity",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.75 - £13.50",
    image: "https://picsum.photos/seed/podcast-a/560/560"
  },
  {
    title: "Summer Sound Splashdown of Fun",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £6.85 - £12.85",
    image: "https://picsum.photos/seed/podcast-b/560/560"
  },
  {
    title: "Summer Music Journey of Discovery",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.20 - £13.20",
    image: "https://picsum.photos/seed/podcast-c/560/560"
  },
  {
    title: "Melodies and Tides Festival of Joy",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £6.60 - £12.60",
    image: "https://picsum.photos/seed/podcast-d/560/560"
  }
];

const foodAndDrinkEvents: EventCard[] = [
  {
    title: "Bristol Aquatic Fiesta",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £8.00 - £14.00",
    image: "https://picsum.photos/seed/food-a/560/560"
  },
  {
    title: "Bristol River Revelry",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £7.95 - £13.95",
    image: "https://picsum.photos/seed/food-b/560/560"
  },
  {
    title: "Bristol Sunset Cruise Bash",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £6.80 - £12.90",
    image: "https://picsum.photos/seed/food-c/560/560"
  },
  {
    title: "Bristol Summer Soiree on the Water",
    meta: "Sat 8 Jul · Beer Hubb Soi Buakhao",
    price: "From £8.20 - £14.20",
    image: "https://picsum.photos/seed/food-d/560/560"
  }
];

const creatorTiles = [
  "https://picsum.photos/seed/creator-a/340/340",
  "https://picsum.photos/seed/creator-b/340/340",
  "https://picsum.photos/seed/creator-c/340/340",
  "https://picsum.photos/seed/creator-d/340/340",
  "https://picsum.photos/seed/creator-e/340/340",
  "https://picsum.photos/seed/creator-f/340/340"
];

function EventRail({ title, cards }: { title: string; cards: EventCard[] }) {
  return (
    <section className={styles.railSection}>
      <header className={styles.railHeader}>
        <h2 className={styles.railTitle}>{title}</h2>
        <div className={styles.railControls}>
          <button type="button" className={styles.viewAll}>
            View all
          </button>
          <button type="button" className={styles.railArrow} aria-label="Previous">
            &#8249;
          </button>
          <button type="button" className={styles.railArrow} aria-label="Next">
            &#8250;
          </button>
        </div>
      </header>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <article key={`${title}-${card.title}`} className={styles.eventCard}>
            <img src={card.image} alt={card.title} className={styles.cardImage} loading="lazy" />
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardMeta}>{card.meta}</p>
            <p className={styles.cardPrice}>{card.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AppStoreButtons() {
  return (
    <div className={styles.storeRow}>
      <button type="button" className={styles.storeButton}>
        Download on the App Store
      </button>
      <button type="button" className={styles.storeButton}>
        Get it on Google Play
      </button>
    </div>
  );
}

function categoryChipStyle(index: number): CSSProperties {
  return { animationDelay: `${index * 40}ms` };
}

export default function HomeEventLanding() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.heroSection}>
          <header className={styles.topBar}>
            <label className={styles.searchWrap} htmlFor="event-search">
              <span className={styles.searchIcon}>⌕</span>
              <input id="event-search" className={styles.searchInput} placeholder="Search for events" />
            </label>
            <div className={styles.logoWordmark}>BLOCO</div>
            <nav className={styles.topNav}>
              <Link href="/events">All events</Link>
              <a href="#footer-home">About us</a>
              <button type="button" className={styles.signupButton}>
                Sign up
              </button>
              <button type="button" className={styles.signinButton}>
                Sign in
              </button>
            </nav>
          </header>

          <div className={styles.heroCore}>
            <div className={styles.heroOrb}>
              <img
                src="https://picsum.photos/seed/hero-culture/780/980"
                alt="Hero culture portrait"
                className={styles.heroPortrait}
              />
            </div>
            <div className={styles.heroText}>
              <h1>THE CULTURE ENGINE</h1>
              <p>Built to Power the Pulse of Modern Culture</p>
              <Link className={styles.heroButton} href="/events">
                View all events
              </Link>
            </div>
          </div>

          <div className={styles.categoryZone}>
            {categoryRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className={styles.categoryTrack}>
                {row.map((item, itemIndex) => (
                  <button
                    key={`${rowIndex}-${item.label}-${itemIndex}`}
                    type="button"
                    className={`${styles.categoryChip} ${item.ringClass}`}
                    style={categoryChipStyle(itemIndex)}
                  >
                    <img src={item.image} alt="" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>

        <EventRail title="FEATURED EVENTS" cards={featuredEvents} />

        <section className={styles.creatorSection}>
          <div className={styles.creatorFeature}>
            <h2>POPULAR CREATORS</h2>
          </div>
          <div className={styles.creatorMosaic}>
            {creatorTiles.map((tile, index) => (
              <article key={tile} className={styles.creatorTile}>
                <img src={tile} alt={`Creator ${index + 1}`} loading="lazy" />
                <span>Franklin Chase</span>
              </article>
            ))}
          </div>
        </section>

        <EventRail title="EVENT" cards={eventEvents} />
        <EventRail title="BROADCAST" cards={broadcastEvents} />

        <section className={styles.keepLiveSection}>
          <div className={styles.keepLiveFrame}>
            <div className={styles.keepColumn}>
              <img src="https://picsum.photos/seed/live-a/360/520" alt="Live card one" />
              <img src="https://picsum.photos/seed/live-b/360/520" alt="Live card two" />
            </div>
            <div className={styles.keepCenter}>
              <h2>KEEP IT LIVE.</h2>
              <p>Stay updated and skip queues with the Bloco app. Download Bloco for free.</p>
              <AppStoreButtons />
            </div>
            <div className={styles.keepColumn}>
              <img src="https://picsum.photos/seed/live-c/360/520" alt="Live card three" />
              <img src="https://picsum.photos/seed/live-d/360/520" alt="Live card four" />
            </div>
          </div>
        </section>

        <EventRail title="MUSIC" cards={musicEvents} />
        <EventRail title="PODCAST" cards={podcastEvents} />

        <section className={styles.earnSection}>
          <div className={styles.earnFrame}>
            <div className={styles.earnCards}>
              <img src="https://picsum.photos/seed/earn-a/260/320" alt="Audience one" />
              <img src="https://picsum.photos/seed/earn-b/260/320" alt="Audience two" />
              <img src="https://picsum.photos/seed/earn-c/260/320" alt="Audience three" />
              <img src="https://picsum.photos/seed/earn-d/260/320" alt="Audience four" />
              <img src="https://picsum.photos/seed/earn-e/260/320" alt="Audience five" />
            </div>
            <h2>EARN MORE FROM EVERY EVENT.</h2>
            <p>Sell tickets, grow faster, and join 40k+ organizers on Bloco.</p>
            <button type="button" className={styles.ctaButton}>
              Create event!
            </button>
          </div>
        </section>

        <EventRail title="FOOD & DRINK" cards={foodAndDrinkEvents} />

        <footer className={styles.footer} id="footer-home">
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>THE CULTURE ENGINE</div>
              <p>Stay updated and skip queues with the Bloco app.</p>
              <strong>Download Bloco for free.</strong>
              <AppStoreButtons />
            </div>
            <div className={styles.footerLinks}>
              <div>
                <h3>Menu</h3>
                <a href="#">All Events</a>
                <a href="#">About us</a>
                <a href="#">My tickets</a>
              </div>
              <div>
                <h3>Resources</h3>
                <a href="#">FAQ&apos;s</a>
                <a href="#">Support</a>
                <a href="#">Privacy Policy</a>
              </div>
              <div>
                <h3>Get Social</h3>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Twitter - X</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>All Rights Reserved ©2025</span>
            <span>Terms and conditions</span>
          </div>
          <div className={styles.footerWord}>BLOCO</div>
        </footer>
      </div>
    </main>
  );
}
