import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle, BookOpen, Clock } from 'lucide-react';
import { getQuestions } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Shopify Buyer Guides & FAQs | Technical Knowledge | AdsPeek',
  description:
    'Honest, technical answers to common questions about Shopify store costs in India, migration risks, timelines, Liquid theme development, and agency hiring.',
  path: '/questions/',
});

export default function QuestionsHubPage() {
  const questions = getQuestions();

  // Group by category
  const categories = Array.from(new Set(questions.map((q) => q.category)));

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: 'Questions & Guides', href: '/questions/' }]} />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono mb-4">
              <span>BUYER INTELLIGENCE &amp; GUIDES</span>
            </div>
            <h1 className="type-hero text-[#EFF8F0] font-light">
              Shopify Knowledge,{' '}
              <span className="font-normal text-[#C5E1C5]">Costs &amp; Playbooks</span>
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              No sales fluff. Honest, engineer-written answers to common questions about Shopify store development costs in India, platform migrations, SEO preservation, and hiring developers.
            </p>
          </div>
        </Container>
      </section>

      {/* Questions List */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-16">
            {categories.map((cat) => {
              const catQuestions = questions.filter((q) => q.category === cat);

              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0C5A48] bg-[#EBF7F2] px-3.5 py-1 rounded-full border border-[#D1EFE3]">
                      {cat}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {catQuestions.length} {catQuestions.length === 1 ? 'Guide' : 'Guides'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {catQuestions.map((q) => (
                      <div
                        key={q.slug}
                        className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#0C5A48]/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <h2 className="text-xl sm:text-2xl font-light text-gray-950 mb-3 leading-snug">
                            <Link
                              href={`/questions/${q.slug}/`}
                              className="hover:text-[#0C5A48] transition-colors"
                            >
                              {q.title}
                            </Link>
                          </h2>

                          <p className="text-sm text-gray-600 font-light leading-relaxed mb-6 line-clamp-3">
                            {q.answer}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium">
                          <span className="text-gray-500 font-mono">By {q.author}</span>
                          <Link
                            href={`/questions/${q.slug}/`}
                            className="inline-flex items-center gap-1 text-[#0C5A48] hover:translate-x-1 transition-transform min-h-[44px]"
                          >
                            <span>Read Full Answer</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBand
        title="Have a Specific Question About"
        highlight="Your Shopify Store?"
        subtitle="Our technical lead will review your store requirements and answer all your technical questions directly."
      />
    </div>
  );
}
