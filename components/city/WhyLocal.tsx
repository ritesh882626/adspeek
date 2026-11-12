import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { City } from '@/data/cities';

interface WhyLocalProps {
  city: City;
}

export function WhyLocal({ city }: WhyLocalProps) {
  return (
    <section className="bg-white border-b border-line">
      <Container className="py-14 sm:py-[72px] lg:py-24">
        <Eyebrow className="mb-4">{city.whyLocalHeading}</Eyebrow>
        <Heading level={2} className="mb-14">
          What you get by working local.
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-ink">
          {city.whyLocal.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 flex flex-col justify-between border-line ${
                idx > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''
              } ${idx === 2 ? 'sm:col-span-2 lg:col-span-1 sm:border-t lg:border-t-0' : ''}`}
            >
              <div>
                <span className="font-mono text-sm font-medium text-muted block mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-ink mb-2.5 mt-0 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-body m-0">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyLocal;
