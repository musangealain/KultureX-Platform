import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './user-directory/frame';
import { frame as frame1 } from './role-matrix/frame';
import { frame as frame2 } from './sessions-devices/frame';
import { frame as frame3 } from './verification/frame';
import { frame as frame4 } from './activity-logs/frame';

export const usersRolesFrames: Record<string, SubdashboardFeatureFrame> = {
  'user_directory': frame0,
  'role_matrix': frame1,
  'sessions_devices': frame2,
  'verification': frame3,
  'activity_logs': frame4
};
