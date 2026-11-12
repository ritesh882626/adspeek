import React from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import Link from 'next/link';
import { City } from '@/data/cities';

interface OtherCitiesProps {
  city: City;
}

export function OtherCities({ city }: OtherCitiesProps) {
  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-14 lg:py-18">
        <Eyebrow className="mb-4">{city.otherCitiesHeading}</Eyebrow>
        <div className="flex flex-wrap gap-3">
          {city.nearby.map((item) => (
            <Link
              key={item.slug}
              href={`/shopify-development/${item.slug}`}
              className="border border-ink bg-white px-4 py-3 text-[15px] font-semibold text-ink hover:bg-ink hover:text-white transition-colors min-h-[44px] inline-flex items-center"
            >
              Shopify development in {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
