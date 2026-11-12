import React from 'react';
import { Container } from '../ui/Container';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Highlight } from '../ui/Highlight';
import { Button } from '../ui/Button';
import { SpecList } from '../ui/SpecList';
import { City } from '@/data/cities';

interface CityHeroProps {
  city: City;
}

export function CityHero({ city }: CityHeroProps) {
  const specItems = [
    ...(city.office ? [{ label: 'Office', value: city.office }] : []),
    { label: 'Meetings', value: city.meetings },
    { label: 'Stores built', value: city.storesBuilt },
    { label: 'Quote', value: city.quote },
  ];

  return (
    <section className="bg-paper border-b border-line">
      <Container className="pt-14 pb-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shopify Development', href: '/shopify-development' },
            { label: city.name },
          ]}
          className="mb-10 text-muted"
        />

        <div className="flex flex-wrap gap-14 items-end">
          <div className="flex-[999_1_560px] min-w-0">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[72px] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink m-0">
              {city.h1Lead}{' '}
              <Highlight>{city.h1Highlight}</Highlight>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-body max-w-[620px] mt-7 mb-0">
              {city.heroText}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Button href="/shopify-development#build" variant="dark">
                Build your package
              </Button>
              <Button href="/contact" variant="outline">
                {city.office ? 'Visit our office' : 'Book a strategy call'}
              </Button>
            </div>
          </div>

          <div className="flex-[1_1_340px] min-w-0 border border-ink bg-white">
            <div className="p-[14px_20px] border-b border-ink font-mono text-xs tracking-[0.06em] uppercase">
              AdsPeek · {city.name}
            </div>
            <SpecList items={specItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CityHero;
