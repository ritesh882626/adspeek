import React from 'react';

interface OptionCardProps {
  title: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  desc,
  selected,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col gap-2.5 text-left p-5 min-h-[96px] sm:min-h-[120px] transition-none cursor-pointer rounded-none w-full ${
        selected
          ? 'border-2 border-ink bg-accent text-ink m-0'
          : 'border border-line-strong bg-white text-ink m-[1px] hover:border-ink'
      } ${className}`}
    >
      <div className="flex justify-between items-center gap-2">
        <span className="text-[17px] sm:text-[18px] font-bold text-ink">
          {title}
        </span>
        <span className="font-mono text-[13px] text-ink select-none" aria-hidden="true">
          {selected ? '● Selected' : '○'}
        </span>
      </div>
      <span className="text-[13px] sm:text-[14px] leading-[1.45] text-body">
        {desc}
      </span>
    </button>
  );
};

export default OptionCard;

