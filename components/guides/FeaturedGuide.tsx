import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Placeholder } from '../ui/Placeholder';
import { Guide } from '@/data/guides';

interface FeaturedGuideProps {
  guide: Guide;
}

export function FeaturedGuide({ guide }: FeaturedGuideProps) {
  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-14 lg:py-18">
        <Link
          href={`/questions/${guide.slug}`}
          className="group block border border-line bg-white hover:border-ink transition-colors"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-line">
              <Placeholder
                ratio="16/9"
                label="[Featured guide cover]"
                className="w-full h-full min-h-[260px] sm:min-h-[340px]"
              />
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-accent text-ink font-mono text-xs px-2.5 py-1 mb-4 uppercase tracking-[0.06em] font-medium">
                  Featured · {guide.category}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-ink leading-tight tracking-[-0.03em] m-0 mb-4 group-hover:text-forest transition-colors">
                  {guide.title}
                </h2>
                <p className="text-base sm:text-[17px] text-body leading-relaxed m-0 mb-6">
                  {guide.summary}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs text-muted mb-4">
                  {guide.readMinutes} min read · {guide.date}
                </div>
                <span className="text-base font-semibold text-ink underline group-hover:text-forest transition-colors">
                  Read the guide
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
