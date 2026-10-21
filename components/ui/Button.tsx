import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon';
  tone?: 'light' | 'dark' | 'emerald';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  tone = 'emerald',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  size = 'default',
  fullWidth = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[38px]',
    default: 'px-6 py-3 text-base min-h-[46px]',
    lg: 'px-8 py-3.5 text-lg min-h-[52px]',
  };

  let variantClasses = '';

  if (variant === 'primary') {
    if (tone === 'emerald') {
      variantClasses =
        'bg-[#0C5A48] hover:bg-[#084537] text-white border-2 border-[#0C5A48] shadow-sm hover:shadow-md';
    } else if (tone === 'dark') {
      variantClasses =
        'bg-[#18181B] hover:bg-black text-white border-2 border-[#18181B] shadow-sm';
    } else {
      variantClasses =
        'bg-white hover:bg-gray-100 text-[#18181B] border-2 border-white shadow-sm';
    }
  } else if (variant === 'neon') {
    variantClasses =
      'bg-[#36F4A4] hover:bg-[#2de295] text-[#02090A] border-2 border-[#36F4A4] font-semibold';
  } else if (variant === 'secondary' || variant === 'outline') {
    if (tone === 'light') {
      variantClasses =
        'bg-transparent hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40';
    } else {
      variantClasses =
        'bg-transparent hover:bg-gray-50 text-[#18181B] border-2 border-gray-300 hover:border-gray-900';
    }
  } else if (variant === 'ghost') {
    variantClasses =
      'bg-transparent hover:bg-gray-100/70 text-[#18181B] border-2 border-transparent';
  }

  const baseClasses = `inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none text-center ${
    sizeClasses[size]
  } ${variantClasses} ${fullWidth ? 'w-full' : ''} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
