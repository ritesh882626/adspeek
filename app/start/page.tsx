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
  title: 'AdsPeek — Get your free store plan',
  description:
    'For brands selling on Amazon, Instagram or offline. Answer 3 quick taps and get your Shopify plan + price on WhatsApp.',
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
    <div className={`${poppins.className} min-h-screen bg-white text-[#0A0A0A]`}>
      <Suspense
        fallback={
          <div className="w-full min-h-[100dvh] bg-white flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin" />
          </div>
        }
      >
        <LeadQuiz />
      </Suspense>
    </div>
  );
}
