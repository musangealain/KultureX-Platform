import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './event-calendar/frame';
import { frame as frame1 } from './ticketing/frame';
import { frame as frame2 } from './attendance/frame';
import { frame as frame3 } from './livestream-control/frame';
import { frame as frame4 } from './event-analytics/frame';

export const eventsPlatformFrames: Record<string, SubdashboardFeatureFrame> = {
  'event_calendar': frame0,
  'ticketing': frame1,
  'attendance': frame2,
  'livestream_control': frame3,
  'event_analytics': frame4
};
