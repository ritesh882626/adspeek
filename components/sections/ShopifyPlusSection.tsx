'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { IconPlusB2B, IconPlusMarkets, IconPlusCheckout } from '@/components/ui/PremiumIcons';

interface ShopifyPlusSectionProps {
  onOpenConsultation?: () => void;
}

export function ShopifyPlusSection({ onOpenConsultation }: ShopifyPlusSectionProps) {
  const capabilities = [
    'Custom Checkout Extensibility & branded one-page checkout',
    'Shopify B2B wholesale pricing, custom catalogs & tiered volume rules',
    'Shopify Markets multi-currency, localized tax & international shipping',
    'Headless storefront architectures & custom Storefront API builds',
    'Enterprise ERP, CRM, WMS & inventory sync integrations',
    'High-concurrency infrastructure engineered for viral flash sale traffic',
  ];

  return (
    <section id="shopify-plus" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#FAF9F5] border-b border-gray-200/70 overflow-hidden scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Enterprise Capabilities */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider border border-[#D1EFE3]">
              <span>ENTERPRISE &amp; PLUS</span>
            </div>

            <h2 className="type-section text-gray-950 font-light">
              Shopify Solutions Built to{' '}
              <span className="font-normal text-[#0C5A48]">Scale</span>
            </h2>

            <p className="type-body text-gray-600 font-light">
              Flexible development solutions for growing eCommerce businesses with more complex storefront requirements, high product volumes, and global markets.
            </p>

            <ul className="space-y-3 pt-2">
              {capabilities.map((item, idx) => (
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
                <span>Discuss Your Requirements</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Enterprise Plus Dashboard Mockup */}
          <div className="lg:col-span-6 w-full min-w-0">
            <div className="rounded-2xl border border-gray-200/90 bg-white shadow-mockup-light overflow-hidden">
              {/* Admin Bar */}
              <div className="bg-[#061A1C] px-4 sm:px-5 py-3.5 text-[#EFF8F0] flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#36F4A4] text-[#02090A] flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">
                    S
                  </div>
                  <span className="text-xs sm:text-sm font-medium tracking-tight truncate">Shopify Plus Storefront</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#C5E1C5]">
                    ENTERPRISE TIER
                  </span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5">
                {/* 3 Metric Pills */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Flash Traffic</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mt-0.5">10k+ req/sec</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Markets Active</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mt-0.5">14 Countries</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Checkout Latency</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-[#0C5A48] mt-0.5">&lt; 180ms</p>
                  </div>
                </div>

                {/* Modules Panel with Premium Pedestals */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between gap-2 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white via-[#F4F9F6] to-[#E6F4EE] border border-[#0C5A48]/15 shadow-sm flex items-center justify-center shrink-0">
                        <IconPlusB2B size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">B2B Wholesale Portal</h4>
                        <p className="text-[11px] text-gray-500 truncate">Tiered catalogs &amp; volume pricing</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#0C5A48] shrink-0">ACTIVE</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between gap-2 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white via-[#F4F9F6] to-[#E6F4EE] border border-[#0C5A48]/15 shadow-sm flex items-center justify-center shrink-0">
                        <IconPlusMarkets size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">Shopify Markets Multi-Currency</h4>
                        <p className="text-[11px] text-gray-500 truncate">GeoIP currency routing (USD, EUR, GBP)</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#0C5A48] shrink-0">ENABLED</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between gap-2 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white via-[#F4F9F6] to-[#E6F4EE] border border-[#0C5A48]/15 shadow-sm flex items-center justify-center shrink-0">
                        <IconPlusCheckout size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">Checkout Extensibility</h4>
                        <p className="text-[11px] text-gray-500 truncate">1-click upsells &amp; loyalty rewards</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#0C5A48] shrink-0">CONFIGURED</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 text-[11px] text-gray-500 text-center border border-gray-200/80">
                  Enterprise SLA &bull; Dedicated staging &amp; GitHub version control
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
