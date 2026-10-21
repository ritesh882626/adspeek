import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Code2, Sparkles, HeartHandshake, Award } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'About AdsPeek | Specialized Shopify Development Agency',
  description:
    'AdsPeek is a specialized Shopify store development and eCommerce engineering agency based in Gurugram, India, building conversion-focused storefronts globally.',
  path: '/about/',
});

export default function AboutPage() {
  const values = [
    {
      title: 'Zero Bloat, Pure Liquid',
      desc: 'We never install 15 third-party apps to solve basic UI problems. We build modular Liquid sections natively inside Shopify Online Store 2.0.',
    },
    {
      title: '100% Client Code Ownership',
      desc: 'No lock-in contracts or proprietary app dependencies. When your store launches, you own every line of code, every design token, and all store assets.',
    },
    {
      title: 'Conversion-Engineered UX',
      desc: 'A beautiful store that fails to convert is a failure. We engineer mobile touch flows, PDP variant switches, and sticky checkouts specifically to maximize revenue.',
    },
    {
      title: 'Honest Milestone Billing',
      desc: 'Clear scope, fixed-price milestone billing, and mutual NDAs. You always know what is being built, when it will be delivered, and what it costs.',
    },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: 'About AdsPeek', href: '/about/' }]} />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>OUR STORY &amp; MISSION</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Engineering Shopify Stores for{' '}
              <span className="font-normal text-[#C5E1C5]">Ambitious Brands</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              AdsPeek was founded to eliminate bloated templates, slow page builders, and broken store handovers. We build Shopify storefronts that look world-class and load in under one second.
            </p>
          </div>
        </Container>
      </section>

      {/* Narrative Section */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base text-gray-700 font-light leading-relaxed">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block">
                AGENCY PHILOSOPHY
              </span>
              <h2 className="type-section text-gray-950 font-light">
                Why We Chose to Specialize Exclusively in Shopify
              </h2>
              <p>
                eCommerce platforms succeed or fail on three things: checkout reliability, mobile load speed, and ease of marketing operation. Shopify dominates all three, but only when the underlying theme is cleanly engineered.
              </p>
              <p>
                Too many brands get handed templates overloaded with 20 conflicting plugins that crash during flash sales, tank mobile Core Web Vitals, and require a developer for the simplest banner change.
              </p>
              <p>
                AdsPeek takes a different approach: we craft custom design systems in Figma, translate them into modular Shopify Online Store 2.0 Liquid sections, and hand over a storefront your marketing team can effortlessly run without writing code.
              </p>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#061A1C] text-white border border-[#142024] space-y-6">
              <h3 className="text-xl font-light text-white">Agency Snapshot</h3>
              <div className="space-y-4 text-xs sm:text-sm font-mono text-[#A8B1B1]">
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span>Headquarters</span>
                  <span className="text-white">Gurugram, Haryana, India</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span>Primary Focus</span>
                  <span className="text-[#36F4A4]">Shopify &amp; Shopify Plus</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span>Client Reach</span>
                  <span className="text-white">India, UAE, USA, UK, Australia</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span>Average Mobile Score</span>
                  <span className="text-[#36F4A4]">90+ Core Web Vitals</span>
                </div>
                <div className="flex justify-between">
                  <span>Code Ownership</span>
                  <span className="text-white">100% Client Owned</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Grid */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-200/70">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3] inline-block mb-3">
              STANDARDS
            </span>
            <h2 className="type-section text-gray-950 font-light">
              Our Non-Negotiable Engineering Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#FAF9F5] border border-gray-200/80 shadow-sm"
              >
                <h3 className="text-xl font-light text-gray-950 mb-3">{val.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBand
        title="Want to Partner With Us?"
        highlight="Start a Project."
        subtitle="Schedule a free discovery session with our founder and technical lead."
      />
    </div>
  );
}
