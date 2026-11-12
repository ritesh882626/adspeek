'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Container } from '../ui/Container';
import { CATEGORIES } from '@/data/guides';

interface CategoryBarProps {
  categories: readonly string[];
}

export function CategoryBar({ categories }: CategoryBarProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const currentQuery = searchParams.get('q');

  const buildCategoryHref = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== 'All') {
      params.set('category', cat);
    }
    if (currentQuery) {
      params.set('q', currentQuery);
    }
    const qs = params.toString();
    return qs ? `/guides?${qs}` : '/guides';
  };

  return (
    <nav aria-label="Categories" className="bg-white border-b border-line">
      <Container className="py-6 overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <Link
                key={cat}
                href={buildCategoryHref(cat)}
                className={`snap-start whitespace-nowrap min-h-[44px] px-5 py-2.5 text-sm font-semibold transition-colors inline-flex items-center rounded-none ${
                  isSelected
                    ? 'bg-accent text-ink border-2 border-ink'
                    : 'bg-white text-ink border border-line hover:border-ink'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
