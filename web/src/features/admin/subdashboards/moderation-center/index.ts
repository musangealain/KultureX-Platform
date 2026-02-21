import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './reports-queue/frame';
import { frame as frame1 } from './toxicity-detection/frame';
import { frame as frame2 } from './content-actions/frame';
import { frame as frame3 } from './community-rules/frame';

export const moderationCenterFrames: Record<string, SubdashboardFeatureFrame> = {
  'reports_queue': frame0,
  'toxicity_detection': frame1,
  'content_actions': frame2,
  'community_rules': frame3
};
