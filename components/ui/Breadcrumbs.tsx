import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { getBreadcrumbSchema } from '@/lib/schema';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="py-3 text-xs text-gray-500 font-mono">
        <ol className="flex flex-wrap items-center gap-1.5">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />}
                {isLast ? (
                  <span className="text-gray-900 font-medium truncate max-w-[240px] sm:max-w-none" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#0C5A48] transition-colors flex items-center gap-1 py-1"
                  >
                    {idx === 0 && <Home className="w-3 h-3" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
