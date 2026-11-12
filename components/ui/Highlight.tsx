import React from 'react';

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export const Highlight: React.FC<HighlightProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`bg-accent text-ink px-[10px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] ${className}`}
    >
      {children}
    </span>
  );
};

export default Highlight;

