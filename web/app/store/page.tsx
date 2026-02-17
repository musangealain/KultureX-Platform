import { getProducts } from "@/features/store/api";

export default async function StorePage() {
  const products = await getProducts().catch(() => []);

  return (
    <div className="container">
      <h1>Store</h1>
      <div className="grid">
        {products.length ? (
          products.map((product) => (
            <article className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description || "No description"}</p>
              <span className="tag">${product.price}</span>
            </article>
          ))
        ) : (
          <article className="card">
            <h3>No products yet</h3>
            <p>Catalog management is ready from the backend store module.</p>
          </article>
        )}
      </div>
    </div>
  );
}
