'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import WorkCard from '../ui/WorkCard';
import { WORK_PROJECTS } from '@/data/work';
import { useWorkMotion } from './useWorkMotion';

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useWorkMotion(sectionRef);

  return (
    <div ref={sectionRef}>
      <Section
        id="work"
        bg="paper"
        border={true}
        padTopDesktop={96}
        padBottomDesktop={96}
        padTopTablet={72}
        padBottomTablet={72}
        padTopMobile={56}
        padBottomMobile={56}
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow decode>04 — Selected work</Eyebrow>
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0">
              Recent builds.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center text-[16px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px]"
          >
            See all work
          </Link>
        </div>

        {/* Desktop & Tablet Grid (640px and up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {WORK_PROJECTS.map((project) => (
            <WorkCard key={project.id} project={project} motion={true} />
          ))}
        </div>

        {/* Mobile Horizontal Swipe Row (below 640px) */}
        <div className="sm:hidden -mx-5 px-5 flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {WORK_PROJECTS.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              motion={true}
              className="flex-none w-[82vw] snap-start"
            />
          ))}
        </div>

        {/* Mobile "See all work" button/link underneath */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/work"
            className="inline-flex items-center justify-center text-[16px] font-semibold text-ink underline min-h-[44px]"
          >
            See all work
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default SelectedWork;
