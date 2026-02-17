import { getSkateVideos } from "@/features/skate/api";

export default async function SkatePage() {
  const videos = await getSkateVideos().catch(() => []);

  return (
    <div className="container">
      <h1>Skate</h1>
      <div className="grid">
        {videos.length ? (
          videos.map((video) => (
            <article className="card" key={video.id}>
              <h3>{video.title}</h3>
              <p>{video.caption || "No caption"}</p>
              <span className="tag">Video</span>
            </article>
          ))
        ) : (
          <article className="card">
            <h3>No skate clips yet</h3>
            <p>Upload flow can be connected after media storage integration.</p>
          </article>
        )}
      </div>
    </div>
  );
}
