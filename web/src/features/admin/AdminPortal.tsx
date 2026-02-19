"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import styles from "./AdminPortal.module.css";
import {
  approveArticle,
  createBrand,
  createEvent,
  createProduct,
  getAnalytics,
  getMe,
  listArticles,
  listBrands,
  listEvents,
  listProducts,
  listUsers,
  loginAdmin,
  publishArticle,
  rejectArticle,
  updateUserRole,
  type AdminAnalytics,
  type AdminUser,
  type Article,
  type Brand,
  type EventItem,
  type Product,
  type UserRole
} from "./api";

const TOKEN_STORAGE_KEY = "kulturex_admin_access_token";

type TabKey = "overview" | "products" | "events" | "authors" | "articles";

const TAB_ITEMS: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "products", label: "Products" },
  { key: "events", label: "Events" },
  { key: "authors", label: "Authors" },
  { key: "articles", label: "Articles" }
];

const HELP_LINKS = [
  "How to set up your workspace?",
  "How to manage products and inventory?",
  "How to schedule and publish events?",
  "How to review and publish articles?",
  "How to assign user roles safely?"
];

const initialBrandForm = {
  name: "",
  description: "",
  logo_url: ""
};

const initialProductForm = {
  brand: "",
  name: "",
  description: "",
  price: "",
  image_url: "",
  is_active: true
};

const initialEventForm = {
  title: "",
  description: "",
  venue: "",
  city: "",
  start_at: "",
  end_at: "",
  capacity: "50",
  cover_image_url: "",
  is_published: true
};

function formatDate(iso: string | null): string {
  if (!iso) {
    return "Not published";
  }
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) {
    return iso;
  }
  return value.toLocaleString();
}

function deriveBaseUrl(pathSuffix: string): string {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
  return apiBase.replace(/\/api\/v1\/?$/, pathSuffix);
}

