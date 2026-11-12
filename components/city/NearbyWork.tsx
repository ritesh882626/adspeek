import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { Placeholder } from '../ui/Placeholder';
import { City } from '@/data/cities';

interface NearbyWorkProps {
  city: City;
}

export function NearbyWork({ city }: NearbyWorkProps) {
  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-16 lg:py-24">
        <Eyebrow className="mb-4">{city.workEyebrow}</Eyebrow>
        <Heading level={2} className="mb-12">
          {city.workHeading}
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {city.work.map((item, idx) => (
            <div key={idx} className="border border-line bg-white">
              <Placeholder
                ratio="16/10"
                label="[Store screenshot]"
                className="w-full"
              />
              <div className="p-6">
                <div className="flex justify-between font-mono text-xs uppercase tracking-[0.04em] text-muted mb-2">
                  <span>{item.category}</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-xl sm:text-[22px] font-bold text-ink m-0">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
