import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'security_compliance_center',
  featureId: 'policy_manager',
  featureLabel: 'Policy Manager',
  headerMeta: 'Security frame for threats, controls, audits, and key-management readiness.',
  layoutClass: 'subdashboardLayoutSecurity',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'threat_surface', area: 'a', title: 'Threat Surface' },
    { id: 'access_anomalies', area: 'b', title: 'Access Anomalies' },
    { id: 'compliance_controls', area: 'c', title: 'Compliance Controls' },
    { id: 'security_board', area: 'd', title: 'Security Board' },
    { id: 'audit_queue', area: 'e', title: 'Audit Queue' },
    { id: 'key_rotation_timeline', area: 'f', title: 'Key Rotation Timeline' }
  ]
};
