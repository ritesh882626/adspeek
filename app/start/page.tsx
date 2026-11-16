import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { LeadQuiz } from './LeadQuiz';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AdsPeek — Check your Shopify store fit',
  description:
    'Get a store that sells for you. Free consultation and store plan on WhatsApp.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function StartQuizPage() {
  return (
    <div className={poppins.className}>
      <Suspense
        fallback={
          <div className="w-full min-h-[100dvh] bg-white flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#008060] border-t-transparent animate-spin" />
          </div>
        }
      >
        <LeadQuiz />
      </Suspense>
    </div>
  );
}
