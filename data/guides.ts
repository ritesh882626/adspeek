import { getAllGuides } from '@/lib/guides';

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
  'Growth',
] as const;

export type Category = (typeof CATEGORIES)[number];

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const GUIDES: Guide[] = getAllGuides().map((g) => ({
  slug: g.slug,
  title: g.title,
  summary: g.description,
  category: g.category,
  readMinutes: `${g.readMinutes} min read`,
  date: formatDate(g.date),
  featured: g.featured,
  cover: g.cover || `/images/guides/${g.slug}.jpg`,
}));
