import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';

interface ArticleHeaderProps {
  title: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  updated: string;
  readMinutes: number | string;
}

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  description,
  category,
  author,
  authorRole,
  updated,
  readMinutes,
}) => {
  return (
    <header className="bg-paper border-b border-line pt-10 pb-12 sm:pt-14 sm:pb-16 w-full">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 font-mono text-[12px] sm:text-[13px] text-muted list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:text-forest transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/guides" className="hover:text-forest transition-colors">
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink font-semibold">{category}</li>
          </ol>
        </nav>

        {/* Category Chip */}
        <div className="mb-5">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] bg-accent text-ink px-2 py-1 inline-block font-semibold">
            {category}
          </span>
        </div>

        {/* H1 Title */}
        <h1 className="text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.05] tracking-[-0.035em] font-extrabold text-ink m-0 max-w-[900px] mb-6">
          {title}
        </h1>

        {/* Lead Description */}
        <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.55] text-body max-w-[720px] m-0 mb-8">
          {description}
        </p>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[12px] sm:text-[13px] text-muted pt-2 border-t border-line/60">
          <span className="text-ink font-medium">{author}</span>
          <span>·</span>
          <span>{authorRole}</span>
          <span>·</span>
          <span>Updated {formatDate(updated)}</span>
          <span>·</span>
          <span>{readMinutes} min read</span>
        </div>
      </Container>
    </header>
  );
};

export default ArticleHeader;
