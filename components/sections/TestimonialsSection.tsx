import React from 'react';
import { PremiumRatingStars, PremiumVerifiedShield } from '@/components/ui/PremiumIcons';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Adspeek completely re-architected our custom Shopify theme. Our mobile load times dropped from 4.2s to under 1s, and our conversion rate jumped from 1.9% to 3.4% in the very first month.',
      author: 'Marcus Vance',
      role: 'Founder & CEO',
      brand: 'Krave Apparel',
      location: 'United States',
      tag: 'Custom Theme & CRO',
    },
    {
      quote:
        'Migrating 4,000+ SKUs from WooCommerce to Shopify was terrifying for our team. Adspeek executed the cutover with zero downtime, zero missing orders, and our organic search rankings did not drop even 1%.',
      author: 'Elena Rostova',
      role: 'Head of eCommerce',
      brand: 'Nordic Living Co.',
      location: 'United Kingdom',
      tag: 'Platform Migration',
    },
    {
      quote:
        'Their understanding of Shopify Liquid and custom checkout extensions is second to none. We had very specific wholesale pricing and B2B rules that previous agencies struggled with—Adspeek solved them cleanly.',
      author: 'Rohan Mehra',
      role: 'Co-Founder & COO',
      brand: 'Botanica Wellness',
      location: 'India',
      tag: 'Shopify Plus / B2B',
    },
    {
      quote:
        'Working with Adspeek felt like having an elite in-house Shopify engineering team. The code is modular and clean, our marketing team can easily change banners and product sections without breaking anything.',
      author: 'Chloe Dupont',
      role: 'Brand Director',
      brand: 'Aurora Botanics',
      location: 'France',
      tag: 'Theme Rebuild',
    },
    {
      quote:
        'The speed optimization alone paid for the entire project in 3 weeks. Our Google PageSpeed score is 98 on mobile, and bounce rates dropped significantly across all paid ad campaigns.',
      author: 'David Harrison',
      role: 'Growth Lead',
      brand: 'Zenith Audio',
      location: 'Australia',
      tag: 'Speed Optimization',
    },
    {
      quote:
        'Adspeek built a custom bundle builder for our beverage brand that increased our average order value by $18. Transparent communication, strict deadlines, and unmatched technical execution.',
      author: 'Maya Lin',
      role: 'Founder',
      brand: 'Solstice Drinks',
      location: 'Canada',
      tag: 'Custom Section Build',
    },
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#FAF9F5] border-b border-gray-200/70 scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#D1EFE3]">
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">
            Trusted by Founders &amp;{' '}
            <span className="font-normal text-[#0C5A48]">Teams Worldwide</span>
          </h2>
          <p className="type-body text-gray-600 mt-3 sm:mt-4 font-light">
            Real feedback from eCommerce brand owners and growth leaders who trust Adspeek with their Shopify storefronts.
          </p>
        </div>

        {/* Mobile Swipe Carousel & Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-7 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none p-6 sm:p-7 md:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-card-light transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <PremiumRatingStars count={5} size={15} />
                  <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 truncate">
                    {t.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-light mb-5 sm:mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-950">{t.author}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    {t.role} &bull; <span className="text-[#0C5A48] font-medium">{t.brand}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#0C5A48] font-medium bg-[#EBF7F2] px-2.5 py-1 rounded-full border border-[#D1EFE3]">
                  <PremiumVerifiedShield size={14} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-gray-400 font-mono mt-4">
          <span>← Swipe to read reviews →</span>
        </div>
      </div>
    </section>
  );
}
