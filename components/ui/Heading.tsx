import React from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'hero' | 'section' | 'card' | 'dsp' | 't1' | 't2' | 't3' | 't4' | 't5' | 't6' | 't7' | 't8';

interface HeadingProps {
  as?: HeadingTag;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'light' | 'dark' | 'emerald' | 'pale' | 'neon';
}

export function Heading({
  as: Component = 'h2',
  size = 'section',
  children,
  className = '',
  tone = 'default',
}: HeadingProps) {
  const sizeClasses: Record<HeadingSize, string> = {
    hero: 'type-hero',
    section: 'type-section',
    card: 'type-card',
    dsp: 'type-hero',
    t1: 'type-section',
    t2: 'type-section',
    t3: 'text-2xl sm:text-3xl md:text-4xl font-light tracking-tight',
    t4: 'text-xl sm:text-2xl md:text-3xl font-normal tracking-tight',
    t5: 'type-card',
    t6: 'text-lg sm:text-xl font-normal',
    t7: 'text-base sm:text-lg font-medium',
    t8: 'text-sm font-medium tracking-tight',
  };

  const toneClasses: Record<string, string> = {
    default: '',
    light: 'text-[#EFF8F0]',
    dark: 'text-[#111827]',
    emerald: 'text-[#0C5A48]',
    pale: 'text-[#C5E1C5]',
    neon: 'text-[#36F4A4]',
  };

  return (
    <Component
      className={`${sizeClasses[size]} ${toneClasses[tone]} font-sans ${className}`}
    >
      {children}
    </Component>
  );
}
