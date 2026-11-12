import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import Story from '@/components/about/Story';
import Beliefs from '@/components/about/Beliefs';
import Numbers from '@/components/about/Numbers';
import Team from '@/components/about/Team';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'About AdsPeek — Shopify & Growth Studio in Gurugram',
  description:
    'AdsPeek is a Shopify and growth studio in Gurugram. We build stores for D2C brands, then run the ads and automations that make them sell.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <Beliefs />
      <Numbers />
      <Team />
      <CtaBand
        id="cta"
        heading="Work with a team that stays."
        primary={{
          label: 'Book a call',
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
