import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'user_role_management',
  featureId: 'sessions_devices',
  featureLabel: 'Sessions & Devices',
  headerMeta: 'Governance frame for identity, access, and trust operations.',
  layoutClass: 'subdashboardLayoutUsers',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'user_directory', area: 'a', title: 'User Directory' },
    { id: 'role_matrix', area: 'b', title: 'Role Matrix' },
    { id: 'session_monitor', area: 'c', title: 'Session Monitor' },
    { id: 'device_trust', area: 'd', title: 'Device Trust' },
    { id: 'verification_queue', area: 'e', title: 'Verification Queue' },
    { id: 'activity_logs', area: 'f', title: 'Activity Logs' },
    { id: 'privilege_escalation_review', area: 'g', title: 'Privilege Escalation Review' }
  ]
};
