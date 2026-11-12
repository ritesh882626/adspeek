import React from 'react';
import { Container } from '../ui/Container';
import Link from 'next/link';

export function BuilderBand() {
  return (
    <section className="bg-forest text-white">
      <Container className="py-16 lg:py-18 flex flex-wrap justify-between items-center gap-8">
        <div className="max-w-[600px]">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-forest-muted mb-3">
            Custom packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-white mb-3">
            Pick your pages, integrations and automations.
          </h2>
          <p className="text-base sm:text-lg text-forest-text m-0">
            Get an itemised quote.
          </p>
        </div>
        <Link
          href="/shopify-development#build"
          className="bg-accent text-ink font-bold text-base px-7 py-4.5 min-h-[44px] inline-flex items-center hover:bg-white transition-colors"
        >
          Open the package builder
        </Link>
      </Container>
    </section>
  );
}
