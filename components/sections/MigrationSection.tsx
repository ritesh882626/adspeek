'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Database, FileText, ArrowRightLeft } from 'lucide-react';

interface MigrationSectionProps {
  onOpenConsultation?: () => void;
}

export function MigrationSection({ onOpenConsultation }: MigrationSectionProps) {
  const checklist = [
    'Product and collection catalog migration with all variants & tags',
    'Customer records and order transaction history preserved',
    'Full 301 URL redirect mapping to protect existing SEO rankings',
    'Bespoke theme & modern storefront recreation on Shopify',
    'Complete pre-launch QA, payment gateway testing & zero-downtime cutover',
  ];

  return (
    <section id="migration" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white border-b border-gray-100 overflow-hidden scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Checklist */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider border border-[#D1EFE3]">
              <span>MIGRATION EXPERTISE</span>
            </div>

            <h2 className="type-section text-gray-950 font-light">
              Move to Shopify From{' '}
              <span className="font-normal text-[#0C5A48]">Any Platform</span>
            </h2>

            <p className="type-body text-gray-600 font-light">
              Move your store to Shopify with a structured migration process designed to preserve important store data, customer accounts, and hard-earned search rankings without business disruption.
            </p>

            <ul className="space-y-3 pt-2">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base text-gray-700">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C5A48] shrink-0 mt-0.5" />
                  <span>{item}</span>
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
                <span>Plan Your Migration</span>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Migration Dashboard Mockup */}
          <div className="lg:col-span-6 w-full min-w-0">
            <div className="rounded-2xl border border-gray-200/90 bg-gray-50 shadow-mockup-light overflow-hidden">
              {/* Browser Window Header */}
              <div className="bg-white px-4 sm:px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono text-gray-500 ml-1 sm:ml-2 truncate">
                    migration-assistant.adspeek.in
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#EBF7F2] text-[#0C5A48] shrink-0">
                  LIVE ENGINE
                </span>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 sm:p-7 md:p-8 bg-white space-y-5 sm:space-y-6">
                {/* Platform Source -> Destination */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-gray-500">Source Platform</p>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">WooCommerce / Magento</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0C5A48] shadow-sm shrink-0 self-center xs:self-auto">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </div>
                  <div className="xs:text-right">
                    <p className="text-[10px] font-mono uppercase text-[#0C5A48]">Destination</p>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0C5A48]">Shopify Storefront</p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm font-medium text-gray-700 mb-1.5 gap-1">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C5A48] shrink-0" />
                        Product Catalog &amp; Variants
                      </span>
                      <span className="font-mono text-[#0C5A48] text-xs">100% (2,450 / 2,450)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="w-full h-full bg-[#0C5A48] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm font-medium text-gray-700 mb-1.5 gap-1">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C5A48] shrink-0" />
                        Customer Records &amp; Orders
                      </span>
                      <span className="font-mono text-[#0C5A48] text-xs">100% (18,920 records)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="w-full h-full bg-[#0C5A48] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm font-medium text-gray-700 mb-1.5 gap-1">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C5A48] shrink-0" />
                        301 SEO Redirect Map
                      </span>
                      <span className="font-mono text-[#0C5A48] text-xs">0 Broken Links</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="w-full h-full bg-[#0C5A48] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#EBF7F2] border border-[#D1EFE3] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 text-xs text-[#0C5A48]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0C5A48] animate-ping shrink-0" />
                    <span className="font-medium">Zero-Downtime Cutover Guarantee</span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold">STATUS: READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
