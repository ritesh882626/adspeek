'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyx2fz5yGU06nK4UKvCZ2HxqKxat-N2vOe7vqMJA5pykbeLmH07iFWxflFOxTOQp0bYqA/exec';

export default function QuotePage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
      <Header onOpenConsultation={() => {}} />

      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        {/* Intro Banner */}
        <section className="bg-gradient-teal text-[#EFF8F0] pt-10 sm:pt-14 pb-16 relative overflow-hidden mb-8 sm:mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.15),rgba(2,9,10,0.8))]" />
          <Container className="relative z-10 text-center max-w-3xl mx-auto">
            <Breadcrumbs items={[{ label: 'Get a Quote', href: '/quote/' }]} />
            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>INSTANT PACKAGE BUILDER</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Build Your Package &amp; Get an{' '}
              <span className="font-normal text-[#C5E1C5]">Instant Quote</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-3 font-light leading-relaxed max-w-xl mx-auto">
              Select your store needs, catalog size, and integrations. See your exact, fixed price live with zero hidden fees.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#A8B1B1]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5E1C5]" />
                <span>Fixed Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5E1C5]" />
                <span>Takes ~3 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5E1C5]" />
                <span>No Sign-Up Required</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Embedded Package Builder Web App */}
        <Container className="max-w-[1140px] mx-auto px-2 sm:px-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden relative">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 z-10 py-32 space-y-4">
                <div className="w-10 h-10 border-3 border-gray-300 border-t-[#0C5A48] rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-600">Loading package builder…</p>
              </div>
            )}
            <iframe
              src={WEB_APP_URL}
              title="AdsPeek Package Builder Quote Form"
              className="w-full min-h-[750px] sm:min-h-[820px] md:min-h-[860px] border-0 block"
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
              allow="clipboard-write"
            />
          </div>
        </Container>
      </main>

      <Footer onOpenConsultation={() => {}} />
    </div>
  );
}
