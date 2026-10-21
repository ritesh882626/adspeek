# AdsPeek SEO Best Practices

The rulebook Antigravity follows when writing and building any page on the AdsPeek site.

This file sits alongside two others:
- `adspeek-seo-plan.md`: **what** to build (pages, keywords, templates, phases)
- `adspeek-seo-technical-guide.md`: **how** to code it (Next.js, schema, sitemap, performance)
- `adspeek-seo-best-practices.md` (this file): **how to write and assemble each page** so it ranks and gets cited

If two files disagree: the plan decides what a page is for, the technical guide decides how it's coded, and this file decides how it's written.

---

## 0. The 10 rules that matter most

1. **One page, one primary keyword, one search intent.** Never target the same keyword with two pages.
2. **Answer first.** The first 40–60 words under the H1 answer the searcher's question completely.
3. **Write for the buyer, not the algorithm.** If a sentence exists only to fit a keyword in, delete it.
4. **Be specific.** Numbers, timelines, price ranges, named tools, real examples. No vague claims.
5. **Never invent facts.** No made-up clients, results, reviews, stats or addresses. Use `TODO:` and report it.
6. **Every page is unique.** No page may be a copy of another with a city or service name swapped.
7. **Show proof.** Real case studies, real screenshots, real people with real roles.
8. **Link with purpose.** Every page links up to the homepage, across to related pages, and to one next step.
9. **Content is in the HTML.** Nothing important hidden behind JavaScript, images or tabs that load later.
10. **Fast on mobile.** If it's slow on a mid-range phone, it isn't done.

---

## 1. Search intent

Before writing, decide what the searcher wants. The page must match it.

| Intent | Searcher wants | Page type | Example keyword |
| --- | --- | --- | --- |
| Hire (commercial) | A company to do the work | Homepage, service, location | Shopify development company in Dubai |
| Compare | To choose between options | Question page with a comparison table | Shopify vs WooCommerce India |
| Learn | An answer to a question | Question page | How long does a Shopify migration take? |
| Navigate | AdsPeek itself | Homepage, About, Contact | AdsPeek Shopify |

Rules:
- A **hire** page leads with what AdsPeek does, for whom, and how to start. Not a tutorial.
- A **learn** page leads with the answer. Selling comes after the answer, never before it.
- If the top Google results for a keyword are all blog posts, a service page won't rank for it, and vice versa. Match the format that already ranks.

---

## 2. Keywords on the page

### 2.1 Where the primary keyword goes

| Place | Rule |
| --- | --- |
| Title tag | Once, near the start |
| H1 | Once, naturally |
| First 100 words | Once |
| At least one H2 | Once, or a close variant |
| URL slug | Yes (already set in the plan) |
| Meta description | Once |
| Image alt text | Only where it truly describes the image |
| Body | Naturally; no target density |

### 2.2 Variants and related terms

- Use close variants across H2s and body: "Shopify agency", "Shopify developers", "Shopify experts", "Shopify web development".
- Cover the related topics a buyer expects: cost, timeline, process, platform choice, payments, migration, support. Covering the topic fully matters more than repeating the keyword.

### 2.3 Never

- Repeat the keyword in every paragraph or heading.
- Hide text, use tiny or same-colour text, or list keywords in a block.
- Create separate pages for spelling variants ("Gurgaon" and "Gurugram" share one page).
- Target a keyword that another page already targets (cannibalisation). If two pages compete, merge them and 301 the weaker URL.

---

## 3. Titles, meta descriptions and headings

### 3.1 Title tag

- 50–60 characters. Primary keyword first, benefit second, brand last.
- Unique on every page.
- Good: `Shopify Plus Development Company | Built to Scale | AdsPeek`
- Bad: `Home | AdsPeek` / `Best Shopify Shopify Agency Shopify Developers`

### 3.2 Meta description

- 120–155 characters, unique, active voice.
- Says what the page offers and why to click. Include the keyword once and one specific detail.
- Good: `Custom Shopify stores for Dubai brands, with AED pricing, VAT-ready invoices and Arabic/English storefronts. Book a free consultation.`
- It isn't a ranking factor directly, but it drives clicks, which matters.

### 3.3 Headings

- One H1 per page, matching the page's purpose.
- H2s for main sections, H3s inside them. Never skip levels.
- Phrase H2s as the questions buyers ask where it fits: "How long does a Shopify build take?" beats "Timeline".
- Headings describe what's in the section. No clever or vague headings ("The secret sauce").

---

## 4. Writing style

### 4.1 The answer-first pattern

Use this under the H1 and under every major H2:

1. **Direct answer** (40–60 words): complete, standalone, includes the key fact or number.
2. **Evidence:** why it's true, from AdsPeek's own work.
3. **Detail:** options, steps, edge cases, a table if useful.

Example under "How long does it take to build a Shopify store?":

