import React from 'react';
import Container from './Container';

interface SectionProps {
  id?: string;
  bg?: 'paper' | 'white' | 'forest' | 'accent' | 'ink';
  border?: boolean;
  padTopDesktop?: number;
  padBottomDesktop?: number;
  padTopTablet?: number;
  padBottomTablet?: number;
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
  padTopTablet = 72,
  padBottomTablet = 72,
  padTopMobile = 56,
  padBottomMobile = 56,
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

  const getPadClasses = (mTop: number, mBottom: number, tTop: number, tBottom: number, dTop: number, dBottom: number) => {
    // Specific well-known presets
    if (mTop === 40 && mBottom === 56 && dTop === 88 && dBottom === 80) {
      return 'pt-10 pb-14 sm:pt-[72px] sm:pb-[72px] lg:pt-[88px] lg:pb-20';
    }
    if (mTop === 56 && mBottom === 56 && tTop === 72 && tBottom === 72 && dTop === 96 && dBottom === 96) {
      return 'py-14 sm:py-[72px] lg:py-24';
    }
    if (mTop === 56 && mBottom === 56 && dTop === 72 && dBottom === 72) {
      return 'py-14 lg:py-[72px]';
    }
    if (mTop === 64 && mBottom === 64 && dTop === 96 && dBottom === 96) {
      return 'py-14 sm:py-[72px] lg:py-24';
    }
    return `pt-[${mTop}px] pb-[${mBottom}px] sm:pt-[${tTop}px] sm:pb-[${tBottom}px] lg:pt-[${dTop}px] lg:pb-[${dBottom}px]`;
  };

  const padClasses = getPadClasses(
    padTopMobile,
    padBottomMobile,
    padTopTablet,
    padBottomTablet,
    padTopDesktop,
    padBottomDesktop
  );

  return (
    <section
      id={id}
      className={`relative w-full ${bgClass} ${borderClass} ${padClasses} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
};

export default Section;
