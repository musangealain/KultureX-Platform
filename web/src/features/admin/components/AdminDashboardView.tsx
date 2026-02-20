"use client";

import styles from "../styles/admin-dashboard.module.css";
import {
  MESSAGE_ITEMS,
  NOTIFICATION_ITEMS,
  PROFILE_ACTIONS,
  RESOURCE_LINKS,
  SETTINGS_SHORTCUTS,
  SIDEBAR_GROUPS,
  type DashboardMetricRow,
  type DashboardSection,
  type DashboardSectionKey,
  type OfficePerformanceRow,
  type QuickStat,
  type SidebarFeature,
  type TopbarPanel
} from "../config/dashboard";

type AdminDashboardViewProps = {
  displayName: string;
  initials: string;
  globalSearch: string;
  openPanel: TopbarPanel | null;
  unreadNotifications: number;
  metricsLoading: boolean;
  metricsError: string;
  activeSection: DashboardSection;
  activeSidebarFeature: SidebarFeature | null;
  pinnedSidebarGroup: DashboardSectionKey | null;
  quickStats: QuickStat[];
  financialHealth: DashboardMetricRow[];
  officePerformance: OfficePerformanceRow[];
  sectionQueue: string[];
  recentActivity: string[];
  onGlobalSearchChange: (value: string) => void;
  onTogglePanel: (panel: TopbarPanel) => void;
  onRefreshSnapshot: () => void;
  onToggleSidebarGroup: (sectionKey: DashboardSectionKey) => void;
  onFeatureSelect: (sectionKey: DashboardSectionKey, feature: SidebarFeature) => void;
  onClearSelection: () => void;
  onLogout: () => void;
};

type SidebarCategory = {
  title: string;
  items: Array<(typeof SIDEBAR_GROUPS)[number]>;
};

const SIDEBAR_CATEGORY_BY_KEY: Record<DashboardSectionKey, string> = {
  master_dashboard: "Executive Overview",
  user_role_management: "People & Security",
  content_media_cms: "Content & Commerce",
  shop_commerce_engine: "Content & Commerce",
  events_ticketing_system: "Engagement",
  community_moderation_hub: "Engagement",
  mobile_control_center: "Platform Operations",
  ai_recommendation_engine: "Platform Operations",
  analytics_bi: "Platform Operations",
  system_infrastructure_devops: "Platform Operations",
  security_compliance_center: "Security & Compliance"
};

const SIDEBAR_CATEGORIES: SidebarCategory[] = (() => {
  const order = [
    "Executive Overview",
    "People & Security",
    "Content & Commerce",
    "Engagement",
    "Platform Operations",
    "Security & Compliance"
  ];
  return order
    .map((title) => ({
      title,
      items: SIDEBAR_GROUPS.filter((group) => SIDEBAR_CATEGORY_BY_KEY[group.sectionKey] === title)
    }))
    .filter((entry) => entry.items.length > 0);
})();

function cleanSidebarTitle(value: string) {
  return value.replace(/^\d+\.\s*/, "");
}

