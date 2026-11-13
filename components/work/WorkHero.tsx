import React from 'react';
import Section from '../ui/Section';
import Breadcrumb from '../ui/Breadcrumb';
import Highlight from '../ui/Highlight';

interface WorkHeroProps {
  projectCount: number;
}

export const WorkHero: React.FC<WorkHeroProps> = ({ projectCount }) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Work' },
  ];

  return (
    <Section
      id="work-hero"
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
            Scroll through
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            <Highlight>stores we&apos;ve built.</Highlight>
          </h1>
          <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.55] text-body max-w-[620px] mt-8 mb-0">
            Every window scrolls the real site from top to bottom. Hover to pause. Switch to phone view to see the mobile store.
          </p>
        </div>

        {/* Right column: 3-cell stat box */}
        <div className="w-full lg:w-[40%] border border-ink bg-white grid grid-cols-3">
          <div className="p-5 border-r border-line text-center sm:text-left">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-1">
              Projects
            </p>
            <p className="m-0 text-[24px] sm:text-[30px] font-extrabold text-ink tracking-tight font-mono">
              {projectCount}
            </p>
          </div>
          <div className="p-5 border-r border-line text-center sm:text-left">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-1">
              Categories
            </p>
            <p className="m-0 text-[24px] sm:text-[30px] font-extrabold text-ink tracking-tight font-mono">
              4
            </p>
          </div>
          <div className="p-5 text-center sm:text-left">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.04em] text-muted m-0 mb-1">
              Countries
            </p>
            <p className="m-0 text-[24px] sm:text-[30px] font-extrabold text-ink tracking-tight font-mono">
              6+
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkHero;

