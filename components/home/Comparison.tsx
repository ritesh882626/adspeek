import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';

export const Comparison: React.FC = () => {
  const comparisonRows = [
    {
      scope: 'Scope ends at',
      typical: 'Store handover',
      adspeek: 'First sales, then monthly growth',
    },
    {
      scope: 'Ads',
      typical: 'Another vendor, briefed from zero',
      adspeek: 'Same team that built the store',
    },
    {
      scope: 'Follow-up & retention',
      typical: 'Not included',
      adspeek: 'WhatsApp and email automations set up',
    },
    {
      scope: 'Tracking',
      typical: 'Pixel installed, if asked',
      adspeek: 'Pixel, Conversions API, GA4, one weekly report',
    },
    {
      scope: 'When something breaks',
      typical: 'New quote',
      adspeek: 'Fixed inside the growth plan',
    },
  ];

  return (
    <Section
      id="difference"
      bg="paper"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <Eyebrow>01 — The difference</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0">
            A store is the start,
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            not the deliverable.
          </h2>
        </div>
        <p className="text-[17px] leading-[1.55] text-body max-w-[420px] m-0">
          Here is where a typical agency&apos;s job ends, and where ours keeps going.
        </p>
      </div>

      {/* Desktop & Tablet Table (640px and up) */}
      <div className="hidden sm:block border border-ink bg-white overflow-hidden w-full">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-ink text-white font-mono text-[12px] tracking-[0.06em] uppercase">
              <th scope="col" className="p-4 sm:p-5 w-[180px] lg:w-[220px]"></th>
              <th
                scope="col"
                className="p-4 sm:p-5 border-l border-[#3A3F38] text-white font-normal"
              >
                Typical agency
              </th>
              <th
                scope="col"
                className="p-4 sm:p-5 border-l border-[#3A3F38] bg-accent text-ink font-semibold"
              >
                AdsPeek
              </th>
            </tr>
          </thead>
          <tbody className="text-[16px]">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="border-t border-line">
                <th
                  scope="row"
                  className="p-5 font-semibold text-ink align-top w-[180px] lg:w-[220px]"
                >
                  {row.scope}
                </th>
                <td className="p-5 border-l border-line text-muted align-top">
                  {row.typical}
                </td>
                <td className="p-5 border-l border-line font-medium text-ink align-top">
                  {row.adspeek}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (below 640px) */}
      <div className="sm:hidden border border-ink bg-white divide-y divide-line">
        {comparisonRows.map((row, idx) => (
          <div key={idx} className="p-5 flex flex-col gap-2.5">
            <div className="font-bold text-[16px] text-ink">{row.scope}</div>
            <div className="text-[14px] text-muted">
              <span className="font-mono uppercase text-[11px] tracking-wider text-muted mr-1">
                Typical:
              </span>{' '}
              {row.typical}
            </div>
            <div className="text-[15px] font-medium text-ink flex items-baseline gap-2 pt-0.5">
              <span
                className="w-2 h-2 bg-accent inline-block shrink-0 translate-y-[-1px]"
                aria-hidden="true"
              />
              <span>{row.adspeek}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Comparison;
