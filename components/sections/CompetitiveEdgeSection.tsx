'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface CompetitiveEdgeSectionProps {
  onOpenConsultation?: () => void;
}

export function CompetitiveEdgeSection({ onOpenConsultation }: CompetitiveEdgeSectionProps) {
  const points = [
    'Design aligned directly with your brand aesthetic & premium positioning',
    'Customizable theme sections so your marketing team can ship landing pages fast',
    'Friction-free customer journeys designed to lift average order value (AOV)',
    'Disciplined app selection to keep store code clean and subscription costs low',
    'Maintainable, standards-compliant Liquid code that future developers can easily manage',
    'Dedicated support beyond launch to continuously optimize store performance',
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#FAF9F5] border-b border-gray-200/70 overflow-hidden scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Value Points */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider border border-[#D1EFE3]">
              <span>THE ADSPEEK ADVANTAGE</span>
            </div>

            <h2 className="type-section text-gray-950 font-light">
              Give Your Store a{' '}
              <span className="font-normal text-[#0C5A48]">Competitive Edge</span>
            </h2>

            <p className="type-body text-gray-600 font-light">
              Most agency websites look pretty but convert poorly. We blend conversion science, high-end visual design, and clean Shopify architecture to build storefronts that turn visitors into repeat buyers.
            </p>

            <ul className="space-y-3 pt-2">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base text-gray-700">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C5A48] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) onOpenConsultation();
                  else {
                    const el = document.getElementById('hero-inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm sm:text-base font-medium shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>Build With Adspeek</span>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic eCommerce Analytics Dashboard Mockup */}
          <div className="lg:col-span-6 w-full min-w-0">
            <div className="rounded-2xl border border-gray-200/90 bg-white shadow-mockup-light overflow-hidden">
              {/* Header */}
              <div className="bg-[#0C5A48] px-4 sm:px-5 py-3.5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <TrendingUp className="w-4 h-4 text-[#C5E1C5] shrink-0" />
                  <span className="text-xs sm:text-sm font-mono tracking-tight font-medium truncate">
                    Store Performance Analytics
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white shrink-0">
                  30-DAY LIFT
                </span>
              </div>

              {/* Analytics Panels */}
              <div className="p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-6">
                {/* 2 Main Metric Cards */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-1">
                      <span>Conversion Rate</span>
                      <span className="text-emerald-700 font-mono font-semibold">+34.8%</span>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-gray-900">3.82%</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">vs 2.10% benchmark</p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-1">
                      <span>Average Order Value</span>
                      <span className="text-emerald-700 font-mono font-semibold">+18.2%</span>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-gray-900">$124.50</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">Cross-sell bundle lift</p>
                  </div>
                </div>

                {/* Simulated Revenue Trend Chart - Flexible gaps for 320px screens */}
                <div className="p-4 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/80">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    <span className="font-medium">Revenue Growth Trend</span>
                    <span className="text-[11px] sm:text-xs font-mono text-[#0C5A48]">Consistent Lift</span>
                  </div>

                  {/* SVG Bar / Trend Chart */}
                  <div className="h-28 sm:h-32 flex items-end justify-between gap-1 sm:gap-2 pt-3">
                    {[38, 45, 52, 60, 58, 68, 75, 82, 88, 92, 98, 108].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end min-w-0">
                        <div
                          style={{ height: `${val}%` }}
                          className={`w-full rounded-t transition-all ${
                            idx >= 8 ? 'bg-[#0C5A48]' : 'bg-[#0C5A48]/30'
                          }`}
                        />
                        <span className="text-[8px] sm:text-[9px] font-mono text-gray-400">
                          {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#EBF7F2] border border-[#D1EFE3] flex items-center justify-between text-xs text-[#0C5A48]">
                  <span className="truncate pr-2">Frictionless Mobile Checkout Active</span>
                  <span className="font-mono font-semibold shrink-0">100% HEALTH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