function SidebarGlyph({ sectionKey }: { sectionKey: DashboardSectionKey }) {
  switch (sectionKey) {
    case "master_dashboard":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M4 11l8-7l8 7v9H4v-9z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "user_role_management":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M7.5 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm9 0a3 3 0 1 0 0-6a3 3 0 0 0 0 6z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.5 19a4.5 4.5 0 0 1 8 0m5-1h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "content_media_cms":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M15 4v3h3M9 12h6M9 16h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "shop_commerce_engine":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M5 8h14l-1 11H6L5 8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 8a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "events_ticketing_system":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M5 8h14v8H5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 12h6M9 15h3M8 6v4M16 6v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "community_moderation_hub":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M12 4l7 3v5c0 4.5-2.8 6.8-7 8c-4.2-1.2-7-3.5-7-8V7l7-3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "mobile_control_center":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M11 17h2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "ai_recommendation_engine":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "analytics_bi":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M5 19V9m7 10V5m7 14v-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 19h18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "system_infrastructure_devops":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <rect x="4" y="5" width="16" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="14" width="16" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "security_compliance_center":
      return (
        <svg viewBox="0 0 24 24" className={styles.sidebarIconSvg}>
          <path d="M7 11V8a5 5 0 0 1 10 0v3m-9 0h8v9H8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AdminDashboardView({
  displayName,
  initials,
  globalSearch,
  openPanel,
  unreadNotifications,
  metricsLoading,
  metricsError,
  activeSection,
  activeSidebarFeature,
  pinnedSidebarGroup,
  quickStats,
  financialHealth,
  officePerformance,
  sectionQueue,
  recentActivity,
  onGlobalSearchChange,
  onTogglePanel,
  onRefreshSnapshot,
  onToggleSidebarGroup,
  onFeatureSelect,
  onClearSelection,
  onLogout
}: AdminDashboardViewProps) {
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
              onChange={(event) => onGlobalSearchChange(event.target.value)}
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
            onClick={() => onTogglePanel("notifications")}
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
            onClick={() => onTogglePanel("messages")}
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
            onClick={() => onTogglePanel("settings")}
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
            onClick={() => onTogglePanel("profile")}
          >
            <span className={styles.profileAvatar}>{initials}</span>
            <span className={styles.profileName}>{displayName}</span>
            <span className={styles.profileCaret}>v</span>
          </button>
        </div>
      </header>

      <div className={styles.dashboardLayout}>
        <aside className={styles.dashboardSidebar}>
          <div className={styles.sidebarScroll}>
            {SIDEBAR_CATEGORIES.map((category) => (
              <section key={category.title} className={styles.sidebarCategory}>
                <p className={styles.sidebarCategoryTitle}>{category.title}</p>
                <div className={styles.sidebarCategoryItems}>
                  {category.items.map((group) => {
                    const isOpen = pinnedSidebarGroup === group.sectionKey;
                    return (
                      <section key={group.title} className={styles.sidebarGroup}>
                        <button
                          type="button"
                          className={`${styles.sidebarGroupTrigger} ${isOpen ? styles.sidebarGroupTriggerOpen : ""}`}
                          onClick={() => onToggleSidebarGroup(group.sectionKey)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.sidebarGroupLead}>
                            <span className={`${styles.sidebarGroupIcon} ${isOpen ? styles.sidebarGroupIconOpen : ""}`}>
                              <SidebarGlyph sectionKey={group.sectionKey} />
                            </span>
                            <span className={styles.sidebarSectionTitle}>{cleanSidebarTitle(group.title)}</span>
                          </span>
                          <span className={styles.sidebarGroupChevron} aria-hidden="true">
                            {isOpen ? "▾" : "▸"}
                          </span>
                        </button>

                        {isOpen ? (
                          <div className={styles.sidebarGroupItems}>
                            {group.features.map((feature) => {
                              const isActive = activeSidebarFeature?.id === feature.id;
                              return (
                                <button
                                  key={feature.id}
                                  type="button"
                                  className={`${styles.sidebarFeatureLink} ${isActive ? styles.sidebarFeatureLinkActive : ""}`}
                                  onClick={() => onFeatureSelect(group.sectionKey, feature)}
                                >
                                  <span className={styles.sidebarFeatureDot} aria-hidden="true" />
                                  <span>{feature.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : null}
                      </section>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </aside>

        <section className={styles.dashboardWorkspace}>
          <header className={styles.workspaceHeader}>
            <div className={styles.workspaceTitleBlock}>
              <p className={styles.workspaceEyebrow}>{activeSection.group}</p>
              <h1>{activeSection.title}</h1>
              <p>{activeSection.summary}</p>
            </div>
            <div className={styles.workspaceActions}>
              <button type="button" className={styles.actionPrimary} onClick={onRefreshSnapshot}>
                {metricsLoading ? "Refreshing..." : "Refresh Snapshot"}
              </button>
              <button type="button" className={styles.actionGhost}>
                Export Snapshot
              </button>
            </div>
          </header>

          {metricsError ? <p className={`${styles.noticeInfo} ${styles.workspaceNotice}`}>{metricsError}</p> : null}

          {activeSidebarFeature ? (
            <section className={`${styles.surfaceCard} ${styles.featurePlaceholderCard}`}>
              <p className={styles.featurePlaceholderHash}>#</p>
              <h2 className={styles.featurePlaceholderTitle}>{activeSidebarFeature.label}</h2>
              <p className={styles.featurePlaceholderMeta}>Phase 1 placeholder view. Detailed page comes in next phase.</p>
              <button type="button" className={styles.actionGhost} onClick={onClearSelection}>
                Clear Selection
              </button>
            </section>
          ) : (
            <>
              <section className={styles.surfaceCard}>
                <div className={styles.cardHead}>
                  <h2>Quick Stats</h2>
                  <span>{metricsLoading ? "Syncing..." : "Today"}</span>
                </div>
                <div className={styles.kpiGrid}>
                  {quickStats.map((item) => {
                    const trendClass =
                      item.trend === "up" ? styles.trendUp : item.trend === "down" ? styles.trendDown : styles.trendStable;
                    return (
                      <article key={item.label} className={styles.kpiCard}>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                        <small className={trendClass}>{item.delta}</small>
                      </article>
                    );
                  })}
                </div>
              </section>

              <div className={styles.workspaceGrid}>
                <section className={styles.surfaceCard}>
                  <div className={styles.cardHead}>
                    <h2>Operational Pulse</h2>
                    <span>Live</span>
                  </div>
                  <div className={styles.metricList}>
                    {activeSection.modules.map((module) => {
                      const trendClass =
                        module.trend === "up"
                          ? styles.trendUp
                          : module.trend === "down"
                            ? styles.trendDown
                            : styles.trendStable;
                      return (
                        <article key={module.label} className={styles.metricRow}>
                          <div>
                            <strong>{module.label}</strong>
                            <p>{module.delta}</p>
                          </div>
                          <span className={trendClass}>{module.value}</span>
                        </article>
                      );
                    })}
                  </div>
                </section>

                <section className={styles.surfaceCard}>
                  <div className={styles.cardHead}>
                    <h2>Financial Health</h2>
                    <span>YTD</span>
                  </div>
                  <div className={styles.metricList}>
                    {financialHealth.map((metric) => {
                      const trendClass =
                        metric.trend === "up"
                          ? styles.trendUp
                          : metric.trend === "down"
                            ? styles.trendDown
                            : styles.trendStable;
                      return (
                        <article key={metric.label} className={styles.metricRow}>
                          <div>
                            <strong>{metric.label}</strong>
                            <p>{metric.change}</p>
                          </div>
                          <span className={trendClass}>{metric.value}</span>
                        </article>
                      );
                    })}
                  </div>
                </section>

                <section className={`${styles.surfaceCard} ${styles.surfaceCardWide}`}>
                  <div className={styles.cardHead}>
                    <h2>Office Performance</h2>
                    <span>Operational</span>
                  </div>
                  <div className={styles.metricList}>
                    {officePerformance.map((row) => {
                      const trendClass =
                        row.trend === "up" ? styles.trendUp : row.trend === "down" ? styles.trendDown : styles.trendStable;
                      return (
                        <article key={row.team} className={styles.metricRow}>
                          <div>
                            <strong>{row.team}</strong>
                            <p>{row.change}</p>
                          </div>
                          <span className={trendClass}>{row.score}</span>
                        </article>
                      );
                    })}
                  </div>
                </section>

                <section className={`${styles.surfaceCard} ${styles.surfaceCardWide}`}>
                  <div className={styles.cardHead}>
                    <h2>Recent Activity & Queue</h2>
                    <span>Live stream</span>
                  </div>
                  <div className={styles.activityGrid}>
                    <div className={styles.activityList}>
                      {recentActivity.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                    <div className={styles.queueList}>
                      {sectionQueue.map((item) => (
                        <div key={item} className={styles.queueItem}>
                          <span />
                          <p>{item}</p>
                        </div>
                      ))}
                      <button type="button" className={styles.actionGhost}>
                        Open Full Queue
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}
        </section>

        <aside className={styles.dashboardRail}>
          <section className={styles.railCard}>
            <h2>System Health</h2>
            <div className={styles.metricList}>
              <article className={styles.metricRow}>
                <div>
                  <strong>API status</strong>
                  <p>All gateways healthy</p>
                </div>
                <span className={styles.trendUp}>99.95%</span>
              </article>
              <article className={styles.metricRow}>
                <div>
                  <strong>Queue pressure</strong>
                  <p>Background jobs</p>
                </div>
                <span className={styles.trendStable}>46</span>
              </article>
              <article className={styles.metricRow}>
                <div>
                  <strong>Deploy safety</strong>
                  <p>Last production release</p>
                </div>
                <span className={styles.trendUp}>Clean</span>
              </article>
            </div>
          </section>

          <section className={styles.railCard}>
            <h2>Priority Actions</h2>
            <div className={styles.railActions}>
              <button type="button" className={styles.actionPrimary}>
                Publish Alert
              </button>
              <button type="button" className={styles.actionGhost}>
                Create Event
              </button>
              <button type="button" className={styles.actionGhost}>
                Review Reports
              </button>
            </div>
          </section>

          <section className={styles.railCard}>
            <h2>Resources</h2>
            <div className={styles.resourceList}>
              {RESOURCE_LINKS.map((item) => (
                <button key={item} type="button" className={styles.panelAction}>
                  {item}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

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
            <button type="button" className={styles.panelLogoutButton} onClick={onLogout}>
              Logout
            </button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
