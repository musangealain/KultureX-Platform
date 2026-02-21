import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'master_dashboard',
  featureId: 'engagement_board',
  featureLabel: 'Engagement Board',
  headerMeta: 'Real-time command layout for executive operations and incident readiness.',
  layoutClass: 'subdashboardLayoutExecutive',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'live_kpi_pulse', area: 'a', title: 'Live KPI Pulse' },
    { id: 'alert_feed', area: 'b', title: 'Alert Feed' },
    { id: 'service_health', area: 'c', title: 'Service Health' },
    { id: 'command_board', area: 'd', title: 'Command Board' },
    { id: 'escalation_queue', area: 'e', title: 'Escalation Queue' },
    { id: 'incident_timeline', area: 'f', title: 'Incident Timeline' }
  ]
};
