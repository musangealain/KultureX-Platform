import type { DashboardSection, DashboardSectionKey, SidebarFeature } from "../config/dashboard";
import { aiIntelligenceFrames } from "./ai-intelligence";
import { analyticsBiFrames } from "./analytics-bi";
import { commerceHubFrames } from "./commerce-hub";
import { contentStudioFrames } from "./content-studio";
import { eventsPlatformFrames } from "./events-platform";
import { infrastructureDevopsFrames } from "./infrastructure-devops";
import { masterDashboardFrames } from "./master-dashboard";
import { mobileControlCenterFrames } from "./mobile-control-center";
import { moderationCenterFrames } from "./moderation-center";
import { securityComplianceFrames } from "./security-compliance";
import type { SubdashboardFeatureFrame, SubdashboardFrame } from "./types";
import { usersRolesFrames } from "./users-roles";

const SUBDASHBOARD_FRAMES: Record<DashboardSectionKey, Record<string, SubdashboardFeatureFrame>> = {
  master_dashboard: masterDashboardFrames,
  user_role_management: usersRolesFrames,
  content_media_cms: contentStudioFrames,
  shop_commerce_engine: commerceHubFrames,
  events_ticketing_system: eventsPlatformFrames,
  community_moderation_hub: moderationCenterFrames,
  mobile_control_center: mobileControlCenterFrames,
  ai_recommendation_engine: aiIntelligenceFrames,
  analytics_bi: analyticsBiFrames,
  system_infrastructure_devops: infrastructureDevopsFrames,
  security_compliance_center: securityComplianceFrames
};

const FALLBACK_FRAME: SubdashboardFeatureFrame = {
  sectionKey: "master_dashboard",
  featureId: "fallback",
  featureLabel: "Overview",
  headerMeta: "Operational frame shell.",
  layoutClass: "subdashboardLayoutExecutive",
  tiles: [
    { id: "hero", area: "hero", title: "Overview" },
    { id: "a", area: "a", title: "Primary Panel" },
    { id: "b", area: "b", title: "Health Panel" },
    { id: "c", area: "c", title: "Alert Panel" },
    { id: "d", area: "d", title: "Workflow Board" },
    { id: "e", area: "e", title: "Queue Panel" },
    { id: "f", area: "f", title: "Timeline Panel" }
  ]
};

function resolveFeatureFrame(sectionKey: DashboardSectionKey, featureId: string): SubdashboardFeatureFrame {
  const sectionFrames = SUBDASHBOARD_FRAMES[sectionKey];
  if (!sectionFrames) {
    return FALLBACK_FRAME;
  }

  return sectionFrames[featureId] ?? Object.values(sectionFrames)[0] ?? FALLBACK_FRAME;
}

export function buildSubdashboardFrame(section: DashboardSection, feature: SidebarFeature): SubdashboardFrame {
  const frame = resolveFeatureFrame(section.key, feature.id);

  return {
    headerTitle: `${feature.label} Control Shell`,
    headerMeta: frame.headerMeta,
    layoutClass: frame.layoutClass,
    tiles: frame.tiles.map((tile) =>
      tile.id === "hero" ? { ...tile, title: `${feature.label} Overview` } : { ...tile }
    )
  };
}
