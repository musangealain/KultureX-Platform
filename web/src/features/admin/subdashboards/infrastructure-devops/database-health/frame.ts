import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'system_infrastructure_devops',
  featureId: 'database_health',
  featureLabel: 'Database Health',
  headerMeta: 'Engineering frame for uptime, capacity, deployment, and recovery controls.',
  layoutClass: 'subdashboardLayoutInfra',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'api_monitor', area: 'a', title: 'API Monitor' },
    { id: 'database_health', area: 'b', title: 'Database Health' },
    { id: 'storage_usage', area: 'c', title: 'Storage Usage' },
    { id: 'sre_operations_board', area: 'd', title: 'SRE Operations Board' },
    { id: 'job_queue_control', area: 'e', title: 'Job Queue Control' },
    { id: 'deployment_timeline', area: 'f', title: 'Deployment Timeline' },
    { id: 'incident_recovery', area: 'g', title: 'Incident Recovery' }
  ]
};
