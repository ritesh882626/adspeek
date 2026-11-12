import type { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { CITY_ORDER } from '@/data/cities';
import { getCaseStudies } from '@/lib/content';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://adspeek.in').replace(/\/+$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const corePages = [
    '',
    '/shopify-development',
    '/contact',
    '/about',
    '/guides',
    '/work',
  ];

  const coreRoutes: MetadataRoute.Sitemap = corePages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path === '/shopify-development' ? 0.9 : 0.8,
  }));

  const guides = getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updated || guide.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = CITY_ORDER.map((slug) => ({
    url: `${baseUrl}/shopify-development/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const caseStudies = getCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...coreRoutes, ...guideRoutes, ...cityRoutes, ...caseStudyRoutes];
}
