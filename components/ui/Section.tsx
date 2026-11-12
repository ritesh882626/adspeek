import React from 'react';
import Container from './Container';

interface SectionProps {
  id?: string;
  bg?: 'paper' | 'white' | 'forest' | 'accent' | 'ink';
  border?: boolean;
  padTopDesktop?: number;
  padBottomDesktop?: number;
  padTopMobile?: number;
  padBottomMobile?: number;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

const bgClasses: Record<string, string> = {
  paper: 'bg-paper text-ink',
  white: 'bg-white text-ink',
  forest: 'bg-forest text-forest-text',
  accent: 'bg-accent text-ink',
  ink: 'bg-ink text-paper',
};

export const Section: React.FC<SectionProps> = ({
  id,
  bg = 'paper',
  border = true,
  padTopDesktop = 96,
  padBottomDesktop = 96,
  padTopMobile = 64,
  padBottomMobile = 64,
  className = '',
  containerClassName = '',
  children,
}) => {
  const bgClass = bgClasses[bg] || bgClasses.paper;
  const borderClass = border
    ? bg === 'forest'
      ? 'border-b border-forest-line'
      : 'border-b border-line'
    : '';

  // Map common values to clean Tailwind classes
  const getPadTopClass = (mobile: number, desktop: number) => {
    if (mobile === 48 && desktop === 88) return 'pt-12 lg:pt-[88px]';
    if (mobile === 64 && desktop === 96) return 'pt-16 lg:pt-24';
    if (mobile === 0 && desktop === 0) return 'pt-0';
    return `pt-[${mobile}px] lg:pt-[${desktop}px]`;
  };

  const getPadBottomClass = (mobile: number, desktop: number) => {
    if (mobile === 64 && desktop === 80) return 'pb-16 lg:pb-20';
    if (mobile === 64 && desktop === 96) return 'pb-16 lg:pb-24';
    if (mobile === 0 && desktop === 0) return 'pb-0';
    return `pb-[${mobile}px] lg:pb-[${desktop}px]`;
  };

  const padTopClass = getPadTopClass(padTopMobile, padTopDesktop);
  const padBottomClass = getPadBottomClass(padBottomMobile, padBottomDesktop);

  return (
    <section
      id={id}
      className={`w-full relative ${bgClass} ${borderClass} ${padTopClass} ${padBottomClass} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
};

export default Section;
