import React from 'react';
import {
  IconMobileFirst,
  IconSubsecondSpeed,
  IconCustomizableTheme,
  IconSmartNavigation,
  IconScalableArchitecture,
  IconConversionAnalytics,
} from '@/components/ui/PremiumIcons';

export function BenefitsSection() {
  const benefits = [
    {
      icon: IconMobileFirst,
      title: 'Mobile-First Experiences',
      desc: 'Over 78% of Shopify orders happen on mobile. We engineer intuitive touch gestures, sticky add-to-carts, and lightning thumb-friendly layouts.',
    },
    {
      icon: IconSubsecondSpeed,
      title: 'Fast-Loading Storefronts',
      desc: 'Sub-second page speeds directly lift conversion rates. We eliminate heavy script dependencies and optimize asset delivery for 90+ Core Web Vitals.',
    },
    {
      icon: IconCustomizableTheme,
      title: 'Customizable Themes',
      desc: 'Empower your marketing team. Every section we build is natively editable inside the Shopify Theme Editor without needing a developer for everyday updates.',
    },
    {
      icon: IconSmartNavigation,
      title: 'User-Friendly Navigation',
      desc: 'Smart product filtering, visual mega menus, and predictive search help customers find what they want in fewer clicks, lifting average order value.',
    },
    {
      icon: IconScalableArchitecture,
      title: 'Scalable Store Architecture',
      desc: 'Built to sustain viral flash sales, massive inventory spikes, and multi-market expansions without breaking or requiring costly rebuilds.',
    },
    {
      icon: IconConversionAnalytics,
      title: 'Analytics-Ready Implementation',
      desc: 'Properly instrumented Google Analytics 4, Meta Conversions API (CAPI), and event tracking ensure every ad dollar spent can be accurately measured.',
    },
  ];

  return (
    <section id="benefits" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#FAF9F5] border-b border-gray-200/70 scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#D1EFE3]">
            <span>BENEFITS</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">
            Everything Your Store Needs to{' '}
            <span className="font-normal text-[#0C5A48]">Win Online</span>
          </h2>
          <p className="type-body text-gray-600 mt-3 sm:mt-4 font-light">
            We focus on commercial eCommerce outcomes—higher conversions, faster speeds, and effortless store management.
          </p>
        </div>

        {/* Mobile Swipe Carousel with Snap Scrolling */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-7 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="group snap-center shrink-0 w-[82vw] max-w-[320px] sm:w-auto sm:max-w-none p-6 sm:p-7 md:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-card-light hover:border-[#0C5A48]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Premium Icon Pedestal */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-white via-[#F4F9F6] to-[#E6F4EE] border border-[#0C5A48]/15 shadow-[0_4px_16px_rgba(12,90,72,0.06)] flex items-center justify-center mb-5 sm:mb-6 group-hover:border-[#0C5A48]/35 group-hover:shadow-[0_8px_24px_rgba(12,90,72,0.12)] group-hover:-translate-y-0.5 transition-all duration-300">
                    <Icon size={30} tone="emerald" className="group-hover:scale-105" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-normal text-gray-950 mb-2 sm:mb-2.5 tracking-tight group-hover:text-[#0C5A48] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint Indicator */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-xs text-gray-400 font-mono mt-4">
          <span>← Swipe to explore benefits →</span>
        </div>
      </div>
    </section>
  );
}
