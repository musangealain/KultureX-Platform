import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './user-metrics/frame';
import { frame as frame1 } from './engagement-reports/frame';
import { frame as frame2 } from './commerce-analytics/frame';
import { frame as frame3 } from './cohort-analysis/frame';
import { frame as frame4 } from './data-export/frame';

export const analyticsBiFrames: Record<string, SubdashboardFeatureFrame> = {
  'user_metrics': frame0,
  'engagement_reports': frame1,
  'commerce_analytics': frame2,
  'cohort_analysis': frame3,
  'data_export': frame4
};
