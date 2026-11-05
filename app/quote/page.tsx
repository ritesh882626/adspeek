'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function QuotePage() {
  useEffect(() => {
    // Automatically trigger the centered popup on page load
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).AdsPeekEstimate) {
        (window as any).AdsPeekEstimate.open();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEstimate = () => {
    if (typeof window !== 'undefined' && (window as any).AdsPeekEstimate) {
      (window as any).AdsPeekEstimate.open();
    }
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
      <Header onOpenConsultation={() => {}} />

      <main className="flex-1 pt-20 sm:pt-24 pb-20">
        {/* Intro Hero Banner */}
        <section className="bg-gradient-teal text-[#EFF8F0] pt-12 sm:pt-16 pb-20 relative overflow-hidden mb-12 sm:mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.15),rgba(2,9,10,0.8))]" />
          <Container className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <Breadcrumbs items={[{ label: 'Get a Quote', href: '/quote/' }]} />
            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSTANT PACKAGE BUILDER</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light text-3xl sm:text-5xl tracking-tight">
              Build Your Package &amp; Get an{' '}
              <span className="font-normal text-[#C5E1C5]">Instant Quote</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed max-w-xl mx-auto text-base sm:text-lg">
              Select your store platform, catalogue volume, required pages, and business integrations. See your exact, fixed price live with zero hidden fees.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleOpenEstimate}
                data-adspeek-estimate
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#C5E1C5] text-[#02090A] font-semibold text-base shadow-lg hover:bg-[#B3D9B3] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Launch Package Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-10 text-xs sm:text-sm text-[#A8B1B1]">
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

        {/* Steps Preview Grid */}
        <Container className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">
              How the package builder works
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Customize each layer of your store in 7 straightforward steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="text-xs font-mono font-semibold text-[#0C5A48] uppercase mb-2">Step 01 – 02</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Platform &amp; Catalogue</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose between Shopify or Custom Next.js storefront, and define your initial product and collection sizing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="text-xs font-mono font-semibold text-[#0C5A48] uppercase mb-2">Step 03 – 05</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Pages &amp; Integrations</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Select custom landing pages, brand features (reviews, wishlist), and setup for payments, shipping, or WhatsApp.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="text-xs font-mono font-semibold text-[#0C5A48] uppercase mb-2">Step 06 – 07</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Live Summary &amp; Estimate</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Review your itemized package breakdown with exact GST calculation, and get a formal PDF estimate sent to your email.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={handleOpenEstimate}
              data-adspeek-estimate
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
            >
              <span>Open Package Builder Popup</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </Container>
      </main>

      <Footer onOpenConsultation={() => {}} />
    </div>
  );
}
