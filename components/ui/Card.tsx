import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'glass' | 'feature' | 'bordered';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({
  children,
  variant = 'light',
  className = '',
  onClick,
  hover = true,
}: CardProps) {
  const variantClasses = {
    light:
      'bg-white border border-gray-100/90 shadow-card-light text-[#18181B]',
    dark:
      'bg-[#061A1C] border border-[#142024] shadow-card text-white',
    glass:
      'bg-white/80 backdrop-blur-md border border-white/40 shadow-sm text-[#18181B]',
    feature:
      'bg-gradient-to-br from-white to-[#FAF9F5] border border-gray-200/80 shadow-card-light text-[#18181B]',
    bordered:
      'bg-transparent border border-gray-200 text-[#18181B]',
  };

  const hoverClass = hover
    ? 'transition-all duration-300 hover:translate-y-[-2px] hover:shadow-card-hover'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 md:p-8 relative ${variantClasses[variant]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
