'use client';

import React from 'react';
import { ArrowRight, CheckCircle, Smartphone, Zap } from 'lucide-react';
import { HeroInquiryCard } from './HeroInquiryCard';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  return (
    <section
      id="hero-inquiry"
      className="relative pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-28 bg-white overflow-hidden scroll-mt-20"
    >
      {/* Subtle Shopify Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#C5E1C5]/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 right-4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#FAF9F5] rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
          {/* Left Column: Headlines, Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 lg:pr-4">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[#D1EFE3]">
              <span className="w-2 h-2 rounded-full bg-[#0C5A48] animate-pulse" />
              <span>Shopify Store Development</span>
            </div>

            {/* Main Headline - Responsive mobile scaling 34-44px */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-light text-gray-950 tracking-tight leading-[1.08]">
              We Build Shopify Stores That{' '}
              <span className="font-normal text-[#0C5A48] underline decoration-[#0C5A48]/30 underline-offset-4 sm:underline-offset-8">
                Convert &amp; Scale.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl">
              From your first product launch to your next stage of growth, Adspeek builds high-performing Shopify stores designed around your brand, customers, and business goals.
            </p>

            {/* CTAs - Stack full-width on mobile */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm sm:text-base font-medium shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>Start Your Shopify Project</span>
              </button>

              <a
                href="#portfolio"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border-2 border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-950 text-sm sm:text-base font-medium transition-all min-h-[48px] flex items-center justify-center text-center"
              >
                View Our Work
              </a>
            </div>

            {/* 3 Compact Trust Badges - Stack cleanly on mobile */}
            <div className="pt-6 sm:pt-8 border-t border-gray-200/70 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <CheckCircle className="w-4 h-4 text-[#0C5A48] shrink-0" />
                <span>Conversion-focused design</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Smartphone className="w-4 h-4 text-[#0C5A48] shrink-0" />
                <span>Mobile-first development</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Zap className="w-4 h-4 text-[#0C5A48] shrink-0" />
                <span>Built around your business</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Card */}
          <div className="lg:col-span-5 w-full min-w-0">
            <HeroInquiryCard />
          </div>
        </div>
      </div>
    </section>
  );
}
