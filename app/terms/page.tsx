import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service | AdsPeek Technologies',
  description:
    'AdsPeek Terms of Service. Understand the terms, deliverables, code ownership, and warranty governing our Shopify development engagements.',
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen py-16">
      <Container>
        <Breadcrumbs items={[{ label: 'Terms of Service', href: '/terms/' }]} />
        <article className="max-w-3xl mx-auto mt-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-sm space-y-6 text-gray-700 font-light leading-relaxed">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-950 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-gray-500">
            Last Updated: October 20, 2026
          </p>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-xl font-medium text-gray-900">1. Scope of Services</h2>
            <p>
              AdsPeek provides bespoke Shopify theme engineering, UI/UX design, platform migrations, Core Web Vitals optimization, and related eCommerce technical advisory services. Detailed project specifications, milestones, and deliverables are codified in mutually agreed Statements of Work (SOW).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">2. Intellectual Property &amp; Code Ownership</h2>
            <p>
              Upon receipt of final milestone payments, the client receives 100% full intellectual property ownership of all custom Liquid templates, theme code, design tokens, and digital assets developed specifically for their storefront. AdsPeek retains no proprietary lock-in.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">3. Milestone Payments &amp; Delivery</h2>
            <p>
              Projects operate under milestone billing (typically 50% upfront retainer and 50% upon final sign-off and DNS cutover). Invoices are payable within 7 business days via bank wire or approved payment processors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">4. Warranty &amp; Post-Launch Support</h2>
            <p>
              All custom theme code includes a 30-day post-launch warranty covering any technical bugs or regressions identified against the approved scope of work. Ongoing support is available via monthly retainer agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">5. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Gurugram, Haryana.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
