import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { getQuestions, getQuestion } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { getArticleSchema } from '@/lib/schema';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnswerBlock } from '@/components/ui/AnswerBlock';
import { FaqBlock } from '@/components/ui/FaqBlock';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';

export const dynamicParams = false;

export async function generateStaticParams() {
  const questions = getQuestions();
  return questions.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) return {};

  return buildMetadata({
    title: `${question.title} | AdsPeek`,
    description: question.metaDescription,
    path: `/questions/${question.slug}/`,
  });
}

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = getQuestion(slug);

  if (!question) notFound();

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <JsonLd
        data={getArticleSchema({
          title: question.title,
          description: question.metaDescription,
          url: `/questions/${question.slug}/`,
          datePublished: question.updatedAt,
          authorName: question.author,
        })}
      />

      {/* Header */}
      <section className="bg-gradient-teal text-[#EFF8F0] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,225,197,0.12),rgba(2,9,10,0.8))]" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Questions & Guides', href: '/questions/' },
              { label: question.title, href: `/questions/${question.slug}/` },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#061A1C] text-[#C5E1C5] text-xs font-semibold uppercase tracking-wider border border-[#C5E1C5]/20 font-mono">
                {question.category}
              </span>
              <span className="text-xs text-[#A8B1B1] font-mono">
                Updated {question.updatedAt} • By {question.author}
              </span>
            </div>

            <h1 className="type-hero text-[#EFF8F0] font-light leading-tight">
              {question.h1}
            </h1>
            <p className="type-body text-[#A8B1B1] mt-4 font-light leading-relaxed">
              {question.metaDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Answer Block */}
      <section className="py-12 bg-white border-b border-gray-200/70">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnswerBlock
              badge="DIRECT ANSWER (TL;DR)"
              answer={question.answer}
            />

            {/* Key Takeaways */}
            <div className="mt-10 p-7 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
              <h3 className="text-lg font-medium text-gray-950 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0C5A48]" />
                <span>Key Takeaways &amp; Facts</span>
              </h3>
              <ul className="space-y-3">
                {question.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C5A48] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs if present */}
      {question.faqs && question.faqs.length > 0 && (
        <Container>
          <FaqBlock faqs={question.faqs} title="Related Questions &amp; Deep Dives" />
        </Container>
      )}

      {/* Related Questions & Primary Service Link */}
      <section className="py-12 bg-white border-t border-gray-200/70">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-light text-gray-900">Need Execution Support?</h3>
              <p className="text-xs text-gray-500 font-light mt-0.5">
                Learn more about our dedicated service:
              </p>
            </div>
            <Link
              href={`/services/${question.relatedService}/`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0C5A48] text-white text-xs font-medium hover:bg-[#084537] transition-all min-h-[44px]"
            >
              <span>Explore {question.relatedService.replace(/-/g, ' ')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Global CTA */}
      <CtaBand
        title="Ready to Build with Confidence?"
        highlight="Book a Free Call."
        subtitle="Schedule a 30-minute discovery call with our technical lead to discuss your specific store requirements."
      />
    </div>
  );
}
