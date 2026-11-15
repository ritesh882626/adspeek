export interface CategoryOption {
  id: string;
  label: string;
  shortLabel: string;
}

export interface ChannelOption {
  id: string;
  label: string;
  sub: string;
  shortLabel: string;
}

export interface OrdersOption {
  id: string;
  label: string;
  sub: string;
  shortLabel: string;
}

export interface BudgetOption {
  id: string;
  label: string;
  sub: string;
  shortLabel: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'skincare', label: 'Skincare & beauty', shortLabel: 'Skincare' },
  { id: 'fashion', label: 'Fashion & streetwear', shortLabel: 'Fashion' },
  { id: 'wellness', label: 'Wellness & supplements', shortLabel: 'Wellness' },
  { id: 'home', label: 'Home & decor', shortLabel: 'Home & decor' },
  { id: 'pets', label: 'Pet products', shortLabel: 'Pet products' },
  { id: 'other', label: 'Something else', shortLabel: 'Other category' },
];

export const CHANNEL_OPTIONS: ChannelOption[] = [
  { id: 'marketplace', label: 'Amazon / Flipkart / Meesho', sub: 'Marketplace seller', shortLabel: 'Amazon seller' },
  { id: 'social', label: 'Instagram / WhatsApp', sub: 'Orders through DMs', shortLabel: 'Instagram/DMs' },
  { id: 'website', label: 'I already have a website', sub: 'Want a better one', shortLabel: 'Existing site' },
  { id: 'none', label: 'Not selling yet', sub: 'Planning to launch', shortLabel: 'New launch' },
];

export const ORDERS_OPTIONS: OrdersOption[] = [
  { id: '0-20', label: '0–20', sub: 'Just starting', shortLabel: '0–20 orders' },
  { id: '20-100', label: '20–100', sub: 'Growing', shortLabel: '20–100 orders' },
  { id: '100-500', label: '100–500', sub: 'Steady sales', shortLabel: '100–500 orders' },
  { id: '500+', label: '500+', sub: 'Scaling fast', shortLabel: '500+ orders' },
];

export const BUDGET_OPTIONS: BudgetOption[] = [
  { id: 'under20', label: 'Under ₹20k', sub: 'Starter setup', shortLabel: 'Under ₹20k' },
  { id: '25-50', label: '₹25k – ₹50k', sub: 'Custom Shopify store · Most chosen', shortLabel: '₹25k–50k' },
  { id: '50plus', label: '₹50k+', sub: 'Premium build + automations', shortLabel: '₹50k+' },
  { id: 'unsure', label: 'Not sure yet', sub: 'Help me decide', shortLabel: 'Not sure yet' },
];

export const STEP3_MICROCOPY: Record<string, string> = {
  skincare: 'Nice — skincare brands do great with repeat-order flows on their own store.',
  fashion: 'Fashion brands win with lookbooks and size-smart product pages.',
  wellness: 'Wellness brands grow fastest with subscriptions on their own store.',
  home: 'Home brands sell more with room-style collections and bundles.',
  pets: 'Pet brands do great with auto-refill orders on their own store.',
  other: "Great — we've built stores across many categories.",
};

export const STEP4_MICROCOPY: Record<string, string> = {
  marketplace: 'Marketplace sellers keep the full margin on orders from their own store — no commission cut.',
  social: 'Turn DMs into a checkout that takes orders while you sleep.',
  website: "We'll rebuild it to convert better — not just look better.",
  none: 'Perfect time to launch right, from day one.',
};

export const STORE_FEATURES_INCLUDED = [
  'Designed for repeat orders',
  'Higher order value',
  'Inventory automations',
];

export type LeadQuality = 'Hot' | 'Warm' | 'Cold';

export function calculateLeadQuality(
  channel: string,
  orders: string,
  budget: string
): LeadQuality {
  const isHighOrders = orders === '100-500' || orders === '500+';
  const isGoodBudget = budget === '25-50' || budget === '50plus';

  if (channel !== 'none' && isHighOrders && isGoodBudget) {
    return 'Hot';
  }
  if (channel !== 'none' && (orders !== '0-20' || isGoodBudget)) {
    return 'Warm';
  }
  return 'Cold';
}

export const DEFAULT_WHATSAPP_NUMBER = '918796279223';

export function buildWhatsAppMessage(params: {
  name: string;
  category: string;
  channel: string;
  orders: string;
  budget: string;
  storeLink?: string;
}): string {
  const { name, category, channel, orders, budget, storeLink } = params;

  const catObj = CATEGORY_OPTIONS.find((c) => c.id === category);
  const chanObj = CHANNEL_OPTIONS.find((c) => c.id === channel);
  const ordObj = ORDERS_OPTIONS.find((o) => o.id === orders);
  const budObj = BUDGET_OPTIONS.find((b) => b.id === budget);

  const catLabel = catObj ? catObj.shortLabel.toLowerCase() : category;
  const chanLabel = chanObj ? (channel === 'marketplace' ? 'Amazon/Flipkart' : chanObj.shortLabel) : channel;
  const ordLabel = ordObj ? ordObj.label : orders;
  const budLabel = budObj ? (budget === '25-50' ? '₹25–50k' : budObj.shortLabel) : budget;

  let msg = '';
  if (channel === 'none') {
    msg = `Hi AdsPeek, I'm ${name.trim()}. I'm planning to start selling ${catLabel}, budget ${budLabel}. Please share my Shopify store plan.`;
  } else {
    msg = `Hi AdsPeek, I'm ${name.trim()}. I sell ${catLabel} on ${chanLabel}, ${ordLabel} orders/month, budget ${budLabel}. Please share my Shopify store plan.`;
  }

  if (storeLink && storeLink.trim()) {
    msg += ` Store: ${storeLink.trim()}`;
  }

  return msg;
}

export function buildWhatsAppUrl(message: string, rawNumber?: string): string {
  const cleanNumber = (rawNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
