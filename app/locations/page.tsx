import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { getLocations, getCountries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Global Shopify Development Locations | AdsPeek',
  description:
    'AdsPeek builds custom Shopify storefronts for direct-to-consumer and enterprise brands in India, UAE, UK, USA, and Australia.',
  path: '/locations/',
});

export default function LocationsHubPage() {
  const countries = getCountries();
  const allLocations = getLocations();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: 'Locations', href: '/locations/' }]} />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>GLOBAL COMMERCE REACH</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Shopify Development{' '}
              <span className="font-normal text-[#C5E1C5]">Locations &amp; Hubs</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              Headquartered in Gurugram, India, AdsPeek partners with fast-growing direct-to-consumer and retail brands worldwide, delivering localized checkout, tax, and currency engineering.
            </p>
          </div>
        </Container>
      </section>

      {/* Primary Country Hubs */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
              PRIMARY MARKETS
            </span>
            <h2 className="type-section text-gray-950 font-light">
              Where We Build &amp; Scale Stores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => {
              const childPlaces = allLocations.filter(
                (l) => l.parentCountry === country.slug && l.type !== 'country'
              );

              return (
                <div
                  key={country.slug}
                  className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#0C5A48] uppercase tracking-wider mb-3">
                      <Globe className="w-4 h-4" />
                      <span>Country Hub</span>
                    </div>

                    <h3 className="text-2xl font-light text-gray-950 mb-3">
                      <Link
                        href={`/locations/${country.slug}/`}
                        className="hover:text-[#0C5A48] transition-colors"
                      >
                        {country.name}
                      </Link>
                    </h3>

                    <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                      {country.heroAnswer}
                    </p>

                    {childPlaces.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-2">
                          States &amp; Cities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {childPlaces.map((place) => (
                            <Link
                              key={place.slug}
                              href={`/locations/${country.slug}/${place.slug}/`}
                              className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-50 hover:bg-[#EBF7F2] text-gray-700 hover:text-[#0C5A48] border border-gray-200 transition-colors"
                            >
                              {place.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <Link
                      href={`/locations/${country.slug}/`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0C5A48] hover:translate-x-1 transition-transform min-h-[44px]"
                    >
                      <span>Explore {country.name} Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Global CTA */}
      <CtaBand
        title="Looking for a Localized"
        highlight="Shopify Store?"
        subtitle="We build multi-currency, multi-region stores complying with local tax, payment, and courier ecosystems."
      />
    </div>
  );
}
