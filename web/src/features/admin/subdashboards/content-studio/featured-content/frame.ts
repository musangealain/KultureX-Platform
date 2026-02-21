import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'content_media_cms',
  featureId: 'featured_content',
  featureLabel: 'Featured Content',
  headerMeta: 'Editorial operations frame from draft intake to publish governance.',
  layoutClass: 'subdashboardLayoutContent',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'articles_pipeline', area: 'a', title: 'Articles Pipeline' },
    { id: 'media_throughput', area: 'b', title: 'Media Throughput' },
    { id: 'featured_queue', area: 'c', title: 'Featured Queue' },
    { id: 'editorial_workflow', area: 'd', title: 'Editorial Workflow' },
    { id: 'version_history', area: 'e', title: 'Version History' },
    { id: 'localization_status', area: 'f', title: 'Localization Status' }
  ]
};
