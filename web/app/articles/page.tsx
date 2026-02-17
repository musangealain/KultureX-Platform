import { getArticles } from "@/features/articles/api";

export default async function ArticlesPage() {
  const articles = await getArticles().catch(() => []);

  return (
    <section className="stack">
      <section className="section page-header reveal">
        <span className="kicker">Articles CMS</span>
        <h1>Creator stories with editorial workflow</h1>
        <p>Draft, submit, approve, and publish content with category and tag structure.</p>
      </section>

      <section className="section reveal d1">
        <div className="split">
          <article className="metric">
            <strong>{articles.length}</strong>
            <span>Articles loaded</span>
          </article>
          <article className="metric">
            <strong>Editorial</strong>
            <span>Role-based moderation actions enabled</span>
          </article>
        </div>
      </section>

      <section className="section reveal d2">
        <div className="data-grid">
          {articles.length ? (
            articles.map((article, index) => (
              <article key={article.id} className={`data-card reveal d${(index % 3) + 1}`}>
                <span className="kicker">{article.status}</span>
                <h3>{article.title}</h3>
                <p>{article.summary || "No summary provided."}</p>
                <span className="data-meta">Workflow state: {article.status}</span>
              </article>
            ))
          ) : (
            <article className="data-card empty-card">
              <h3>No articles yet</h3>
              <p>Once authors submit content, this board will show editorial-ready cards.</p>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}
