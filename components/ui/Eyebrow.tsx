import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'neon' | 'dark' | 'emerald' | 'white' | 'pill';
  className?: string;
}

export function Eyebrow({
  children,
  tone = 'emerald',
  className = '',
}: EyebrowProps) {
  if (tone === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#D1EFE3] ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#0C5A48]" />
        {children}
      </div>
    );
  }

  const toneClasses: Record<string, string> = {
    neon: 'text-[#36F4A4]',
    emerald: 'text-[#0C5A48]',
    dark: 'text-[#18181B]',
    white: 'text-white/80',
  };

  return (
    <div
      className={`type-eyebrow font-mono mb-3.5 tracking-wider ${toneClasses[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
