import { getArticles } from "@/features/articles/api";

export default async function ArticlesPage() {
  const articles = await getArticles().catch(() => []);

  return (
    <div className="container">
      <h1>Articles</h1>
      <div className="grid">
        {articles.length ? (
          articles.map((article) => (
            <article className="card" key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.summary || "No summary available."}</p>
              <span className="tag">{article.status}</span>
            </article>
          ))
        ) : (
          <article className="card">
            <h3>No articles yet</h3>
            <p>Seed content or connect API auth to view drafts/review pipeline.</p>
          </article>
        )}
      </div>
    </div>
  );
}
