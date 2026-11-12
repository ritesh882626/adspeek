'use client';

import React, { useRef } from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import { useProcessMotion } from './useProcessMotion';

export const ProcessTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useProcessMotion(sectionRef);

  const steps = [
    {
      timing: 'Week [1]',
      isChip: false,
      title: 'Strategy call',
      desc: 'Goals, products, budget and a fixed quote.',
    },
    {
      timing: 'Week [1–2]',
      isChip: false,
      title: 'Design',
      desc: 'Homepage and key pages for your approval.',
    },
    {
      timing: 'Week [3–5]',
      isChip: false,
      title: 'Build & QA',
      desc: 'Store built, tested on every device.',
    },
    {
      timing: 'Week [6]',
      isChip: false,
      title: 'Launch',
      desc: 'Tracking live, first campaigns switched on.',
    },
    {
      timing: 'Every month',
      isChip: true,
      title: 'Grow',
      desc: 'Ads, automations and a report you can read in 2 minutes.',
    },
  ];

  return (
    <div ref={sectionRef}>
      <Section
        id="process"
        bg="white"
        border={true}
        padTopDesktop={96}
        padBottomDesktop={96}
        padTopTablet={72}
        padBottomTablet={72}
        padTopMobile={56}
        padBottomMobile={56}
      >
        <Eyebrow decode>05 — Process</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-14">
          From first call to monthly growth.
        </h2>

        {/* Desktop & Tablet Grid (640px and up) */}
        <ol
          data-motion="process-list"
          className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 border-t-2 border-ink list-none p-0 m-0 relative"
        >
          {steps.map((step, idx) => (
            <li key={idx} className="pt-6 flex flex-col gap-2.5 relative">
              <span data-motion="pbar" className="pbar" />
              {step.isChip ? (
                <div style={{ perspective: 300 }}>
                  <span
                    data-motion="process-monthly"
                    className="font-mono text-[12px] uppercase tracking-[0.04em] text-ink bg-accent self-start px-1.5 py-0.5 inline-block"
                  >
                    {step.timing}
                  </span>
                </div>
              ) : (
                <span
                  data-motion="process-step"
                  className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted self-start px-1.5 py-0.5 inline-block"
                >
                  {step.timing}
                </span>
              )}
              <span className="text-[20px] font-bold text-ink tracking-tight">
                {step.title}
              </span>
              <span className="text-[15px] leading-[1.5] text-body">
                {step.desc}
              </span>
            </li>
          ))}
        </ol>

        {/* Mobile Vertical List (below 640px) */}
        <ol
          data-motion="process-list"
          className="sm:hidden border-t-2 border-ink divide-y divide-line list-none p-0 m-0 relative"
        >
          {steps.map((step, idx) => (
            <li key={idx} className="py-5 flex items-start gap-4 relative">
              <span data-motion="pbar" className="pbar" />
              <div className="w-[96px] shrink-0 pt-0.5">
                {step.isChip ? (
                  <div style={{ perspective: 300 }}>
                    <span
                      data-motion="process-monthly"
                      className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink bg-accent inline-block px-1.5 py-0.5"
                    >
                      {step.timing}
                    </span>
                  </div>
                ) : (
                  <span
                    data-motion="process-step"
                    className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted inline-block px-1.5 py-0.5"
                  >
                    {step.timing}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[18px] font-bold text-ink">
                  {step.title}
                </span>
                <span className="text-[14px] leading-[1.5] text-body">
                  {step.desc}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
};

export default ProcessTimeline;
