import type { SubdashboardFeatureFrame } from '../types';
import { frame as frame0 } from './articles-pipeline/frame';
import { frame as frame1 } from './media-library/frame';
import { frame as frame2 } from './version-history/frame';
import { frame as frame3 } from './featured-content/frame';
import { frame as frame4 } from './localization/frame';

export const contentStudioFrames: Record<string, SubdashboardFeatureFrame> = {
  'articles_pipeline': frame0,
  'media_library': frame1,
  'version_history': frame2,
  'featured_content': frame3,
  'localization': frame4
};
