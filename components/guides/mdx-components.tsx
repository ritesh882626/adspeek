import React from 'react';
import Link from 'next/link';

export const mdxComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const isShortAnswer =
      text.startsWith('Short answer:') ||
      (Array.isArray(props.children) &&
        props.children[0] &&
        typeof props.children[0] === 'object' &&
        'props' in props.children[0] &&
        props.children[0].props?.children === 'Short answer:');

    if (isShortAnswer) {
      return (
        <div className="relative border border-ink bg-white p-5 sm:p-6 mb-7 flex gap-4">
          <span
            className="w-1 bg-accent shrink-0 self-stretch -my-1"
            aria-hidden="true"
          />
          <p className="text-[17px] sm:text-[18px] leading-[1.7] text-body m-0 flex-1">
            {props.children}
          </p>
        </div>
      );
    }

    return (
      <p className="text-[17px] sm:text-[18px] leading-[1.7] text-body mb-5 mt-0">
        {props.children}
      </p>
    );
  },

  h2: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={id}
      className="text-[26px] sm:text-[32px] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink mt-14 mb-4 scroll-mt-28"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const isSources =
      typeof children === 'string' && children.toLowerCase().includes('sources');

    return (
      <h3
        id={id}
        className={`font-bold tracking-tight mt-8 mb-3 scroll-mt-28 ${
          isSources
            ? 'text-[15px] font-mono uppercase tracking-[0.06em] text-muted'
            : 'text-[20px] sm:text-[22px] text-ink'
        }`}
        {...props}
      >
        {children}
      </h3>
    );
  },

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-6 flex flex-col gap-2 text-[17px] sm:text-[18px] leading-[1.65] text-body">
      {props.children}
    </ul>
  ),

  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 flex flex-col gap-2 text-[17px] sm:text-[18px] leading-[1.65] text-body">
      {props.children}
    </ol>
  ),

  li: ({ children, className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => {
    const isTask = className?.includes('task-list-item');
    if (isTask) {
      return (
        <li className="list-none flex items-start gap-3 my-1" {...props}>
          <span
            className="w-4 h-4 border border-ink shrink-0 translate-y-1 bg-white"
            aria-hidden="true"
          />
          <span>{children}</span>
        </li>
      );
    }
    return (
      <li className="my-0.5" {...props}>
        {children}
      </li>
    );
  },

  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="w-full overflow-x-auto border border-line my-8">
      <table className="w-full border-collapse text-left text-[15px] sm:text-[16px]">
        {props.children}
      </table>
    </div>
  ),

  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-ink text-white font-mono text-[12px] uppercase tracking-[0.06em]">
      {props.children}
    </thead>
  ),

  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="p-3 sm:p-4 font-semibold text-white border-b border-line">
      {props.children}
    </th>
  ),

  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="p-3 sm:p-4 border-b border-line text-body align-top">
      {props.children}
    </td>
  ),

  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border border-line bg-paper font-mono text-[14px] sm:text-[15px] text-ink p-4 sm:p-5 my-6 whitespace-pre-wrap leading-relaxed">
      {props.children}
    </blockquote>
  ),

  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-[14px] bg-[#EDEFE7] text-ink px-1.5 py-0.5 font-medium">
      {props.children}
    </code>
  ),

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-ink text-white p-4 font-mono text-[14px] overflow-x-auto my-6 border border-line">
      {props.children}
    </pre>
  ),

  hr: () => <hr className="border-t border-line my-12" />,

  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && href.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-forest underline font-medium hover:text-ink transition-colors"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-forest underline font-medium hover:text-ink transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-muted text-[15px] not-italic block mt-1">
      {props.children}
    </em>
  ),
};

export default mdxComponents;
