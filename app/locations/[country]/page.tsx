import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2, Shield, CreditCard, Clock } from 'lucide-react';
import { getCountries, getCountry, getLocations } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnswerBlock } from '@/components/ui/AnswerBlock';
import { FaqBlock } from '@/components/ui/FaqBlock';
import { CtaBand } from '@/components/ui/CtaBand';

export const dynamicParams = false;

export async function generateStaticParams() {
  const countries = getCountries();
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};

  return buildMetadata({
    title: `Shopify Development Company in ${country.name} | AdsPeek`,
    description: country.metaDescription,
    path: `/locations/${country.slug}/`,
  });
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountry(slug);

  if (!country) notFound();

  const childPlaces = getLocations().filter(
    (l) => l.parentCountry === country.slug && l.type !== 'country'
  );

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
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>{country.name} eCommerce Hub</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light leading-tight">
              Shopify Development Company in{' '}
              <span className="font-normal text-[#C5E1C5]">{country.name}</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              {country.metaDescription}
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/contact/"
                className="px-8 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium shadow-lg transition-all flex items-center gap-2 min-h-[48px]"
              >
                <span>Book a {country.name} Discovery Call</span>
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
              badge="LOCAL MARKET DIRECT ANSWER"
              answer={country.heroAnswer}
              highlightText={`Typical local investment: ${country.priceRangeLocal} • Timezone: ${country.timeZoneNote}`}
            />
          </div>
        </Container>
      </section>

      {/* Localized Needs & Payment Gateways */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
                LOCAL MARKET EXPERTISE
              </span>
              <h2 className="type-section text-gray-950 font-light mb-6">
                Engineered for {country.name}&apos;s Consumers &amp; Logistics
              </h2>
              <div className="space-y-3.5">
                {country.localNeeds.map((need, idx) => (
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
              {/* Regional Cities & States */}
              {childPlaces.length > 0 && (
                <div className="p-7 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                  <h3 className="text-xl font-light text-gray-950 mb-3">
                    Cities &amp; States in {country.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mb-4">
                    Explore regional Shopify development hubs and client services:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {childPlaces.map((place) => (
                      <Link
                        key={place.slug}
                        href={`/locations/${country.slug}/${place.slug}/`}
                        className="p-3.5 rounded-xl bg-gray-50 hover:bg-[#EBF7F2] border border-gray-200 hover:border-[#0C5A48]/30 transition-all flex items-center justify-between group"
                      >
                        <span className="text-sm font-medium text-gray-900 group-hover:text-[#0C5A48]">
                          {place.name}
                        </span>
                        <span className="text-xs font-mono text-gray-400 uppercase">
                          {place.type}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported Gateways */}
              <div className="p-7 sm:p-8 rounded-2xl bg-[#061A1C] text-white border border-[#142024]">
                <h3 className="text-lg font-light text-white mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#36F4A4]" />
                  <span>Supported Payment Ecosystem</span>
                </h3>
                <p className="text-xs text-gray-400 font-light mb-4">
                  Native integrations for {country.name} checkouts:
                </p>
                <div className="flex flex-wrap gap-2">
                  {country.paymentGateways.map((gw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-[#C5E1C5] border border-white/10"
                    >
                      {gw}
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
        <FaqBlock faqs={country.faqs} title={`Frequently Asked About ${country.name} Shopify Builds`} />
      </Container>

      {/* Global CTA */}
      <CtaBand
        title={`Scale Your ${country.name} Store`}
        highlight="With AdsPeek."
        subtitle={`Schedule a consultation with our ${country.name} eCommerce team to review your storefront roadmap.`}
      />
    </div>
  );
}
