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
      <Container className="py-14 sm:py-[72px] lg:py-24">
        <Eyebrow className="mb-4">{city.workEyebrow}</Eyebrow>
        <Heading level={2} className="mb-12">
          {city.workHeading}
        </Heading>

        {/* Desktop & Tablet Grid (640px and up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Mobile Horizontal Swipe Row (below 640px) */}
        <div className="sm:hidden -mx-5 px-5 flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {city.work.map((item, idx) => (
            <div key={idx} className="flex-none w-[82vw] snap-start border border-line bg-white">
              <Placeholder
                ratio="16/10"
                label="[Store screenshot]"
                className="w-full"
              />
              <div className="p-5">
                <div className="flex justify-between font-mono text-xs uppercase tracking-[0.04em] text-muted mb-2">
                  <span>{item.category}</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg font-bold text-ink m-0">
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
