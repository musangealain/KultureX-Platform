import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './recommendations/frame';
import { frame as frame1 } from './trending-engine/frame';
import { frame as frame2 } from './ai-moderator/frame';
import { frame as frame3 } from './admin-ai-assistant/frame';

export const aiIntelligenceFrames: Record<string, SubdashboardFeatureFrame> = {
  'recommendations': frame0,
  'trending_engine': frame1,
  'ai_moderator': frame2,
  'admin_ai_assistant': frame3
};
