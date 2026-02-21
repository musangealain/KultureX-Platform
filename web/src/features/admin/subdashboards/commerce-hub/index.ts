import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './products/frame';
import { frame as frame1 } from './inventory/frame';
import { frame as frame2 } from './campaign-drops/frame';
import { frame as frame3 } from './orders-fulfillment/frame';
import { frame as frame4 } from './vendors/frame';

export const commerceHubFrames: Record<string, SubdashboardFeatureFrame> = {
  'products': frame0,
  'inventory': frame1,
  'campaign_drops': frame2,
  'orders_fulfillment': frame3,
  'vendors': frame4
};