export default function AdminPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<AdminUser | null>(null);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [roleDrafts, setRoleDrafts] = useState<Record<number, UserRole>>({});

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [brandForm, setBrandForm] = useState(initialBrandForm);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [eventForm, setEventForm] = useState(initialEventForm);

  const docsUrl = useMemo(() => deriveBaseUrl("/api/docs/"), []);
  const backendAdminUrl = useMemo(() => deriveBaseUrl("/admin/"), []);
  const apiBaseUrl = useMemo(() => process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1", []);

  const clearAlerts = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);

  const loadPortalData = useCallback(async (accessToken: string) => {
    setLoading(true);
    setError("");

    try {
      const [mePayload, analyticsPayload, usersPayload, brandsPayload, productsPayload, eventsPayload, articlesPayload] =
        await Promise.all([
          getMe(accessToken),
          getAnalytics(accessToken),
          listUsers(accessToken),
          listBrands(accessToken),
          listProducts(accessToken),
          listEvents(accessToken),
          listArticles(accessToken)
        ]);

      if (mePayload.role !== "admin") {
        throw new Error("Admin role required for this portal.");
      }

      setMe(mePayload);
      setAnalytics(analyticsPayload);
      setUsers(usersPayload);
      setBrands(brandsPayload);
      setProducts(productsPayload);
      setEvents(eventsPayload);
      setArticles(articlesPayload);
      setRoleDrafts(
        usersPayload.reduce<Record<number, UserRole>>((acc, user) => {
          acc[user.id] = user.role;
          return acc;
        }, {})
      );
    } catch (loadError) {
      setToken(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setError(loadError instanceof Error ? loadError.message : "Failed to load admin portal.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (stored) {
      setToken(stored);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    loadPortalData(token).catch(() => null);
  }, [token, loadPortalData]);

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    clearAlerts();

    try {
      const tokens = await loginAdmin(username, password);
      localStorage.setItem(TOKEN_STORAGE_KEY, tokens.access);
      setToken(tokens.access);
      setSuccess("Admin session started.");
      setPassword("");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setMe(null);
    setAnalytics(null);
    setUsers([]);
    setBrands([]);
    setProducts([]);
    setEvents([]);
    setArticles([]);
    setError("");
    setSuccess("");
  }

  async function handleRefresh() {
    if (!token) {
      return;
    }
    clearAlerts();
    await loadPortalData(token);
    setSuccess("Portal data refreshed.");
  }

  async function handleCreateBrand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }

    setSaving(true);
    clearAlerts();

    try {
      const created = await createBrand(token, brandForm);
      setBrands((current) => [created, ...current]);
      setBrandForm(initialBrandForm);
      setProductForm((current) => ({
        ...current,
        brand: current.brand || String(created.id)
      }));
      setSuccess(`Brand "${created.name}" created.`);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create brand.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }

    setSaving(true);
    clearAlerts();

    try {
      const created = await createProduct(token, {
        brand: Number(productForm.brand),
        name: productForm.name,
        description: productForm.description,
        price: productForm.price,
        image_url: productForm.image_url,
        is_active: productForm.is_active
      });
      setProducts((current) => [created, ...current]);
      setProductForm(initialProductForm);
      setSuccess(`Product "${created.name}" created.`);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }

    setSaving(true);
    clearAlerts();

    try {
      const created = await createEvent(token, {
        title: eventForm.title,
        description: eventForm.description,
        venue: eventForm.venue,
        city: eventForm.city,
        start_at: new Date(eventForm.start_at).toISOString(),
        end_at: new Date(eventForm.end_at).toISOString(),
        capacity: Number(eventForm.capacity),
        cover_image_url: eventForm.cover_image_url,
        is_published: eventForm.is_published
      });
      setEvents((current) => [created, ...current]);
      setEventForm(initialEventForm);
      setSuccess(`Event "${created.title}" created.`);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRoleSave(userId: number) {
    if (!token) {
      return;
    }
    const nextRole = roleDrafts[userId];
    if (!nextRole) {
      return;
    }

    setSaving(true);
    clearAlerts();

    try {
      const updated = await updateUserRole(token, userId, nextRole);
      setUsers((current) => current.map((item) => (item.id === userId ? updated : item)));
      setSuccess(`Updated role for ${updated.username}.`);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update role.");
    } finally {
      setSaving(false);
    }
  }

  async function handleArticleAction(id: number, action: "approve" | "reject" | "publish") {
    if (!token) {
      return;
    }

    setSaving(true);
    clearAlerts();

    try {
      let updated: Article;
      if (action === "approve") {
        updated = await approveArticle(token, id);
      } else if (action === "reject") {
        updated = await rejectArticle(token, id, "Not aligned with current editorial quality.");
      } else {
        updated = await publishArticle(token, id);
      }
      setArticles((current) => current.map((item) => (item.id === id ? updated : item)));
      setSuccess(`Article "${updated.title}" updated to ${updated.status}.`);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Failed to update article.");
    } finally {
      setSaving(false);
    }
  }

  const articleStatusSummary = useMemo(() => {
    return articles.reduce<Record<string, number>>((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
  }, [articles]);

  const displayName = useMemo(() => {
    if (!me) {
      return "Administrator";
    }
    const fullName = `${me.first_name || ""} ${me.last_name || ""}`.trim();
    return fullName || me.username;
  }, [me]);

  if (!token) {
    return (
      <main className={styles.portal}>
        <div className={styles.loginShell}>
          <section className={styles.loginHero}>
            <span className={styles.heroPill}>KultureX Control Center</span>
            <h1 className={styles.heroTitle}>Operate web + mobile from one admin brain.</h1>
            <p className={styles.heroCopy}>
              Manage products, events, creators, and publishing workflows in one place with the same design language as
              your storefront.
            </p>
            <ul className={styles.heroList}>
              <li>Catalog and inventory operations</li>
              <li>Event publishing and bookings</li>
              <li>Author and editor role governance</li>
              <li>Editorial review and publishing</li>
            </ul>
          </section>

          <section className={styles.loginCard}>
            <h1 className={styles.title}>Admin login</h1>
            <p className={styles.muted}>Sign in with your superuser credentials.</p>

            <form className={styles.formGrid} onSubmit={handleLoginSubmit}>
              <label className={styles.formRow}>
                <span className={styles.label}>Username</span>
                <input
                  className={styles.input}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin username"
                  required
                />
              </label>
              <label className={styles.formRow}>
                <span className={styles.label}>Password</span>
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="password"
                  required
                />
              </label>
              <button className={styles.btn} type="submit" disabled={saving}>
                {saving ? "Signing in..." : "Sign in to Admin Portal"}
              </button>
            </form>

            {error ? <p className={styles.error}>{error}</p> : null}
            {success ? <p className={styles.success}>{success}</p> : null}
            <p className={styles.tiny}>API base: {apiBaseUrl}</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.portal}>
      <div className={styles.dashboardShell}>
        <aside className={styles.sidebar}>
          <div className={styles.userRow}>
            <div className={styles.avatar}>{displayName.slice(0, 1).toUpperCase()}</div>
            <div className={styles.userMeta}>
              <strong>{me?.username}</strong>
              <span>Admin Portal</span>
            </div>
          </div>

          <label className={styles.formRow}>
            <span className={styles.label}>Quick search</span>
            <input className={styles.input} placeholder="Search section..." readOnly />
          </label>

          <nav className={styles.sideNav}>
            {TAB_ITEMS.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.sideNavItem} ${activeTab === tab.key ? styles.sideNavItemActive : ""}`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className={styles.sidebarCard}>
            <p className={styles.tiny}>API base</p>
            <p className={styles.muted}>{apiBaseUrl}</p>
          </div>
        </aside>

        <section className={styles.workspace}>
          <div className={styles.container}>
            <header className={styles.header}>
              <div>
                <span className={styles.heroPill}>Get started</span>
                <h1 className={styles.title}>Let&apos;s get you set up, {displayName}</h1>
                <p className={styles.muted}>
                  Central control panel for backend data powering your web and mobile apps.
                </p>
              </div>
              <div className={styles.actions}>
                {me ? <span className={styles.badge}>Signed in: {me.username}</span> : null}
                <button className={styles.btnSecondary} onClick={handleRefresh} disabled={loading || saving}>
                  Refresh
                </button>
                <button className={styles.btnDanger} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </header>

            {error ? <p className={styles.error}>{error}</p> : null}
            {success ? <p className={styles.success}>{success}</p> : null}
            {loading ? <p className={styles.muted}>Loading admin data...</p> : null}

        {activeTab === "overview" ? (
          <section className={styles.card}>
            <div className={styles.metrics}>
              <article className={styles.metric}>
                <div className={styles.metricLabel}>Users</div>
                <div className={styles.metricValue}>{analytics?.users_total ?? 0}</div>
              </article>
              <article className={styles.metric}>
                <div className={styles.metricLabel}>Articles</div>
                <div className={styles.metricValue}>{analytics?.articles_total ?? 0}</div>
              </article>
              <article className={styles.metric}>
                <div className={styles.metricLabel}>Products</div>
                <div className={styles.metricValue}>{analytics?.products_total ?? 0}</div>
              </article>
              <article className={styles.metric}>
                <div className={styles.metricLabel}>Events</div>
                <div className={styles.metricValue}>{analytics?.events_total ?? 0}</div>
              </article>
              <article className={styles.metric}>
                <div className={styles.metricLabel}>Orders</div>
                <div className={styles.metricValue}>{analytics?.orders_total ?? 0}</div>
              </article>
              <article className={styles.metric}>
                <div className={styles.metricLabel}>Ticket Bookings</div>
                <div className={styles.metricValue}>{analytics?.ticket_bookings_total ?? 0}</div>
              </article>
            </div>

            <div className={styles.list}>
              <article className={styles.item}>
                <h4>Article Workflow Snapshot</h4>
                <p>
                  Draft: {articleStatusSummary.draft || 0} | Submitted: {articleStatusSummary.submitted || 0} |
                  Approved: {articleStatusSummary.approved || 0} | Published: {articleStatusSummary.published || 0}
                </p>
              </article>

              <article className={styles.item}>
                <h4>Backend Shortcuts</h4>
                <p>
                  <a className={styles.badge} href={docsUrl} target="_blank" rel="noreferrer">
                    API Docs
                  </a>{" "}
                  <a className={styles.badge} href={backendAdminUrl} target="_blank" rel="noreferrer">
                    Django Admin
                  </a>
                </p>
                <p className={styles.tiny}>Use this portal as the operating brain for web and mobile data.</p>
              </article>
            </div>
          </section>
        ) : null}

        {activeTab === "products" ? (
          <section className={`${styles.card} ${styles.panel}`}>
            <div className={styles.list}>
              <form className={styles.item} onSubmit={handleCreateBrand}>
                <h4>Create Brand</h4>
                <label className={styles.formRow}>
                  <span className={styles.label}>Name</span>
                  <input
                    className={styles.input}
                    value={brandForm.name}
                    onChange={(event) => setBrandForm((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Logo URL</span>
                  <input
                    className={styles.input}
                    value={brandForm.logo_url}
                    onChange={(event) => setBrandForm((current) => ({ ...current, logo_url: event.target.value }))}
                    placeholder="https://..."
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Description</span>
                  <textarea
                    className={styles.textarea}
                    value={brandForm.description}
                    onChange={(event) =>
                      setBrandForm((current) => ({ ...current, description: event.target.value }))
                    }
                  />
                </label>
                <button className={styles.btn} type="submit" disabled={saving}>
                  Add Brand
                </button>
              </form>

              <form className={styles.item} onSubmit={handleCreateProduct}>
                <h4>Create Product</h4>
                <label className={styles.formRow}>
                  <span className={styles.label}>Brand</span>
                  <select
                    className={styles.select}
                    value={productForm.brand}
                    onChange={(event) => setProductForm((current) => ({ ...current, brand: event.target.value }))}
                    required
                  >
                    <option value="">Select brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Name</span>
                  <input
                    className={styles.input}
                    value={productForm.name}
                    onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Image URL</span>
                  <input
                    className={styles.input}
                    value={productForm.image_url}
                    onChange={(event) => setProductForm((current) => ({ ...current, image_url: event.target.value }))}
                    placeholder="https://..."
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Price</span>
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.price}
                    onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Description</span>
                  <textarea
                    className={styles.textarea}
                    value={productForm.description}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, description: event.target.value }))
                    }
                  />
                </label>
                <button className={styles.btn} type="submit" disabled={saving}>
                  Add Product
                </button>
              </form>
            </div>

            <div className={styles.list}>
              {products.map((product) => (
                <article className={styles.item} key={product.id}>
                  <div className={styles.rowWrap}>
                    {product.image_url ? <img className={styles.thumb} src={product.image_url} alt={product.name} /> : null}
                    <div className={styles.rowGrow}>
                      <h4>{product.name}</h4>
                      <p>{product.description || "No description."}</p>
                      <div className={styles.itemRow}>
                        <span className={styles.badge}>${product.price}</span>
                        <span className={styles.tiny}>{product.is_active ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "events" ? (
          <section className={`${styles.card} ${styles.panel}`}>
            <form className={styles.list} onSubmit={handleCreateEvent}>
              <article className={styles.item}>
                <h4>Create Event</h4>
                <label className={styles.formRow}>
                  <span className={styles.label}>Title</span>
                  <input
                    className={styles.input}
                    value={eventForm.title}
                    onChange={(event) => setEventForm((current) => ({ ...current, title: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Venue</span>
                  <input
                    className={styles.input}
                    value={eventForm.venue}
                    onChange={(event) => setEventForm((current) => ({ ...current, venue: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>City</span>
                  <input
                    className={styles.input}
                    value={eventForm.city}
                    onChange={(event) => setEventForm((current) => ({ ...current, city: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Start</span>
                  <input
                    className={styles.input}
                    type="datetime-local"
                    value={eventForm.start_at}
                    onChange={(event) => setEventForm((current) => ({ ...current, start_at: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>End</span>
                  <input
                    className={styles.input}
                    type="datetime-local"
                    value={eventForm.end_at}
                    onChange={(event) => setEventForm((current) => ({ ...current, end_at: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Capacity</span>
                  <input
                    className={styles.input}
                    type="number"
                    min="1"
                    value={eventForm.capacity}
                    onChange={(event) => setEventForm((current) => ({ ...current, capacity: event.target.value }))}
                    required
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Cover Image URL</span>
                  <input
                    className={styles.input}
                    value={eventForm.cover_image_url}
                    onChange={(event) =>
                      setEventForm((current) => ({ ...current, cover_image_url: event.target.value }))
                    }
                    placeholder="https://..."
                  />
                </label>
                <label className={styles.formRow}>
                  <span className={styles.label}>Description</span>
                  <textarea
                    className={styles.textarea}
                    value={eventForm.description}
                    onChange={(event) => setEventForm((current) => ({ ...current, description: event.target.value }))}
                  />
                </label>
                <button className={styles.btn} type="submit" disabled={saving}>
                  Add Event
                </button>
              </article>
            </form>

            <div className={styles.list}>
              {events.map((item) => (
                <article className={styles.item} key={item.id}>
                  <h4>{item.title}</h4>
                  <p>
                    {item.venue}, {item.city}
                  </p>
                  <p className={styles.tiny}>
                    {formatDate(item.start_at)} to {formatDate(item.end_at)}
                  </p>
                  <div className={styles.itemRow}>
                    <span className={styles.badge}>Capacity {item.capacity}</span>
                    <span className={styles.tiny}>{item.is_published ? "Published" : "Draft"}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "authors" ? (
          <section className={styles.card}>
            <div className={styles.list}>
              {users.map((user) => (
                <article key={user.id} className={styles.item}>
                  <div className={styles.itemRow}>
                    <div>
                      <h4>{user.username}</h4>
                      <p>{user.email}</p>
                    </div>
                    <div className={styles.actions}>
                      <select
                        className={styles.select}
                        value={roleDrafts[user.id] || user.role}
                        onChange={(event) =>
                          setRoleDrafts((current) => ({
                            ...current,
                            [user.id]: event.target.value as UserRole
                          }))
                        }
                      >
                        <option value="registered">Registered</option>
                        <option value="author">Author</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button className={styles.btnSecondary} onClick={() => handleRoleSave(user.id)} disabled={saving}>
                        Save Role
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "articles" ? (
          <section className={styles.card}>
            <div className={styles.list}>
              {articles.map((article) => (
                <article className={styles.item} key={article.id}>
                  <div className={styles.itemRow}>
                    <div>
                      <h4>{article.title}</h4>
                      <p>{article.summary || "No summary."}</p>
                      <p className={styles.tiny}>
                        Author: {article.author_username} | Status: {article.status} | {formatDate(article.published_at)}
                      </p>
                    </div>
                    <div className={styles.actions}>
                      {article.status === "submitted" ? (
                        <>
                          <button
                            className={styles.btn}
                            onClick={() => handleArticleAction(article.id, "approve")}
                            disabled={saving}
                          >
                            Approve
                          </button>
                          <button
                            className={styles.btnDanger}
                            onClick={() => handleArticleAction(article.id, "reject")}
                            disabled={saving}
                          >
                            Reject
                          </button>
                        </>
                      ) : null}
                      {article.status === "approved" ? (
                        <button
                          className={styles.btnSecondary}
                          onClick={() => handleArticleAction(article.id, "publish")}
                          disabled={saving}
                        >
                          Publish
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

          </div>
        </section>

        <aside className={styles.rightRail}>
          <section className={styles.sidebarCard}>
            <h3>Resources</h3>
            <a className={styles.resourceLink} href={docsUrl} target="_blank" rel="noreferrer">
              Documentation
            </a>
            <a className={styles.resourceLink} href={backendAdminUrl} target="_blank" rel="noreferrer">
              Django Admin
            </a>
          </section>

          <section className={styles.sidebarCard}>
            <h3>Go further</h3>
            <button className={styles.quickAction} type="button" onClick={() => setActiveTab("products")}>
              Add products
            </button>
            <button className={styles.quickAction} type="button" onClick={() => setActiveTab("events")}>
              Create events
            </button>
            <button className={styles.quickAction} type="button" onClick={() => setActiveTab("articles")}>
              Review articles
            </button>
          </section>

          <section className={styles.sidebarCard}>
            <h3>Help articles</h3>
            <div className={styles.helpList}>
              {HELP_LINKS.map((item) => (
                <p key={item} className={styles.resourceLink}>
                  {item}
                </p>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
