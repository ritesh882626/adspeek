'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Container from '../ui/Container';
import WorkWindow from './WorkWindow';
import { Project, ProjectGroup, GROUP_LABELS } from '@/data/portfolio';

interface WorkGridProps {
  projects: Project[];
}

type CategoryFilter = ProjectGroup | 'all';

const CATEGORY_KEYS: CategoryFilter[] = [
  'all',
  'rugs',
  'clothing',
  'shoes',
  'other',
];

export const WorkGrid: React.FC<WorkGridProps> = ({ projects }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawCat = searchParams.get('category');
  const currentCategory: CategoryFilter =
    rawCat && ['rugs', 'clothing', 'shoes', 'other'].includes(rawCat)
      ? (rawCat as ProjectGroup)
      : 'all';

  // Per-card view state ('desktop' | 'phone')
  const [cardViews, setCardViews] = useState<Record<string, 'desktop' | 'phone'>>({});

  const setCardView = (id: string, view: 'desktop' | 'phone') => {
    setCardViews((prev) => ({ ...prev, [id]: view }));
  };

  const handleCategorySelect = (cat: ProjectGroup | 'all') => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (currentCategory === 'all') return projects;
    return projects.filter((p) => p.group === currentCategory);
  }, [projects, currentCategory]);

  // Counts per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const p of projects) {
      map[p.group] = (map[p.group] || 0) + 1;
    }
    return map;
  }, [projects]);

  const durations = [14, 16, 18];

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white border-b border-line py-5">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter chips (swipeable row on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-5 px-5 sm:mx-0 sm:px-0">
              {CATEGORY_KEYS.map((catKey) => {
                const label =
                  catKey === 'all' ? 'All' : GROUP_LABELS[catKey as ProjectGroup];
                const count = counts[catKey] || 0;
                const isSelected =
                  currentCategory === catKey ||
                  (catKey === 'all' && currentCategory === 'all');

                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleCategorySelect(catKey)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12px] whitespace-nowrap transition-colors outline-none cursor-pointer ${
                      isSelected
                        ? 'bg-accent text-ink border-2 border-ink font-bold'
                        : 'bg-white text-ink border border-line hover:border-ink font-medium'
                    }`}
                  >
                    <span>{label}</span>
                    <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Showing N of M */}
            <div className="font-mono text-[12px] text-muted tracking-wide shrink-0">
              Showing {filteredProjects.length} of {projects.length}
            </div>
          </div>
        </Container>
      </div>

      {/* Grid */}
      <div className="py-14 sm:py-[72px] lg:py-24 bg-paper">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProjects.map((project, index) => {
              const view = cardViews[project.id] || 'desktop';
              const duration = durations[index % durations.length];

              let hostname = '';
              try {
                hostname = new URL(project.url).hostname.replace(/^www\./, '');
              } catch {
                hostname = project.url
                  .replace(/^https?:\/\/(www\.)?/, '')
                  .replace(/\/.*$/, '');
              }

              return (
                <div
                  key={project.id}
                  className="flex flex-col justify-between border-b border-line pb-8 sm:border-b-0 sm:pb-0"
                >
                  <div>
                    {/* Browser Window */}
                    <WorkWindow
                      project={project}
                      view={view}
                      duration={duration}
                      className="w-full mb-5"
                    />

                    {/* View Controls & Group Label */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      {/* Desktop / Phone toggle */}
                      <div className="inline-flex border border-ink bg-white overflow-hidden">
                        <button
                          type="button"
                          aria-pressed={view === 'desktop'}
                          onClick={() => setCardView(project.id, 'desktop')}
                          className={`min-h-[40px] px-3 font-mono text-[11px] sm:text-[12px] font-semibold transition-colors cursor-pointer ${
                            view === 'desktop'
                              ? 'bg-ink text-white'
                              : 'bg-white text-ink hover:bg-paper'
                          }`}
                        >
                          Desktop
                        </button>
                        <button
                          type="button"
                          aria-pressed={view === 'phone'}
                          onClick={() => setCardView(project.id, 'phone')}
                          className={`min-h-[40px] px-3 font-mono text-[11px] sm:text-[12px] font-semibold border-l border-ink transition-colors cursor-pointer ${
                            view === 'phone'
                              ? 'bg-ink text-white'
                              : 'bg-white text-ink hover:bg-paper'
                          }`}
                        >
                          Phone
                        </button>
                      </div>

                      {/* Group label */}
                      <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
                        {GROUP_LABELS[project.group]}
                      </span>
                    </div>

                    {/* Title & Platform */}
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-[22px] font-bold text-ink tracking-tight m-0">
                        {project.name}
                      </h3>
                      <span className="font-mono text-[12px] text-muted shrink-0">
                        {project.platform}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[15px] leading-[1.55] text-body m-0 mb-4">
                      {project.description}
                    </p>

                    {/* Role */}
                    <p className="m-0 mb-4 text-[14px] text-ink font-medium">
                      <span className="font-mono text-[12px] text-muted mr-1.5 uppercase tracking-wider">
                        Our role ·
                      </span>
                      {project.role}
                    </p>
                  </div>

                  {/* Visit Link */}
                  <div className="pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[15px] font-semibold text-ink underline hover:text-forest transition-colors min-h-[44px]"
                    >
                      Visit {hostname}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default WorkGrid;
