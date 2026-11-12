import React from 'react';

interface SpecItem {
  label: string;
  value: React.ReactNode;
}

interface SpecListProps {
  headerLeft?: string;
  headerRight?: string;
  items: SpecItem[];
  className?: string;
}

export const SpecList: React.FC<SpecListProps> = ({
  headerLeft,
  headerRight,
  items,
  className = '',
}) => {
  return (
    <div className={`border border-ink bg-white w-full ${className}`}>
      {(headerLeft || headerRight) && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink bg-paper font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
          <span>{headerLeft}</span>
          <span>{headerRight}</span>
        </div>
      )}
      <div>
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col min-[380px]:flex-row min-[380px]:items-baseline px-5 py-4 gap-1.5 min-[380px]:gap-4 ${
              index > 0 ? 'border-t border-line' : ''
            }`}
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted shrink-0 min-[380px]:w-[125px]">
              {item.label}
            </span>
            <div className="text-[15px] sm:text-[16px] text-body leading-normal flex-1">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecList;

