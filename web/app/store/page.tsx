import type { CSSProperties } from "react";
import { getProducts, type Product } from "@/features/store/api";

type DropProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  colorway: string;
  tag: string;
  tilt: string;
};

const seededDrop: DropProduct[] = [
  {
    id: 1001,
    name: "Neon Rail Deck 8.25",
    description: "Cold-press maple deck with ultraviolet underprint and matte griptape edge.",
    price: "89.00",
    colorway: "Iridescent Blue",
    tag: "Deck",
    tilt: "-8deg"
  },
  {
    id: 1002,
    name: "Pulse Runner Jacket",
    description: "Lightweight wind shell with reflective seam tape and hidden pass pocket.",
    price: "124.00",
    colorway: "Graphite / Cyan",
    tag: "Outerwear",
    tilt: "6deg"
  },
  {
    id: 1003,
    name: "Streetline Utility Bag",
    description: "Water-resistant sling with modular strap mounts for day-to-night sessions.",
    price: "58.00",
    colorway: "Ink Black",
    tag: "Accessory",
    tilt: "-5deg"
  },
  {
    id: 1004,
    name: "Night Session Wheels 54mm",
    description: "Fast rebound formula tuned for urban surfaces and rough lot landings.",
    price: "42.00",
    colorway: "Smoke White",
    tag: "Hardware",
    tilt: "7deg"
  }
];

function normalizeProducts(products: Product[]): DropProduct[] {
  if (!products.length) {
    return seededDrop;
  }

  return products.map((item, index) => ({
    id: item.id,
    name: item.name,
    description: item.description || "Drop description coming soon.",
    price: item.price,
    colorway: ["Glow Cyan", "Night Magenta", "Urban Sand", "Carbon"][index % 4],
    tag: ["Deck", "Apparel", "Accessory", "Hardware"][index % 4],
    tilt: ["-8deg", "5deg", "-6deg", "7deg"][index % 4]
  }));
}

const shop3dArchitecture = [
  "Hero WebGL canvas via React Three Fiber for rotating product models.",
  "Scroll-driven camera transitions between categories and hero products.",
  "Fallback CSS depth cards for lower-end devices and reduced-motion preference.",
  "SKU panel overlays powered by existing store API for inventory and add-to-cart."
];

export default async function StorePage() {
  const fetched = await getProducts().catch(() => []);
  const products = normalizeProducts(fetched);

  return (
    <section className="stack">
      <section className="section reveal">
        <span className="eyebrow">Shop / 3D Commerce</span>
        <h1 className="page-title">Streetwear drops presented in depth, not flat grids.</h1>
        <p className="page-subtitle">
          This concept uses 3D-aware product cards today and is structured for a Three.js hero scene in Phase 2.
        </p>
      </section>

      <section className="shop-stage reveal d1">
        <header className="section-head">
          <h2>Drop Room</h2>
          <p>Hover cards simulate depth while preserving fast loading and accessibility.</p>
        </header>
        <div className="shop-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className="product-3d"
              style={{ "--tilt": product.tilt } as CSSProperties}
            >
              <span className="product-badge">{product.tag}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-copy">{product.description}</p>
              <p className="card-meta">Colorway: {product.colorway}</p>
              <div className="product-price">
                <strong>${product.price}</strong>
                <span className="card-meta">Add to cart</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal d2">
        <header className="section-head">
          <h2>WebGL Upgrade Path</h2>
          <p>Production-ready direction for a futuristic premium shopping experience.</p>
        </header>
        <ul className="timeline">
          {shop3dArchitecture.map((item) => (
            <li key={item}>
              <strong>3D System Node</strong>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
