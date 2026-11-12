import React from 'react';
import { GuideFaq } from '@/lib/guides';

interface ArticleFaqProps {
  faq: GuideFaq[];
}

export const ArticleFaq: React.FC<ArticleFaqProps> = ({ faq }) => {
  if (!faq || faq.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="border-t border-line pt-12 sm:pt-16 mt-16 sm:mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-14 mb-10">
        <div className="w-full lg:w-[32%] shrink-0">
          <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted mb-2 font-semibold">
            Common questions
          </p>
          <h2 className="text-[28px] sm:text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink m-0">
            Frequently asked.
          </h2>
        </div>

        <dl className="w-full lg:w-[68%] border-t-2 border-ink m-0 p-0">
          {faq.map((item, idx) => (
            <div
              key={idx}
              className="py-6 border-b border-line grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 items-start"
            >
              <dt className="text-[17px] sm:text-[18px] font-bold text-ink m-0">
                {item.q}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.55] text-body">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ArticleFaq;
