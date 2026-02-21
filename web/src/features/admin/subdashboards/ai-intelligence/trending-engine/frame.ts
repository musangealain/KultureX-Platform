import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'ai_recommendation_engine',
  featureId: 'trending_engine',
  featureLabel: 'Trending Engine',
  headerMeta: 'AI operations frame for recommendation quality and model governance.',
  layoutClass: 'subdashboardLayoutAI',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'model_health', area: 'a', title: 'Model Health' },
    { id: 'ranking_quality', area: 'b', title: 'Ranking Quality' },
    { id: 'trend_signals', area: 'c', title: 'Trend Signals' },
    { id: 'ai_ops_board', area: 'd', title: 'AI Ops Board' },
    { id: 'human_review_queue', area: 'e', title: 'Human Review Queue' },
    { id: 'model_drift_timeline', area: 'f', title: 'Model Drift Timeline' }
  ]
};
