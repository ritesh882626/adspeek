import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { getMigrationPages, getMigrationPage } from '@/lib/content';
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
  const pages = getMigrationPages();
  return pages.map((p) => ({ platform: p.platform }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ platform: string }>;
}): Promise<Metadata> {
  const { platform: slug } = await params;
  const page = getMigrationPage(slug);
  if (!page) return {};

  return buildMetadata({
    title: `${page.title} | Zero Downtime & 100% SEO Preservation | AdsPeek`,
    description: page.metaDescription,
    path: `/services/shopify-migration/${page.platform}/`,
  });
}

export default async function MigrationChildPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform: slug } = await params;
  const page = getMigrationPage(slug);

  if (!page) notFound();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <JsonLd
        data={getServiceSchema({
          name: page.title,
          description: page.metaDescription,
          url: `/services/shopify-migration/${page.platform}/`,
        })}
      />

      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services/' },
              { label: 'Shopify Migration', href: '/services/shopify-migration/' },
              { label: page.name, href: `/services/shopify-migration/${page.platform}/` },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>ZERO-DOWNTIME MIGRATION</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light leading-tight">
              {page.h1}
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              {page.metaDescription}
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/contact/"
                className="px-8 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium shadow-lg transition-all flex items-center gap-2 min-h-[48px]"
              >
                <span>Plan Your Migration</span>
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
              badge="MIGRATION METHODOLOGY"
              answer={page.heroAnswer}
              highlightText={page.downtimeGuarantee}
            />
          </div>
        </Container>
      </section>

      {/* Migration Checklist */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
                INTEGRITY CHECKLIST
              </span>
              <h2 className="type-section text-gray-950 font-light">
                What Gets Migrated to Shopify
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0C5A48] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-800 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <Container>
        <FaqBlock faqs={page.faqs} title={`Frequently Asked About ${page.name} to Shopify`} />
      </Container>

      {/* CTA */}
      <CtaBand
        title={`Ready to Migrate from ${page.name}?`}
        highlight="Get Zero Downtime."
        subtitle="Speak with our migration architect to review your catalog, plugins, and custom integrations."
      />
    </div>
  );
}
