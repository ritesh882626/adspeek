'use client';

import React from 'react';
import Section from '../../ui/Section';
import Eyebrow from '../../ui/Eyebrow';
import { useBuilder } from './useBuilder';
import StepPlatform from './StepPlatform';
import StepCatalogue from './StepCatalogue';
import StepPages from './StepPages';
import StepIntegrations from './StepIntegrations';
import StepAutomations from './StepAutomations';
import StepContact from './StepContact';
import SummaryPanel from './SummaryPanel';
import MobileSummaryBar from './MobileSummaryBar';

export const BuilderSection: React.FC = () => {
  const {
    platform,
    setPlatform,
    products,
    setProducts,
    collections,
    setCollections,
    selectedPages,
    selectedIntegrations,
    selectedAutomations,
    toggle,
    contact,
    updateContactField,
    summary,
    status,
    setStatus,
    submit,
  } = useBuilder();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <>
      <Section
        id="build"
        bg="white"
        border={true}
        padTopDesktop={96}
        padBottomDesktop={96}
        padTopTablet={72}
        padBottomTablet={72}
        padTopMobile={56}
        padBottomMobile={56}
      >
        <Eyebrow>Build your package · 6 steps · about 2 minutes</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-14">
          Tell us what your store needs.
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-start w-full">
          {/* Form Column */}
          <form
            id="builder"
            onSubmit={handleFormSubmit}
            className="w-full lg:flex-1 min-w-0 flex flex-col gap-16"
          >
            <StepPlatform selected={platform} onSelect={setPlatform} />
            <StepCatalogue
              products={products}
              collections={collections}
              onSelectProducts={setProducts}
              onSelectCollections={setCollections}
            />
            <StepPages
              selectedPages={selectedPages}
              onToggle={(id) => toggle('pages', id)}
            />
            <StepIntegrations
              selectedIntegrations={selectedIntegrations}
              onToggle={(id) => toggle('integrations', id)}
            />
            <StepAutomations
              selectedAutomations={selectedAutomations}
              onToggle={(id) => toggle('automations', id)}
            />
            <StepContact
              contact={contact}
              onChange={updateContactField}
            />
          </form>

          {/* Summary Slot on Desktop & Tablet */}
          <div className="w-full lg:w-[340px] shrink-0">
            <SummaryPanel
              summary={summary}
              status={status}
              onSubmit={submit}
              onReset={() => setStatus('idle')}
            />
          </div>
        </div>
      </Section>

      {/* Floating Bottom Bar on Mobile */}
      <MobileSummaryBar itemCount={summary.itemCount} />
    </>
  );
};

export default BuilderSection;
