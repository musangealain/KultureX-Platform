import { getProfiles } from "@/features/community/api";

export default async function CommunityPage() {
  const profiles = await getProfiles().catch(() => []);

  return (
    <div className="container">
      <h1>Community</h1>
      <div className="grid">
        {profiles.length ? (
          profiles.map((profile) => (
            <article className="card" key={profile.id}>
              <h3>{profile.display_name}</h3>
              <p>{profile.tagline || "No tagline"}</p>
              <span className="tag">{profile.primary_discipline || "Creator"}</span>
            </article>
          ))
        ) : (
          <article className="card">
            <h3>No profiles yet</h3>
            <p>Create profiles from web or mobile once auth flows are enabled.</p>
          </article>
        )}
      </div>
    </div>
  );
}
