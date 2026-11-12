import React from 'react';
import Link from 'next/link';
import { Placeholder } from '../ui/Placeholder';
import { Guide } from '@/data/guides';

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/questions/${guide.slug}`}
      className="group flex flex-col justify-between border-b border-line pb-8 hover:opacity-95 transition-opacity"
    >
      <div>
        <Placeholder
          ratio="16/10"
          label="[Cover image]"
          className="w-full mb-5 aspect-[16/9] sm:aspect-[16/10]"
        />
        <div className="flex justify-between items-center font-mono text-xs text-muted mb-2.5 uppercase tracking-[0.04em]">
          <span className="font-semibold text-ink">{guide.category}</span>
          <span>{guide.readMinutes} min read</span>
        </div>
        <h3 className="text-[20px] sm:text-[22px] font-bold text-ink leading-snug tracking-[-0.02em] m-0 mb-2 group-hover:text-forest transition-colors">
          {guide.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-body m-0">
          {guide.summary}
        </p>
      </div>
    </Link>
  );
}

