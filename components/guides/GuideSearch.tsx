'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function GuideSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }
    router.push(`/guides?${params.toString()}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-[420px] items-stretch"
    >
      <label htmlFor="guide-search-input" className="sr-only">
        Search guides
      </label>
      <input
        id="guide-search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search guides…"
        className="flex-1 bg-white border border-ink px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none rounded-none min-h-[48px]"
      />
      <button
        type="submit"
        className="bg-ink text-white font-semibold text-base px-6 py-3 min-h-[48px] hover:bg-[#222720] transition-colors rounded-none shrink-0"
      >
        Search
      </button>
    </form>
  );
}
