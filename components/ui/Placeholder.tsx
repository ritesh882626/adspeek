import React from 'react';
import Image from 'next/image';

interface PlaceholderProps {
  label?: string;
  ratio?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  label = '[IMAGE PLACEHOLDER]',
  ratio = '4/3',
  src,
  alt = '',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full bg-placeholder border border-line flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
      ) : (
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted text-center px-4">
          {label}
        </span>
      )}
    </div>
  );
};

export default Placeholder;
