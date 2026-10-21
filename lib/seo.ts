import type { Metadata } from 'next';

export const SITE_URL = 'https://adspeek.in';
export const SITE_NAME = 'AdsPeek';
export const DEFAULT_DESCRIPTION =
  'AdsPeek is a premier Shopify store development and eCommerce solutions agency. We build, design, and scale high-converting Shopify and Shopify Plus storefronts.';

export function getCanonicalUrl(path = ''): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return cleanPath ? `${SITE_URL}/${cleanPath}/` : `${SITE_URL}/`;
}

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  noIndex = false,
  ogImage = '/og-image.jpg',
}: PageMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(path);
  const fullTitle = path === '' ? `${title} | ${SITE_NAME}` : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Shopify Development Agency`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`],
    },
  };
}

export const buildMetadata = constructMetadata;
