'use client';

import React from 'react';
import {
  ShoppingBag,
  Palette,
  LayoutGrid,
  RefreshCw,
  TrendingUp,
  Wrench,
  ArrowRight,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const services = [
    {
      icon: ShoppingBag,
      title: 'Shopify Store Development',
      desc: 'Complete, custom storefront development tailored to your unique catalog, custom checkout requirements, and brand aesthetics.',
      points: ['Custom Liquid architecture', 'Zero-bloat theme coding', 'Tailored checkout & cart flows'],
    },
    {
      icon: Palette,
      title: 'Shopify Store Design',
      desc: 'Modern, high-converting storefronts built with intuitive navigation, engaging product storytelling, and deliberate customer journeys.',
      points: ['Figma to pixel-perfect code', 'Mobile-first UX hierarchy', 'Brand identity integration'],
    },
    {
      icon: LayoutGrid,
      title: 'Custom Shopify Sections',
      desc: 'Modular, editable Liquid sections built directly into your Shopify theme editor so your marketing team can build landing pages with ease.',
      points: ['Dynamic drag-and-drop sections', 'No app bloat required', 'Cross-browser tested'],
    },
    {
      icon: RefreshCw,
      title: 'Store Redesign & Migration',
      desc: 'Upgrade an outdated store or migrate smoothly from WooCommerce, Magento, or custom stacks with 100% SEO redirect preservation.',
      points: ['Zero data or order loss', 'SEO rankings protected', 'Historical customer data transfer'],
    },
    {
      icon: TrendingUp,
      title: 'Conversion Rate Optimization',
      desc: 'Improve product pages, reduce shopping cart abandonment, and eliminate mobile checkout friction through data-backed design audits.',
      points: ['Frictionless checkout paths', 'Trust & urgency micro-UX', 'Product page storytelling'],
    },
    {
      icon: Wrench,
      title: 'Store Maintenance & Support',
      desc: 'Continuous technical support, speed monitoring, seasonal campaign rollouts, and third-party app auditing to ensure peak uptime.',
      points: ['Dedicated sprint retainers', 'Speed regression monitoring', 'Emergency bug resolution'],
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white border-b border-gray-100 scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#D1EFE3]">
            <span>SERVICES</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">
            Full-Service Shopify Development for{' '}
            <span className="font-normal text-[#0C5A48]">Ambitious Brands</span>
          </h2>
          <p className="type-body text-gray-600 mt-3 sm:mt-4 font-light">
            Everything you need to launch, customize, and continuously improve your Shopify storefront without technical roadblocks.
          </p>
        </div>

        {/* Mobile Swipe Carousel & Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-7 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="snap-center shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none group p-6 sm:p-7 md:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-card-light hover:shadow-card-hover hover:border-[#0C5A48]/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EBF7F2] text-[#0C5A48] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="type-card text-gray-950 mb-2.5 group-hover:text-[#0C5A48] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-5 font-light">
                    {service.desc}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-gray-100 pt-3.5">
                    {service.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0C5A48] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectService) {
                      onSelectService(service.title);
                    } else {
                      const el = document.getElementById('hero-inquiry');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#0C5A48] hover:text-[#084537] pt-2 cursor-pointer transition-colors min-h-[44px]"
                >
                  <span>Explore Service</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-gray-400 font-mono mt-4">
          <span>← Swipe to explore services →</span>
        </div>
      </div>
    </section>
  );
}
