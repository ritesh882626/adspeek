import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { City } from '@/data/cities';

interface CityFaqProps {
  city: City;
}

export function CityFaq({ city }: CityFaqProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="bg-white border-b border-line">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="py-14 sm:py-[72px] lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <Eyebrow className="mb-4">FAQ</Eyebrow>
            <Heading level={2} className="m-0">
              Questions asked by {city.name} brands.
            </Heading>
          </div>
          <div className="flex flex-col border-t border-ink divide-y divide-line">
            {city.faq.map((item, idx) => (
              <div key={idx} className="py-6 first:pt-6">
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5 mt-0">
                  {item.q}
                </h3>
                <p className="text-[15px] leading-relaxed text-body m-0">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CityFaq;
