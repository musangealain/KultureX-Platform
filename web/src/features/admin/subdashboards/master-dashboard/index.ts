import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './system-status/frame';
import { frame as frame1 } from './live-metrics/frame';
import { frame as frame2 } from './engagement-board/frame';
import { frame as frame3 } from './performance-monitor/frame';

export const masterDashboardFrames: Record<string, SubdashboardFeatureFrame> = {
  'system_status': frame0,
  'live_metrics': frame1,
  'engagement_board': frame2,
  'performance_monitor': frame3
};
