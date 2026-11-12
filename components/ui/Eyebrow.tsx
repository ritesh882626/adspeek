import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'default' | 'onDark';
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  tone = 'default',
  className = '',
}) => {
  const toneClass = tone === 'onDark' ? 'text-forest-muted' : 'text-muted';

  return (
    <p
      className={`font-mono text-[12px] lg:text-[13px] uppercase tracking-[0.06em] mb-4 ${toneClass} ${className}`}
    >
      {children}
    </p>
  );
};

export default Eyebrow;
