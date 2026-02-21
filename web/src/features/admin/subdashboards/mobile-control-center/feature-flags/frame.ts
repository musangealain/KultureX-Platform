import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'mobile_control_center',
  featureId: 'feature_flags',
  featureLabel: 'Feature Flags',
  headerMeta: 'Remote app-control frame for live feature delivery and experimentation.',
  layoutClass: 'subdashboardLayoutMobile',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'feature_flags', area: 'a', title: 'Feature Flags' },
    { id: 'push_campaigns', area: 'b', title: 'Push Campaigns' },
    { id: 'in_app_banners', area: 'c', title: 'In-App Banners' },
    { id: 'layout_editor', area: 'd', title: 'Layout Editor' },
    { id: 'a_b_test_queue', area: 'e', title: 'A/B Test Queue' },
    { id: 'crash_free_timeline', area: 'f', title: 'Crash-Free Timeline' }
  ]
};
