'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenConsultation: () => void;
}

export function FinalCtaSection({ onOpenConsultation }: FinalCtaSectionProps) {
  return (
    <section className="py-20 sm:py-24 md:py-32 lg:py-36 bg-gradient-teal text-[#EFF8F0] relative overflow-hidden">
      {/* Radiant Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.15),rgba(2,9,10,0.8))]" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#02090A] to-transparent" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 text-center relative z-10 space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono">
          <span>START A CONVERSATION</span>
        </div>

        <h2 className="type-hero text-[#EFF8F0] font-light">
          Ready to Build Your{' '}
          <span className="font-normal text-[#C5E1C5]">Shopify Store?</span>
        </h2>

        <p className="type-body text-[#A8B1B1] font-light max-w-2xl mx-auto">
          Tell us about your brand, your timeline, and what you want your storefront to achieve. We&apos;ll help you clarify scope, architecture, and the right next step.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-base font-medium shadow-lg hover:shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            <span>Start Your Project</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full border-2 border-white/20 hover:border-white/40 text-white text-base font-medium transition-all cursor-pointer min-h-[48px] flex items-center justify-center"
          >
            Book a Consultation
          </button>
        </div>

        {/* 3 Guarantees */}
        <div className="pt-8 sm:pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 text-xs sm:text-sm text-[#A8B1B1]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5E1C5] shrink-0" />
            <span>24-Hour Proposal Turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5E1C5] shrink-0" />
            <span>Mutual Non-Disclosure (NDA) Available</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5E1C5] shrink-0" />
            <span>Transparent, Milestone-Based Billing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
