# AdsPeek SEO Technical Guide

How to build the AdsPeek site so search engines and AI answer engines can crawl, understand and rank it. Companion to `adspeek-seo-plan.md` (what to build); this file is how to build it.

> API details below match Next.js App Router conventions at the time of writing. Before coding, check the current Next.js docs for the installed version; where they differ, the docs win.

---

## 0. Rules that override everything else

1. **Every page's content, header and footer must be in the HTML the server sends.** No content or navigation that only appears after JavaScript runs.
2. **Every link is a real `<a href>`** to a real URL. No `href="#"`, no click-only buttons used as links, no placeholder links.
3. **One page = one URL.** No duplicate paths, no mixed trailing slashes, no uppercase.
4. **Never publish a page with missing required data.** It stays `noindex` and out of the sitemap until complete.
5. **Never invent facts** (clients, numbers, reviews, addresses). Use `TODO:` and report it.

---

## 1. Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js (App Router)** with **TypeScript** | Server rendering and static generation by default; built-in metadata, sitemap and robots APIs |
| Rendering | **Static generation (SSG)** for all marketing pages; ISR (`revalidate`) only where content changes often | Fastest possible HTML, fully crawlable |
| Styling | **Tailwind CSS**, themed with the tokens in `ui-ux-design-guide.md` section 11 | Small CSS output, no runtime cost |
| Content | **JSON data files** for location pages, **MDX** for question pages and long service copy | Programmatic pages from validated data; writers edit text without touching components |
| Validation | **Zod** schemas on every data file | Build fails when required SEO fields are missing |
| Fonts | `next/font/google` Inter **variable** (self-hosted at build) | One file covers every weight the design guide uses; no layout shift |
| Images | `next/image` with AVIF/WebP | Automatic sizing and modern formats |
| Hosting | **Vercel** or **Cloudflare Pages** | Global CDN, HTTPS, edge caching |
| Analytics | GA4 via GTM, loaded after interaction | Keeps tracking off the critical path |

Keep pages as **Server Components**. Use `"use client"` only for interactive pieces (forms, mobile menu, carousels), and keep them small.

---

## 2. Project structure

```
/app
  layout.tsx                    # <html lang="en">, fonts, header, footer, Organization schema
  page.tsx                      # Homepage
  not-found.tsx                 # Custom 404 with links to hubs
  sitemap.ts                    # Generated sitemap.xml
  robots.ts                     # Generated robots.txt
  /services
    page.tsx                    # Services hub
    /[service]/page.tsx         # Service pages
    /shopify-migration/[platform]/page.tsx
  /locations
    page.tsx                    # Location hub
    /[country]/page.tsx         # Country pages
    /[country]/[place]/page.tsx # State OR city pages (resolved from data)
  /questions
    page.tsx                    # Question hub
    /[slug]/page.tsx            # Question pages
  /work, /about, /contact, /privacy-policy, /terms
/content
  /services/*.mdx
  /locations/*.json             # one file per country, state and city
  /questions/*.mdx
  /case-studies/*.mdx
/lib
  seo.ts                        # metadata helpers, canonical builder
  schema.ts                     # JSON-LD builders
  content.ts                    # loaders + Zod validation
/components
  JsonLd.tsx, Breadcrumbs.tsx, FaqBlock.tsx, AnswerBlock.tsx, Cta.tsx
/scripts
  seo-check.ts                  # pre-build SEO checks (section 10)
```

States and cities share one route (`/locations/[country]/[place]/`). The data file's `type` field (`state` or `city`) decides which template renders.

---

## 3. URLs and routing

### 3.1 Config

```ts
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  trailingSlash: true,          // every URL ends with "/"
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      // Old URLs from any previous site → new URLs (301)
      // { source: '/old-page', destination: '/services/shopify-store-design/', permanent: true },
    ];
  },
};
export default config;
```

### 3.2 Rules

- Lowercase, hyphen-separated slugs. Slugs come from data files, never from page titles at runtime.
- Pick one host (`www` or bare domain) and 301 the other to it. HTTPS only.
- Unknown slugs must return a real 404, not an empty page. In dynamic routes:

```ts
export const dynamicParams = false; // only slugs returned by generateStaticParams exist
```

- Every page renders a self-referencing canonical (section 4).
- Don't put content behind query strings (`?city=dubai`). Filters, if any, are `noindex`.

### 3.3 Static generation for programmatic pages

