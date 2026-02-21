import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'analytics_bi',
  featureId: 'commerce_analytics',
  featureLabel: 'Commerce Analytics',
  headerMeta: 'Decision frame for metrics, cohorts, funnels, and export workflows.',
  layoutClass: 'subdashboardLayoutAnalytics',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'executive_kpi', area: 'a', title: 'Executive KPI' },
    { id: 'cohort_trends', area: 'b', title: 'Cohort Trends' },
    { id: 'conversion_funnel', area: 'c', title: 'Conversion Funnel' },
    { id: 'reporting_board', area: 'd', title: 'Reporting Board' },
    { id: 'data_export_queue', area: 'e', title: 'Data Export Queue' },
    { id: 'data_quality_timeline', area: 'f', title: 'Data Quality Timeline' }
  ]
};
