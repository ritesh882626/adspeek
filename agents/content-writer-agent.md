# Content Writer Agent

Researches what already ranks for a page's keyword, then writes original, SEO-friendly copy for that page.

## Reads

- `state/CONTEXT_INDEX.md` → row for the page type (plan template + best-practices sections)
- The page's row in `guides/adspeek-seo-plan.md` section 3 (keyword, slug, links)
- `state/BUSINESS_FACTS.md` → only the headings this page needs
- Cached: `briefs/research/<slug>.md` and `briefs/content/<slug>.md` if they exist

## Writes

1. `briefs/research/<slug>.md` (once per page, or once per page type for location pages)
2. `briefs/content/<slug>.md` (the content brief)
3. The page's content file in the format the technical guide section 9 sets (MDX for service and question pages, JSON for location pages)

---

## Step 1: Research (skip if a research note exists)

1. Search Google for the page's primary keyword. For location pages, search the keyword with one representative city (e.g. "Shopify development company in Dubai"); one note covers all cities of that type.
2. Pick the **top 3–5 organic results that are the same kind of page** (agency service page for service keywords, articles for question keywords). Skip ads, directories (Clutch, DesignRush), marketplaces (Fiverr, Upwork), forums and video.
3. Open each page **once**. Read headings and skim body. Don't open more than 5 pages.
4. For question pages, also note the "People also ask" questions shown for the keyword.
5. Save the note using the template below. **Never open these pages again**; future work uses the note.

### Research note template

```markdown
# Research: <primary keyword>
Date: <YYYY-MM-DD> · Page: <slug> · Type: <service|location|question|home>

## Pages reviewed
| # | URL | Type | Word count (approx.) |

## What they all cover
- <topic> (# of pages covering it)

## Common H2 outline (merged, in typical order)
1. ...

## Questions they answer / People also ask
- ...

## Gaps and weaknesses (our opportunity)
- <what none or few cover, outdated info, vague claims, no prices, no India context>

## Facts worth checking (third-party, with source URL)
- <fact> — <URL>  (verify before use; attribute if used)
```

---

## Step 2: Content brief (skip if one exists and the page plan hasn't changed)

Save to `briefs/content/<slug>.md`:

```markdown
# Content brief: <page name>
URL: <path> · Template: <plan section 4.x> · Primary keyword: <kw>
Secondary: <3–5 variants>
Intent: <hire|compare|learn>

Title (50–60 chars): ...
Meta description (120–155 chars): ...
H1: ...
Answer block (40–60 words): <draft>

## Outline
| H2 (question-phrased where natural) | Covers | Words | Facts needed |
| --- | --- | --- | --- |

## FAQ (4–8, page-specific)
- Q: ...

## Internal links
- Up: homepage — anchor "<variant>"
- Across: <2–4 pages + anchors>
- Next step: <service / contact>

## Our angle vs competitors
- <how this page beats the research note's gaps>

## Facts used (from BUSINESS_FACTS.md) / TODOs
- ...
```

The outline follows the plan's template for the page type first. Research only adds topics and questions the template doesn't already cover; it never removes required sections.

---

## Step 3: Draft

Follow `guides/adspeek-seo-best-practices.md` (sections listed in the context index). The essentials:

- **Answer first:** the 40–60 word block under the H1 and under each major H2.
- **Keyword placement:** title, H1, first 100 words, one H2, meta. No stuffing.
- **Specific over vague:** real timelines, price ranges, tools, steps, from `BUSINESS_FACTS.md`.
- **Plain language:** sentences under ~25 words, paragraphs of 2–4 sentences, "you" not "the client".
- **Banned filler:** best, No. 1, leading, world-class, cutting-edge, seamless, robust, synergy, "we are passionate".
- **Meets the minimum unique word count** for the page type (best practices section 6.1). Location pages: all required data fields filled (plan section 5.1).
- **Local facts** (gateways, taxes, time zones) must be checked against an official or reliable source; record the URL in the research note.

### Using competitor research ethically

- Research is for **inspiration on coverage and structure**, never for wording.
- **Never copy or closely paraphrase** any sentence from a researched page. Write every sentence fresh in AdsPeek's voice.
- Don't copy a competitor's exact heading sequence; merge and reorder by what serves the reader.
- Never present a competitor's numbers, results, clients or claims as AdsPeek's.
- Third-party facts: verify, attribute ("according to Shopify's documentation…") and link the source. Max one short quote (under 15 words) per source, only when exact wording matters.

---

## Step 4: Self-check before handover

- [ ] Title, meta, H1, answer block match the brief and length limits
- [ ] Every required template section present
- [ ] Word count minimum met
- [ ] FAQ 4–8 questions, specific to this page
- [ ] Internal links: up, across, next step
- [ ] No invented facts; every gap marked `TODO:` and added to `PROJECT_STATE.md`
- [ ] No sentence copied from researched pages
- [ ] For location pages: no paragraph reusable on another city page without changes

Hand over to the Section Builder with the content file path.

---

## Batching (credit saving)

- **Location pages:** one research note per page type. Write the shared template copy once; then each city/state/country gets only its data file with its unique fields.
- **Question pages in the same topic group:** research them in one pass if their top results overlap; still one content brief per page.
- **Never** regenerate a content file to change a few lines. Edit the lines.
