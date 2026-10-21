import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from './seo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.4595',
      longitude: '77.0266',
    },
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/adspeek',
      'https://twitter.com/adspeek',
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; path?: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const target = item.path || item.url || '/';
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: target.startsWith('http') ? target : `${SITE_URL}${target}`,
      };
    }),
  };
}

export function getFaqSchema(
  faqs: Array<{ question?: string; answer?: string; q?: string; a?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q || '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a || '',
      },
    })),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url.startsWith('http') ? service.url : `${SITE_URL}${service.url}`,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    url: article.url.startsWith('http') ? article.url : `${SITE_URL}${article.url}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName || 'Ritesh',
      jobTitle: 'Founder & Technical Director',
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}
