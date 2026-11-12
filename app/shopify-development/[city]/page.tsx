import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES, CITY_ORDER } from '@/data/cities';
import { CityHero } from '@/components/city/CityHero';
import { WhyLocal } from '@/components/city/WhyLocal';
import { MarketContent } from '@/components/city/MarketContent';
import { Areas } from '@/components/city/Areas';
import { BuilderBand } from '@/components/city/BuilderBand';
import { NearbyWork } from '@/components/city/NearbyWork';
import { CityFaq } from '@/components/city/CityFaq';
import { CityGuides } from '@/components/city/CityGuides';
import { OtherCities } from '@/components/city/OtherCities';
import { CtaBand } from '@/components/sections/CtaBand';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export function generateStaticParams() {
  return CITY_ORDER.map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITIES[slug];
  if (!city) {
    return {
      title: 'City Not Found | AdsPeek',
    };
  }

  return {
    title: city.seoTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `/shopify-development/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = CITIES[slug];
  if (!city) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adspeek.com';

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shopify Development',
        item: `${siteUrl}/shopify-development`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `${siteUrl}/shopify-development/${city.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Shopify Development in ${city.name}`,
    description: city.heroText,
    provider: {
      '@type': 'Organization',
      name: 'AdsPeek',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
  };

  const localBusinessJsonLd = city.office
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `AdsPeek - Shopify Development Company in ${city.name}`,
        description: city.heroText,
        url: `${siteUrl}/shopify-development/${city.slug}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: city.office,
          addressLocality: city.name,
          addressCountry: 'IN',
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {localBusinessJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      )}

      <CityHero city={city} />
      <WhyLocal city={city} />
      <MarketContent city={city} />
      <Areas city={city} />
      <BuilderBand />
      <NearbyWork city={city} />
      <CityFaq city={city} />
      <CityGuides cityName={city.name} citySlug={city.slug} />
      <OtherCities city={city} />
      <CtaBand
        heading={`Building a store in ${city.name}?`}
        primary={{ label: 'Build your package', href: '/shopify-development#build' }}
        secondary={{ label: 'WhatsApp us', href: '#whatsapp' }}
      />
    </>
  );
}
