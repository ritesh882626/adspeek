import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import {
  getServices,
  getMigrationPages,
  getLocations,
  getQuestions,
  getCaseStudies,
} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date('2026-10-20');

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/locations/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/questions/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/work/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy/`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Services
  const serviceRoutes: MetadataRoute.Sitemap = getServices()
    .filter((s) => s.status === 'ready')
    .map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  // Migration platforms
  const migrationRoutes: MetadataRoute.Sitemap = getMigrationPages()
    .filter((m) => m.status === 'ready')
    .map((m) => ({
      url: `${SITE_URL}/services/shopify-migration/${m.platform}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  // Locations: Countries & Places
  const locationRoutes: MetadataRoute.Sitemap = getLocations()
    .filter((l) => l.status === 'ready')
    .map((l) => {
      const url =
        l.type === 'country'
          ? `${SITE_URL}/locations/${l.slug}/`
          : `${SITE_URL}/locations/${l.parentCountry}/${l.slug}/`;

      return {
        url,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: l.type === 'country' ? 0.8 : 0.7,
      };
    });

  // Questions
  const questionRoutes: MetadataRoute.Sitemap = getQuestions()
    .filter((q) => q.status === 'ready')
    .map((q) => ({
      url: `${SITE_URL}/questions/${q.slug}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // Case Studies
  const caseStudyRoutes: MetadataRoute.Sitemap = getCaseStudies().map((c) => ({
    url: `${SITE_URL}/work/${c.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...migrationRoutes,
    ...locationRoutes,
    ...questionRoutes,
    ...caseStudyRoutes,
  ];
}
