'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { GuideCard } from './GuideCard';
import { Guide } from '@/data/guides';

interface GuideGridProps {
  guides: Guide[];
  activeCategory: string;
  searchQuery: string;
}

export function GuideGrid({
  guides,
  activeCategory,
  searchQuery
}: GuideGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = guides.filter((g) => {
    const matchesCat =
      activeCategory === 'All' || g.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const visibleGuides = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="bg-white border-b border-line">
      <Container className="py-16 lg:py-24">
        <Eyebrow className="mb-4">Latest guides</Eyebrow>
        <Heading level={2} className="mb-12">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All publications.'}
        </Heading>

        {filtered.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-line bg-paper">
            <p className="text-lg text-body mb-4">No guides match that yet.</p>
            <Link
              href="/guides"
              className="inline-flex items-center text-sm font-semibold text-ink underline hover:text-forest"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {visibleGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="border border-ink bg-transparent text-ink font-semibold px-8 py-3.5 hover:bg-ink hover:text-white transition-colors rounded-none min-h-[44px]"
                >
                  Load more guides
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
