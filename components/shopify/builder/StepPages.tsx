import React from 'react';
import StepHeader from './StepHeader';
import OptionRow from './OptionRow';
import { PAGES } from './options';

interface StepPagesProps {
  selectedPages: Set<string>;
  onToggle: (id: string) => void;
}

export const StepPages: React.FC<StepPagesProps> = ({ selectedPages, onToggle }) => {
  return (
    <fieldset className="border-0 m-0 p-0 min-w-0">
      <StepHeader
        num="03"
        title="Which pages do you need?"
        hint="The first four come with every store. Add the rest as needed."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
        {PAGES.map((page) => (
          <OptionRow
            key={page.id}
            label={page.label}
            included={page.included}
            selected={selectedPages.has(page.id)}
            onClick={() => onToggle(page.id)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default StepPages;
