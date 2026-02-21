import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './admin-logs/frame';
import { frame as frame1 } from './privacy-controls/frame';
import { frame as frame2 } from './policy-manager/frame';
import { frame as frame3 } from './api-keys/frame';
import { frame as frame4 } from './two-factor-auth/frame';

export const securityComplianceFrames: Record<string, SubdashboardFeatureFrame> = {
  'admin_logs': frame0,
  'privacy_controls': frame1,
  'policy_manager': frame2,
  'api_keys': frame3,
  'two_factor_auth': frame4
};
