# AdsPeek Website Build System

Master instructions for Antigravity. Read this file at the start of every session. It tells you which agent to run, which files to open, and when to stop.

## How this system splits the work

- **Thinking is already done.** Strategy, keywords, page list, templates, design tokens, responsive rules and SEO rules were decided in the guides. Don't re-decide them, debate them or propose alternatives unless Ritesh asks.
- **Antigravity executes.** Your job is to build exactly what the guides specify, one task at a time, as cheaply as possible.
- **Ritesh supplies** business facts (`state/BUSINESS_FACTS.md`), reference images (`references/`) and final approval.

---

## Folder map

```
adspeek-build-system/
├── AGENTS.md                         ← you are here (master instructions)
├── README.md                         ← for Ritesh: how to run the system
├── agents/
│   ├── efficiency-agent.md           ← Credit Guard: runs first and last on every task
│   ├── content-writer-agent.md       ← research + SEO copy for each page
│   ├── section-builder-agent.md      ← reference image → section component → page
│   ├── responsive-agent.md           ← mobile / tablet / desktop behaviour
│   └── qa-agent.md                   ← final checks before a page is marked done
├── guides/
│   ├── adspeek-seo-plan.md           ← WHAT to build: keyword, pages, templates, phases
│   ├── adspeek-seo-technical-guide.md← HOW to code it: Next.js, schema, sitemap, speed
│   ├── adspeek-seo-best-practices.md ← HOW to write each page
│   ├── ui-ux-design-guide.md         ← fonts, colours, buttons, spacing, shadows (Shopify-style)
│   └── responsive-guide.md           ← how layouts change across devices
├── state/
│   ├── PROJECT_STATE.md              ← progress, components, decisions, TODOs (read FIRST)
│   ├── CONTEXT_INDEX.md              ← which guide sections to open for each task
│   └── BUSINESS_FACTS.md             ← the ONLY source of AdsPeek facts (Ritesh fills)
├── references/                       ← Ritesh's reference images (structure only)
└── briefs/                           ← cached outputs; reuse, never regenerate
    ├── research/                     ← competitor research notes per page
    ├── content/                      ← content briefs per page
    └── references/                   ← reference briefs per section image
```

---

## Golden rules

1. **Start every session with the Credit Guard** (`agents/efficiency-agent.md`). It reads `state/PROJECT_STATE.md`, picks the task, and tells you which guide sections to open via `state/CONTEXT_INDEX.md`.
2. **Never read a whole guide.** Open only the sections listed in `CONTEXT_INDEX.md` for the current task.
3. **Never redo cached work.** If a research note, content brief or reference brief already exists in `briefs/`, use it.
4. **No live inspection.** Don't open a browser, DevTools, device emulator, screenshot tool or Lighthouse to check the site. Follow the rules in the guides and verify by reading code. Ritesh checks on real devices after deploy.
5. **References are images only**, in `references/`. Take structure from them, never styling. All visual values come from `guides/ui-ux-design-guide.md`.
6. **Never invent facts.** AdsPeek facts come only from `state/BUSINESS_FACTS.md`. If something is missing, write `TODO: <what's needed>` in the content and add it to the TODO list in `PROJECT_STATE.md`.
7. **One task at a time.** A task is one page (or one batch of same-type data pages). Finish it, update state, stop.
8. **End every task with the Credit Guard**, which updates `PROJECT_STATE.md` so the next session needs nothing else.

---

## Agents and order

| Order | Agent | Runs when | Output |
| --- | --- | --- | --- |
| 1 | Credit Guard (`efficiency-agent.md`) | Start of every task | Task picked, reading list |
| 2 | Content Writer (`content-writer-agent.md`) | Page needs copy | Research note, content brief, content file |
| 3 | Section Builder (`section-builder-agent.md`) | Page needs sections built or assembled | Reference briefs, section components, page route |
| 4 | Responsive Agent (`responsive-agent.md`) | After any new or changed section; on device bug reports | Responsive spec applied in code |
| 5 | QA Agent (`qa-agent.md`) | Before a page is marked done | Pass/fail report, small fixes |
| 6 | Credit Guard | End of every task | `PROJECT_STATE.md` updated |

Agents hand over through files, not conversation: each writes its output to the path its agent file names, and the next agent reads that file.

---

## Build sequence

### Phase 0: Setup (once)

Done before any page. Detailed steps are in `agents/section-builder-agent.md` (Setup) and the technical guide.

1. Next.js project structure, config, metadata helpers, sitemap, robots, schema builders, content loaders (`adspeek-seo-technical-guide.md`).
2. Design tokens in the Tailwind theme and global CSS: breakpoints, type scale, colours, spacing, radius, shadows, motion (`ui-ux-design-guide.md`).
3. UI primitives built once and registered in `PROJECT_STATE.md`: Container, Section, Heading, Text, Eyebrow, Button, TextLink, Card, Badge, Stat, Accordion, Carousel, Breadcrumbs, AnswerBlock, FaqBlock, CtaBand, JsonLd.
4. Global header and footer (from `references/_global/` images if provided).
5. `npm run seo:check` script.

After Phase 0, agents use the primitives and tokens in code. They don't reopen the design guide for values.

### Phases 1–4: Pages

Follow the page order in `adspeek-seo-plan.md` section 9. `PROJECT_STATE.md` lists the Phase 1 pages already. Respect each phase gate: don't start the next phase until Ritesh confirms the gate is met.

---

## Priority when things conflict

| Question | Decided by |
| --- | --- |
| Which pages exist, which keyword, which sections are required for SEO | `adspeek-seo-plan.md` |
| Section order and layout of a page or section | Ritesh's reference image (if provided), else the plan's template |
| Every visual value (font, colour, button, spacing, radius, shadow, motion) | `ui-ux-design-guide.md`, always |
| How layout changes per device | `responsive-guide.md` |
| How code is written | `adspeek-seo-technical-guide.md` |
| How copy is written | `adspeek-seo-best-practices.md` |
| Any AdsPeek fact | `state/BUSINESS_FACTS.md` |

If the reference image lacks a section the SEO template requires (answer block, FAQ, breadcrumbs, internal links), add it using the standard pattern for that section type.

---

## What Ritesh can ask

| Request | What you do |
| --- | --- |
| "Run Phase 0" | Setup steps above |
| "Build next page" | Credit Guard picks the next page from `PROJECT_STATE.md` and runs the full agent sequence |
| "Build page `/services/x/`" | Same, for that page |
| "Write content for `<page>`" | Content Writer only |
| "Build section from `references/<page>/<image>`" | Section Builder → Responsive Agent → QA for that section |
| "Fix on mobile: `<page>`, `<section>`, `<problem>`" | Responsive Agent only |
| "QA `<page>`" | QA Agent only |
| "Status" | Credit Guard: summarise `PROJECT_STATE.md` in ≤ 10 lines |
