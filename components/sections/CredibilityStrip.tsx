import React from 'react';
import {
  IconCredibilityStore,
  IconCredibilityCustom,
  IconCredibilityGauge,
  IconCredibilityRetainer,
} from '@/components/ui/PremiumIcons';

export function CredibilityStrip() {
  const items = [
    {
      icon: IconCredibilityStore,
      title: 'Shopify Store Development',
      desc: 'Bespoke, conversion-engineered themes',
    },
    {
      icon: IconCredibilityCustom,
      title: 'Custom Storefronts',
      desc: 'Liquid & Headless architecture',
    },
    {
      icon: IconCredibilityGauge,
      title: 'eCommerce Optimization',
      desc: 'Speed, CRO & Core Web Vitals audits',
    },
    {
      icon: IconCredibilityRetainer,
      title: 'Ongoing Support',
      desc: 'Reliable sprint-based retainers',
    },
  ];

  return (
    <div className="w-full bg-[#02090A] text-[#EFF8F0] py-6 sm:py-8 lg:py-10 border-y border-white/[0.08]">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 divide-y xs:divide-y-0 xs:divide-x divide-white/[0.08]">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 sm:gap-4 ${
                  index > 0 ? 'pt-4 xs:pt-0 xs:pl-4 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#06221E] via-[#041618] to-[#02090A] border border-[#36F4A4]/30 shadow-[0_0_16px_rgba(54,244,164,0.08),inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center shrink-0">
                  <Icon size={24} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-[#EFF8F0] tracking-tight truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B1B1] mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
