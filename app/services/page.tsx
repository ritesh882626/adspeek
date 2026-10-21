import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Sparkles, Layers } from 'lucide-react';
import { getServices } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Shopify Development & eCommerce Services | AdsPeek',
  description:
    'Comprehensive Shopify store development, bespoke theme design, migrations, speed optimization, and enterprise Shopify Plus engineering.',
  path: '/services/',
});

export default function ServicesHubPage() {
  const services = getServices();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: 'Services', href: '/services/' }]} />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>SPECIALIZED SHOPIFY SOLUTIONS</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Shopify Services Built to{' '}
              <span className="font-normal text-[#C5E1C5]">Convert &amp; Scale</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              From bespoke Figma-to-Liquid theme engineering and zero-downtime platform migrations to Core Web Vitals optimization and Shopify Plus scaling.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-2xl p-7 sm:p-9 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#0C5A48]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3 py-1 rounded-full border border-[#D1EFE3]">
                      {service.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">Phase {service.phase}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-light text-gray-950 tracking-tight mb-3">
                    <Link
                      href={`/services/${service.slug}/`}
                      className="hover:text-[#0C5A48] transition-colors"
                    >
                      {service.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-6">
                    {service.heroAnswer}
                  </p>

                  <div className="space-y-2 mb-8">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0C5A48] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-light">
                    {service.pricingNote.split('.')[0]}
                  </span>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0C5A48] hover:translate-x-1 transition-transform min-h-[44px]"
                  >
                    <span>View Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Migration Feature Strip */}
      <section className="py-12 bg-white border-y border-gray-200/70">
        <Container>
          <div className="p-8 rounded-2xl bg-[#061A1C] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#36F4A4] block mb-1">
                PLATFORM MIGRATION HUB
              </span>
              <h3 className="text-2xl font-light text-white mb-2">
                Migrating from WooCommerce, Magento, or Custom Stacks?
              </h3>
              <p className="text-sm text-gray-300 font-light max-w-xl">
                We guarantee 100% SEO preservation with 1-to-1 301 redirects, customer order history mapping, and zero downtime cutovers.
              </p>
            </div>
            <Link
              href="/services/shopify-migration/woocommerce-to-shopify/"
              className="px-6 py-3.5 rounded-full bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium transition-all shrink-0 flex items-center gap-2 min-h-[44px]"
            >
              <span>Explore WooCommerce Migration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Global CTA */}
      <CtaBand
        title="Ready to Build or Upgrade Your"
        highlight="Shopify Store?"
        subtitle="Schedule a free discovery consultation with our technical director to discuss your storefront goals and timeline."
      />
    </div>
  );
}
