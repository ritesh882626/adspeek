import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  width?: 'full' | 'site' | '4xl' | 'default';
  className?: string;
}

export function Container({
  children,
  width = 'site',
  className = '',
}: ContainerProps) {
  const widthClasses = {
    full: 'w-full px-4 sm:px-6 md:px-8',
    site: 'w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12',
    default: 'w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8',
    '4xl': 'w-full max-w-4xl mx-auto px-4 sm:px-6',
  };

  return (
    <div className={`box-border min-w-0 ${widthClasses[width]} ${className}`}>
      {children}
    </div>
  );
}
