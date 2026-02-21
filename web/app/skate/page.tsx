import styles from "@/features/culture/pages.module.css";
import CultureLayout from "@/features/culture/components/CultureLayout";
import { getSkateVideos, type SkateVideo } from "@/features/skate/api";

type SceneClip = {
  id: number;
  title: string;
  caption: string;
  crew: string;
  location: string;
};

const seededClips: SceneClip[] = [
  {
    id: 5101,
    title: "Warehouse Wallride Run",
    caption: "Three attempts, one clean line, and a full crowd pull-in at final landing.",
    crew: "Sidewalk Syndicate",
    location: "Industrial Loop"
  },
  {
    id: 5102,
    title: "Sunrise Gap Session",
    caption: "Early light clip with documentary voiceover from local youth skaters.",
    crew: "Apex Youth Crew",
    location: "Bridge Court"
  },
  {
    id: 5103,
    title: "Night Rail Montage",
    caption: "Fast-cut edit blending follow cam, fisheye angles, and crowd reactions.",
    crew: "Voltage Team",
    location: "Civic Plaza"
  }
];

function normalizeClips(videos: SkateVideo[]): SceneClip[] {
  if (!videos.length) {
    return seededClips;
  }

  return videos.map((video, index) => ({
    id: video.id,
    title: video.title,
    caption: video.caption || "Clip notes coming soon.",
    crew: ["Voltage Team", "Apex Youth Crew", "Lowline Collective"][index % 3],
    location: ["Riverside Steps", "Central Lot", "North Bridge"][index % 3]
  }));
}

export default async function SkatePage() {
  const fetched = await getSkateVideos().catch(() => []);
  const clips = normalizeClips(fetched);

  return (
    <CultureLayout
      activeNav="skate"
      eyebrow="Skate / Clips + Spots"
      title="Capture the motion language of every crew and street line."
      subtitle="Skate pages combine media clips, location context, and creator identity into one searchable scene archive."
    >
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Clips</h2>
            <p className={styles.sectionMeta}>Skate video cards modeled in the same visual system.</p>
          </div>
        </header>

        <div className={`${styles.grid} ${styles.gridThree}`}>
          {clips.map((clip) => (
            <article key={clip.id} className={styles.card}>
              <span className={styles.chip}>{clip.crew}</span>
              <h3 className={styles.cardTitle}>{clip.title}</h3>
              <p className={styles.cardCopy}>{clip.caption}</p>
              <div className={styles.metaRow}>
                <span>Spot</span>
                <span>{clip.location}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </CultureLayout>
  );
}
