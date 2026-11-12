import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import Link from 'next/link';
import { City, CITIES } from '@/data/cities';

interface OtherCitiesProps {
  city: City;
}

export function OtherCities({ city }: OtherCitiesProps) {
  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-14 lg:py-18">
        <Eyebrow className="mb-4">Other cities</Eyebrow>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
          {city.nearby.map((slug) => {
            const targetCity = CITIES[slug];
            const name = targetCity?.name || slug;
            return (
              <Link
                key={slug}
                href={`/shopify-development/${slug}`}
                className="border border-ink bg-white px-4 py-3 text-[15px] font-semibold text-ink hover:bg-ink hover:text-white transition-colors min-h-[44px] inline-flex items-center justify-center sm:justify-start w-full sm:w-auto"
              >
                Shopify development in {name}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default OtherCities;
