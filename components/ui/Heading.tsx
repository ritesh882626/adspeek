import React from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'onDark';
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  as,
  children,
  className = '',
  tone = 'default',
}) => {
  const Tag = as || (`h${level}` as React.ElementType);

  const levelClasses: Record<number, string> = {
    1: 'text-[42px] sm:text-[56px] lg:text-[76px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold',
    2: 'text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.08] sm:leading-[1.04] tracking-[-0.03em] font-extrabold',
    3: 'text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold',
  };

  const toneClass = tone === 'onDark' ? 'text-white' : 'text-ink';

  return (
    <Tag className={`${levelClasses[level] || levelClasses[2]} ${toneClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
