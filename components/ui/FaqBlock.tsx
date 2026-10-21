'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { getFaqSchema } from '@/lib/schema';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqBlockProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqBlock({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Clear, direct answers to common questions about our Shopify services, architecture, and pricing.',
}: FaqBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16 border-t border-gray-200/70">
      <JsonLd data={getFaqSchema(faqs)} />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#D1EFE3]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ &amp; ADVICE</span>
          </div>
          <h2 className="type-section text-gray-950 font-light">{title}</h2>
          {subtitle && (
            <p className="type-body text-gray-600 mt-3 font-light max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#C5E1C5] shadow-sm'
                    : 'bg-white/80 border-gray-200/80 hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer min-h-[48px]"
                >
                  <span className="text-base sm:text-lg font-light text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0C5A48]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
