export interface PlatformOption {
  id: string;
  label: string;
  desc: string;
}

export interface PageOption {
  id: string;
  label: string;
  included?: boolean;
}

export interface FeatureOption {
  id: string;
  label: string;
  desc: string;
}

export const PLATFORMS: PlatformOption[] = [
  {
    id: 'new',
    label: 'New Shopify store',
    desc: 'Starting fresh — design, build and launch.',
  },
  {
    id: 'migrate',
    label: 'Move to Shopify',
    desc: 'From WooCommerce, Wix or a marketplace, keeping your SEO.',
  },
  {
    id: 'redesign',
    label: 'Redesign my store',
    desc: 'Already on Shopify; needs a better look and conversion.',
  },
  {
    id: 'headless',
    label: 'Headless Shopify',
    desc: 'Custom Next.js storefront for maximum speed and control.',
  },
];

export const PRODUCT_RANGES = ['Up to 25', '26–100', '101–500', '500+'];
export const COLLECTION_RANGES = ['1–5', '6–15', '16–40', '40+'];

export const PAGES: PageOption[] = [
  { id: 'home', label: 'Homepage', included: true },
  { id: 'collection', label: 'Collection page', included: true },
  { id: 'product', label: 'Product page', included: true },
  { id: 'cart', label: 'Cart & checkout', included: true },
  { id: 'about', label: 'About / brand story' },
  { id: 'contact', label: 'Contact' },
  { id: 'faq', label: 'FAQ' },
  { id: 'blog', label: 'Blog' },
  { id: 'size', label: 'Size guide' },
  { id: 'lookbook', label: 'Lookbook' },
  { id: 'track', label: 'Track order' },
  { id: 'wholesale', label: 'Wholesale / B2B' },
  { id: 'stores', label: 'Store locator' },
  { id: 'policies', label: 'Policy pages' },
  { id: 'landing', label: 'Campaign landing page' },
  { id: 'quiz', label: 'Product finder quiz' },
];

export const INTEGRATIONS: FeatureOption[] = [
  {
    id: 'payments',
    label: 'Payments',
    desc: 'Razorpay, PhonePe, PayPal, Stripe',
  },
  {
    id: 'shipping',
    label: 'Shipping',
    desc: 'Shiprocket, Delhivery or local courier',
  },
  {
    id: 'pixel',
    label: 'Meta Pixel + Conversions API',
    desc: 'Accurate ad tracking',
  },
  {
    id: 'ga4',
    label: 'Google Analytics 4',
    desc: 'Traffic and sales reports',
  },
  {
    id: 'merchant',
    label: 'Google Merchant Center',
    desc: 'Products on Google Shopping',
  },
  {
    id: 'reviews',
    label: 'Product reviews',
    desc: 'Photo reviews on product pages',
  },
  {
    id: 'email',
    label: 'Email marketing',
    desc: 'Klaviyo or Shopify Email',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp chat button',
    desc: 'Talk to buyers in one tap',
  },
  {
    id: 'gst',
    label: 'GST invoicing',
    desc: 'Automatic tax invoices',
  },
  {
    id: 'markets',
    label: 'Multi-currency',
    desc: 'Sell abroad in local prices',
  },
  {
    id: 'erp',
    label: 'Inventory / ERP sync',
    desc: 'Tally, Zoho or Unicommerce',
  },
  {
    id: 'loyalty',
    label: 'Loyalty & rewards',
    desc: 'Points and referrals',
  },
];

export const AUTOMATIONS: FeatureOption[] = [
  {
    id: 'cart',
    label: 'Abandoned-cart recovery',
    desc: 'WhatsApp + email reminders',
  },
  {
    id: 'orders',
    label: 'Order updates on WhatsApp',
    desc: 'Confirmed, shipped, delivered',
  },
  {
    id: 'cod',
    label: 'COD confirmation',
    desc: 'Cut fake and returned COD orders',
  },
  {
    id: 'review',
    label: 'Review requests',
    desc: 'Asked automatically after delivery',
  },
  {
    id: 'stock',
    label: 'Back-in-stock alerts',
    desc: 'Notify buyers who were waiting',
  },
  {
    id: 'repeat',
    label: 'Repeat-order reminders',
    desc: 'For consumables and refills',
  },
  {
    id: 'lead',
    label: 'WhatsApp AI replies',
    desc: 'Answers buyer questions 24/7',
  },
  {
    id: 'lowstock',
    label: 'Low-stock alerts to your team',
    desc: 'Never run out quietly',
  },
  {
    id: 'report',
    label: 'Weekly sales report',
    desc: 'Sent to you every Monday',
  },
];
