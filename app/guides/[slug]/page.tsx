import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuide, getRelatedGuides } from '@/lib/guides';
import ArticleHeader from '@/components/guides/ArticleHeader';
import ArticleBody from '@/components/guides/ArticleBody';
import ArticleFaq from '@/components/guides/ArticleFaq';
import RelatedGuides from '@/components/guides/RelatedGuides';
import CtaBand from '@/components/sections/CtaBand';
import Container from '@/components/ui/Container';

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const { frontmatter } = guide;
  return {
    title: `${frontmatter.title} | AdsPeek`,
    description: frontmatter.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated || frontmatter.date,
      authors: [frontmatter.author],
    },
  };
}

function extractToc(content: string): { id: string; text: string }[] {
  const h2Regex = /^##\s+(.+)$/gm;
  const items: { id: string; text: string }[] = [];
  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    const rawText = match[1].trim();
    const id = rawText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text: rawText });
  }
  return items;
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const { frontmatter, content } = guide;
  const tocItems = extractToc(content);
  const relatedGuides = getRelatedGuides(slug, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adspeek.com';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated || frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
      jobTitle: frontmatter.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AdsPeek',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/guides/${slug}`,
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${siteUrl}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.category,
        item: `${siteUrl}/guides/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <ArticleHeader
        title={frontmatter.title}
        description={frontmatter.description}
        category={frontmatter.category}
        author={frontmatter.author}
        authorRole={frontmatter.authorRole}
        updated={frontmatter.updated}
        readMinutes={frontmatter.readMinutes}
      />

      <ArticleBody content={content} tocItems={tocItems} />

      {frontmatter.faq && frontmatter.faq.length > 0 && (
        <div className="bg-white pb-16">
          <Container>
            <ArticleFaq faq={frontmatter.faq} />
          </Container>
        </div>
      )}

      <RelatedGuides guides={relatedGuides} />

      <CtaBand
        id="guide-cta"
        heading="Want this done for your store?"
        primary={{
          label: 'Build your package',
          href: '/shopify-development#build',
        }}
        secondary={{
          label: 'Book a free strategy call',
          href: '/contact',
        }}
      />
    </>
  );
}
