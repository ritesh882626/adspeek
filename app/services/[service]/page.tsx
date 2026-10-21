import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Check, Clock, ShieldCheck, Layers } from 'lucide-react';
import { getServices, getService } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { getServiceSchema } from '@/lib/schema';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnswerBlock } from '@/components/ui/AnswerBlock';
import { FaqBlock } from '@/components/ui/FaqBlock';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} | AdsPeek`,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <JsonLd
        data={getServiceSchema({
          name: service.title,
          description: service.metaDescription,
          url: `/services/${service.slug}/`,
        })}
      />

      {/* Hero Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services/' },
              { label: service.title, href: `/services/${service.slug}/` },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>{service.category}</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light leading-tight">
              {service.h1}
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              {service.metaDescription}
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/contact/"
                className="px-8 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium shadow-lg transition-all flex items-center gap-2 min-h-[48px]"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Direct Answer Block */}
      <section className="py-12 bg-white border-b border-gray-200/70">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnswerBlock
              badge="SERVICE DEFINITION &amp; VALUE"
              answer={service.heroAnswer}
              highlightText={service.pricingNote}
            />
          </div>
        </Container>
      </section>

      {/* Scope & Deliverables */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
                SCOPE OF WORK
              </span>
              <h2 className="type-section text-gray-950 font-light mb-6">
                What&apos;s Included in Our{' '}
                <span className="font-normal text-[#0C5A48]">{service.title}</span>
              </h2>
              <p className="type-body text-gray-600 font-light mb-8">
                Every project is executed directly by specialized Shopify engineers using custom Liquid, Figma tokens, and standard OS 2.0 theme schemas.
              </p>

              <div className="space-y-3.5">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#0C5A48] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-800 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience & Process */}
            <div className="space-y-8">
              <div className="p-7 sm:p-8 rounded-2xl bg-[#061A1C] text-white border border-[#142024]">
                <h3 className="text-xl font-light text-[#EFF8F0] mb-4">
                  Who This Service Is Engineered For
                </h3>
                <ul className="space-y-3 text-sm text-[#A8B1B1]">
                  {service.targetAudience.map((aud, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#36F4A4] shrink-0 mt-2" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4 Process Steps */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                <h3 className="text-xl font-light text-gray-950 mb-6">
                  Structured Delivery Process
                </h3>
                <div className="space-y-5">
                  {service.processSteps.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-lg bg-[#EBF7F2] text-[#0C5A48] text-xs font-mono font-semibold flex items-center justify-center shrink-0">
                        {p.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{p.title}</h4>
                        <p className="text-xs text-gray-600 font-light mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service FAQs */}
      <Container>
        <FaqBlock
          faqs={service.faqs}
          title={`Frequently Asked About ${service.title}`}
        />
      </Container>

      {/* Internal Linking & Related Questions */}
      <section className="py-12 bg-white border-t border-gray-200/70">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-light text-gray-900">Explore Related Guides &amp; Questions</h3>
              <p className="text-xs text-gray-500 font-light mt-1">
                Learn about pricing, timelines, and technical comparisons.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {service.relatedQuestions.map((qSlug) => (
                <Link
                  key={qSlug}
                  href={`/questions/${qSlug}/`}
                  className="px-3.5 py-2 rounded-full bg-gray-100 hover:bg-[#EBF7F2] text-xs font-mono text-gray-700 hover:text-[#0C5A48] border border-gray-200 transition-colors"
                >
                  {qSlug.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Global CTA */}
      <CtaBand
        title={`Ready to Start with ${service.title}?`}
        highlight="Let's Talk."
        subtitle="Book a direct discovery call with our technical director or request a comprehensive milestone proposal."
      />
    </div>
  );
}
