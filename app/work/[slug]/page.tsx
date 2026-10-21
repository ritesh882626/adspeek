import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Check, ExternalLink, Quote } from 'lucide-react';
import { getCaseStudies, getCaseStudy } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';

export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return buildMetadata({
    title: `${study.title} Shopify Case Study | AdsPeek`,
    description: `${study.title} - ${study.metrics}. Learn how AdsPeek engineered this high-converting Shopify storefront.`,
    path: `/work/${study.slug}/`,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Selected Work', href: '/work/' },
              { label: study.title, href: `/work/${study.slug}/` },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-0.5 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono">
                {study.industry}
              </span>
              <span className="text-xs text-[#A8B1B1] font-mono">
                {study.location} • {study.platform}
              </span>
            </div>

            <h1 className="type-hero text-[#EFF8F0] font-light leading-tight">
              {study.title}
            </h1>

            {/* Impact Metric Banner */}
            <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#36F4A4]" />
              <span className="text-base sm:text-lg font-medium text-white">
                {study.metrics}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Body */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* The Challenge */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3 py-1 rounded-full border border-[#D1EFE3] inline-block">
                THE CHALLENGE
              </span>
              <h2 className="text-2xl font-light text-gray-950">
                What Was Holding the Store Back
              </h2>
              <p className="text-base text-gray-700 font-light leading-relaxed">
                {study.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3 py-1 rounded-full border border-[#D1EFE3] inline-block">
                THE SOLUTION
              </span>
              <h2 className="text-2xl font-light text-gray-950">
                Our Architectural Strategy &amp; Execution
              </h2>
              <p className="text-base text-gray-700 font-light leading-relaxed">
                {study.solution}
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                {study.services.map((svc, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-800 border border-gray-200"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Measurable Results */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#061A1C] text-white border border-[#142024] space-y-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#36F4A4] inline-block">
                MEASURABLE OUTCOMES
              </span>
              <h2 className="text-2xl font-light text-white">
                Verifiable Growth Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {study.results.map((res, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <Check className="w-5 h-5 text-[#36F4A4] mb-2" />
                    <p className="text-sm font-light text-gray-200">{res}</p>
                  </div>
                ))}
              </div>

              {study.clientQuote && (
                <div className="mt-8 pt-8 border-t border-white/10 flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#36F4A4] shrink-0 opacity-40" />
                  <p className="text-sm sm:text-base text-gray-300 italic font-light leading-relaxed">
                    &ldquo;{study.clientQuote}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBand
        title={`Want a Similar Storefront for Your Brand?`}
        highlight="Let's Build It."
        subtitle="Book a consultation with our team to discuss scope, timeline, and deliverables."
      />
    </div>
  );
}
