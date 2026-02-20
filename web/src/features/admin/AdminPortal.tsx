"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import AdminDashboardView from "./components/AdminDashboardView";
import AdminLoadingView from "./components/AdminLoadingView";
import AdminLoginView from "./components/AdminLoginView";
import AdminTwoFactorView from "./components/AdminTwoFactorView";
import {
  DASHBOARD_SECTIONS,
  DEFAULT_ANALYTICS,
  type DashboardSectionKey,
  type ModuleTrend,
  type QuickStat,
  type SidebarFeature,
  type TopbarPanel,
  RECENT_ACTIVITY,
  NOTIFICATION_ITEMS
} from "./config/dashboard";
import { formatCurrency, formatInteger, getInitials } from "./config/helpers";
import {
  getAnalytics,
  getMe,
  loginAdmin,
  requestTwoFactorChallenge,
  verifyTwoFactorCode,
  type AdminAnalytics,
  type AdminUser
} from "./api";

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

  const [activeSectionKey, setActiveSectionKey] = useState<DashboardSectionKey>("master_dashboard");
  const [activeSidebarFeature, setActiveSidebarFeature] = useState<SidebarFeature | null>(null);
  const [pinnedSidebarGroup, setPinnedSidebarGroup] = useState<DashboardSectionKey | null>(null);

  const [analytics, setAnalytics] = useState<AdminAnalytics>(DEFAULT_ANALYTICS);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsError, setMetricsError] = useState("");

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
        setToken(null);
        setMe(null);
        setError(bootstrapError instanceof Error ? bootstrapError.message : "Failed to initialize admin portal.");
      } finally {
        setLoading(false);
      }
    },
    [clearNotice, startTwoFactorFlow]
  );

  const loadDashboardMetrics = useCallback(async () => {
    if (!token) {
      return;
    }

    setMetricsLoading(true);
    setMetricsError("");

    try {
      const analyticsPayload = await getAnalytics(token);
      setAnalytics(analyticsPayload);
    } catch (metricsLoadError) {
      setMetricsError(
        metricsLoadError instanceof Error ? metricsLoadError.message : "Unable to refresh dashboard metrics right now."
      );
    } finally {
      setMetricsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    bootstrapSession(token).catch(() => null);
  }, [token, bootstrapSession]);

  useEffect(() => {
    if (!token || !twoFactorVerified) {
      return;
    }
    loadDashboardMetrics().catch(() => null);
  }, [token, twoFactorVerified, loadDashboardMetrics]);

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
    setToken(null);
    setMe(null);
    setTwoFactorVerified(false);
    setActiveSectionKey("master_dashboard");
    setActiveSidebarFeature(null);
    setPinnedSidebarGroup(null);
    setAnalytics(DEFAULT_ANALYTICS);
    setMetricsError("");
    setError("");
    setSuccess("");
  }

  const displayName = useMemo(() => (me?.username ? me.username : "Admin"), [me]);
  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const unreadNotifications = useMemo(() => NOTIFICATION_ITEMS.filter((item) => item.unread).length, []);
  const loginReady = username.trim().length > 0 && password.length > 0;
  const verifyReady = code.trim().length === 6;

  const activeSection = useMemo(
    () => DASHBOARD_SECTIONS.find((section) => section.key === activeSectionKey) ?? DASHBOARD_SECTIONS[0],
    [activeSectionKey]
  );

  const quickStats = useMemo<QuickStat[]>(
    () => [
      {
        label: "Total users",
        value: formatInteger(analytics.users_total),
        delta: analytics.users_total > 0 ? "+8% YoY" : "No baseline yet",
        trend: analytics.users_total > 0 ? "up" : "stable"
      },
      {
        label: "Articles live",
        value: formatInteger(analytics.articles_total),
        delta: analytics.articles_total > 0 ? "+5% this week" : "No baseline yet",
        trend: analytics.articles_total > 0 ? "up" : "stable"
      },
      {
        label: "Catalog products",
        value: formatInteger(analytics.products_total),
        delta: analytics.products_total > 0 ? "Inventory synced" : "Awaiting products",
        trend: analytics.products_total > 0 ? "up" : "stable"
      },
      {
        label: "Orders tracked",
        value: formatInteger(analytics.orders_total),
        delta: analytics.orders_total > 0 ? "+3% conversion" : "No orders yet",
        trend: analytics.orders_total > 0 ? "up" : "stable"
      },
      {
        label: "Active events",
        value: formatInteger(analytics.events_total),
        delta: analytics.events_total > 0 ? "2 upcoming highlights" : "No events yet",
        trend: analytics.events_total > 0 ? "up" : "stable"
      }
    ],
    [analytics]
  );

  const officePerformance = useMemo(
    () => [
      {
        team: "Creator Network",
        score: `${Math.max(72, Math.min(97, 72 + analytics.users_total % 21))}%`,
        change: "+3%",
        trend: "up" as ModuleTrend
      },
      {
        team: "Editorial Desk",
        score: `${Math.max(68, Math.min(96, 68 + analytics.articles_total % 24))}%`,
        change: "+2%",
        trend: "up" as ModuleTrend
      },
      {
        team: "Commerce Ops",
        score: `${Math.max(70, Math.min(98, 70 + analytics.orders_total % 22))}%`,
        change: "+4%",
        trend: "up" as ModuleTrend
      },
      {
        team: "Event Unit",
        score: `${Math.max(64, Math.min(95, 64 + analytics.events_total % 31))}%`,
        change: "-1%",
        trend: "down" as ModuleTrend
      },
      {
        team: "Trust & Safety",
        score: `${Math.max(74, Math.min(99, 74 + analytics.ticket_bookings_total % 18))}%`,
        change: "+1%",
        trend: "up" as ModuleTrend
      }
    ],
    [analytics]
  );

  const financialHealth = useMemo(
    () => [
      { label: "Revenue YTD", value: formatCurrency(analytics.orders_total * 84), change: "+12%", trend: "up" as ModuleTrend },
      { label: "Expenses YTD", value: formatCurrency(analytics.orders_total * 48), change: "+6%", trend: "up" as ModuleTrend },
      { label: "Net surplus", value: formatCurrency(analytics.orders_total * 36), change: "+18%", trend: "up" as ModuleTrend },
      { label: "Collection rate", value: analytics.orders_total > 0 ? "92%" : "0%", change: "+3%", trend: "up" as ModuleTrend },
      { label: "API uptime", value: "99.95%", change: "Stable", trend: "stable" as ModuleTrend }
    ],
    [analytics]
  );

  const sectionQueue = useMemo(() => activeSection.queue, [activeSection]);

  function handleFeatureSelect(sectionKey: DashboardSectionKey, feature: SidebarFeature) {
    setActiveSectionKey(sectionKey);
    setActiveSidebarFeature(feature);
    setPinnedSidebarGroup(sectionKey);
  }

  function toggleSidebarGroup(sectionKey: DashboardSectionKey) {
    setPinnedSidebarGroup((current) => (current === sectionKey ? null : sectionKey));
  }

  function togglePanel(panel: TopbarPanel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  if (!token) {
    return (
      <AdminLoginView
        username={username}
        password={password}
        showPassword={showPassword}
        loginReady={loginReady}
        saving={saving}
        error={error}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onTogglePassword={() => setShowPassword((value) => !value)}
        onSubmit={handleLogin}
      />
    );
  }

  if (loading && !me) {
    return <AdminLoadingView />;
  }

  if (me && !twoFactorVerified) {
    return (
      <AdminTwoFactorView
        trustDevice={trustDevice}
        twoFactorMode={twoFactorMode}
        code={code}
        challengeHint={challengeHint}
        verifyReady={verifyReady}
        saving={saving}
        error={error}
        success={success}
        onTrustDeviceChange={setTrustDevice}
        onSwitchToCode={() => setTwoFactorMode("code")}
        onSwitchToPasskey={() => setTwoFactorMode("passkey")}
        onResetTwoFactor={() => token && startTwoFactorFlow(token)}
        onGoBackToLogin={handleLogout}
        onCodeChange={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
        onSubmit={handleVerifyTwoFactor}
      />
    );
  }

  return (
    <AdminDashboardView
      displayName={displayName}
      initials={initials}
      globalSearch={globalSearch}
      openPanel={openPanel}
      unreadNotifications={unreadNotifications}
      metricsLoading={metricsLoading}
      metricsError={metricsError}
      activeSection={activeSection}
      activeSidebarFeature={activeSidebarFeature}
      pinnedSidebarGroup={pinnedSidebarGroup}
      quickStats={quickStats}
      financialHealth={financialHealth}
      officePerformance={officePerformance}
      sectionQueue={sectionQueue}
      recentActivity={RECENT_ACTIVITY}
      onGlobalSearchChange={setGlobalSearch}
      onTogglePanel={togglePanel}
      onRefreshSnapshot={() => loadDashboardMetrics().catch(() => null)}
      onToggleSidebarGroup={toggleSidebarGroup}
      onFeatureSelect={handleFeatureSelect}
      onClearSelection={() => setActiveSidebarFeature(null)}
      onLogout={handleLogout}
    />
  );
}
