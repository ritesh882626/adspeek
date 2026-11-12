import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  variant?: 'dark' | 'outline' | 'outline-thick' | 'forest' | 'accent';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fullWidthOnMobile?: boolean;
}

const variantClasses: Record<string, string> = {
  dark: 'bg-ink text-white hover:bg-[#222720] border-transparent',
  outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white',
  'outline-thick': 'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-white',
  forest: 'bg-forest text-white hover:bg-[#154d3b] border-transparent',
  accent: 'bg-accent text-ink hover:bg-[#b8e232] border-transparent',
};

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'dark',
  children,
  className = '',
  onClick,
  fullWidthOnMobile = true,
}) => {
  const base =
    'inline-flex items-center justify-center px-6 py-4 text-[16px] font-semibold min-h-[44px] text-center transition-colors cursor-pointer rounded-none';
  const mobileWidth = fullWidthOnMobile ? 'w-full sm:w-auto' : '';
  const chosenVariant = variantClasses[variant] || variantClasses.dark;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${chosenVariant} ${mobileWidth} ${className}`}
    >
      {children}
    </Link>
  );
};

export default Button;
