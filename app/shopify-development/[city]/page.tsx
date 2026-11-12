import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES } from '@/data/cities';
import { CityHero } from '@/components/city/CityHero';
import { WhyLocal } from '@/components/city/WhyLocal';
import { MarketContent } from '@/components/city/MarketContent';
import { Areas } from '@/components/city/Areas';
import { BuilderBand } from '@/components/city/BuilderBand';
import { NearbyWork } from '@/components/city/NearbyWork';
import { CityFaq } from '@/components/city/CityFaq';
import { OtherCities } from '@/components/city/OtherCities';
import { CtaBand } from '@/components/sections/CtaBand';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({
    city: slug
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITIES[slug];
  if (!city) {
    return {
      title: 'City Not Found | AdsPeek'
    };
  }

  return {
    title: `Shopify Development Company in ${city.name} | AdsPeek`,
    description: city.heroText,
    alternates: {
      canonical: `/shopify-development/${city.slug}`
    }
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = CITIES[slug];
  if (!city) {
    notFound();
  }

  const structuredData = city.office
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `AdsPeek - Shopify Development in ${city.name}`,
        description: city.heroText,
        url: `https://adspeek.com/shopify-development/${city.slug}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: city.office,
          addressLocality: city.name,
          addressCountry: 'IN'
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Shopify Development in ${city.name}`,
        provider: {
          '@type': 'Organization',
          name: 'AdsPeek',
          url: 'https://adspeek.com'
        },
        areaServed: {
          '@type': 'City',
          name: city.name
        }
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CityHero city={city} />
      <WhyLocal city={city} />
      <MarketContent city={city} />
      <Areas city={city} />
      <BuilderBand />
      <NearbyWork city={city} />
      <CityFaq city={city} />
      <OtherCities city={city} />
      <CtaBand
        heading={`Building a store in ${city.name}?`}
        primary={{ label: 'Build your package', href: '/shopify-development' }}
        secondary={{ label: 'WhatsApp us', href: 'https://wa.me/919999999999' }}
      />
    </>
  );
}
