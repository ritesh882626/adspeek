import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | AdsPeek Technologies',
  description:
    'AdsPeek Privacy Policy. How we collect, use, and protect your information when using our website and services.',
  path: '/privacy-policy/',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen py-16">
      <Container>
        <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy-policy/' }]} />
        <article className="max-w-3xl mx-auto mt-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-sm space-y-6 text-gray-700 font-light leading-relaxed">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-gray-500">
            Last Updated: October 20, 2026
          </p>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-xl font-medium text-gray-900">1. Information We Collect</h2>
            <p>
              When you submit a consultation or inquiry form on adspeek.in, we collect your name, email address, company or brand name, project budget, and any project details you provide voluntarily.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">2. How We Use Your Information</h2>
            <p>
              We use your information strictly to communicate with you regarding your Shopify development inquiries, prepare milestone proposals, provide technical roadmaps, and fulfill our contractual obligations. We never sell, rent, or trade your personal or business data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">3. Data Security &amp; Confidentiality</h2>
            <p>
              All customer communications are handled over encrypted HTTPS channels. We treat all client business data, store statistics, and architectural roadmaps as strictly confidential under mutual NDA standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900">4. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or your personal information, please reach out directly to hello@adspeek.in.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
