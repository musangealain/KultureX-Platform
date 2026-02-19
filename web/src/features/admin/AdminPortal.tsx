"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import styles from "./AdminPortal.module.css";
import {
  getMe,
  loginAdmin,
  requestTwoFactorChallenge,
  verifyTwoFactorCode,
  type AdminUser
} from "./api";

const TOKEN_STORAGE_KEY = "kulturex_admin_access_token";

const SIDEBAR_SECTIONS = [
  {
    title: "EXECUTIVE OVERVIEW",
    items: ["Institutional Dashboard", "Strategic KPIs", "Institutional Health", "Strategic Initiatives", "Leadership"]
  },
  {
    title: "PEOPLE ANALYTICS",
    items: ["Office Performance", "Student Performance", "Faculty Performance"]
  },
  {
    title: "ACADEMIC ANALYTICS",
    items: ["Academic Workspace", "Program Performance", "Course Analytics", "Learning Outcomes"]
  },
  {
    title: "FINANCIAL ANALYTICS",
    items: ["Revenue Intelligence", "Budget Health", "Collection Operations"]
  }
];

const QUICK_STATS = [
  { label: "TOTAL STUDENTS", value: "0", delta: "+8% YOY", tone: "up" },
  { label: "TOTAL STAFF", value: "6", delta: "+5% YOY", tone: "up" },
  { label: "RETENTION RATE", value: "88%", delta: "-2% YOY", tone: "down" },
  { label: "GRADUATION RATE", value: "82%", delta: "+3% YOY", tone: "up" },
  { label: "EMPLOYMENT RATE", value: "91%", delta: "+2% YOY", tone: "up" }
];

const OFFICE_PERFORMANCE = [
  { name: "Registrar (ARG)", score: "85%", trend: "+2%", tone: "up" },
  { name: "Finance (FIN)", score: "92%", trend: "+1%", tone: "up" },
  { name: "HR (HRM)", score: "75%", trend: "+5%", tone: "neutral" },
  { name: "Academic (ACA)", score: "95%", trend: "+3%", tone: "up" },
  { name: "Admissions (ADM)", score: "70%", trend: "-8%", tone: "down" }
];

const FINANCIAL_HEALTH = [
  { metric: "Revenue YTD", value: "$4.2M", trend: "+12%" },
  { metric: "Expenses YTD", value: "$3.1M", trend: "+8%" },
  { metric: "Net Surplus", value: "$1.1M", trend: "+18%" },
  { metric: "Collection Rate", value: "92%", trend: "+3%" },
  { metric: "Budget Variance", value: "-2.5%", trend: "-" }
];

