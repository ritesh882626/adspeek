import React from 'react';
import { Metadata } from 'next';
import { GUIDES, CATEGORIES } from '@/data/guides';
import { GuidesHero } from '@/components/guides/GuidesHero';
import { CategoryBar } from '@/components/guides/CategoryBar';
import { FeaturedGuide } from '@/components/guides/FeaturedGuide';
import { GuideGrid } from '@/components/guides/GuideGrid';
import { Newsletter } from '@/components/guides/Newsletter';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Shopify & D2C Growth Guides | AdsPeek',
  description:
    'Honest notes on Shopify development, theme speed, Meta ads and automations. Written by the team building the stores.',
  alternates: {
    canonical: '/guides'
  }
};

interface GuidesPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || 'All';
  const searchQuery = resolvedParams.q || '';

  const featured = GUIDES.find((g) => g.featured);
  const showFeatured = featured && activeCategory === 'All' && !searchQuery.trim();

  return (
    <>
      <GuidesHero />
      <CategoryBar categories={CATEGORIES} />
      {showFeatured && featured && <FeaturedGuide guide={featured} />}
      <GuideGrid
        guides={GUIDES}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
      />
      <Newsletter />
      <CtaBand
        heading="Read enough? Let's build it."
        primary={{ label: 'Build your package', href: '/shopify-development' }}
        secondary={{ label: 'WhatsApp us', href: 'https://wa.me/919999999999' }}
      />
    </>
  );
}