> Most custom Shopify stores take 4–8 weeks from approved design to launch. A store with a ready theme and fewer than 50 products can launch in 2–3 weeks. Stores with custom features, migrations or B2B pricing take 8–12 weeks. *(Numbers must come from AdsPeek's real project history.)*

### 4.2 Plain, readable copy

- Sentences under 25 words on average. Paragraphs of 2–4 sentences.
- Plain words: "use" not "utilise", "help" not "facilitate".
- Write to the reader ("you", "your store").
- Bullets for parallel items, tables for comparisons, numbered lists for steps.
- Spell out the benefit, not just the feature: "Pages load in under 2 seconds, so fewer visitors leave before buying."
- Indian English spelling for India pages is fine; keep spelling consistent within a page.

### 4.3 Words and claims to avoid

| Avoid | Why | Instead |
| --- | --- | --- |
| "Best", "No. 1", "leading", "world-class" | Unprovable; readers ignore it | A specific result or fact |
| "Cutting-edge", "seamless", "robust", "synergy" | Filler | Say what actually happens |
| "We are passionate about…" | About you, not the buyer | What the buyer gets |
| Guarantees of rankings or revenue | Can't be promised; legal risk | Past results, clearly labelled |
| Stats with no source | Invented or unverifiable | Cite the source, or use AdsPeek's own numbers |

### 4.4 AI-written content

AI can draft. Every page still needs:
- Facts checked by a person who knows them.
- AdsPeek's real experience added (examples, numbers, opinions).
- A read-through to remove generic filler.

Google ranks helpful, original content regardless of how it was drafted. Mass-produced pages with no original value are what get demoted.

---

## 5. Trust signals (E-E-A-T)

Google and AI tools favour content that shows **experience, expertise, authority and trust**. On the AdsPeek site that means:

| Signal | Where | How |
| --- | --- | --- |
| Real experience | Service, location, question pages | Case studies with the client's permission, screenshots of real stores, specific project details |
| Named author | Question pages | Author box: name, photo, role (e.g. Ritesh, founder and creative/technical director), short bio, link to About |
| Company details | Footer, About, Contact | Legal name, Gurugram address, phone, email, registration details if public |
| Credentials | Homepage, About | Shopify Partner status, certifications, years in business, team size (only if true) |
| Third-party proof | Homepage, service pages | Links to Clutch / Google reviews; quotes only with permission |
| Freshness | Question pages | Visible "Last updated" date that changes only when content really changes |
| Policies | Footer | Privacy policy, terms |

Never use stock photos of "the team". Use real photos or none.

---

## 6. Page content requirements

### 6.1 Minimum unique content

| Page type | Minimum unique words | Must include |
| --- | --- | --- |
| Homepage | 1,200 | Services, proof, process, locations, FAQ |
| Service | 1,000 | Deliverables, who it's for, process, case study, pricing guidance, FAQ |
| Country | 900 | Local working details, local needs, pricing in local currency, FAQ |
| State | 700 | Cities served, local industries, FAQ |
| City | 800 | The 4 local elements (plan section 5.2), FAQ |
| Question | 900 | Direct answer, explanation, recommendation, related questions |

Word counts are a floor, not a goal. Stop when the reader's question is fully answered.

### 6.2 Location pages: what makes them unique

Every location page must contain facts only true for that place:
- Time-zone overlap and meeting hours
- Local currency pricing
- Local payment gateways, tax and shipping considerations
- Industries common there that AdsPeek has built for
- Local or nearest-market proof, clearly labelled
- FAQs a buyer there would actually ask

Shared blocks (service grid, process, CTA) are fine, but they don't count towards the unique word minimum.

### 6.3 FAQ blocks

- 4–8 questions per page, specific to that page. Don't repeat the same FAQ set across pages.
- Each answer: 40–80 words, direct, answers the question in the first sentence.
- Source questions from real sales calls, client emails, Google's "People also ask" and Search Console queries.

### 6.4 Calls to action

- One primary CTA per page (book a consultation), repeated after the hero, mid-page and at the end.
- One secondary CTA (WhatsApp) with a page-specific pre-filled message.
- CTA text says what happens: "Book a free 30-minute call" beats "Submit".
- Every CTA links to a real destination. No `#`.

---

## 7. Internal linking

### 7.1 Rules

- Every page links **up** to the homepage once in body copy, with anchor text "Shopify development company" or a close variant.
- Every page links **across** to 2–4 related pages (plan section 6).
- Every page links **to a next step**: a service page, the contact page or a question page.
- Links go in body copy where they help the reader, not only in footers or "related" boxes.
- No orphan pages. Every page is linked from its hub and at least one other page.

### 7.2 Anchor text

| Good | Bad |
| --- | --- |
| "our WooCommerce to Shopify migration service" | "click here" |
| "Shopify development company in Mumbai" | "read more" |
| "how much a Shopify store costs in India" | The exact main keyword on every link site-wide |

Vary anchor text naturally. Describe the destination page.

### 7.3 External links

- Link to authoritative sources when citing a fact (Shopify docs, government tax pages, payment gateway docs).
- Open external links in the same tab unless there's a strong reason not to.
- Use `rel="nofollow"` or `rel="sponsored"` only for paid or untrusted links.

---

## 8. Images and media

| Rule | Detail |
| --- | --- |
| File names | Descriptive, hyphenated: `rug-studio-shopify-homepage-mobile.webp`, not `IMG_2041.png` |
| Alt text | Describe what's in the image for someone who can't see it; include a keyword only if it fits naturally |
| Format | WebP or AVIF; SVG for logos and icons |
| Size | Hero under ~200 KB, others under ~100 KB where possible |
| Dimensions | Always set width and height |
| Real images | Real store screenshots, real team photos; no generic stock "team" or "office" photos |
| Text in images | Never put important text only in an image; it must also be in the HTML |
| Video | Add a text summary or transcript; use a facade so the player loads on click |

---

## 9. AEO: getting cited by AI answers

These rules help ChatGPT, Perplexity, Google AI Overviews and similar tools quote AdsPeek.

1. **Answer-first blocks** under the H1 and H2s (section 4.1). AI tools lift these directly.
2. **Question-shaped headings** that match how people ask.
3. **Tables** for prices, timelines and comparisons; AI tools quote tables well.
4. **Consistent facts across the site.** If the homepage says "4–8 weeks", every page says "4–8 weeks". Contradictions reduce trust for search engines and AI tools.
5. **Named entities.** Say "Shopify Plus", "Razorpay", "Shiprocket", not "a premium plan" or "a payment provider".
6. **Original data.** AdsPeek's own numbers (average build time, price ranges, speed improvements) are what make a page worth citing over a competitor's.
7. **Clear attribution.** Author, company, date on every question page.
8. **Off-site presence.** Most AI mentions of a brand come from other sites: directory profiles, reviews, forum answers, guest articles. Plan for these alongside the site.
9. **Freshness.** Update the top pages quarterly with real changes.

---

## 10. Technical must-haves (summary)

Full detail is in `adspeek-seo-technical-guide.md`. Every page must:

- Render all content, header and footer in server HTML
- Have a self-referencing canonical URL with trailing slash
- Have valid JSON-LD for its page type, matching visible content
- Show breadcrumbs (visible and in schema)
- Be in the sitemap only if indexable
- Pass Lighthouse mobile: Performance ≥ 90, SEO = 100, Accessibility ≥ 95 (checked by Ritesh or CI after deploy)
- Meet Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1
- Have no `#` links, no broken links, no `TODO:` in published output

---

## 11. Things that get sites penalised or ignored

Never do any of these:

- **Doorway pages:** many near-identical pages that only swap a place name.
- **Fake local presence:** listing addresses or `LocalBusiness` schema for cities with no real office.
- **Fake reviews or testimonials,** or review schema on your own business.
- **Keyword stuffing,** hidden text, or text the same colour as the background.
- **Scaled low-value content:** mass-generated pages with no original information.
- **Buying links,** link exchanges, or private blog networks.
- **Copying content** from competitors or other sites, even reworded.
- **Cloaking:** showing search engines different content than users.
- **Misleading claims:** guaranteed rankings, fake partner badges, invented stats.
- **Spammy structured data:** marking up content that isn't on the page.

---

## 12. Updating existing pages

- Improve existing pages before adding new ones on the same topic.
- When updating, change the "Last updated" date and `dateModified` only if the content materially changed.
- Never change a published URL without a 301 redirect from the old one.
- If two pages target the same keyword, merge them into the stronger one and 301 the other.
- Keep a changelog of significant edits per page (date, what changed, why) so ranking changes can be traced.

---

## 13. Page review checklist

Run on every page before marking it done. Antigravity reports any failed item.

**Intent and keyword**
- [ ] Primary keyword and intent match the plan
- [ ] No other page targets the same keyword
- [ ] Format matches what already ranks for this keyword

**On-page**
- [ ] Title 50–60 characters, unique, keyword near the start
- [ ] Meta description 120–155 characters, unique
- [ ] One H1 with the keyword; headings in order
- [ ] Keyword in the first 100 words and at least one H2

**Content**
- [ ] Answer-first block (40–60 words) under the H1
- [ ] Minimum unique words for the page type met
- [ ] Specific numbers and examples; no banned filler words (section 4.3)
- [ ] All facts verified; no invented clients, numbers or reviews
- [ ] Location pages: all local elements present
- [ ] FAQ block with 4–8 page-specific questions

**Trust**
- [ ] Real proof (case study, screenshot, named person)
- [ ] Author box and "Last updated" date (question pages)

**Links and media**
- [ ] Link up to homepage; 2–4 cross-links; one next-step link
- [ ] Descriptive anchor text; no `#`, broken or placeholder links
- [ ] Images: descriptive file names, alt text, WebP/AVIF, width and height set

**Technical**
- [ ] Canonical, schema, breadcrumbs, sitemap entry
- [ ] Code follows the performance rules (technical guide section 8); Lighthouse and Core Web Vitals are checked by Ritesh or CI after deploy