```ts
// app/locations/[country]/[place]/page.tsx
import { getLocations, getLocation } from '@/lib/content';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getLocations()
    .filter((l) => l.type === 'state' || l.type === 'city')
    .filter((l) => l.status === 'ready')               // incomplete pages are not built
    .map((l) => ({ country: l.parentCountry, place: l.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ country: string; place: string }>;   // a Promise in Next.js 15+
}) {
  const { country, place } = await params;
  const loc = getLocation(country, place);
  if (!loc) notFound();
  return loc.type === 'city' ? <CityTemplate loc={loc} /> : <StateTemplate loc={loc} />;
}
```

---

## 4. Metadata

### 4.1 Root defaults

```ts
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),   // e.g. https://www.example.com
  title: { default: 'Shopify Development Company | AdsPeek', template: '%s | AdsPeek' },
  openGraph: { siteName: 'AdsPeek', type: 'website', locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  robots: process.env.SITE_ENV === 'production'
    ? { index: true, follow: true }
    : { index: false, follow: false },                      // staging never gets indexed
};
```

Check before launch that production really renders `index, follow`. A staging `noindex` leaking into production is one of the most common launch mistakes.

### 4.2 Per page

```ts
// app/locations/[country]/[place]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ country: string; place: string }> }) {
  const { country, place } = await params;
  const loc = getLocation(country, place)!;
  const path = `/locations/${country}/${place}/`;
  return {
    title: { absolute: `Shopify Development Company in ${loc.name} | AdsPeek` },
    description: loc.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: `Shopify Development Company in ${loc.name}`, description: loc.metaDescription,
                 images: [{ url: loc.ogImage ?? '/og/default.png', width: 1200, height: 630 }] },
  };
}
```

### 4.3 Limits

| Field | Target |
| --- | --- |
| Title | 50–60 characters, primary keyword near the start, unique site-wide |
| Meta description | 120–155 characters, unique, includes the keyword and a reason to click |
| Canonical | Absolute URL of the page itself, with trailing slash |
| Open Graph image | 1200 × 630, one per page type at minimum |

### 4.4 Language and hreflang

- Set `<html lang="en">`.
- **Don't add hreflang between location pages.** Dubai and London pages are different pages, not translations or regional copies of one page. hreflang is only for the same content in different languages or regional variants. Add it only if you later publish, say, an Arabic version of a page.

---

## 5. Semantic HTML

- One `<h1>` per page. H2 → H3 order, no skipped levels.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`; `<article>` for question pages.
- The direct answer block under the H1 is plain text in a `<p>`, not an image, not inside a tab, accordion or carousel that hides it.
- FAQ answers must be in the HTML. A `<details>/<summary>` accordion is fine because the text is in the DOM; content fetched on click is not.
- Breadcrumbs as an ordered list inside `<nav aria-label="Breadcrumb">`.
- Tables as real `<table>` with `<th>`, not div grids.
- Internal links with `next/link` (renders a real `<a href>`).
- Visible "Last updated" date on question pages using `<time dateTime="2026-10-20">`.

---

## 6. Structured data (JSON-LD)

### 6.1 Component

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
```

### 6.2 What goes where

| Page type | Schema types |
| --- | --- |
| All pages (layout) | `Organization` (name, logo, url, sameAs: social + Clutch + Shopify Partner profile) |
| Homepage | `WebSite`, `ProfessionalService` (Gurugram address), `FAQPage` |
| Service | `Service` (provider → Organization, `areaServed`), `FAQPage`, `BreadcrumbList` |
| Country / state / city | `Service` with `areaServed` (`Country` / `State` / `City`), `FAQPage`, `BreadcrumbList` |
| Gurugram city page | `ProfessionalService` with real address, geo, opening hours |
| Question | `Article` (author → `Person`, `datePublished`, `dateModified`), `BreadcrumbList`, `FAQPage` only if a visible FAQ block exists |
| Case study | `Article` or `CreativeWork`, `BreadcrumbList` |
| Hubs | `CollectionPage`, `BreadcrumbList` |

### 6.3 Rules

- Mark up only what is visible on the page.
- **No `LocalBusiness` on cities without a real office.** Use `Service` + `areaServed` instead. A fake address can get the site penalised and breaks trust.
- **No `AggregateRating` or `Review` markup** for your own business on your own site; Google doesn't show self-serving review stars for it.
- Google limited FAQ rich results to a small set of authoritative sites in 2023, so don't expect FAQ stars in results. Keep `FAQPage` anyway: it describes the content clearly for other search engines and AI tools.
- Validate every template in the Schema.org validator and Google's Rich Results Test before launch.

### 6.4 Example: city page

