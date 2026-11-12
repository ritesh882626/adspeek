import React from 'react';
import Link from 'next/link';

interface LogoProps {
  tone?: 'default' | 'onDark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ tone = 'default', className = '' }) => {
  const isDark = tone === 'onDark';
  const textColor = isDark ? 'text-white' : 'text-ink';
  const cornerBorder = isDark ? 'border-white' : 'border-ink';
  const markBg = isDark ? 'bg-accent text-ink' : 'bg-accent text-ink';

  return (
    <Link
      href="/"
      aria-label="AdsPeek Home"
      className={`inline-flex items-center gap-2.5 group ${className}`}
    >
      {/* Viewfinder mark */}
      <div
        className={`relative w-[22px] h-[22px] ${markBg} flex items-center justify-center shrink-0 p-[2px]`}
        aria-hidden="true"
      >
        <span
          className={`absolute left-0 top-0 w-[7px] h-[7px] border-l-[2px] border-t-[2px] ${cornerBorder}`}
        />
        <span
          className={`absolute right-0 bottom-0 w-[7px] h-[7px] border-r-[2px] border-b-[2px] ${cornerBorder}`}
        />
        <span className="font-extrabold text-[11px] leading-none tracking-tighter select-none font-sans">
          a
        </span>
      </div>
      <span
        className={`text-[22px] font-extrabold tracking-[-0.02em] font-sans ${textColor}`}
      >
        AdsPeek
      </span>
    </Link>
  );
};

export default Logo;

