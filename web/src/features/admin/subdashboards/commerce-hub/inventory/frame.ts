import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'shop_commerce_engine',
  featureId: 'inventory',
  featureLabel: 'Inventory',
  headerMeta: 'Commerce operations frame for catalog, orders, and fulfillment oversight.',
  layoutClass: 'subdashboardLayoutCommerce',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'catalog_health', area: 'a', title: 'Catalog Health' },
    { id: 'inventory_risk', area: 'b', title: 'Inventory Risk' },
    { id: 'campaign_drops', area: 'c', title: 'Campaign Drops' },
    { id: 'orders_flow', area: 'd', title: 'Orders Flow' },
    { id: 'fulfillment_board', area: 'e', title: 'Fulfillment Board' },
    { id: 'vendor_queue', area: 'f', title: 'Vendor Queue' },
    { id: 'returns_timeline', area: 'g', title: 'Returns Timeline' }
  ]
};
