import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';

export const GrowthSystem: React.FC = () => {
  const steps = [
    {
      num: '01',
      marker: '›',
      title: 'Store',
      items: [
        'Custom Shopify build',
        'Speed and mobile checkout',
        'Pages designed to convert',
      ],
    },
    {
      num: '02',
      marker: '›',
      title: 'Ads',
      items: [
        'Meta sales campaigns',
        'Click-to-WhatsApp',
        'Static and video creatives',
      ],
    },
    {
      num: '03',
      marker: '›',
      title: 'Automation',
      items: [
        'Abandoned-cart recovery',
        'WhatsApp lead replies',
        'Repeat-order reminders',
      ],
    },
    {
      num: '04',
      marker: 'back to 01',
      title: 'Tracking',
      items: [
        'Pixel + Conversions API',
        'GA4 and sales dashboard',
        'One clear weekly report',
      ],
    },
  ];

  return (
    <Section
      id="system"
      bg="forest"
      border={false}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
        <div>
          <Eyebrow tone="onDark">03 — The Growth System</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-white m-0">
            Four parts, one loop.
          </h2>
        </div>
        <p className="text-[17px] leading-[1.55] text-forest-text max-w-[440px] m-0">
          Each part feeds the next. Tracking tells the ads what works, the ads bring buyers to the store, automations bring them back.
        </p>
      </div>

      {/* Desktop & Tablet Grid (640px and up) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 border border-forest-line w-full">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-7 flex flex-col ${
              idx % 2 === 0 ? 'sm:border-r sm:border-forest-line' : ''
            } ${idx < 2 ? 'sm:border-b sm:border-forest-line lg:border-b-0' : ''} ${
              idx < 3 ? 'lg:border-r lg:border-forest-line' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-mono text-[13px] text-accent font-semibold">
                {step.num}
              </span>
              <span className="font-mono text-[13px] text-forest-muted" aria-hidden="true">
                {step.marker}
              </span>
            </div>
            <h3 className="text-[26px] font-bold text-white tracking-[-0.02em] m-0 mb-4">
              {step.title}
            </h3>
            <ul className="m-0 p-0 list-none text-[15px] leading-[1.5] text-forest-text flex flex-col gap-2.5">
              {step.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mobile Stacked List (below 640px) */}
      <div className="sm:hidden flex flex-col border border-forest-line">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[13px] text-accent font-semibold">
                  {step.num}
                </span>
                <span className="font-mono text-[12px] text-forest-muted">
                  {idx === 3 ? 'back to 01' : ''}
                </span>
              </div>
              <h3 className="text-[24px] font-bold text-white tracking-[-0.02em] m-0 mb-3">
                {step.title}
              </h3>
              <ul className="m-0 p-0 list-none text-[15px] leading-[1.5] text-forest-text flex flex-col gap-2">
                {step.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            {idx < 3 && (
              <div
                className="py-2 text-center font-mono text-[14px] text-forest-muted border-t border-b border-forest-line bg-[#0c3326]"
                aria-hidden="true"
              >
                ↓
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="p-4 bg-[#0c3326] border-t border-forest-line text-center font-mono text-[12px] text-forest-muted">
          back to 01 — the loop repeats
        </div>
      </div>
    </Section>
  );
};

export default GrowthSystem;
