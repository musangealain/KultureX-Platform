import type { AdminAnalytics } from "../api";

export type TopbarPanel = "notifications" | "messages" | "settings" | "profile";

export type DashboardSectionKey =
  | "master_dashboard"
  | "user_role_management"
  | "content_media_cms"
  | "shop_commerce_engine"
  | "events_ticketing_system"
  | "community_moderation_hub"
  | "mobile_control_center"
  | "ai_recommendation_engine"
  | "analytics_bi"
  | "system_infrastructure_devops"
  | "security_compliance_center";

export type ModuleTrend = "up" | "down" | "stable";

export type DashboardModule = {
  label: string;
  value: string;
  delta: string;
  trend: ModuleTrend;
};

export type DashboardSection = {
  key: DashboardSectionKey;
  group: string;
  navLabel: string;
  title: string;
  summary: string;
  modules: DashboardModule[];
  queue: string[];
};

export type SidebarFeature = {
  id: string;
  label: string;
};

export type SidebarGroup = {
  sectionKey: DashboardSectionKey;
  title: string;
  features: SidebarFeature[];
};

export type NotificationItem = {
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

export type MessageItem = {
  from: string;
  preview: string;
  time: string;
};

export type DashboardMetricRow = {
  label: string;
  value: string;
  change: string;
  trend: ModuleTrend;
};

export type QuickStat = {
  label: string;
  value: string;
  delta: string;
  trend: ModuleTrend;
};

export type OfficePerformanceRow = {
  team: string;
  score: string;
  change: string;
  trend: ModuleTrend;
};

export const NOTIFICATION_ITEMS: NotificationItem[] = [
  { title: "Order #KX-8842 paid", detail: "Payment confirmed and invoice generated.", time: "2m ago", unread: true },
  { title: "Event request pending", detail: "Kigali Night Ride needs admin approval.", time: "11m ago", unread: true },
  { title: "Inventory warning", detail: "Street Helmet Black is below safety stock.", time: "27m ago", unread: false }
];

export const MESSAGE_ITEMS: MessageItem[] = [
  { from: "Content Team", preview: "Need approval for homepage story banners.", time: "5m" },
  { from: "Operations", preview: "Courier endpoint returning delayed statuses.", time: "21m" },
  { from: "Support", preview: "Customer dispute escalated to admin.", time: "1h" }
];

export const SETTINGS_SHORTCUTS = [
  "Portal preferences",
  "API keys",
  "Security policies",
  "Notification routing"
];

export const PROFILE_ACTIONS = ["My account", "Admin preferences", "Audit log", "Help center"];

export const DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    key: "master_dashboard",
    group: "EXECUTIVE OVERVIEW",
    navLabel: "Master Dashboard",
    title: "Master Dashboard",
    summary: "Real-time system status across web, mobile, content, commerce, and operations.",
    modules: [
      { label: "Active users", value: "1,284", delta: "+12%", trend: "up" },
      { label: "Published stories", value: "94", delta: "+7%", trend: "up" },
      { label: "Revenue today", value: "$12,420", delta: "+9%", trend: "up" },
      { label: "API uptime", value: "99.95%", delta: "Stable", trend: "stable" }
    ],
    queue: ["Review pending event approvals", "Resolve flagged comments", "Publish homepage featured story"]
  },
  {
    key: "user_role_management",
    group: "PEOPLE & SECURITY",
    navLabel: "User & Role Management",
    title: "User & Role Management",
    summary: "Role permissions, account governance, session monitoring, and trust workflows.",
    modules: [
      { label: "Pending verifications", value: "18", delta: "-2", trend: "down" },
      { label: "Role change requests", value: "6", delta: "+1", trend: "up" },
      { label: "Suspicious sessions", value: "3", delta: "-1", trend: "down" },
      { label: "Shadow-banned users", value: "11", delta: "Stable", trend: "stable" }
    ],
    queue: ["Approve creator verification batch", "Audit moderator role escalations", "Rotate high-risk sessions"]
  },
  {
    key: "content_media_cms",
    group: "CONTENT & COMMERCE",
    navLabel: "Content & Media CMS",
    title: "Content & Media CMS",
    summary: "Draft-review-publish pipeline, media governance, and editorial operations.",
    modules: [
      { label: "Drafts awaiting review", value: "23", delta: "+5", trend: "up" },
      { label: "Ready to publish", value: "9", delta: "+2", trend: "up" },
      { label: "Rejected this week", value: "4", delta: "-1", trend: "down" },
      { label: "Media processing queue", value: "12", delta: "Stable", trend: "stable" }
    ],
    queue: ["Assign editors to high-priority stories", "Approve spotlights for homepage", "Cleanup stale drafts older than 14 days"]
  },
  {
    key: "shop_commerce_engine",
    group: "CONTENT & COMMERCE",
    navLabel: "Shop & Commerce Engine",
    title: "Shop & Commerce Engine",
    summary: "Catalog operations, inventory health, campaigns, and order fulfillment controls.",
    modules: [
      { label: "Live products", value: "312", delta: "+16", trend: "up" },
      { label: "Low stock alerts", value: "14", delta: "-3", trend: "down" },
      { label: "Orders in transit", value: "86", delta: "+8", trend: "up" },
      { label: "Cart conversion", value: "4.9%", delta: "+0.3%", trend: "up" }
    ],
    queue: ["Launch weekend drop campaign", "Update scooter size matrix", "Escalate delayed fulfillment orders"]
  },
  {
    key: "events_ticketing_system",
    group: "ENGAGEMENT",
    navLabel: "Events & Ticketing System",
    title: "Events & Ticketing System",
    summary: "Event lifecycle, ticket operations, attendance forecasting, and livestream controls.",
    modules: [
      { label: "Active events", value: "12", delta: "+2", trend: "up" },
      { label: "Tickets sold today", value: "1,024", delta: "+11%", trend: "up" },
      { label: "Check-ins completed", value: "78%", delta: "+4%", trend: "up" },
      { label: "Refund requests", value: "5", delta: "-2", trend: "down" }
    ],
    queue: ["Confirm venue capacity for Night Wheels", "Publish QR verification guide", "Push reminder notification to RSVPs"]
  },
  {
    key: "community_moderation_hub",
    group: "ENGAGEMENT",
    navLabel: "Community Moderation Hub",
    title: "Community Moderation Hub",
    summary: "Moderation queue, policy controls, harmful content checks, and report resolution.",
    modules: [
      { label: "Open reports", value: "27", delta: "-6", trend: "down" },
      { label: "Auto-flagged comments", value: "39", delta: "+4", trend: "up" },
      { label: "Resolved in 24h", value: "91%", delta: "+2%", trend: "up" },
      { label: "Escalations", value: "3", delta: "Stable", trend: "stable" }
    ],
    queue: ["Review toxic language cluster", "Publish policy reminder", "Close stale reports older than 7 days"]
  },
  {
    key: "mobile_control_center",
    group: "PLATFORM OPERATIONS",
    navLabel: "Mobile App Control Center",
    title: "Mobile App Control Center",
    summary: "Remote controls for mobile features, push notifications, and rollout management.",
    modules: [
      { label: "Feature flags active", value: "22", delta: "+2", trend: "up" },
      { label: "Push campaigns queued", value: "7", delta: "+1", trend: "up" },
      { label: "A/B experiments live", value: "3", delta: "Stable", trend: "stable" },
      { label: "Crash-free sessions", value: "99.3%", delta: "+0.4%", trend: "up" }
    ],
    queue: ["Schedule creator spotlight push", "Toggle onboarding experiment v3", "Audit mobile payment fallback flow"]
  },
  {
    key: "ai_recommendation_engine",
    group: "PLATFORM OPERATIONS",
    navLabel: "AI Intelligence Engine",
    title: "AI Intelligence Engine",
    summary: "Personalization controls, ranking quality, and model operations for content and products.",
    modules: [
      { label: "Recommendation CTR", value: "13.8%", delta: "+1.2%", trend: "up" },
      { label: "Model drift alerts", value: "1", delta: "-2", trend: "down" },
      { label: "Cold-start users covered", value: "88%", delta: "+6%", trend: "up" },
      { label: "Moderation precision", value: "94.6%", delta: "Stable", trend: "stable" }
    ],
    queue: ["Retrain feed ranking model", "Review false-positive moderation cases", "Promote new creator recommendations"]
  },
  {
    key: "analytics_bi",
    group: "PLATFORM OPERATIONS",
    navLabel: "Analytics & BI",
    title: "Analytics & BI",
    summary: "Funnel conversion, retention, engagement, and executive-ready decision support.",
    modules: [
      { label: "DAU / MAU", value: "31.2%", delta: "+0.9%", trend: "up" },
      { label: "30-day retention", value: "42%", delta: "+3%", trend: "up" },
      { label: "Store conversion", value: "5.1%", delta: "+0.5%", trend: "up" },
      { label: "Event attendance", value: "87%", delta: "+2%", trend: "up" }
    ],
    queue: ["Export weekly executive snapshot", "Validate attribution anomalies", "Publish cohort analysis report"]
  },
  {
    key: "system_infrastructure_devops",
    group: "PLATFORM OPERATIONS",
    navLabel: "Infrastructure & DevOps",
    title: "Infrastructure & DevOps",
    summary: "API reliability, infrastructure health, queues, deployments, and platform performance.",
    modules: [
      { label: "API uptime", value: "99.95%", delta: "Stable", trend: "stable" },
      { label: "Background jobs queued", value: "46", delta: "-10", trend: "down" },
      { label: "Failed jobs (24h)", value: "3", delta: "-2", trend: "down" },
      { label: "Last deployment", value: "2h ago", delta: "Clean", trend: "stable" }
    ],
    queue: ["Drain delayed webhook jobs", "Scale media workers during event peak", "Approve canary deployment to production"]
  },
  {
    key: "security_compliance_center",
    group: "PEOPLE & SECURITY",
    navLabel: "Security & Compliance",
    title: "Security & Compliance",
    summary: "Access controls, policy compliance, privacy safeguards, and audit reliability.",
    modules: [
      { label: "Open security alerts", value: "2", delta: "-1", trend: "down" },
      { label: "Admin actions audited", value: "1,284", delta: "+64", trend: "up" },
      { label: "MFA enrollment", value: "97%", delta: "+1%", trend: "up" },
      { label: "Compliance checks", value: "All pass", delta: "Stable", trend: "stable" }
    ],
    queue: ["Rotate privileged API keys", "Review policy exceptions", "Finalize monthly compliance report"]
  }
];

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    sectionKey: "master_dashboard",
    title: "1. Master Dashboard",
    features: [
      { id: "active_users", label: "Active users" },
      { id: "articles_today", label: "Published stories today" },
      { id: "revenue_today", label: "Revenue today" },
      { id: "active_events", label: "Active events" },
      { id: "system_health", label: "System health" },
      { id: "live_sales_graph", label: "Sales graph" },
      { id: "user_growth_heatmap", label: "User growth heatmap" },
      { id: "engagement_leaderboard", label: "Engagement leaderboard" }
    ]
  },
  {
    sectionKey: "user_role_management",
    title: "2. User & Role Management",
    features: [
      { id: "role_permissions_matrix", label: "Role permissions matrix" },
      { id: "session_tracking", label: "Session monitor" },
      { id: "device_tracking", label: "Device monitor" },
      { id: "account_verification", label: "Account verification" },
      { id: "shadow_banning", label: "Shadow ban controls" },
      { id: "activity_timeline", label: "User activity timeline" }
    ]
  },
  {
    sectionKey: "content_media_cms",
    title: "3. Content & Media CMS",
    features: [
      { id: "draft_review_publish", label: "Editorial pipeline" },
      { id: "content_versioning", label: "Version history" },
      { id: "featured_content", label: "Featured content control" },
      { id: "multilanguage_support", label: "Multilingual content" },
      { id: "cdn_media_storage", label: "Media CDN storage" },
      { id: "auto_compression", label: "Auto compression" },
      { id: "ai_content_tagging", label: "AI media tagging" }
    ]
  },
  {
    sectionKey: "shop_commerce_engine",
    title: "4. Shop & Commerce Engine",
    features: [
      { id: "catalog_manager", label: "Product catalog manager" },
      { id: "product_model_uploads", label: "3D product model uploads" },
      { id: "inventory_forecasting", label: "Stock forecasting" },
      { id: "drop_campaigns", label: "Limited drop campaigns" },
      { id: "fulfillment_workflow", label: "Fulfillment workflow" },
      { id: "vendor_management", label: "Vendor management" }
    ]
  },
  {
    sectionKey: "events_ticketing_system",
    title: "5. Events & Ticketing System",
    features: [
      { id: "event_creation", label: "Event scheduling" },
      { id: "ticket_pricing_tiers", label: "Ticket pricing tiers" },
      { id: "qr_ticket_system", label: "QR ticket system" },
      { id: "attendance_analytics", label: "Attendance analytics" },
      { id: "event_livestream_control", label: "Event livestream control" }
    ]
  },
  {
    sectionKey: "community_moderation_hub",
    title: "6. Community Moderation Hub",
    features: [
      { id: "comment_moderation_queue", label: "Comment moderation queue" },
      { id: "ai_toxicity_detection", label: "AI toxicity scan" },
      { id: "user_reports_dashboard", label: "User reports dashboard" },
      { id: "content_takedown_tools", label: "Content takedown tools" },
      { id: "policy_management", label: "Policy management" }
    ]
  },
  {
    sectionKey: "mobile_control_center",
    title: "7. Mobile App Control Center",
    features: [
      { id: "push_manager", label: "Push notification manager" },
      { id: "inapp_banners", label: "In-app banners" },
      { id: "feature_flags", label: "Feature flags" },
      { id: "homepage_layout_editor", label: "Mobile homepage layout editor" },
      { id: "ab_testing_mobile", label: "Mobile A/B testing" }
    ]
  },
  {
    sectionKey: "ai_recommendation_engine",
    title: "8. AI Intelligence Engine",
    features: [
      { id: "article_recommendations", label: "Article recommendations" },
      { id: "product_recommendations", label: "Product recommendations" },
      { id: "trending_spots_creators", label: "Trending spots & creators" },
      { id: "ai_moderation_assistant", label: "AI moderation assistant" },
      { id: "ai_analytics_assistant", label: "AI analytics assistant" }
    ]
  },
  {
    sectionKey: "analytics_bi",
    title: "9. Analytics & BI",
    features: [
      { id: "dau_mau", label: "DAU / MAU tracker" },
      { id: "shop_conversion_rate", label: "Shop conversion rate" },
      { id: "engagement_score", label: "Content engagement score" },
      { id: "attendance_trends", label: "Event attendance trends" },
      { id: "retention_cohorts", label: "User retention cohorts" },
      { id: "export_csv_powerbi", label: "CSV / PowerBI export" },
      { id: "analytics_dashboards", label: "BI chart dashboards" }
    ]
  },
  {
    sectionKey: "system_infrastructure_devops",
    title: "10. Infrastructure & DevOps",
    features: [
      { id: "api_monitoring", label: "API status monitoring" },
      { id: "database_health", label: "Database health" },
      { id: "storage_usage", label: "Cloud storage usage" },
      { id: "background_jobs", label: "Background job queues" },
      { id: "deployment_status", label: "Deployment status" }
    ]
  },
  {
    sectionKey: "security_compliance_center",
    title: "11. Security & Compliance",
    features: [
      { id: "admin_activity_logs", label: "Admin activity logs" },
      { id: "data_privacy_controls", label: "Data privacy controls" },
      { id: "gdpr_youth_policies", label: "GDPR youth policies" },
      { id: "api_key_management", label: "API key management" },
      { id: "two_factor_authentication", label: "Two-factor security" }
    ]
  }
];

export const RECENT_ACTIVITY = [
  "09:42 AM - Editor approved 3 stories in Culture Desk.",
  "09:17 AM - Inventory sync completed for skate accessories.",
  "08:56 AM - Push campaign scheduled for mobile app users in Kigali.",
  "08:31 AM - Event operations confirmed venue safety checklist.",
  "08:02 AM - Security center cleared a suspicious login attempt."
];

export const RESOURCE_LINKS = ["Documentation", "Operational runbooks", "Incident response guide", "Data export center"];

export const DEFAULT_ANALYTICS: AdminAnalytics = {
  users_total: 0,
  articles_total: 0,
  products_total: 0,
  orders_total: 0,
  events_total: 0,
  ticket_bookings_total: 0
};
