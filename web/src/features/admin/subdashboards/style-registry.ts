import type { DashboardSectionKey } from "../config/dashboard";

import layout0 from "./ai-intelligence/admin-ai-assistant/layout.module.css";
import layout1 from "./ai-intelligence/ai-moderator/layout.module.css";
import layout2 from "./ai-intelligence/recommendations/layout.module.css";
import layout3 from "./ai-intelligence/trending-engine/layout.module.css";
import layout4 from "./analytics-bi/cohort-analysis/layout.module.css";
import layout5 from "./analytics-bi/commerce-analytics/layout.module.css";
import layout6 from "./analytics-bi/data-export/layout.module.css";
import layout7 from "./analytics-bi/engagement-reports/layout.module.css";
import layout8 from "./analytics-bi/user-metrics/layout.module.css";
import layout9 from "./commerce-hub/campaign-drops/layout.module.css";
import layout10 from "./commerce-hub/inventory/layout.module.css";
import layout11 from "./commerce-hub/orders-fulfillment/layout.module.css";
import layout12 from "./commerce-hub/products/layout.module.css";
import layout13 from "./commerce-hub/vendors/layout.module.css";
import layout14 from "./content-studio/articles-pipeline/layout.module.css";
import layout15 from "./content-studio/featured-content/layout.module.css";
import layout16 from "./content-studio/localization/layout.module.css";
import layout17 from "./content-studio/media-library/layout.module.css";
import layout18 from "./content-studio/version-history/layout.module.css";
import layout19 from "./events-platform/attendance/layout.module.css";
import layout20 from "./events-platform/event-analytics/layout.module.css";
import layout21 from "./events-platform/event-calendar/layout.module.css";
import layout22 from "./events-platform/livestream-control/layout.module.css";
import layout23 from "./events-platform/ticketing/layout.module.css";
import layout24 from "./infrastructure-devops/api-monitor/layout.module.css";
import layout25 from "./infrastructure-devops/database-health/layout.module.css";
import layout26 from "./infrastructure-devops/job-queues/layout.module.css";
import layout27 from "./infrastructure-devops/storage-usage/layout.module.css";
import layout28 from "./master-dashboard/engagement-board/layout.module.css";
import layout29 from "./master-dashboard/live-metrics/layout.module.css";
import layout30 from "./master-dashboard/performance-monitor/layout.module.css";
import layout31 from "./master-dashboard/system-status/layout.module.css";
import layout32 from "./mobile-control-center/ab-testing/layout.module.css";
import layout33 from "./mobile-control-center/feature-flags/layout.module.css";
import layout34 from "./mobile-control-center/in-app-banners/layout.module.css";
import layout35 from "./mobile-control-center/mobile-layout-editor/layout.module.css";
import layout36 from "./mobile-control-center/push-notifications/layout.module.css";
import layout37 from "./moderation-center/community-rules/layout.module.css";
import layout38 from "./moderation-center/content-actions/layout.module.css";
import layout39 from "./moderation-center/reports-queue/layout.module.css";
import layout40 from "./moderation-center/toxicity-detection/layout.module.css";
import layout41 from "./security-compliance/admin-logs/layout.module.css";
import layout42 from "./security-compliance/api-keys/layout.module.css";
import layout43 from "./security-compliance/policy-manager/layout.module.css";
import layout44 from "./security-compliance/privacy-controls/layout.module.css";
import layout45 from "./security-compliance/two-factor-auth/layout.module.css";
import layout46 from "./users-roles/activity-logs/layout.module.css";
import layout47 from "./users-roles/role-matrix/layout.module.css";
import layout48 from "./users-roles/sessions-devices/layout.module.css";
import layout49 from "./users-roles/user-directory/layout.module.css";
import layout50 from "./users-roles/verification/layout.module.css";

const SUBDASHBOARD_LAYOUTS: Record<string, string> = {
  "ai_recommendation_engine:admin_ai_assistant": layout0.layout,
  "ai_recommendation_engine:ai_moderator": layout1.layout,
  "ai_recommendation_engine:recommendations": layout2.layout,
  "ai_recommendation_engine:trending_engine": layout3.layout,
  "analytics_bi:cohort_analysis": layout4.layout,
  "analytics_bi:commerce_analytics": layout5.layout,
  "analytics_bi:data_export": layout6.layout,
  "analytics_bi:engagement_reports": layout7.layout,
  "analytics_bi:user_metrics": layout8.layout,
  "shop_commerce_engine:campaign_drops": layout9.layout,
  "shop_commerce_engine:inventory": layout10.layout,
  "shop_commerce_engine:orders_fulfillment": layout11.layout,
  "shop_commerce_engine:products": layout12.layout,
  "shop_commerce_engine:vendors": layout13.layout,
  "content_media_cms:articles_pipeline": layout14.layout,
  "content_media_cms:featured_content": layout15.layout,
  "content_media_cms:localization": layout16.layout,
  "content_media_cms:media_library": layout17.layout,
  "content_media_cms:version_history": layout18.layout,
  "events_ticketing_system:attendance": layout19.layout,
  "events_ticketing_system:event_analytics": layout20.layout,
  "events_ticketing_system:event_calendar": layout21.layout,
  "events_ticketing_system:livestream_control": layout22.layout,
  "events_ticketing_system:ticketing": layout23.layout,
  "system_infrastructure_devops:api_monitor": layout24.layout,
  "system_infrastructure_devops:database_health": layout25.layout,
  "system_infrastructure_devops:job_queues": layout26.layout,
  "system_infrastructure_devops:storage_usage": layout27.layout,
  "master_dashboard:engagement_board": layout28.layout,
  "master_dashboard:live_metrics": layout29.layout,
  "master_dashboard:performance_monitor": layout30.layout,
  "master_dashboard:system_status": layout31.layout,
  "mobile_control_center:ab_testing": layout32.layout,
  "mobile_control_center:feature_flags": layout33.layout,
  "mobile_control_center:in_app_banners": layout34.layout,
  "mobile_control_center:mobile_layout_editor": layout35.layout,
  "mobile_control_center:push_notifications": layout36.layout,
  "community_moderation_hub:community_rules": layout37.layout,
  "community_moderation_hub:content_actions": layout38.layout,
  "community_moderation_hub:reports_queue": layout39.layout,
  "community_moderation_hub:toxicity_detection": layout40.layout,
  "security_compliance_center:admin_logs": layout41.layout,
  "security_compliance_center:api_keys": layout42.layout,
  "security_compliance_center:policy_manager": layout43.layout,
  "security_compliance_center:privacy_controls": layout44.layout,
  "security_compliance_center:two_factor_auth": layout45.layout,
  "user_role_management:activity_logs": layout46.layout,
  "user_role_management:role_matrix": layout47.layout,
  "user_role_management:sessions_devices": layout48.layout,
  "user_role_management:user_directory": layout49.layout,
  "user_role_management:verification": layout50.layout,
};

export function resolveSubdashboardLayoutClass(sectionKey: DashboardSectionKey, featureId: string): string | null {
  const key = `${sectionKey}:${featureId}`;
  return SUBDASHBOARD_LAYOUTS[key] ?? null;
}
