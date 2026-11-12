import React from 'react';
import StepHeader from './StepHeader';
import OptionRow from './OptionRow';
import { AUTOMATIONS } from './options';

interface StepAutomationsProps {
  selectedAutomations: Set<string>;
  onToggle: (id: string) => void;
}

export const StepAutomations: React.FC<StepAutomationsProps> = ({
  selectedAutomations,
  onToggle,
}) => {
  return (
    <fieldset className="border-0 m-0 p-0 min-w-0">
      <StepHeader
        num="05"
        title="Automations"
        hint="WhatsApp and email flows that turn browsers into repeat buyers."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {AUTOMATIONS.map((item) => {
          const isSelected = selectedAutomations.has(item.id);
          return (
            <OptionRow
              key={item.id}
              label={item.label}
              desc={item.desc}
              selected={isSelected}
              statusText={isSelected ? '✓' : '+'}
              onClick={() => onToggle(item.id)}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

export default StepAutomations;
