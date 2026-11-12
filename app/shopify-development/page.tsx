import type { Metadata } from 'next';
import Overview from '@/components/shopify/Overview';
import BuilderSection from '@/components/shopify/builder/BuilderSection';
import Procedure from '@/components/shopify/Procedure';
import RelatedWork from '@/components/shopify/RelatedWork';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Shopify Development Company — Custom Packages | AdsPeek',
  description:
    'Custom Shopify packages tailored to your brand. Select catalogue size, custom pages, integrations, and automations with fixed, transparent pricing.',
  alternates: {
    canonical: '/shopify-development',
  },
};

export default function ShopifyDevelopmentPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Shopify development',
    provider: {
      '@type': 'Organization',
      name: 'AdsPeek',
      url: '[SITE URL]',
    },
    areaServed: ['India', 'Worldwide'],
    description:
      "We don't sell fixed packages. You pick exactly what your store needs — catalogue size, pages, integrations and automations — and we quote for that, nothing more.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Overview />
      <BuilderSection />
      <Procedure />
      <RelatedWork />
      <CtaBand
        id="cta"
        heading="Rather talk it through?"
        primary={{
          label: 'Build your package',
          href: '#build',
        }}
        secondary={{
          label: 'WhatsApp us',
          href: '#whatsapp',
        }}
      />
    </>
  );
}

