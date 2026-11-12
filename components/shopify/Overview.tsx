import React from 'react';
import Section from '../ui/Section';
import Breadcrumb from '../ui/Breadcrumb';
import Highlight from '../ui/Highlight';

export const Overview: React.FC = () => {
  const breadcrumbs = [
    { label: 'Services', href: '/#services' },
    { label: 'Shopify Development' },
  ];

  return (
    <Section
      id="overview"
      bg="paper"
      border={true}
      padTopDesktop={56}
      padBottomDesktop={80}
      padTopMobile={40}
      padBottomMobile={56}
    >
      <Breadcrumb items={breadcrumbs} className="mb-10" />

      <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-12 lg:gap-14">
        {/* Left column */}
        <div className="w-full lg:w-[60%] flex flex-col justify-end">
          <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.02] sm:leading-[0.98] tracking-[-0.035em] font-extrabold text-ink m-0">
            Shopify stores,
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            <Highlight>built to your list.</Highlight>
          </h1>
          <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-body max-w-[600px] mt-8 mb-0">
            We don&apos;t sell fixed packages. You pick exactly what your store needs — catalogue size, pages, integrations and automations — and we quote for that, nothing more.
          </p>
        </div>

        {/* Right column: 2x2 facts box */}
        <div className="w-full lg:w-[40%] border border-ink bg-white grid grid-cols-1 sm:grid-cols-2">
          {/* Fact 1 */}
          <div className="p-5 border-b border-line sm:border-r border-line">
            <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-2">
              What we build
            </p>
            <p className="m-0 text-[16px] font-semibold text-ink leading-[1.4]">
              New stores, migrations, redesigns, headless
            </p>
          </div>

          {/* Fact 2 */}
          <div className="p-5 border-b border-line">
            <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-2">
              You pay for
            </p>
            <p className="m-0 text-[16px] font-semibold text-ink leading-[1.4]">
              Only the parts you select
            </p>
          </div>

          {/* Fact 3 */}
          <div className="p-5 border-b sm:border-b-0 sm:border-r border-line">
            <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-2">
              Quote in
            </p>
            <p className="m-0 text-[16px] font-semibold text-ink leading-[1.4]">
              [24 hours]
            </p>
          </div>

          {/* Fact 4 */}
          <div className="p-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-2">
              After launch
            </p>
            <p className="m-0 text-[16px] font-semibold text-ink leading-[1.4]">
              Optional ads + automation plan
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Overview;

