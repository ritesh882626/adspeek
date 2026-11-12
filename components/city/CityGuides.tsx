import React from 'react';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Heading from '../ui/Heading';
import { GuideCard } from '../guides/GuideCard';
import { getGuide } from '@/lib/guides';

interface CityGuidesProps {
  cityName: string;
  citySlug: string;
}

export function CityGuides({ cityName, citySlug }: CityGuidesProps) {
  const isTechHub = citySlug === 'mumbai' || citySlug === 'bangalore';
  const thirdGuideSlug = isTechHub
    ? 'headless-shopify-when-worth-it'
    : 'cod-confirmation-whatsapp';

  const slugs = [
    'shopify-store-cost-india',
    'shopify-vs-woocommerce-india',
    thirdGuideSlug,
  ];

  const guides = slugs
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({
      slug: g.frontmatter.slug,
      title: g.frontmatter.title,
      summary: g.frontmatter.description,
      category: g.frontmatter.category,
      readMinutes: `${g.frontmatter.readMinutes}`,
      date: g.frontmatter.date,
      featured: g.frontmatter.featured,
    }));

  return (
    <section className="bg-white border-b border-line py-16 sm:py-20 w-full">
      <Container>
        <div className="mb-12">
          <Eyebrow className="mb-3">Guides</Eyebrow>
          <Heading level={2} className="text-3xl sm:text-4xl font-extrabold tracking-tight m-0">
            Before you build.
          </Heading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CityGuides;
