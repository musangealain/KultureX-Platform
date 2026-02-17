import { getSkateVideos } from "@/features/skate/api";

export default async function SkatePage() {
  const videos = await getSkateVideos().catch(() => []);

  return (
    <section className="stack">
      <section className="section page-header reveal">
        <span className="kicker">Skate Culture</span>
        <h1>Clips, crews, and spots from active scenes</h1>
        <p>Skaters can surface local motion stories and connect footage to crew and spot metadata.</p>
      </section>

      <section className="section reveal d1">
        <div className="split">
          <article className="metric">
            <strong>{videos.length}</strong>
            <span>Videos tracked</span>
          </article>
          <article className="metric">
            <strong>Community</strong>
            <span>Creator-submitted skate archives</span>
          </article>
        </div>
      </section>

      <section className="section reveal d2">
        <div className="data-grid">
          {videos.length ? (
            videos.map((video, index) => (
              <article key={video.id} className={`data-card reveal d${(index % 3) + 1}`}>
                <span className="badge badge-olive">Video</span>
                <h3>{video.title}</h3>
                <p>{video.caption || "No caption available."}</p>
                <span className="data-meta">Skate media entry</span>
              </article>
            ))
          ) : (
            <article className="data-card empty-card">
              <h3>No skate clips yet</h3>
              <p>Add videos from API/admin to populate this scene board.</p>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}
