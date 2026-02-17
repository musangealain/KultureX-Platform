import { getProfiles } from "@/features/community/api";

export default async function CommunityPage() {
  const profiles = await getProfiles().catch(() => []);

  return (
    <section className="stack">
      <section className="section page-header reveal">
        <span className="kicker">Community Identity</span>
        <h1>Follow creators and build scene reputation</h1>
        <p>Profiles, discipline signals, and social follow graph for youth-led creator ecosystems.</p>
      </section>

      <section className="section reveal d1">
        <div className="split">
          <article className="metric">
            <strong>{profiles.length}</strong>
            <span>Creator profiles</span>
          </article>
          <article className="metric">
            <strong>Social</strong>
            <span>Follower graph and profile dashboard ready</span>
          </article>
        </div>
      </section>

      <section className="section reveal d2">
        <div className="data-grid">
          {profiles.length ? (
            profiles.map((profile, index) => (
              <article key={profile.id} className={`data-card reveal d${(index % 3) + 1}`}>
                <span className="badge badge-olive">Profile</span>
                <h3>{profile.display_name}</h3>
                <p>{profile.tagline || "No tagline yet."}</p>
                <span className="data-meta">{profile.primary_discipline || "Creator"}</span>
              </article>
            ))
          ) : (
            <article className="data-card empty-card">
              <h3>No profiles yet</h3>
              <p>Creator profiles will render here once users complete onboarding.</p>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}
