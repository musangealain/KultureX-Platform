import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './push-notifications/frame';
import { frame as frame1 } from './in-app-banners/frame';
import { frame as frame2 } from './feature-flags/frame';
import { frame as frame3 } from './mobile-layout-editor/frame';
import { frame as frame4 } from './ab-testing/frame';

export const mobileControlCenterFrames: Record<string, SubdashboardFeatureFrame> = {
  'push_notifications': frame0,
  'in_app_banners': frame1,
  'feature_flags': frame2,
  'mobile_layout_editor': frame3,
  'ab_testing': frame4
};
