import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'dark' | 'light' | 'neutral' | 'accent';
  className?: string;
}

export function Badge({
  children,
  variant = 'green',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    green: 'bg-[#EBF7F2] text-[#0C5A48] border border-[#D1EFE3]',
    accent: 'bg-[#36F4A4]/15 text-[#36F4A4] border border-[#36F4A4]/30',
    dark: 'bg-[#18181B] text-white border border-gray-700',
    light: 'bg-white text-gray-800 border border-gray-200 shadow-sm',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
