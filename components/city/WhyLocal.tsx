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
      <Container className="py-16 lg:py-24">
        <Eyebrow className="mb-4">Why a {city.name} team</Eyebrow>
        <Heading level={2} className="mb-14">
          What you get by working local.
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-ink divide-y lg:divide-y-0 lg:divide-x divide-ink">
          {city.whyLocal.map((item) => (
            <div key={item.number} className="p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-medium text-muted block mb-4">
                  {item.number}
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
