import React from 'react';
import StepHeader from './StepHeader';
import OptionCard from './OptionCard';
import { PLATFORMS } from './options';

interface StepPlatformProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const StepPlatform: React.FC<StepPlatformProps> = ({ selected, onSelect }) => {
  return (
    <fieldset className="border-0 m-0 p-0 min-w-0">
      <StepHeader
        num="01"
        title="What are we building?"
        hint="Pick one."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 w-full">
        {PLATFORMS.map((p) => (
          <OptionCard
            key={p.id}
            title={p.label}
            desc={p.desc}
            selected={selected === p.id}
            onClick={() => onSelect(p.id)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default StepPlatform;
