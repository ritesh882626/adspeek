import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import WorkHero from '@/components/work/WorkHero';
import WorkGrid from '@/components/work/WorkGrid';
import CtaBand from '@/components/sections/CtaBand';
import { PROJECTS } from '@/data/portfolio';

export const metadata: Metadata = {
  title: "Our Work — Shopify Stores We've Built | AdsPeek",
  description:
    'Every window scrolls the real site from top to bottom. Hover to pause. Switch to phone view to see the mobile store.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: "Our Work — Shopify Stores We've Built | AdsPeek",
    description:
      'Every window scrolls the real site from top to bottom. Hover to pause. Switch to phone view to see the mobile store.',
    url: '/work',
    type: 'website',
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-paper">
      <WorkHero projectCount={PROJECTS.length} />

      <Suspense
        fallback={
          <div className="py-24 text-center font-mono text-muted text-sm">
            Loading projects...
          </div>
        }
      >
        <WorkGrid projects={PROJECTS} />
      </Suspense>

      <CtaBand
        id="work-cta"
        heading="Your store could be next in this list."
        primary={{
          label: 'Build your package',
          href: '/shopify-development',
        }}
        secondary={{
          label: 'Book a call',
          href: '/contact',
        }}
      />
    </main>
  );
}
