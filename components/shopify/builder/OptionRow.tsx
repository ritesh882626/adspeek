import React from 'react';

interface OptionRowProps {
  label: string;
  desc?: string;
  selected?: boolean;
  included?: boolean;
  statusText?: string;
  onClick?: () => void;
  className?: string;
}

export const OptionRow: React.FC<OptionRowProps> = ({
  label,
  desc,
  selected = false,
  included = false,
  statusText,
  onClick,
  className = '',
}) => {
  const isSelected = included || selected;

  let rowStyle = '';
  if (included) {
    rowStyle = 'border border-ink bg-[#EDEFE7] text-ink cursor-default m-0';
  } else if (isSelected) {
    rowStyle = 'border-2 border-ink bg-accent text-ink m-0 cursor-pointer';
  } else {
    rowStyle =
      'border border-line-strong bg-white text-ink m-[1px] hover:border-ink cursor-pointer';
  }

  const defaultStatus = included
    ? 'Included'
    : isSelected
    ? '✓ Added'
    : '+ Add';

  return (
    <button
      type="button"
      onClick={included ? undefined : onClick}
      disabled={included}
      aria-pressed={isSelected}
      aria-disabled={included ? 'true' : undefined}
      className={`flex items-center justify-between gap-3 p-3.5 sm:px-4 min-h-[52px] text-left transition-none rounded-none w-full ${rowStyle} ${className}`}
    >
      <div className="flex flex-col gap-0.5 min-w-0 pr-1">
        <span className="text-[15px] font-semibold text-ink leading-snug">
          {label}
        </span>
        {desc && (
          <span className="text-[13px] text-muted leading-tight">
            {desc}
          </span>
        )}
      </div>
      <span
        className="font-mono text-[12px] shrink-0 select-none text-ink"
        aria-hidden="true"
      >
        {statusText || defaultStatus}
      </span>
    </button>
  );
};

export default OptionRow;