```ts
// lib/schema.ts
export function cityServiceSchema(loc: Location, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Shopify development in ${loc.name}`,
    serviceType: 'Shopify development',
    url,
    provider: { '@type': 'Organization', name: 'AdsPeek', url: process.env.NEXT_PUBLIC_SITE_URL },
    areaServed: { '@type': 'City', name: loc.name,
                  containedInPlace: { '@type': 'Country', name: loc.countryName } },
  };
}
```

---

## 7. Sitemap, robots and crawlers

### 7.1 Sitemap

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllIndexablePages } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  return getAllIndexablePages().map((p) => ({
    url: `${base}${p.path}`,          // path always ends with "/"
    lastModified: p.updatedAt,        // real content change date, not build date
  }));
}
```

- Include only indexable, canonical pages with status `ready`.
- `lastModified` must reflect real content changes; faking it on every build makes search engines ignore it.
- If the site passes 50,000 URLs, split with `generateSitemaps` (not needed at this size).

### 7.2 robots.txt

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const isProd = process.env.SITE_ENV === 'production';
  if (!isProd) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/thank-you/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
```

### 7.3 AI crawlers

For AEO, AI search crawlers must be allowed. The rule above allows everyone. If you later want to block **training** crawlers while keeping **search** crawlers, list them separately. Crawler names change; confirm each in its provider's documentation before relying on this list:

| Purpose | Examples |
| --- | --- |
| Search engines | Googlebot, Bingbot, Applebot |
| AI search / answer retrieval | OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User |
| AI training | GPTBot, ClaudeBot, Google-Extended (a control token, not a separate crawler) |

Recommendation: allow all of them. Being cited by AI answers is the goal of the AEO work.

### 7.4 Getting indexed

- Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Bing's index also feeds several AI search tools, so don't skip Bing.
- Ping new and updated URLs with **IndexNow** (supported by Bing and others, not Google) from a post-deploy script.
- `llms.txt` is an optional, unofficial proposal. It's cheap to add (a plain-text summary of the site with key links at `/llms.txt`), but don't expect it to change rankings.

---

## 8. Performance (Core Web Vitals)

Targets on mobile, measured on real devices: **LCP < 2.5 s, INP < 200 ms, CLS < 0.1**. Lighthouse mobile Performance ≥ 90.

| Area | Rule |
| --- | --- |
| Hero image | `next/image` with `priority` (or `fetchPriority="high"`) on the LCP image only; correct `sizes` |
| Other images | Lazy-loaded (default), explicit width/height, AVIF/WebP, served from the CDN |
| Fonts | `next/font/google` Inter as a **variable** font (don't pass a fixed `weight` list), `display: 'swap'`, latin subset; one font file serves weights 300–600 used in `ui-ux-design-guide.md`; no external font CSS |
| JavaScript | Server Components by default; client components only where interactive; no animation libraries for simple fades (CSS instead) |
| Third-party scripts | GTM/GA4 with `next/script` `strategy="afterInteractive"` or `lazyOnload`; chat widgets `lazyOnload`; WhatsApp is a plain link, not a widget |
| Layout shift | Reserve space for images, embeds and cookie banners; no content injected above existing content |
| Video | No autoplay hero video on mobile; poster image + click to play, or a lightweight embed facade |
| Maps | Static map image linking to Google Maps instead of a live embed, except on the Contact and Gurugram pages |
| Caching | Static pages cached at the CDN; long cache headers for hashed assets |

---

## 9. Content data and validation

### 9.1 Location data schema

```ts
// lib/content.ts
import { z } from 'zod';

export const Faq = z.object({ q: z.string().min(10), a: z.string().min(40) });

