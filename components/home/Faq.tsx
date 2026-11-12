import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import { HOME_FAQS } from './faq-data';

export const Faq: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Section
      id="faq"
      bg="white"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopTablet={72}
      padBottomTablet={72}
      padTopMobile={56}
      padBottomMobile={56}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">
        {/* Left Column (about 30%) */}
        <div className="w-full lg:w-[32%] shrink-0">
          <Eyebrow>07 — Questions</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0">
            Asked before
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            every project.
          </h2>
        </div>

        {/* Right Column (about 70%) */}
        <dl className="w-full lg:w-[68%] border-t-2 border-ink m-0 p-0">
          {HOME_FAQS.map((faq, index) => (
            <div
              key={index}
              className="py-6 border-b border-line grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 items-start"
            >
              <dt className="text-[18px] font-bold text-ink m-0">
                {faq.question}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.55] text-body">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
};

export default Faq;

