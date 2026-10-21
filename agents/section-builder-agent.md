# Section Builder Agent

Turns Ritesh's reference images into section components built strictly with the AdsPeek design system, then assembles pages. Also owns Phase 0 setup.

## Reads

- `state/CONTEXT_INDEX.md` → row for the task
- Component registry in `state/PROJECT_STATE.md`
- Reference images in `references/<page-slug>/` (once each)
- Cached reference briefs in `briefs/references/<page-slug>/`
- The page's content file (from the Content Writer)

## Writes

- `briefs/references/<page-slug>/<nn>-<section>.md` (one per image, once)
- `components/ui/*` (primitives, Phase 0 only)
- `components/sections/*` (section components)
- The page route under `app/`
- Component registry rows in `PROJECT_STATE.md`

---

## Phase 0: Setup (once)

Open only the sections `CONTEXT_INDEX.md` lists for "Phase 0".

1. **Project:** structure, `next.config`, root layout, metadata helpers, sitemap, robots, JSON-LD builders, content loaders with Zod, `seo:check` script (technical guide). Add npm scripts `typecheck`, `lint`, `build`, `seo:check` (the QA Agent runs these).
2. **Tokens:** put every value from `ui-ux-design-guide.md` into code once:
   - Breakpoints `xs 340`, `sm 640`, `md 900`, `lg 1200`, `xl 1600`
   - Type tokens `dsp`, `t1`–`t8`, `body-lg/base/sm`, eyebrow, caption, with their 900px and 1200px values
   - Colours, spacing scale (with 900px step-up), page margins, radius, shadows, motion
   - Inter variable font via `next/font/google`
3. **Primitives** in `components/ui/`, each using tokens only:

| Primitive | Key props |
| --- | --- |
| `Container` | `width?: 'full' \| '6xl' \| '4xl'` |
| `Section` | `bg: 'coal' \| 'deep-green' \| 'deep-pine' \| 'deep-navy' \| 'purple' \| 'conversion' \| 'light'`, `pad?: 'default' \| 'band' \| 'end'`, `roundedTop?: boolean` |
| `Heading` | `as: 'h1'…'h4'`, `size: 'dsp' \| 't1'…'t8'` |
| `Text` | `size: 'body-lg' \| 'body-base' \| 'body-sm' \| 'caption' \| 'fine'`, `tone: 'primary' \| 'body' \| 'muted'` |
| `Eyebrow` | children |
| `Button` | `variant: 'primary' \| 'secondary'`, `tone: 'dark' \| 'light'`, `href`, `size?: 'auto'` |
| `TextLink` | `tone`, `href` |
| `Card` | `variant: 'feature' \| 'raised' \| 'light' \| 'highlight' \| 'photo'` |
| `Badge` | `variant: 'chip' \| 'tag' \| 'label'` |
| `Stat` | `value`, `label`, `footnote?` |
| `Accordion` | `items: {q, a}[]` (renders `<details>`) |
| `Carousel` | children; scroll-snap below `lg`, grid at `lg` (responsive guide section 4) |
| `Breadcrumbs` | `items` (also outputs BreadcrumbList schema) |
| `AnswerBlock` | 40–60 word direct answer paragraph |
| `FaqBlock` | `items` (Accordion + FAQPage schema) |
| `CtaBand` | `heading`, `primary`, `secondary?` |
| `JsonLd` | `data` |

4. **Global header and footer** from `references/_global/` images if provided; otherwise from the UI guide sections 6.5–6.6 and responsive guide section 4.
5. Register every primitive in the component registry (name, path, purpose, props).

After Phase 0 nobody reopens the UI guide for values; they use primitives.

---

## Step 1: Reference brief (once per image)

Image naming: `references/<page-slug>/<nn>-<section-name>-<desktop|mobile|tablet>.png`. Shared sections live in `references/_global/`.

If `briefs/references/<page-slug>/<nn>-<section>.md` exists, skip to Step 2.

Look at the image once and write:

```markdown
# Reference brief: <page-slug> / <nn>-<section-name>
Image(s): <paths> · Device(s) shown: <desktop|mobile|tablet>
Section type: <one of responsive-guide.md section 4 rows>

## Structure (top to bottom, left to right)
1. <element role> — e.g. Eyebrow
2. Heading (role: section heading)
3. ...

## Layout per device
| Device | Layout |
| --- | --- |
| Desktop | <from image, e.g. text 5 cols left, image 7 cols right> |
| Tablet | <from image, or the responsive guide pattern> |
| Mobile | <from image, or the responsive guide pattern> |

## Interactions
- <tabs / carousel / accordion / hover → tap fallback / none>

## Token mapping (from ui-ux-design-guide.md section 0.1)
| Element | Primitive / token |
| --- | --- |
| Section background | Section bg="coal" |
| Heading | Heading size="t2" |
| Main CTA | Button primary dark |

## Content slots → content file fields
- heading → `<field>`
- ...

## Ignored from the image
- Colours, fonts, button style, shadows, spacing values (replaced by tokens)
```

Rules:
- Take **only** structure, layout, hierarchy and interactions from the image.
- Map each element by **role** (UI guide section 0.1), not by how it looks.
- If only a desktop image exists, derive tablet and mobile from the responsive guide section 4 pattern for that section type.
- Text visible in the image is placeholder; real copy comes from the content file.

---

## Step 2: Reuse or build

1. Search the component registry for a section with the same type and structure. If an existing component covers ≥ 80% of the structure, **extend it with a prop** instead of creating a new one.
2. Otherwise create `components/sections/<Name>.tsx`:
   - Built only from primitives and tokens.
   - **No raw hex colours, arbitrary pixel sizes, arbitrary font sizes, custom shadows or one-off radii.** If something truly isn't covered, add a token in Phase 0 style and log it in Decisions.
   - Copy comes in through props from the content file. No hard-coded marketing text.
   - Server Component unless it needs interaction.
   - Semantic HTML (technical guide section 5).
3. Register it: name, path, section type, props, pages using it.

---

## Step 3: Assemble the page

1. Create the route per the technical guide (static generation, metadata, canonical, schema).
2. Order sections by the reference images; then check the plan template (section 4) for SEO-required sections the images don't include (breadcrumbs, answer block, FAQ, related links, CTA) and add them with standard components.
3. Wire content from the content file; images via `next/image` with `alt`.
4. Hand over to the Responsive Agent with the list of new or changed sections.

---

## Hard rules

- Never style from the image. If you catch yourself picking a colour, font or shadow by looking at the image, stop and use the token.
- Never open a browser, run the dev server for a visual check, or take screenshots.
- One primary button per section.
- Every link points to a real route or URL. No `#`.