export const Location = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  type: z.enum(['country', 'state', 'city']),
  parentCountry: z.string(),
  parentState: z.string().optional(),
  countryName: z.string(),
  status: z.enum(['draft', 'ready']),
  metaDescription: z.string().min(120).max(160),
  heroAnswer: z.string().refine((s) => { const w = s.trim().split(/\s+/).length; return w >= 40 && w <= 60; },
                                'heroAnswer must be 40–60 words'),
  timeZoneNote: z.string().min(20),
  currency: z.string().length(3),
  priceRangeLocal: z.string(),
  localNeeds: z.array(z.string()).min(3).max(5),
  paymentGateways: z.array(z.string()).min(1),
  proof: z.object({ caseStudySlug: z.string(), label: z.string() }),
  industries: z.array(z.string()).min(2).max(4),
  faqs: z.array(Faq).min(4).max(6),
  nearby: z.array(z.string()).min(2).max(4),
  bodyMdx: z.string().optional(),
  spellingVariants: z.array(z.string()).optional(),
  updatedAt: z.string(),
});
export type Location = z.infer<typeof Location>;
```

- Files with `status: "draft"` are not built and not in the sitemap.
- A `ready` file that fails validation fails the build.
- `TODO:` anywhere in a `ready` file fails the build.

### 9.2 Question page front matter (MDX)

```yaml
---
title: "How much does a Shopify store cost in India?"
slug: shopify-store-cost-india
answer: "40–60 word direct answer with the key number."
author: ritesh
published: 2026-10-20
updated: 2026-10-20
relatedService: custom-shopify-store-development
relatedQuestions: [how-long-to-build-shopify-store, shopify-vs-woocommerce-india, custom-shopify-theme-cost]
status: ready
---
```

---

## 10. Automated SEO checks

Run `npm run seo:check` before every build (and in CI). Fail the build on any error.

| Check | Fails when |
| --- | --- |
| Titles | Missing, duplicate, or over 65 characters |
| Meta descriptions | Missing, duplicate, under 110 or over 160 characters |
| H1 | Zero or more than one per page |
| Heading order | A level is skipped |
| Canonical | Missing, relative, or not equal to the page's own URL |
| Internal links | Any link to `#`, a 404, or a non-trailing-slash internal URL |
| Orphans | A page with no internal links pointing to it |
| Images | Missing `alt`, width or height |
| Schema | JSON-LD fails to parse or misses required properties for its type |
| Word count | Below the minimum for its page type (plan section 4) |
| Location uniqueness | Body text more than ~60% similar to another location page |
| Placeholders | `TODO:`, `Lorem`, `Brand 1`, `example.com` in published output |
| Indexing | Production build contains `noindex` on a `ready` page |

**Uniqueness check method:** strip shared blocks (header, footer, service grid, CTA), split each page's body into 5-word shingles, compute Jaccard similarity between every pair of location pages, and flag pairs above 0.6.

Lighthouse is not run by Antigravity (no live browser checks). Ritesh or the CI pipeline runs **Lighthouse CI** after deploy on one page of each type (homepage, service, country, city, question) with budgets: Performance ≥ 90, SEO = 100, Accessibility ≥ 95.

---

## 11. Accessibility (also an SEO signal)

- Colour contrast ≥ 4.5:1 for text. Use only the text colours in `ui-ux-design-guide.md` section 3; `#71717A` on dark is for fine print only.
- All interactive elements reachable by keyboard, with visible focus styles.
- Form fields have `<label>`s; errors announced in text.
- Tap targets at least 44 × 44 px on mobile.
- Meaningful `alt` text that describes the image (for work screenshots: "Homepage of [client] Shopify store, mobile view"), empty `alt=""` for decorative images.

---

## 12. Lead capture and tracking

- **Contact form** as a server action or API route; works without JavaScript for the submit (progressive enhancement). Redirect to `/thank-you/` (`noindex`) for clean conversion tracking.
- **WhatsApp CTA** as a plain `https://wa.me/...` link with a page-specific pre-filled message, e.g. "Hi, I found you on the Dubai page...".
- Track in GA4: form submits, WhatsApp clicks, call clicks, each with `page_type` and `location` parameters.
- Track AI referrals: create a GA4 channel or segment for referrers such as `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`, `claude.ai`.
- Ask "How did you find us?" in the form, with "ChatGPT / AI tool" as an option.

---

## 13. Launch checklist

- [ ] Production domain decided (`www` or bare) and the other 301s to it; HTTPS forced
- [ ] `NEXT_PUBLIC_SITE_URL` and `SITE_ENV=production` set in production only
- [ ] Production pages render `index, follow`; staging renders `noindex` and robots `Disallow: /`
- [ ] `sitemap.xml` and `robots.txt` load and are correct
- [ ] 301 redirects from every old URL (crawl the old site first and map each URL)
- [ ] Custom 404 page returns HTTP 404
- [ ] Google Search Console and Bing Webmaster Tools verified; sitemap submitted to both
- [ ] Google Business Profile for the Gurugram office, linked from the Gurugram page and footer
- [ ] All schema validated
- [ ] `npm run seo:check` and Lighthouse CI passing
- [ ] Every link clicked once on mobile (no `#`, no 404s)

---

## 14. After launch

| Frequency | Task |
| --- | --- |
| Weekly | Search Console: indexing errors, new queries, pages losing clicks |
| Monthly | Run 20 buyer questions in ChatGPT, Perplexity and Google; log whether AdsPeek is named or cited |
| Monthly | Add question pages for queries AdsPeek gets impressions for but has no page |
| Quarterly | Refresh the top 10 pages: new numbers, examples, `updated` date (only when content really changed) |
| Quarterly | Review Core Web Vitals report; fix any page group that's slipping |
| Ongoing | Earn links and mentions: Shopify Partner Directory, Clutch, GoodFirms, DesignRush, client footer credits, case studies pitched to ecommerce blogs |
