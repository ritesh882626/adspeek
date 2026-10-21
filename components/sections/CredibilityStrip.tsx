import React from 'react';
import { ShoppingBag, LayoutTemplate, Gauge, Headset } from 'lucide-react';

export function CredibilityStrip() {
  const items = [
    {
      icon: ShoppingBag,
      title: 'Shopify Store Development',
      desc: 'Bespoke, conversion-engineered themes',
    },
    {
      icon: LayoutTemplate,
      title: 'Custom Storefronts',
      desc: 'Liquid & Headless architecture',
    },
    {
      icon: Gauge,
      title: 'eCommerce Optimization',
      desc: 'Speed, CRO & Core Web Vitals audits',
    },
    {
      icon: Headset,
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
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#061A1C] border border-[#36F4A4]/20 flex items-center justify-center shrink-0 text-[#36F4A4]">
                  <Icon className="w-5 h-5" />
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
