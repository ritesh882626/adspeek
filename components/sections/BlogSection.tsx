import React from 'react';
import { Clock } from 'lucide-react';

export function BlogSection() {
  const articles = [
    {
      category: 'ENGINEERING',
      readTime: '6 min read',
      title: 'Eliminating App Debt: How We Reduced Shopify Liquid Load Times by 64%',
      excerpt:
        'Third-party app scripts account for the vast majority of mobile checkout friction. Here is how native Liquid and theme app extensions restore sub-second Core Web Vitals.',
      date: 'May 2024',
      cardBg: 'bg-[#02090A]',
      textColor: 'text-[#EFF8F0]',
    },
    {
      category: 'MIGRATION',
      readTime: '8 min read',
      title: 'The Enterprise WooCommerce to Shopify Migration Blueprint',
      excerpt:
        'Step-by-step checklist for migrating 5,000+ SKUs, historical order records, and SEO authority without a single second of store downtime or ranking drop.',
      date: 'Apr 2024',
      cardBg: 'bg-[#0C5A48]',
      textColor: 'text-white',
    },
    {
      category: 'CONVERSION UX',
      readTime: '5 min read',
      title: 'Mobile PDP Architecture: 7 Micro-Interactions That Lift Mobile AOV',
      excerpt:
        'From sticky dynamic checkout buttons to clean variant swatches and clean drawers, discover the exact UX components powering top DTC storefronts.',
      date: 'Mar 2024',
      cardBg: 'bg-zinc-900',
      textColor: 'text-white',
    },
  ];

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white border-b border-gray-100 scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-[#D1EFE3]">
            <span>ENGINEERING INSIGHTS</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">
            Shopify Architecture &amp;{' '}
            <span className="font-normal text-[#0C5A48]">eCommerce Growth</span>
          </h2>
          <p className="type-body text-gray-600 mt-3 sm:mt-4 font-light">
            In-depth guides on theme development, speed tuning, platform migration, and conversion design.
          </p>
        </div>

        {/* Mobile Swipe Carousel & Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-3 gap-5 sm:gap-6 md:gap-7 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className={`snap-center shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none rounded-2xl p-6 sm:p-7 md:p-8 ${article.cardBg} ${article.textColor} shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between group cursor-pointer`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-4 sm:mb-6 opacity-90">
                  <span className="uppercase tracking-wider font-semibold">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="type-card tracking-tight font-light mb-3 sm:mb-4 group-hover:underline decoration-white/40 underline-offset-4">
                  {article.title}
                </h3>

                <p className="text-sm sm:text-base opacity-85 leading-relaxed font-light mb-6 sm:mb-8">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs sm:text-sm font-medium min-h-[44px]">
                <span>{article.date}</span>
                <span className="text-[#36F4A4] font-medium">
                  Read Article
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-gray-400 font-mono mt-4">
          <span>← Swipe to read articles →</span>
        </div>
      </div>
    </section>
  );
}
