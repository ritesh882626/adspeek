import React from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';

interface CtaBandProps {
  id?: string;
  heading: React.ReactNode;
  primary?: {
    label: string;
    href: string;
  };
  secondary?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  id = 'book',
  heading,
  primary = { label: 'Book a free strategy call', href: '/contact' },
  secondary = { label: 'WhatsApp us', href: '#whatsapp' },
  className = '',
}) => {
  return (
    <Section
      id={id}
      bg="accent"
      border={false}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
      className={className}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-10">
        <h2 className="text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold leading-[1] tracking-[-0.035em] text-ink m-0 max-w-full lg:max-w-[62%]">
          {heading}
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
          {primary && (
            <Button href={primary.href} variant="dark">
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button href={secondary.href} variant="outline-thick">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
};

export default CtaBand;
