import React from 'react';
import StepHeader from './StepHeader';
import OptionChip from './OptionChip';
import { PRODUCT_RANGES, COLLECTION_RANGES } from './options';

interface StepCatalogueProps {
  products: string;
  collections: string;
  onSelectProducts: (val: string) => void;
  onSelectCollections: (val: string) => void;
}

export const StepCatalogue: React.FC<StepCatalogueProps> = ({
  products,
  collections,
  onSelectProducts,
  onSelectCollections,
}) => {
  return (
    <fieldset className="border-0 m-0 p-0 min-w-0">
      <StepHeader
        num="02"
        title="How big is your catalogue?"
        hint="We upload and organise these for you."
      />

      <div className="mb-6">
        <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-2.5">
          Products
        </p>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_RANGES.map((val) => (
            <OptionChip
              key={val}
              label={`${val} products`}
              selected={products === val}
              onClick={() => onSelectProducts(val)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-2.5">
          Collections
        </p>
        <div className="flex flex-wrap gap-2">
          {COLLECTION_RANGES.map((val) => (
            <OptionChip
              key={val}
              label={`${val} collections`}
              selected={collections === val}
              onClick={() => onSelectCollections(val)}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default StepCatalogue;
