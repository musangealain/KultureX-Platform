import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './api-monitor/frame';
import { frame as frame1 } from './database-health/frame';
import { frame as frame2 } from './storage-usage/frame';
import { frame as frame3 } from './job-queues/frame';

export const infrastructureDevopsFrames: Record<string, SubdashboardFeatureFrame> = {
  'api_monitor': frame0,
  'database_health': frame1,
  'storage_usage': frame2,
  'job_queues': frame3
};
