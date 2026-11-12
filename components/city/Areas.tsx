import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { City } from '@/data/cities';

interface AreasProps {
  city: City;
}

export function Areas({ city }: AreasProps) {
  return (
    <section className="bg-white border-b border-line">
      <Container className="py-14 lg:py-18">
        <Eyebrow className="mb-4">{city.areasEyebrow}</Eyebrow>
        <Heading level={2} className="text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] mb-8">
          {city.areasHeading}
        </Heading>
        <div className="flex flex-wrap gap-2.5">
          {city.areas.map((area) => (
            <span
              key={area}
              className="px-4 py-2.5 border border-line bg-paper text-[15px] font-medium text-ink"
            >
              {area}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

