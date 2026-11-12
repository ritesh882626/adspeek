import React from 'react';
import Link from 'next/link';
import Placeholder from './Placeholder';
import { WorkProject } from '@/data/work';

interface WorkCardProps {
  project: WorkProject;
  motion?: boolean;
  className?: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  project,
  motion = false,
  className = '',
}) => {
  return (
    <Link
      href={project.href}
      data-motion="work-card"
      className={`group flex flex-col gap-4 text-ink no-underline ${className}`}
    >
      <div
        data-motion="frame"
        className="relative overflow-hidden w-full"
        style={{ position: 'relative' }}
      >
        <div data-motion="work-image" className="w-full">
          <Placeholder ratio="4/3" label={project.imageLabel} className="w-full" />
        </div>
        {motion && (
          <>
            <span
              data-motion="corner"
              data-corner="tl"
              className="vf-c vf-tl"
              aria-hidden="true"
            />
            <span
              data-motion="corner"
              data-corner="tr"
              className="vf-c vf-tr"
              aria-hidden="true"
            />
            <span
              data-motion="corner"
              data-corner="bl"
              className="vf-c vf-bl"
              aria-hidden="true"
            />
            <span
              data-motion="corner"
              data-corner="br"
              className="vf-c vf-br"
              aria-hidden="true"
            />
          </>
        )}
      </div>
      <div className="flex justify-between items-center font-mono text-[12px] uppercase tracking-[0.04em] text-muted">
        <span data-motion="work-meta">{project.category}</span>
        <span data-motion="work-meta">{project.platform}</span>
      </div>
      <p className="m-0 text-[20px] font-bold tracking-[-0.01em] text-ink group-hover:text-forest transition-colors">
        {project.name}
      </p>
      <p className="m-0 text-[15px] leading-[1.5] text-body">
        {project.result}
      </p>
    </Link>
  );
};

export default WorkCard;

