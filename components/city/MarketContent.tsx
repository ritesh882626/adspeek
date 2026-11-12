import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { City } from '@/data/cities';

interface MarketContentProps {
  city: City;
}

export function MarketContent({ city }: MarketContentProps) {
  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <Eyebrow className="mb-4">The local market</Eyebrow>
            <Heading level={2} className="m-0 whitespace-pre-line">
              {city.marketHeading}
            </Heading>
          </div>
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-body">
            {city.marketText.map((p, idx) => (
              <p key={idx} className="m-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MarketContent;
