import React from 'react';
import Link from 'next/link';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Placeholder from '../ui/Placeholder';
import { WORK_PROJECTS } from '@/data/work';

export const SelectedWork: React.FC = () => {
  return (
    <Section
      id="work"
      bg="paper"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <Eyebrow>04 — Selected work</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0">
            Recent builds.
          </h2>
        </div>
        <Link
          href="#work-all"
          className="hidden sm:inline-flex items-center text-[16px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px]"
        >
          See all work
        </Link>
      </div>

      {/* Desktop & Tablet Grid (640px and up) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {WORK_PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={project.href}
            className="group flex flex-col gap-4 text-ink no-underline"
          >
            <Placeholder
              ratio="4/3"
              label={project.imageLabel}
              className="w-full"
            />
            <div className="flex justify-between items-center font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
              <span>{project.category}</span>
              <span>{project.platform}</span>
            </div>
            <p className="m-0 text-[20px] font-bold tracking-[-0.01em] text-ink group-hover:text-forest transition-colors">
              {project.name}
            </p>
            <p className="m-0 text-[15px] leading-[1.5] text-body">
              {project.result}
            </p>
          </Link>
        ))}
      </div>

      {/* Mobile Horizontal Swipe Row (below 640px) */}
      <div className="sm:hidden -mx-5 px-5 flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {WORK_PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={project.href}
            className="flex-none w-[82vw] snap-start flex flex-col gap-3.5 text-ink no-underline"
          >
            <Placeholder
              ratio="4/3"
              label={project.imageLabel}
              className="w-full"
            />
            <div className="flex justify-between items-center font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
              <span>{project.category}</span>
              <span>{project.platform}</span>
            </div>
            <p className="m-0 text-[18px] font-bold tracking-[-0.01em] text-ink">
              {project.name}
            </p>
            <p className="m-0 text-[14px] leading-[1.5] text-body">
              {project.result}
            </p>
          </Link>
        ))}
      </div>

      {/* Mobile "See all work" button/link underneath */}
      <div className="sm:hidden mt-8 text-center">
        <Link
          href="#work-all"
          className="inline-flex items-center justify-center text-[16px] font-semibold text-ink underline min-h-[44px]"
        >
          See all work
        </Link>
      </div>
    </Section>
  );
};

export default SelectedWork;
