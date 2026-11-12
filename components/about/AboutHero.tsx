import React from 'react';
import Section from '../ui/Section';
import Breadcrumb from '../ui/Breadcrumb';
import Highlight from '../ui/Highlight';

export const AboutHero: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About' },
  ];

  return (
    <Section
      id="about-hero"
      bg="paper"
      border={true}
      padTopDesktop={56}
      padBottomDesktop={80}
      padTopMobile={40}
      padBottomMobile={56}
    >
      <Breadcrumb items={breadcrumbs} className="mb-10" />

      <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold text-ink m-0">
        We stay
        <span className="hidden sm:inline">
          <br />
        </span>{' '}
        <Highlight>after launch.</Highlight>
      </h1>

      <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-body max-w-[620px] mt-7 mb-0">
        AdsPeek is a Shopify and growth studio in Gurugram. We build stores for D2C brands, then run the ads and automations that make them sell.
      </p>
    </Section>
  );
};

export default AboutHero;

