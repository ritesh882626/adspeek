import React from 'react';

interface OptionChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export const OptionChip: React.FC<OptionChipProps> = ({
  label,
  selected,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`px-4 sm:px-4.5 py-3 min-h-[44px] text-[15px] transition-none cursor-pointer rounded-none inline-flex items-center justify-center ${
        selected
          ? 'font-semibold border-2 border-ink bg-accent text-ink m-0'
          : 'font-medium border border-line-strong bg-white text-ink m-[1px] hover:border-ink'
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default OptionChip;
