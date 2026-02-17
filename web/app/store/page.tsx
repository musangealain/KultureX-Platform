import { getProducts } from "@/features/store/api";

export default async function StorePage() {
  const products = await getProducts().catch(() => []);

  return (
    <section className="stack">
      <section className="section page-header reveal">
        <span className="kicker">Streetwear Commerce</span>
        <h1>Drop-ready product catalog with cart flow</h1>
        <p>Browse products, attach variants, then move into cart, checkout, and payment operations.</p>
      </section>

      <section className="section reveal d1">
        <div className="split">
          <article className="metric">
            <strong>{products.length}</strong>
            <span>Products available</span>
          </article>
          <article className="metric">
            <strong>Checkout</strong>
            <span>Cart, order, and payment APIs integrated</span>
          </article>
        </div>
      </section>

      <section className="section reveal d2">
        <div className="data-grid">
          {products.length ? (
            products.map((product, index) => (
              <article key={product.id} className={`data-card reveal d${(index % 3) + 1}`}>
                <span className="badge badge-sky">Product</span>
                <h3>{product.name}</h3>
                <p>{product.description || "No product description yet."}</p>
                <span className="data-meta">Price: ${product.price}</span>
              </article>
            ))
          ) : (
            <article className="data-card empty-card">
              <h3>No products yet</h3>
              <p>Add items from the store API to activate the commerce showcase.</p>
            </article>
          )}
        </div>
      </section>
    </section>
  );
}