const RECENT_ACTIVITY = [
  { time: "10:30 AM", text: "Registrar Office issued 45 transcripts" },
  { time: "09:15 AM", text: "Finance Office processed payroll (6 staff)" },
  { time: "08:00 AM", text: "Admissions Office sent 23 offer letters" },
  { time: "Yesterday", text: "IT Department resolved 15 support tickets" }
];

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export default function AdminPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [challengeHint, setChallengeHint] = useState("");
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Institutional Dashboard");

  const clearNotice = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);

  const startTwoFactorFlow = useCallback(async (accessToken: string) => {
    const challenge = await requestTwoFactorChallenge(accessToken, "app");
    setChallengeId(challenge.challenge_id);
    setCode("");
    setChallengeHint(challenge.code ? `Dev code: ${challenge.code}` : "Check your authenticator app for the code.");
  }, []);

  const bootstrapSession = useCallback(
    async (accessToken: string) => {
      setLoading(true);
      clearNotice();
      try {
        const mePayload = await getMe(accessToken);
        if (!mePayload.permissions.can_access_admin_portal) {
          throw new Error("Your account does not have admin portal access.");
        }
        setMe(mePayload);
        await startTwoFactorFlow(accessToken);
        setSuccess("Credentials accepted. Complete 2FA verification.");
      } catch (bootstrapError) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
        setMe(null);
        setError(bootstrapError instanceof Error ? bootstrapError.message : "Failed to initialize admin portal.");
      } finally {
        setLoading(false);
      }
    },
    [clearNotice, startTwoFactorFlow]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    bootstrapSession(token).catch(() => null);
  }, [token, bootstrapSession]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearNotice();
    setSaving(true);
    try {
      const tokens = await loginAdmin(username, password);
      localStorage.setItem(TOKEN_STORAGE_KEY, tokens.access);
      setToken(tokens.access);
      setPassword("");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleVerifyTwoFactor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }
    clearNotice();
    setSaving(true);
    try {
      await verifyTwoFactorCode(token, challengeId, code);
      setTwoFactorVerified(true);
      setSuccess("2FA verified successfully.");
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "Invalid code.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setMe(null);
    setTwoFactorVerified(false);
    setError("");
    setSuccess("");
  }

  const greeting = useMemo(() => {
    if (!me) {
      return "OIT26-001";
    }
    return me.username || "OIT26-001";
  }, [me]);

  if (!token) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authCard}>
          <h1>KultureX Admin Portal</h1>
          <p>Sign in to open the dashboard workspace.</p>
          <form className={styles.authForm} onSubmit={handleLogin}>
            <label className={styles.field}>
              <span>Username</span>
              <input value={username} onChange={(event) => setUsername(event.target.value)} required />
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            <button type="submit" className={styles.actionPrimary} disabled={saving}>
              {saving ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {error ? <p className={styles.noticeError}>{error}</p> : null}
        </section>
      </main>
    );
  }

  if (loading && !me) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authCard}>
          <h1>Loading admin session...</h1>
        </section>
      </main>
    );
  }

  if (me && !twoFactorVerified) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authCard}>
          <h1>Two-Factor Verification</h1>
          <p>Enter your 6-digit verification code to continue.</p>
          {challengeHint ? <p className={styles.noticeInfo}>{challengeHint}</p> : null}
          <form className={styles.authForm} onSubmit={handleVerifyTwoFactor}>
            <label className={styles.field}>
              <span>Code</span>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="123456"
                pattern="\d{6}"
                maxLength={6}
                required
              />
            </label>
            <button type="submit" className={styles.actionPrimary} disabled={saving}>
              {saving ? "Verifying..." : "Verify"}
            </button>
          </form>
          <div className={styles.row}>
            <button type="button" className={styles.actionGhost} onClick={() => token && startTwoFactorFlow(token)}>
              Resend Code
            </button>
            <button type="button" className={styles.actionGhost} onClick={handleLogout}>
              Cancel
            </button>
          </div>
          {error ? <p className={styles.noticeError}>{error}</p> : null}
          {success ? <p className={styles.noticeSuccess}>{success}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className={styles.dashboardPage}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.brandBlock}>
            <div className={styles.brandIcon}>UM</div>
            <div>
              <p className={styles.brandTitle}>University Management System</p>
              <p className={styles.brandSubtitle}>Senior Management Command Center</p>
            </div>
          </div>

          <div className={styles.sidebarScroll}>
            {SIDEBAR_SECTIONS.map((section) => (
              <section key={section.title} className={styles.navSection}>
                <p className={styles.navSectionTitle}>{section.title}</p>
                <div className={styles.navList}>
                  {section.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={cx(styles.navItem, activeMenuItem === item && styles.navItemActive)}
                      onClick={() => setActiveMenuItem(item)}
                    >
                      <span className={styles.navDot}>*</span>
                      {item}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </aside>

        <section className={styles.main}>
          <header className={styles.topbar}>
  <div className={styles.topbarBrand}>
    <div className={styles.topbarLogo}>KX</div>
    <div className={styles.topbarSystem}>
      <p>KultureX Admin Portal</p>
      <span>Master Control System</span>
    </div>
  </div>

  <div className={styles.topbarSearchWrap}>
    <input
      type="search"
      className={styles.topbarSearch}
      placeholder="Search users, products, orders, events..."
      aria-label="Global search"
    />
  </div>

  <div className={styles.topbarRight}>
    <button type="button" className={styles.iconButton} aria-label="Notifications">
      N
    </button>
    <button type="button" className={styles.iconButton} aria-label="Messages">
      M
    </button>
    <button type="button" className={styles.iconButton} aria-label="Settings">
      S
    </button>
    <button type="button" className={styles.profileMenu} aria-label="Profile menu">
      <span className={styles.profileCircle}>O</span>
      <div className={styles.profileBox}>
        <p>{greeting}</p>
        <span>Senior Management</span>
      </div>
      <span className={styles.profileChevron}>v</span>
    </button>
    <button type="button" className={styles.actionPrimary} onClick={handleLogout}>
      Logout
    </button>
  </div>
</header>

          <section className={styles.workspace}>
            <div className={styles.workspaceHead}>
              <div>
                <h1>{activeMenuItem === "Institutional Dashboard" ? "Institutional Dashboard" : activeMenuItem}</h1>
                <p>Strategic overview across people, academics, operations, and finance.</p>
              </div>
              <div className={styles.row}>
                <button type="button" className={styles.actionPrimary}>
                  View KPI Monitor
                </button>
                <button type="button" className={styles.actionGhost}>
                  Export Snapshot
                </button>
              </div>
            </div>

            {error ? <p className={styles.noticeError}>{error}</p> : null}
            {success ? <p className={styles.noticeSuccess}>{success}</p> : null}

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Quick Stats</h2>
                <span className={styles.todayBadge}>TODAY</span>
              </div>
              <div className={styles.statsGrid}>
                {QUICK_STATS.map((item) => (
                  <article key={item.label} className={styles.statCard}>
                    <p className={styles.statLabel}>{item.label}</p>
                    <p className={styles.statValue}>{item.value}</p>
                    <p
                      className={cx(
                        styles.statDelta,
                        item.tone === "up" && styles.statDeltaUp,
                        item.tone === "down" && styles.statDeltaDown
                      )}
                    >
                      {item.delta}
                    </p>
                  </article>
                ))}
              </div>
            </article>

            <div className={styles.splitGrid}>
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2>Office Performance (Top 5)</h2>
                  <span className={styles.softBadge}>Operational</span>
                </div>
                <div className={styles.listRows}>
                  {OFFICE_PERFORMANCE.map((item) => (
                    <div key={item.name} className={styles.listRow}>
                      <span>{item.name}</span>
                      <strong>{item.score}</strong>
                      <span
                        className={cx(
                          styles.rowTrend,
                          item.tone === "up" && styles.statDeltaUp,
                          item.tone === "down" && styles.statDeltaDown
                        )}
                      >
                        {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
                <button className={styles.inlineLink} type="button">
                  View All Offices ->
                </button>
              </article>

              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2>Financial Health</h2>
                  <span className={styles.softBadge}>YTD</span>
                </div>
                <div className={styles.listRows}>
                  {FINANCIAL_HEALTH.map((item) => (
                    <div key={item.metric} className={styles.listRow}>
                      <span>{item.metric}</span>
                      <strong>{item.value}</strong>
                      <span className={styles.statDeltaUp}>{item.trend}</span>
                    </div>
                  ))}
                </div>
                <button className={styles.inlineLink} type="button">
                  View Full Financials ->
                </button>
              </article>
            </div>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Recent Activity</h2>
                <span className={styles.softBadge}>Live</span>
              </div>
              <div className={styles.activityRows}>
                {RECENT_ACTIVITY.map((entry) => (
                  <div key={`${entry.time}-${entry.text}`} className={styles.activityRow}>
                    <span>{entry.time}</span>
                    <p>{entry.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

