import React from 'react';

interface StepHeaderProps {
  num: string;
  title: string;
  hint?: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ num, title, hint }) => {
  return (
    <div className="mb-5">
      <legend className="p-0 m-0 mb-2 flex items-baseline gap-4 w-full">
        <span className="font-mono text-[14px] text-muted shrink-0">{num}</span>
        <span className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink">
          {title}
        </span>
      </legend>
      {hint && (
        <p className="m-0 sm:ml-10 text-[15px] text-muted">
          {hint}
        </p>
      )}
    </div>
  );
};

export default StepHeader;

