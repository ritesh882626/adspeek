import React from 'react';

type TextSize = 'body-lg' | 'body-base' | 'body-sm' | 'caption' | 'fine';
type TextTone = 'primary' | 'body' | 'muted' | 'dark' | 'secondary' | 'light' | 'emerald';

interface TextProps {
  as?: 'p' | 'span' | 'div';
  size?: TextSize;
  tone?: TextTone;
  children: React.ReactNode;
  className?: string;
}

export function Text({
  as: Component = 'p',
  size = 'body-base',
  tone = 'body',
  children,
  className = '',
}: TextProps) {
  const sizeClasses: Record<TextSize, string> = {
    'body-lg': 'text-lg md:text-xl leading-relaxed',
    'body-base': 'text-base md:text-[17px] leading-relaxed',
    'body-sm': 'text-sm md:text-[15px] leading-normal',
    caption: 'text-xs md:text-sm leading-normal',
    fine: 'text-xs leading-tight',
  };

  const toneClasses: Record<TextTone, string> = {
    primary: 'text-white',
    body: 'text-[#9797A2]',
    muted: 'text-[#71717A]',
    dark: 'text-[#18181B]',
    secondary: 'text-[#52525B]',
    light: 'text-white/90',
    emerald: 'text-[#0C5A48]',
  };

  return (
    <Component className={`${sizeClasses[size]} ${toneClasses[tone]} ${className}`}>
      {children}
    </Component>
  );
}
