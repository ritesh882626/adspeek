export interface Guide {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readMinutes: string;
  date: string;
  featured?: boolean;
  cover?: string;
}

export const CATEGORIES = [
  'All',
  'Shopify',
  'Costs & pricing',
  'Meta ads',
  'Automation',
  'Migration',
  'Growth'
] as const;

export type Category = (typeof CATEGORIES)[number];

export const GUIDES: Guide[] = [
  {
    slug: 'shopify-store-cost-india',
    title: 'How much does a Shopify store cost in India?',
    summary:
      'Every cost line — theme, apps, development, payment fees — and what you can skip at launch.',
    category: 'Costs & pricing',
    readMinutes: '[X]',
    date: '[Date]',
    featured: true
  },
  {
    slug: 'shopify-vs-woocommerce-india',
    title: 'Shopify vs WooCommerce for D2C brands',
    summary: 'Which one to pick, and when moving makes sense.',
    category: 'Shopify',
    readMinutes: '[X]',
    date: '[Date]',
    featured: false
  },
  {
    slug: 'meta-ads-new-shopify-store-90-days',
    title: 'Meta ads for a new Shopify store: the first 90 days',
    summary: 'What to run, what to measure, when to scale.',
    category: 'Meta ads',
    readMinutes: '[X]',
    date: '[Date]',
    featured: false
  },
  {
    slug: 'cut-fake-cod-orders-whatsapp-confirmation',
    title: 'Cut fake COD orders with WhatsApp confirmation',
    summary: 'The simplest automation with the fastest payback.',
    category: 'Automation',
    readMinutes: '[X]',
    date: '[Date]',
    featured: false
  },
  {
    slug: 'headless-shopify-when-is-it-worth-it',
    title: 'Headless Shopify: when is it worth it?',
    summary: 'Speed, control and cost — the honest trade-off.',
    category: 'Shopify',
    readMinutes: '[X]',
    date: '[Date]',
    featured: false
  },
  {
    slug: 'shopify-migration-seo',
    title: 'Move from WooCommerce to Shopify without losing SEO',
    summary: 'Redirects, data and the launch-day checklist.',
    category: 'Migration',
    readMinutes: '[X]',
    date: '[Date]',
    featured: false
  },
  {
    slug: 'abandoned-cart-recovery-whatsapp-vs-email',
    title: 'Abandoned-cart recovery: WhatsApp vs email',
    summary: 'Which channel to use for Indian and overseas buyers.',
    category: 'Automation',
    readMinutes: '[X]',
    date: '[Date]',
    featured: false
  }
];

