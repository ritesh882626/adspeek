import React from 'react';
import Link from 'next/link';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import WorkWindow from '../work/WorkWindow';
import { PROJECTS, GROUP_LABELS, Project } from '@/data/portfolio';

interface RelatedWorkProps {
  heading?: string;
  eyebrow?: string;
  limit?: number;
}

export const RelatedWork: React.FC<RelatedWorkProps> = ({
  heading = "Shopify stores we've built.",
  eyebrow = "Related work",
  limit = 6,
}) => {
  const displayProjects: Project[] = PROJECTS.slice(0, limit);
  const durations = [14, 16, 18, 15, 17, 19];

  return (
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
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0">
            {heading}
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
        {displayProjects.map((project, index) => {
          const duration = durations[index % durations.length];
          return (
            <div
              key={project.id}
              className="flex flex-col justify-between text-ink"
            >
              <div>
                <WorkWindow
                  project={project}
                  view="desktop"
                  duration={duration}
                  className="w-full mb-4"
                />
                <div className="flex justify-between items-center font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-2">
                  <span>{GROUP_LABELS[project.group]}</span>
                  <span>{project.platform}</span>
                </div>
                <h3 className="m-0 text-[20px] font-bold tracking-[-0.01em] text-ink mb-1.5">
                  {project.name}
                </h3>
                <p className="m-0 text-[14px] leading-[1.5] text-body mb-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px] inline-flex items-center"
                >
                  Visit {project.name}
                </a>
                <Link
                  href="/work"
                  className="text-[13px] font-mono text-muted hover:text-forest transition-colors"
                >
                  View in work
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Horizontal Swipe Row (below 640px) */}
      <div className="sm:hidden -mx-5 px-5 flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {displayProjects.map((project, index) => {
          const duration = durations[index % durations.length];
          return (
            <div
              key={project.id}
              className="flex-none w-[82vw] snap-start flex flex-col justify-between text-ink"
            >
              <div>
                <WorkWindow
                  project={project}
                  view="desktop"
                  duration={duration}
                  className="w-full mb-4"
                />
                <div className="flex justify-between items-center font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-2">
                  <span>{GROUP_LABELS[project.group]}</span>
                  <span>{project.platform}</span>
                </div>
                <h3 className="m-0 text-[19px] font-bold tracking-[-0.01em] text-ink mb-1.5">
                  {project.name}
                </h3>
                <p className="m-0 text-[13px] leading-[1.5] text-body mb-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-ink underline min-h-[44px] inline-flex items-center"
                >
                  Visit {project.name}
                </a>
                <Link
                  href="/work"
                  className="text-[13px] font-mono text-muted"
                >
                  View in work
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom "View all client projects" CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/work"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-white font-semibold text-[15px] hover:bg-forest transition-colors min-h-[44px]"
        >
          View all {PROJECTS.length} client projects
        </Link>
      </div>
    </Section>
  );
};

export default RelatedWork;
