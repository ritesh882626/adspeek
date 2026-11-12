export interface WorkProject {
  id: string;
  category: string;
  platform: string;
  name: string;
  result: string;
  packageSummary?: string;
  imageLabel: string;
  href: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'krave-apparel',
    category: 'Fashion & Apparel',
    platform: 'Shopify 2.0',
    name: 'Krave Apparel',
    result: '+34% mobile conversion rate and 1.1s load time via bespoke Liquid theme.',
    packageSummary: '240+ products · Custom theme · Speed audit · Native cart drawer',
    imageLabel: 'Krave Apparel — Mobile storefront',
    href: '/work/krave-apparel',
  },
  {
    id: 'aurora-skincare',
    category: 'Clean Beauty',
    platform: 'Woo Migration',
    name: 'Aurora Skincare',
    result: '+42% AOV via routine builder and zero-downtime cutover for 4,000+ SKUs.',
    packageSummary: '4,000+ SKUs · Migration · Routine builder · COD OTP verification',
    imageLabel: 'Aurora Skincare — Storefront & routine builder',
    href: '/work/aurora-skincare',
  },
  {
    id: 'nova-tech',
    category: 'Consumer Tech',
    platform: 'Shopify Plus',
    name: 'Nova Tech',
    result: '2.8x DTC revenue growth with automated B2B wholesale tiering and ERP sync.',
    packageSummary: 'Wholesale portal · SAP ERP sync · Tiered pricing · Automated checkout',
    imageLabel: 'Nova Tech — Enterprise B2B & DTC storefront',
    href: '/work/nova-tech',
  },
];
