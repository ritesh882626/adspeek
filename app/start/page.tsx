import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { LeadQuiz } from './LeadQuiz';
import { MetaPixel } from './MetaPixel';

export const metadata: Metadata = {
  title: 'Check Your Shopify Store Fit | AdsPeek',
  description:
    'Answer 4 quick taps. Get a custom Shopify store plan for your brand on WhatsApp. No payment needed, no spam calls.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#008060',
};

export default function StartQuizPage() {
  return (
    <main className="w-full min-h-[100dvh]">
      <MetaPixel />
      <Suspense
        fallback={
          <div className="w-full min-h-[100dvh] bg-[#F6F6F7] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#008060] border-t-transparent animate-spin" />
          </div>
        }
      >
        <LeadQuiz />
      </Suspense>
    </main>
  );
}
