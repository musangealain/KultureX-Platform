import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'community_moderation_hub',
  featureId: 'community_rules',
  featureLabel: 'Community Rules',
  headerMeta: 'Trust and safety frame for moderation actions and policy enforcement.',
  layoutClass: 'subdashboardLayoutModeration',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'reports_queue', area: 'a', title: 'Reports Queue' },
    { id: 'toxicity_signals', area: 'b', title: 'Toxicity Signals' },
    { id: 'content_actions', area: 'c', title: 'Content Actions' },
    { id: 'moderation_board', area: 'd', title: 'Moderation Board' },
    { id: 'appeals_queue', area: 'e', title: 'Appeals Queue' },
    { id: 'policy_governance', area: 'f', title: 'Policy Governance' }
  ]
};
