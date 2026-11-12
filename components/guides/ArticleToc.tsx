'use client';

import React from 'react';

export interface TocItem {
  id: string;
  text: string;
}

interface ArticleTocProps {
  items: TocItem[];
}

export const ArticleToc: React.FC<ArticleTocProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block w-[260px] shrink-0 sticky top-[104px] self-start border-l border-line pl-6">
      <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted mb-4 m-0 font-semibold">
        On this page
      </p>
      <nav aria-label="Table of contents" className="flex flex-col gap-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-[14px] text-body hover:text-forest transition-colors leading-[1.4]"
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default ArticleToc;
