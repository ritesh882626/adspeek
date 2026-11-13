import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  featured: boolean;
  readMinutes: number | string;
  date: string;
  updated: string;
  author: string;
  authorRole: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  faq?: GuideFaq[];
  cover?: string;
}

export interface GuideArticle {
  frontmatter: GuideFrontmatter;
  content: string;
}

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

export function getAllGuides(): GuideFrontmatter[] {
  if (!fs.existsSync(GUIDES_DIR)) {
    return [];
  }
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith('.mdx'));
  const guides: GuideFrontmatter[] = [];

  for (const file of files) {
    const filePath = path.join(GUIDES_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const slug = data.slug || file.replace(/\.mdx$/, '');

    guides.push({
      title: data.title || '',
      slug,
      description: data.description || '',
      category: data.category || 'Shopify',
      featured: !!data.featured,
      readMinutes: data.readMinutes || 5,
      date: data.date || '',
      updated: data.updated || data.date || '',
      author: data.author || 'Ritesh Kumar Singh',
      authorRole: data.authorRole || 'Founder, AdsPeek',
      primaryKeyword: data.primaryKeyword,
      secondaryKeywords: data.secondaryKeywords,
      faq: data.faq || [],
      cover: data.cover || `/images/guides/${slug}.jpg`,
    });
  }

  // Sort newest first
  guides.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return guides;
}

export function getGuide(slug: string): GuideArticle | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: {
      title: data.title || '',
      slug: data.slug || slug,
      description: data.description || '',
      category: data.category || 'Shopify',
      featured: !!data.featured,
      readMinutes: data.readMinutes || 5,
      date: data.date || '',
      updated: data.updated || data.date || '',
      author: data.author || 'Ritesh Kumar Singh',
      authorRole: data.authorRole || 'Founder, AdsPeek',
      primaryKeyword: data.primaryKeyword,
      secondaryKeywords: data.secondaryKeywords,
      faq: data.faq || [],
      cover: data.cover || `/images/guides/${slug}.jpg`,
    },
    content,
  };
}

export function getRelatedGuides(slug: string, n = 3): GuideFrontmatter[] {
  const all = getAllGuides().filter((g) => g.slug !== slug);
  const current = getAllGuides().find((g) => g.slug === slug);
  const category = current?.category;

  const sameCategory = all.filter((g) => g.category === category);
  const otherCategory = all.filter((g) => g.category !== category);

  const combined = [...sameCategory, ...otherCategory];
  return combined.slice(0, n);
}

