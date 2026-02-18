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

const shopCategories = ["Dresses", "Jackets", "Jeans", "Shoes", "Bags", "Accessories"];

const cartSummary = [
  { label: "Subtotal", value: "$483.00" },
  { label: "Shipping", value: "$17.00" },
  { label: "Total", value: "$500.00" }
];

const wishlistItems = ["Roller Rabbit Tee", "Axel Arigato Sneaker", "Herschel Utility Bag"];
const orderState = [
  { name: "Order #5538", status: "Transit" },
  { name: "Order #5524", status: "Accepted" },
  { name: "Order #5501", status: "Delivered" }
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

export default async function StorePage() {
  const fetched = await getProducts().catch(() => []);
  const products = normalizeProducts(fetched);

  return (
    <section className="stack">
      <section className="section reveal">
        <span className="eyebrow">Shop / Commerce</span>
        <h1 className="page-title">Shopping-first web flow aligned with the mobile experience.</h1>
        <p className="page-subtitle">
          Use the top shop navigation to jump between categories, cart, wishlist, orders, and account center.
        </p>
      </section>

      <section id="categories" className="section reveal d1">
        <header className="section-head">
          <h2>Categories</h2>
          <p>Same structure as mobile category chips.</p>
        </header>
        <div className="tag-row">
          {shopCategories.map((category) => (
            <span key={category} className="tag">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="shop-stage reveal d1">
        <header className="section-head">
          <h2>Drop Room</h2>
          <p>Shop cards mirror product hierarchy used in the mobile app.</p>
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

      <section id="cart" className="section reveal d2">
        <header className="section-head">
          <h2>Cart</h2>
          <p>Checkout summary and totals from the mobile-inspired pattern.</p>
        </header>
        <ul className="timeline">
          {cartSummary.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="wishlist" className="section reveal d2">
        <header className="section-head">
          <h2>Wishlist</h2>
          <p>Saved products synced with customer intent.</p>
        </header>
        <ul className="timeline">
          {wishlistItems.map((item) => (
            <li key={item}>
              <strong>{item}</strong>
              <span>Saved for later</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="orders" className="section reveal d3">
        <header className="section-head">
          <h2>Orders</h2>
          <p>Live status flow matching mobile order tracking states.</p>
        </header>
        <ul className="timeline">
          {orderState.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="mine" className="section reveal d3">
        <header className="section-head">
          <h2>Mine</h2>
          <p>Account center links: profile, addresses, payment methods, and settings.</p>
        </header>
        <div className="tag-row">
          <span className="tag">Profile</span>
          <span className="tag">Address</span>
          <span className="tag">Payment</span>
          <span className="tag">Settings</span>
          <span className="tag">Support Messages</span>
        </div>
      </section>
    </section>
  );
}
