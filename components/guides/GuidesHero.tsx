import React from 'react';
import { Container } from '../ui/Container';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Highlight } from '../ui/Highlight';
import { GuideSearch } from './GuideSearch';

export function GuidesHero() {
  return (
    <section className="bg-paper border-b border-line">
      <Container className="pt-14 pb-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides' }
          ]}
          className="mb-10 text-muted"
        />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-[720px]">
            <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold text-ink m-0">
              Guides for <Highlight>D2C founders.</Highlight>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-body mt-7 mb-0 max-w-[620px]">
              Honest notes on Shopify development, theme speed, Meta ads and automations. Written by the team building the stores.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:shrink-0">
            <GuideSearch />
          </div>
        </div>
      </Container>
    </section>
  );
}

