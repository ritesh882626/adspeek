import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import WorkWindow from '../work/WorkWindow';
import { PROJECTS, GROUP_LABELS } from '@/data/portfolio';
import { City } from '@/data/cities';

interface NearbyWorkProps {
  city: City;
}

export function NearbyWork({ city }: NearbyWorkProps) {
  const durations = [14, 16, 18];

  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-14 sm:py-[72px] lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow className="mb-3">Selected work</Eyebrow>
            <Heading level={2} className="m-0">
              Stores built near {city.name}.
            </Heading>
          </div>
          <Link
            href="/work"
            className="text-[15px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px] flex items-center"
          >
            See all work
          </Link>
        </div>

        {/* Desktop & Tablet Grid (640px and up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {city.work.map((item, idx) => {
            const project = PROJECTS.find((p) => p.id === item.projectId);
            if (!project) return null;
            const duration = durations[idx % durations.length];

            return (
              <div key={project.id} className="flex flex-col justify-between">
                <div>
                  <WorkWindow
                    project={project}
                    view="desktop"
                    duration={duration}
                    className="w-full mb-4"
                  />
                  <div className="flex justify-between font-mono text-xs uppercase tracking-[0.04em] text-muted mb-2">
                    <span>{GROUP_LABELS[project.group]}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-[22px] font-bold text-ink m-0 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-[14px] text-body leading-relaxed m-0 mb-3">
                    {project.description}
                  </p>
                </div>
                <div className="pt-1">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px] inline-flex items-center"
                  >
                    Visit {project.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Swipe Row (below 640px) */}
        <div className="sm:hidden -mx-5 px-5 flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {city.work.map((item, idx) => {
            const project = PROJECTS.find((p) => p.id === item.projectId);
            if (!project) return null;
            const duration = durations[idx % durations.length];

            return (
              <div
                key={project.id}
                className="flex-none w-[82vw] snap-start flex flex-col justify-between"
              >
                <div>
                  <WorkWindow
                    project={project}
                    view="desktop"
                    duration={duration}
                    className="w-full mb-4"
                  />
                  <div className="flex justify-between font-mono text-xs uppercase tracking-[0.04em] text-muted mb-2">
                    <span>{GROUP_LABELS[project.group]}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink m-0 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-[14px] text-body leading-relaxed m-0 mb-3">
                    {project.description}
                  </p>
                </div>
                <div className="pt-1">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px] inline-flex items-center"
                  >
                    Visit {project.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default NearbyWork;
