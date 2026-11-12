import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactWays from '@/components/contact/ContactWays';
import BriefForm from '@/components/contact/BriefForm';
import Office from '@/components/contact/Office';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Contact AdsPeek — Shopify & Growth Studio, Gurugram',
  description:
    'Talk to the team that will build and grow your Shopify store. Based in Sector 22, Gurugram, working with ambitious brands globally.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactWays />
      <BriefForm />
      <Office />
      <CtaBand
        id="cta"
        heading="Not ready to talk yet?"
        primary={{
          label: 'Build your package first',
          href: '/shopify-development',
        }}
        secondary={{
          label: 'WhatsApp us',
          href: '#whatsapp',
        }}
      />
    </>
  );
}
