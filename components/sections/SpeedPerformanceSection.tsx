'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SpeedPerformanceSectionProps {
  onOpenConsultation?: () => void;
}

export function SpeedPerformanceSection({ onOpenConsultation }: SpeedPerformanceSectionProps) {
  const points = [
    'Next-gen image optimization (AVIF/WebP) with responsive sizing',
    'Third-party app audit to eliminate render-blocking scripts & tracking bloat',
    'Modular Liquid refactoring to minimize CSS & JS bundle payloads',
    'Responsive dynamic loading & priority hints for hero media',
    'Continuous monitoring for Core Web Vitals (LCP, INP, and CLS)',
  ];

  return (
    <section id="speed" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white border-b border-gray-100 overflow-hidden scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Live Performance Dashboard UI */}
          <div className="lg:col-span-6 order-2 lg:order-1 w-full min-w-0">
            <div className="rounded-2xl border border-gray-200/90 bg-white shadow-mockup-light overflow-hidden">
              {/* Header */}
              <div className="bg-[#02090A] px-4 sm:px-5 py-3.5 text-[#EFF8F0] flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono tracking-tight text-[#EFF8F0] font-medium truncate">
                    Google PageSpeed &bull; Core Web Vitals
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#C5E1C5] bg-[#061A1C] px-2 py-0.5 rounded-full border border-white/[0.08] shrink-0">
                  PASSED
                </span>
              </div>

              {/* Performance Score Gauge Card */}
              <div className="p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-[#FAF9F5] to-white border border-gray-200/80">
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Visual Gauge Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-emerald-600 flex items-center justify-center bg-emerald-50 shrink-0">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-800">99</span>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-mono text-emerald-800 font-semibold uppercase tracking-wider">
                        Performance Score
                      </p>
                      <h4 className="text-base sm:text-lg font-medium text-gray-950">Mobile Audit &bull; Clean Liquid</h4>
                      <p className="text-xs text-gray-500">Core Web Vitals thresholds met</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium bg-[#EBF7F2] text-[#0C5A48] border border-[#D1EFE3]">
                    TOP 1% OF STORES
                  </span>
                </div>

                {/* Metric Indicators */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">LCP (Largest Paint)</p>
                    <p className="text-base sm:text-lg font-semibold text-emerald-700 mt-0.5">0.8s</p>
                    <span className="text-[10px] text-emerald-600">&bull; Good</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">CLS (Layout Shift)</p>
                    <p className="text-base sm:text-lg font-semibold text-emerald-700 mt-0.5">0.00</p>
                    <span className="text-[10px] text-emerald-600">&bull; Good</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">TTFB (Server Resp)</p>
                    <p className="text-base sm:text-lg font-semibold text-emerald-700 mt-0.5">160ms</p>
                    <span className="text-[10px] text-emerald-600">&bull; Good</span>
                  </div>
                </div>

                {/* Diagnostic Checkpoints */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#EBF7F2] border border-[#D1EFE3] space-y-2 text-xs sm:text-sm text-[#0C5A48]">
                  <div className="flex items-center justify-between">
                    <span>Render-blocking scripts removed</span>
                    <span className="font-mono font-semibold">0ms delay</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Modern image formats enabled</span>
                    <span className="font-mono font-semibold">AVIF / WebP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Theme bundle minification</span>
                    <span className="font-mono font-semibold">100% active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Checklist */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider border border-[#D1EFE3]">
              <span>SPEED &amp; CORE WEB VITALS</span>
            </div>

            <h2 className="type-section text-gray-950 font-light">
              We Make Your Store{' '}
              <span className="font-normal text-[#0C5A48]">Lightning Fast</span>
            </h2>

            <p className="type-body text-gray-600 font-light">
              Every 100ms of latency reduction lifts eCommerce conversion rates by up to 1%. We eliminate third-party script debt, re-architect bloated themes, and fine-tune assets so your customers enjoy instant page loads.
            </p>

            <ul className="space-y-3 pt-2">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base text-gray-700">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C5A48] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 sm:pt-4 flex items-center">
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
                <span>Improve My Store Speed</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
