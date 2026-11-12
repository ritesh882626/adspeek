import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import Comparison from '@/components/home/Comparison';
import ServicesList from '@/components/home/ServicesList';
import GrowthSystem from '@/components/home/GrowthSystem';
import SelectedWork from '@/components/home/SelectedWork';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import WaysToWork from '@/components/home/WaysToWork';
import Faq from '@/components/home/Faq';
import CtaBand from '@/components/sections/CtaBand';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export const metadata: Metadata = {
  title: 'AdsPeek — Shopify Development & Growth Studio, Gurugram',
  description:
    'We build high-converting Shopify stores and run the ads, automations and tracking systems that turn a launch into steady, measurable sales.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <Hero />
      <TrustStrip />
      <Comparison />
      <ServicesList />
      <GrowthSystem />
      <SelectedWork />
      <ProcessTimeline />
      <WaysToWork />
      <Faq />
      <CtaBand
        id="book"
        heading={
          <>
            Tell us about your brand.
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            We&apos;ll map the system.
          </>
        }
        primary={{
          label: 'Book a free strategy call',
          href: '/contact',
        }}
        secondary={{
          label: 'WhatsApp us',
          href: '#whatsapp',
        }}
      />
    </>
  );
}
