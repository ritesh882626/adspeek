import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Container from '../ui/Container';
import ArticleToc, { TocItem } from './ArticleToc';
import { mdxComponents } from './mdx-components';

interface ArticleBodyProps {
  content: string;
  tocItems: TocItem[];
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({
  content,
  tocItems,
}) => {
  return (
    <div className="bg-white py-12 sm:py-16 w-full">
      <Container>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Main article content column: max-w-[720px] */}
          <article className="w-full max-w-[720px] min-w-0">
            {/* Mobile & Tablet Collapsible TOC (below 1024px) */}
            {tocItems.length > 0 && (
              <details className="lg:hidden w-full border border-line bg-paper p-4 mb-8 text-ink">
                <summary className="font-mono text-[12px] uppercase tracking-[0.06em] font-semibold text-muted cursor-pointer select-none">
                  On this page
                </summary>
                <nav aria-label="Table of contents" className="mt-4 flex flex-col gap-2.5">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-[14px] text-body hover:text-forest transition-colors"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </details>
            )}

            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>

          {/* Desktop Sticky Aside */}
          <ArticleToc items={tocItems} />
        </div>
      </Container>
    </div>
  );
};

export default ArticleBody;
