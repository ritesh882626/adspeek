import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? item.href : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={`font-mono text-[13px] text-muted ${className}`}>
        <ol className="list-none p-0 m-0 flex flex-wrap items-center gap-2">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="text-muted hover:text-ink transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-ink font-medium" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && <span className="text-line-strong select-none">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
