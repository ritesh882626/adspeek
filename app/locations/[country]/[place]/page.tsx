import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2, Shield, CreditCard, Building } from 'lucide-react';
import { getLocations, getLocation, getCountry } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnswerBlock } from '@/components/ui/AnswerBlock';
import { FaqBlock } from '@/components/ui/FaqBlock';
import { CtaBand } from '@/components/ui/CtaBand';

export const dynamicParams = false;

export async function generateStaticParams() {
  const locations = getLocations()
    .filter((l) => l.type === 'state' || l.type === 'city')
    .filter((l) => l.status === 'ready');

  return locations.map((l) => ({
    country: l.parentCountry,
    place: l.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; place: string }>;
}): Promise<Metadata> {
  const { country: countrySlug, place: placeSlug } = await params;
  const loc = getLocation(countrySlug, placeSlug);
  if (!loc) return {};

  const prefix = loc.type === 'city' ? 'City' : 'State / Region';
  return buildMetadata({
    title: `Shopify Development Company in ${loc.name} | AdsPeek`,
    description: loc.metaDescription,
    path: `/locations/${loc.parentCountry}/${loc.slug}/`,
  });
}

export default async function StateOrCityPage({
  params,
}: {
  params: Promise<{ country: string; place: string }>;
}) {
  const { country: countrySlug, place: placeSlug } = await params;
  const loc = getLocation(countrySlug, placeSlug);
  const country = getCountry(countrySlug);

  if (!loc || !country) notFound();

  const isCity = loc.type === 'city';

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Locations', href: '/locations/' },
              { label: country.name, href: `/locations/${country.slug}/` },
              { label: loc.name, href: `/locations/${country.slug}/${loc.slug}/` },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#36F4A4]" />
              <span>{isCity ? 'City' : 'Region'} • {country.name}</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light leading-tight">
              Shopify Development Company in{' '}
              <span className="font-normal text-[#C5E1C5]">{loc.name}</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              {loc.metaDescription}
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/contact/"
                className="px-8 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium shadow-lg transition-all flex items-center gap-2 min-h-[48px]"
              >
                <span>Book a {loc.name} Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Direct Answer */}
      <section className="py-12 bg-white border-b border-gray-200/70">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnswerBlock
              badge={`${loc.name.toUpperCase()} MARKET INSIGHT`}
              answer={loc.heroAnswer}
              highlightText={`Investment Range: ${loc.priceRangeLocal} • Hours: ${loc.timeZoneNote}`}
            />
          </div>
        </Container>
      </section>

      {/* Local Needs & Gateways */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
                REGIONAL CAPABILITIES
              </span>
              <h2 className="type-section text-gray-950 font-light mb-6">
                Tailored for {loc.name} Brands &amp; Retailers
              </h2>
              <div className="space-y-3.5">
                {loc.localNeeds.map((need, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#0C5A48] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-800 font-light">{need}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-7 sm:p-8 rounded-2xl bg-[#061A1C] text-white border border-[#142024]">
                <h3 className="text-lg font-light text-white mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#36F4A4]" />
                  <span>Payment &amp; Logistics Ecosystem</span>
                </h3>
                <p className="text-xs text-gray-400 font-light mb-4">
                  Integrated checkout gateways for {loc.name} customers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {loc.paymentGateways.map((gw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-[#C5E1C5] border border-white/10"
                    >
                      {gw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                <h3 className="text-base font-medium text-gray-950 mb-3">
                  Key Industries Served in {loc.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {loc.industries.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <Container>
        <FaqBlock faqs={loc.faqs} title={`Frequently Asked About Shopify Builds in ${loc.name}`} />
      </Container>

      {/* CTA */}
      <CtaBand
        title={`Ready to Build in ${loc.name}?`}
        highlight="Let's Schedule a Call."
        subtitle={`Connect with our technical lead to discuss your ${loc.name} eCommerce project requirements.`}
      />
    </div>
  );
}
