import React from 'react';
import Container from '../ui/Container';
import { GuideCard } from './GuideCard';
import { GuideFrontmatter } from '@/lib/guides';

interface RelatedGuidesProps {
  guides: GuideFrontmatter[];
}

export const RelatedGuides: React.FC<RelatedGuidesProps> = ({ guides }) => {
  if (!guides || guides.length === 0) return null;

  return (
    <section className="bg-paper border-t border-line py-16 sm:py-20 w-full">
      <Container>
        <div className="mb-10">
          <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted mb-2 font-semibold">
            Further reading
          </p>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.1] tracking-[-0.025em] text-ink m-0">
            Related guides.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <GuideCard
              key={guide.slug}
              guide={{
                slug: guide.slug,
                title: guide.title,
                summary: guide.description,
                category: guide.category,
                readMinutes: `${guide.readMinutes}`,
                date: guide.date,
                featured: guide.featured,
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedGuides;

