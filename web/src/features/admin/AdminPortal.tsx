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
type TopbarPanel = "notifications" | "messages" | "settings" | "profile";

const NOTIFICATION_ITEMS = [
  { title: "Order #KX-8842 paid", detail: "Payment confirmed and invoice generated.", time: "2m ago", unread: true },
  { title: "Event request pending", detail: "Kigali Night Ride needs admin approval.", time: "11m ago", unread: true },
  { title: "Inventory warning", detail: "Street Helmet Black is below safety stock.", time: "27m ago", unread: false }
];

const MESSAGE_ITEMS = [
  { from: "Content Team", preview: "Need approval for homepage story banners.", time: "5m" },
  { from: "Operations", preview: "Courier endpoint returning delayed statuses.", time: "21m" },
  { from: "Support", preview: "Customer dispute escalated to admin.", time: "1h" }
];

const SETTINGS_SHORTCUTS = [
  "Portal preferences",
  "API keys",
  "Security policies",
  "Notification routing"
];

const PROFILE_ACTIONS = ["My account", "Admin preferences", "Audit log", "Help center"];

function AuthShowcasePanel({ mode }: { mode: "login" | "verify" }) {
  const heading = mode === "login" ? "Welcome to KultureX Admin" : "Security checkpoint";
  const description =
    mode === "login"
      ? "Control products, events, creators, publishing workflows, and community operations from one command center."
      : "Complete this verification step to access role permissions, audit tools, and sensitive admin actions.";
  const cardTop = mode === "login" ? "Control content" : "Verify identity";
  const cardBottom = mode === "login" ? "Scale operations" : "Protect data";
  const highlights =
    mode === "login"
      ? ["Unified web + mobile control", "Role-based governance", "Publishing + commerce workflows"]
      : ["Session integrity checks", "2FA challenge validation", "Audit-safe privileged access"];

  return (
    <aside className={styles.authPaneRight}>
      <h2>{heading}</h2>
      <p>{description}</p>

      <div className={styles.authRewardCard} aria-hidden="true">
        <span>{cardTop}</span>
        <span>{cardBottom}</span>
      </div>

      <div className={styles.authValueList}>
        {highlights.map((item) => (
          <div key={item} className={styles.authValueItem}>
            <span className={styles.authValueDot} />
            <p>{item}</p>
          </div>
        ))}
      </div>

      <button type="button" className={styles.disclosureLink}>
        View platform overview
      </button>
    </aside>
  );
}

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return "AD";
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
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
  const [showPassword, setShowPassword] = useState(false);
  const [challengeId, setChallengeId] = useState("");
  const [challengeHint, setChallengeHint] = useState("");
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);
  const [twoFactorMode, setTwoFactorMode] = useState<"passkey" | "code">("passkey");
  const [trustDevice, setTrustDevice] = useState(true);
  const [openPanel, setOpenPanel] = useState<TopbarPanel | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");

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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchElement = document.getElementById("admin-global-search") as HTMLInputElement | null;
        searchElement?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearNotice();
    setSaving(true);
    try {
      const tokens = await loginAdmin(username, password);
      localStorage.setItem(TOKEN_STORAGE_KEY, tokens.access);
      setToken(tokens.access);
      setPassword("");
      setTwoFactorMode("passkey");
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

  const displayName = useMemo(() => {
    if (!me?.username) {
      return "Admin";
    }
    return me.username;
  }, [me]);

  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const unreadNotifications = useMemo(() => NOTIFICATION_ITEMS.filter((item) => item.unread).length, []);
  const loginReady = username.trim().length > 0 && password.length > 0;
  const verifyReady = code.trim().length === 6;

  function togglePanel(panel: TopbarPanel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  if (!token) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authSplitCard}>
          <div className={styles.authPaneLeft}>
            <div className={styles.authPrimaryBlock}>
              <h1>Log in</h1>
              <form className={styles.authForm} onSubmit={handleLogin}>
                <label className={styles.field}>
                  <span>Email</span>
                  <input value={username} onChange={(event) => setUsername(event.target.value)} required />
                </label>
                <label className={styles.field}>
                  <span>Password</span>
                  <div className={styles.passwordFieldShell}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <svg viewBox="0 0 24 24" className={styles.authInlineIcon}>
                        <path
                          d="M2 12s3.5-6 10-6s10 6 10 6s-3.5 6-10 6s-10-6-10-6zm10-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </label>
                <button type="button" className={styles.authForgot}>
                  Forgot password?
                </button>
                <button
                  type="submit"
                  className={`${styles.authCta} ${loginReady ? styles.authCtaReady : ""}`}
                  disabled={!loginReady || saving}
                >
                  {saving ? "Signing in..." : "Log in"}
                </button>
              </form>
            </div>

            <div className={styles.authSecondaryBlock}>
              <button type="button" className={styles.passkeyButton}>
                Continue with passkey
              </button>
              <p>
                Log in securely using one click, your face, or your fingerprint.{" "}
                <a href="#" onClick={(event) => event.preventDefault()}>
                  Learn how to set it up
                </a>
              </p>
            </div>

            {error ? <p className={styles.noticeError}>{error}</p> : null}
          </div>
          <AuthShowcasePanel mode="login" />
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
      <main className={styles.authPasskeyPage}>
        <div className={styles.authPasskeyWrap}>
          <section className={styles.passkeyCard}>
            <h1>Use a passkey</h1>
            <p className={styles.passkeyIntro}>When you&apos;re ready to authenticate, click the button below.</p>

            <label className={styles.passkeyTrustRow}>
              <input type="checkbox" checked={trustDevice} onChange={(event) => setTrustDevice(event.target.checked)} />
              <span>Trust this device for 30 days</span>
            </label>

            {twoFactorMode === "passkey" ? (
              <>
                <button type="button" className={styles.passkeyPrimaryButton} onClick={() => setTwoFactorMode("code")}>
                  Use Passkey
                </button>

                <div className={styles.passkeyActionLinks}>
                  <button type="button" onClick={() => setTwoFactorMode("code")}>
                    Use 2FA code instead
                  </button>
                  <button type="button" onClick={() => setTwoFactorMode("code")}>
                    Use backup code instead
                  </button>
                  <button type="button" onClick={() => token && startTwoFactorFlow(token)}>
                    Reset two-factor authentication
                  </button>
                  <button type="button" onClick={handleLogout}>
                    Go back to login
                  </button>
                </div>
              </>
            ) : (
              <form className={styles.passkeyCodeForm} onSubmit={handleVerifyTwoFactor}>
                <label className={styles.field}>
                  <span>Verification code</span>
                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                  />
                </label>
                {challengeHint ? <p className={styles.noticeInfo}>{challengeHint}</p> : null}
                <button
                  type="submit"
                  className={`${styles.authCta} ${verifyReady ? styles.authCtaReady : ""}`}
                  disabled={!verifyReady || saving}
                >
                  {saving ? "Verifying..." : "Verify code"}
                </button>
                <button type="button" className={styles.passkeyBackLink} onClick={() => setTwoFactorMode("passkey")}>
                  Use passkey instead
                </button>
                <button type="button" className={styles.passkeyBackLink} onClick={handleLogout}>
                  Go back to login
                </button>
              </form>
            )}

            {error ? <p className={styles.noticeError}>{error}</p> : null}
            {success ? <p className={styles.noticeSuccess}>{success}</p> : null}
          </section>

          <div className={styles.passkeyFooter}>
            <button type="button">Passkey guide</button>
            <button type="button" onClick={handleLogout}>
              Unable to log in?
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.dashboardPage}>
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <div className={styles.topbarLogo}>KX</div>
          <div className={styles.topbarSystem}>
            <p>KultureX Systems</p>
          </div>
        </div>

        <div className={styles.topbarSearchWrap}>
          <label className={styles.searchShell}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" className={styles.iconSvg}>
                <path
                  d="M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14zm9 16l-3.8-3.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="admin-global-search"
              type="search"
              className={styles.topbarSearch}
              placeholder="Search users, products, orders, events..."
              aria-label="Global search"
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
            />
            <kbd className={styles.searchShortcut}>Ctrl+K</kbd>
          </label>
        </div>

        <div className={styles.topbarActions}>
          <button type="button" className={styles.actionGhost}>
            Quick Action
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Notifications"
            aria-expanded={openPanel === "notifications"}
            onClick={() => togglePanel("notifications")}
          >
            <svg viewBox="0 0 24 24" className={styles.iconSvg}>
              <path
                d="M9 18h6m-6 0a3 3 0 1 0 6 0m4-1H5l1.2-1.2c.5-.5.8-1.2.8-1.9V11a5 5 0 1 1 10 0v2.9c0 .7.3 1.4.8 1.9L19 17z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {unreadNotifications > 0 ? <span className={styles.iconBadge}>{unreadNotifications}</span> : null}
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Messages"
            aria-expanded={openPanel === "messages"}
            onClick={() => togglePanel("messages")}
          >
            <svg viewBox="0 0 24 24" className={styles.iconSvg}>
              <path
                d="M4 6h16v9H7l-3 3V6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.iconBadgeMuted}>{MESSAGE_ITEMS.length}</span>
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Settings"
            aria-expanded={openPanel === "settings"}
            onClick={() => togglePanel("settings")}
          >
            <svg viewBox="0 0 24 24" className={styles.iconSvg}>
              <path
                d="M12 8.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 0 1 0-7.6zm8 3.8l-2 1l.2 2.3l-2.1 1.2l-1.7-1.5l-2.1.8l-.8 2.2H9.5l-.8-2.2l-2.1-.8l-1.7 1.5L2.8 15.3L3 13l-2-1l2-1l-.2-2.3l2.1-1.2l1.7 1.5l2.1-.8l.8-2.2h2.9l.8 2.2l2.1.8l1.7-1.5L18.2 8.7L18 11l2 1z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={styles.profileMenu}
            aria-label="User profile menu"
            aria-expanded={openPanel === "profile"}
            onClick={() => togglePanel("profile")}
          >
            <span className={styles.profileAvatar}>{initials}</span>
            <span className={styles.profileName}>{displayName}</span>
            <span className={styles.profileCaret}>v</span>
          </button>
        </div>
      </header>

      {openPanel === "notifications" ? (
        <section className={styles.floatingPanel}>
          <div className={styles.floatingPanelHead}>
            <h2>Notifications</h2>
            <button type="button" className={styles.panelLink}>
              Mark all read
            </button>
          </div>
          <div className={styles.panelList}>
            {NOTIFICATION_ITEMS.map((item) => (
              <article key={item.title} className={styles.panelItem}>
                <div className={styles.panelItemTop}>
                  <strong>{item.title}</strong>
                  <span>{item.time}</span>
                </div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {openPanel === "messages" ? (
        <section className={styles.floatingPanel}>
          <div className={styles.floatingPanelHead}>
            <h2>Messages</h2>
            <button type="button" className={styles.panelLink}>
              Open inbox
            </button>
          </div>
          <div className={styles.panelList}>
            {MESSAGE_ITEMS.map((item) => (
              <article key={`${item.from}-${item.time}`} className={styles.panelItem}>
                <div className={styles.panelItemTop}>
                  <strong>{item.from}</strong>
                  <span>{item.time}</span>
                </div>
                <p>{item.preview}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {openPanel === "settings" ? (
        <section className={styles.floatingPanel}>
          <div className={styles.floatingPanelHead}>
            <h2>Settings</h2>
            <button type="button" className={styles.panelLink}>
              Open settings
            </button>
          </div>
          <div className={styles.panelList}>
            {SETTINGS_SHORTCUTS.map((setting) => (
              <button key={setting} type="button" className={styles.panelAction}>
                {setting}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {openPanel === "profile" ? (
        <section className={styles.floatingPanel}>
          <div className={styles.floatingPanelHead}>
            <h2>{displayName}</h2>
            <span className={styles.profileRole}>Administrator</span>
          </div>
          <div className={styles.panelList}>
            {PROFILE_ACTIONS.map((action) => (
              <button key={action} type="button" className={styles.panelAction}>
                {action}
              </button>
            ))}
          </div>
          <div className={styles.panelFooter}>
            <button type="button" className={styles.panelLogoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
