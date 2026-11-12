import React from 'react';
import Section from '../ui/Section';
import Breadcrumb from '../ui/Breadcrumb';
import Highlight from '../ui/Highlight';

export const ContactHero: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact' },
  ];

  return (
    <Section
      id="contact-hero"
      bg="paper"
      border={true}
      padTopDesktop={56}
      padBottomDesktop={80}
      padTopMobile={40}
      padBottomMobile={56}
    >
      <Breadcrumb items={breadcrumbs} className="mb-10" />

      <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold text-ink m-0">
        Let&apos;s talk about
        <span className="hidden sm:inline">
          <br />
        </span>{' '}
        <Highlight>your store.</Highlight>
      </h1>

      <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-body max-w-[620px] mt-7 mb-0">
        Pick the way that suits you. Every message is read by the person who will work on your project.
      </p>
    </Section>
  );
};

export default ContactHero;

