import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Layers, ExternalLink } from 'lucide-react';
import { getCaseStudies } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Selected Shopify Store Portfolio & Case Studies | AdsPeek',
  description:
    'Explore verified Shopify and Shopify Plus store builds, custom themes, and platform migrations engineered by AdsPeek for direct-to-consumer brands.',
  path: '/work/',
});

export default function WorkHubPage() {
  const caseStudies = getCaseStudies();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: 'Selected Work', href: '/work/' }]} />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>PROVEN CLIENT RESULTS</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Selected Work &amp;{' '}
              <span className="font-normal text-[#C5E1C5]">Case Studies</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              Real stores, measurable conversion gains, and zero-downtime platform migrations. Explore how we engineer Shopify storefronts for high-growth direct-to-consumer brands.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <div
                key={study.slug}
                className="bg-white rounded-3xl p-7 sm:p-10 border border-gray-200/80 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3 py-1 rounded-full border border-[#D1EFE3]">
                      {study.industry}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {study.location} • {study.platform}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-light text-gray-950 tracking-tight">
                    <Link
                      href={`/work/${study.slug}/`}
                      className="hover:text-[#0C5A48] transition-colors"
                    >
                      {study.title}
                    </Link>
                  </h2>

                  {/* Measurable Metric */}
                  <div className="p-4 rounded-xl bg-[#EBF7F2] border border-[#D1EFE3] flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-[#0C5A48] shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-gray-900">
                      {study.metrics}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                    {study.challenge}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {study.services.map((svc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-[#02090A] to-[#0C5A48] p-8 rounded-2xl text-white flex flex-col justify-between min-h-[280px]">
                  <div>
                    <span className="text-xs font-mono text-[#36F4A4] uppercase tracking-wider block mb-2">
                      Key Outcomes
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200 font-light">
                      {study.results.map((res, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#36F4A4] mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/work/${study.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white hover:text-[#36F4A4] transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Visit Store</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBand
        title="Want Results Like These for"
        highlight="Your Store?"
        subtitle="Book a consultation with our team to discuss your store architecture, metrics, and conversion strategy."
      />
    </div>
  );
}
