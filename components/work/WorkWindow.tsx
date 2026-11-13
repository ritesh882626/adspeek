'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/data/portfolio';

export interface WorkWindowProps {
  project: Project;
  view?: 'desktop' | 'phone';
  duration?: number;
  className?: string;
}

export const WorkWindow: React.FC<WorkWindowProps> = ({
  project,
  view = 'desktop',
  duration = 14,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let hostname = '';
  try {
    hostname = new URL(project.url).hostname.replace(/^www\./, '');
  } catch {
    hostname = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
  }

  const isPhone = view === 'phone';
  const imgSrc = isPhone ? project.mobile : project.desktop;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label={`${project.name} website preview, scrolling`}
      className={`peek-window group border border-ink bg-white outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        !isIntersecting ? 'paused' : ''
      } ${className}`}
      style={
        {
          '--peek-duration': `${duration}s`,
        } as React.CSSProperties
      }
    >
      {/* Address Bar */}
      <div className="flex items-center justify-between px-3 py-[9px] border-b border-ink font-mono text-[11px] select-none bg-white">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <span
            className="w-2.5 h-2.5 bg-accent shrink-0 inline-block border border-ink/20"
            aria-hidden="true"
          />
          <span className="truncate text-ink font-medium" title={hostname}>
            {hostname}
          </span>
        </div>
        <span className="uppercase text-muted text-[10px] tracking-wider shrink-0 font-medium">
          {isPhone ? 'Phone' : 'Desktop'}
        </span>
      </div>

      {/* Viewport */}
      <div
        data-motion="frame"
        className="relative aspect-[16/10] overflow-hidden bg-[#E7E9E1] w-full"
      >
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#E7E9E1] text-muted font-mono text-[12px]">
            <span className="text-ink font-semibold mb-1">[{project.name}]</span>
            <span>[Screenshot coming]</span>
          </div>
        ) : isPhone ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#EDEFE7] p-2">
            <div className="relative h-[88%] aspect-[9/19.5] border-[3px] border-ink bg-black overflow-hidden shadow-sm">
              <Image
                src={imgSrc}
                alt={`${project.name} website, mobile`}
                fill
                quality={75}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
                className="peek-scroll object-cover"
                onError={() => setImgError(true)}
              />
            </div>
          </div>
        ) : (
          <div data-motion="work-image" className="relative w-full h-full">
            <Image
              src={imgSrc}
              alt={`${project.name} website, desktop`}
              fill
              quality={75}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="peek-scroll object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        )}

        {/* Viewfinder corner brackets */}
        <span
          data-motion="corner"
          data-corner="tl"
          className="pointer-events-none absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-ink transition-opacity duration-200 opacity-100 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        />
        <span
          data-motion="corner"
          data-corner="tr"
          className="pointer-events-none absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-ink transition-opacity duration-200 opacity-100 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        />
        <span
          data-motion="corner"
          data-corner="bl"
          className="pointer-events-none absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-ink transition-opacity duration-200 opacity-100 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        />
        <span
          data-motion="corner"
          data-corner="br"
          className="pointer-events-none absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-ink transition-opacity duration-200 opacity-100 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default WorkWindow;

