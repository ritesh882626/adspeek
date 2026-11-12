import React from 'react';
import StepHeader from './StepHeader';
import OptionRow from './OptionRow';
import { INTEGRATIONS } from './options';

interface StepIntegrationsProps {
  selectedIntegrations: Set<string>;
  onToggle: (id: string) => void;
}

export const StepIntegrations: React.FC<StepIntegrationsProps> = ({
  selectedIntegrations,
  onToggle,
}) => {
  return (
    <fieldset className="border-0 m-0 p-0 min-w-0">
      <StepHeader
        num="04"
        title="Integrations"
        hint="Tools your store connects to. Not sure? Skip — we'll suggest them on the call."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {INTEGRATIONS.map((item) => {
          const isSelected = selectedIntegrations.has(item.id);
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

export default StepIntegrations;

