import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  bg?:
    | 'coal'
    | 'teal-panel'
    | 'teal-gradient'
    | 'navy-gradient'
    | 'navy-panel'
    | 'light'
    | 'cream'
    | 'offwhite';
  pad?: 'default' | 'large' | 'compact' | 'none';
  id?: string;
  className?: string;
  roundedTop?: boolean;
}

export function Section({
  children,
  bg = 'light',
  pad = 'default',
  id,
  className = '',
  roundedTop = false,
}: SectionProps) {
  const bgClasses: Record<string, string> = {
    coal: 'bg-[#02090A] text-[#EFF8F0]',
    'teal-panel': 'bg-[#061A1C] text-[#EFF8F0]',
    'teal-gradient': 'bg-gradient-teal text-[#EFF8F0]',
    'navy-gradient': 'bg-gradient-navy text-[#EFF8F0]',
    'navy-panel': 'bg-[#000A1E] text-[#EFF8F0]',
    light: 'bg-white text-[#111827]',
    cream: 'bg-[#FAF9F5] text-[#111827]',
    offwhite: 'bg-[#F4F5F6] text-[#111827]',
  };

  const padClasses: Record<string, string> = {
    none: 'py-0',
    compact: 'py-8 sm:py-12 md:py-16',
    default: 'py-12 sm:py-16 md:py-20 lg:py-28',
    large: 'py-16 sm:py-20 md:py-28 lg:py-32',
  };

  return (
    <section
      id={id}
      className={`relative w-full ${bgClasses[bg]} ${padClasses[pad]} ${
        roundedTop ? 'rounded-t-[20px] md:rounded-t-[32px]' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}
