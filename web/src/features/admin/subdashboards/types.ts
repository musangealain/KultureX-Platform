import type { DashboardSectionKey } from "../config/dashboard";

export type SubdashboardTile = {
  id: string;
  area: string;
  title: string;
};

export type SubdashboardFeatureFrame = {
  sectionKey: DashboardSectionKey;
  featureId: string;
  featureLabel: string;
  headerMeta: string;
  layoutClass: string;
  tiles: SubdashboardTile[];
};

export type SubdashboardFrame = {
  headerTitle: string;
  headerMeta: string;
  layoutClass: string;
  tiles: SubdashboardTile[];
};
