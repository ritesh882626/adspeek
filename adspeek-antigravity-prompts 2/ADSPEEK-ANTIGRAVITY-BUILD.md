# AdsPeek website — build instructions for Antigravity

You are building the AdsPeek agency website in **Next.js 14 (App Router) + TypeScript + Tailwind CSS**: 6 responsive pages, built section by section from approved designs. This file contains everything you need: the rules, 52 tasks in order, and the six design references in the Appendix.

## How to work through this file
1. Do **Task 0** first.
2. Then do the tasks **strictly in order**, one at a time. Finish a task completely before reading the next one.
3. Each task lists the only files you may create or edit. Never touch any other file — not to reformat, not to "fix", not to update imports elsewhere unless the task says so.
4. After every task, add one line to `CHANGELOG.md`: date, task number and title, files touched.
5. At the end of each phase there is a **STOP** line. Stop there, report back, and wait for the user to say "continue".
6. Never open a browser or run the site to inspect it visually. Make every section responsive by following its desktop / tablet / mobile rules exactly. The reference files' `<style>` blocks hold the exact breakpoint values.
7. If something in a task is unclear or impossible, do the rest of the task, then list the open point in your phase report. Do not invent content: text in [square brackets] is a placeholder and stays as it is.
8. If the project has no Next.js app yet, create one in Task 0 with `npx create-next-app@14` (TypeScript, Tailwind, App Router, ESLint, `src/` directory **off**, import alias `@/*`). If one already exists, use it and don't recreate it.
9. If `design-reference/` already exists in the repo with all six files, skip copying them in Task 0.

## Phases
- **Phase 0 — Setup** (Task 0)
- **Phase 1 — Foundation** (5 tasks)
- **Phase 2 — Homepage  /** (11 tasks)
- **Phase 3 — Shopify Development  /shopify-development** (9 tasks)
- **Phase 4 — Contact  /contact** (5 tasks)
- **Phase 5 — About  /about** (6 tasks)
- **Phase 6 — City page  /shopify-development/gurugram** (9 tasks)
- **Phase 7 — Guides  /guides** (6 tasks)
- **Phase 8 — Final QA** (1 tasks)

---

# PHASE 0 — SETUP

## TASK 0 — Design references
### Files
- `design-reference/` (six HTML files)
- `CHANGELOG.md`

### Do this
If the six files are not already in `design-reference/`, copy each reference from the **Appendix** — everything between the `~~~~~~html` line and the closing `~~~~~~` line, unchanged — into the path shown in its heading. Then create `CHANGELOG.md` with a first line for Task 0.
These files are read-only: later tasks read them for exact text, structure and breakpoint values. Never open them in a browser and never edit them.

### Done when
- Six files exist in `design-reference/`, each starting with `<!doctype html>`.

> **Continue straight to Phase 1** (no stop needed after Task 0).

---

# BACKGROUND (read once)
Six pages, built section by section in Next.js 14 (App Router, TypeScript, Tailwind CSS).

### How these tasks were planned
1. Put the folder `design-reference/` (from this zip) in the root of the repo. It holds the six approved designs as HTML files. Antigravity reads them only for **text and structure** — it never opens them in a browser.
2. Run the prompts **one at a time, in folder order**. Finish and check one before starting the next.
3. After each prompt, check the page at phone width and desktop width yourself, then commit **only the files that prompt touched**.
4. If you ask for a fix, ask it inside the same prompt's scope ("In Hero.tsx only, …") so other sections are never rewritten.

### Order
| Folder | What it builds | Prompts |
|---|---|---|
| 01-foundation | Tokens, fonts, shared components, header, footer, CTA band | 5 |
| 02-home | Homepage `/` | 11 |
| 03-shopify-service | Shopify Development + package builder `/shopify-development` | 9 |
| 04-contact | Contact `/contact` | 5 |
| 05-about | About `/about` | 6 |
| 06-city-page | City page template, first city Gurugram `/shopify-development/gurugram` | 9 |
| 07-guides | Blog index `/guides` | 6 |
| 08-final-qa | Responsive and link audit across all pages | 1 |

### Reference files
| Page | Route | Reference |
|---|---|---|
| Homepage | `/` | `design-reference/index.html` |
| Shopify Development | `/shopify-development` | `design-reference/shopify-development.html` |
| Contact | `/contact` | `design-reference/contact.html` |
| About | `/about` | `design-reference/about.html` |
| City — Gurugram | `/shopify-development/gurugram` | `design-reference/shopify-development-gurugram.html` |
| Guides | `/guides` | `design-reference/guides.html` |

### Breakpoints used in every prompt
- **Mobile:** below 640px (Tailwind default, no prefix)
- **Tablet:** 640–1023px (`sm:` and `md:`)
- **Desktop:** 1024px and wider (`lg:`); content never wider than 1280px

### Note on the reference files
The reference HTML shows arrows (→) on some buttons and links. **Leave them out** — your build rule is no arrows on buttons or links. Every prompt repeats this.

### About the reference files
The six files in `design-reference/` are fully responsive. Each one contains a `<style>` block with the exact tablet (max-width 1023px) and phone (max-width 639px) rules, and the class names on each element (`wrap sec`, `h1`, `h2`, `btnrow`, `swipe`, `cmp-cards`, `mbar` …) show which rule applies where. If a prompt and the reference ever disagree on a mobile detail, follow the prompt.

To see them yourself, open any file in a browser and make the window narrower; at 1023px the tablet layout kicks in, at 639px the phone layout.


---

# PHASE 1 — FOUNDATION
## TASK 1 — Foundation 1 — Project setup and design tokens

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/globals.css`
- `CHANGELOG.md` (create if missing)

### Do this
1. **Fonts** with `next/font/google`:
   - `Schibsted_Grotesk` weights 400, 500, 600, 700, 800 → CSS variable `--font-sans` (all headings and body)
   - `IBM_Plex_Mono` weights 400, 500 → CSS variable `--font-mono` (small labels, numbers, eyebrows)
   Apply both variables on `<html>`; set `font-sans` as the body default.
2. **Colours** in `tailwind.config.ts` → `theme.extend.colors`:
   | Token | Hex | Use |
   |---|---|---|
   | `ink` | #111410 | main text, dark buttons, borders that should read strong |
   | `paper` | #FAFAF7 | page background |
   | `white` | #FFFFFF | alternate section background, cards |
   | `forest` | #0F3D2E | header button, Growth System band, dark bands |
   | `accent` | #C8F03C | lime highlight, selected states, CTA band |
   | `line` | #D9DBD3 | thin dividers |
   | `line-strong` | #C9CCC3 | unselected option borders |
   | `muted` | #5B6159 | secondary text and labels |
   | `body` | #3A3F38 | paragraph text |
   | `placeholder` | #E7E9E1 | image placeholders |
   | `forest-line` | #3C6A5A | dividers on forest |
   | `forest-muted` | #B9CEC4 | labels on forest |
   | `forest-text` | #D3E0D9 | paragraphs on forest |
   | `footer-text` | #D3D6CE, `footer-muted` #9CA196, `footer-line` #33372F | footer only |
3. **Radius:** set `borderRadius.DEFAULT` and all sizes to `0`. Nothing on the site is rounded.
4. **Container:** max width 1280px, centred, horizontal padding 32px on desktop and tablet, 20px on mobile.
5. **Type scale** (add as `fontSize` tokens, mobile → desktop):
   | Token | Mobile | Tablet | Desktop | Line height / tracking |
   |---|---|---|---|---|
   | `display` (page H1) | 42px (line height 1.02) | 56px | 72–76px | 0.98 / −0.035em, weight 800 |
   | `h2` | 32px (line height 1.08) | 40px | 48px | 1.04 / −0.03em, weight 800 |
   | `h3` | 22px | 24px | 26px | 1.2 / −0.02em, weight 700 |
   | `lead` | 17px | 18px | 20px | 1.5 |
   | `body` | 15px | 16px | 16–17px | 1.55 |
   | `label` (mono) | 12px | 12px | 12–13px | uppercase, +0.06em tracking |
6. `globals.css`: `body` background `paper`, colour `ink`; `a` colour `forest`, hover `ink`; no `scroll-behavior: smooth`; `*` box-sizing border-box; `img` max-width 100%.
7. `app/layout.tsx`: `<html lang="en">`, default metadata title "AdsPeek — Shopify Development & Growth Studio, Gurugram". Render `{children}` only — header and footer are added in Foundation 3 and 4.

### Done when
- `npm run build` passes.
- Only the four files above changed.
## TASK 2 — Foundation 2 — Shared components

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `components/ui/Container.tsx`
- `components/ui/Section.tsx`
- `components/ui/Eyebrow.tsx`
- `components/ui/Heading.tsx`
- `components/ui/Button.tsx`
- `components/ui/Placeholder.tsx`
- `components/ui/Highlight.tsx`
- `components/ui/SpecList.tsx`

### Build these
1. **Container** — max-width 1280px, centred, padding-x 20px mobile / 32px from 640px up.
2. **Section** — `<section>` with props: `id`, `bg` (`paper` | `white` | `forest` | `accent` | `ink`), `border` (bottom 1px `line`, default true), `padTopDesktop` (default 96), `padBottomDesktop` (96), `padTopTablet` (72), `padBottomTablet` (72), `padTopMobile` (56), `padBottomMobile` (56). Desktop values from 1024px, tablet 640–1023px, mobile below 640px. Wraps children in `Container`.
3. **Eyebrow** — mono, 13px desktop / 12px mobile, uppercase, tracking 0.06em, colour `muted` (prop `tone="onDark"` → `forest-muted`), margin-bottom 16px. Renders a `<p>`.
4. **Heading** — `level` 1 | 2 | 3 using the type scale tokens. `<br>` from the reference is kept on desktop only: render line breaks as `<span className="hidden lg:inline"><br/></span>` so lines flow naturally on mobile.
5. **Button** — renders `<a>` (Next `Link`). Variants:
   - `dark`: ink background, white text
   - `outline`: 1px ink border, ink text, transparent
   - `outline-thick`: 2px ink border
   - `forest`: forest background, white text (header only)
   - `accent`: accent background, ink text
   Sizes: padding 16px 24px, font 16px weight 600, **min-height 44px**, inline-flex centred. On mobile below 640px buttons inside a button row become **full width**. Hover: background or border colour change only. No arrows.
6. **Placeholder** — grey box (`placeholder` bg, 1px `line` border) with a centred mono uppercase 12px label in `muted`. Prop `ratio` (e.g. `4/3`, `16/9`, `1/1`, `4/5`, `16/10`) via `aspect-ratio`. This is where real images go later — accept an optional `src` + `alt` and render `next/image` with `object-cover` when given.
7. **Highlight** — inline span with accent background and 0 10px padding, `box-decoration-break: clone` so it wraps cleanly over two lines.
8. **SpecList** — a bordered box (1px ink, white bg) with an optional header row (mono label left, mono code right, 1px ink bottom border) and rows of `label` / `value`. Rows: 2 columns (label 110–130px, value fills), 1px `line` between rows, padding 16px 20px. Below 380px the label sits **above** the value (single column).

### Done when
- Each component has typed props and no page-specific text inside it.
- Only the files above were created.
## TASK 3 — Foundation 3 — Header (all pages)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the `<header>` element at the top.

### Files
- `components/layout/Header.tsx`
- `components/layout/MobileMenu.tsx` (client component)
- `app/layout.tsx` (only to render `<Header />` above `{children}`)

### What it does
Logo left, five nav links, one "Book a call" button. **Sticky** at the top on every page and every screen size.

### Content
- Logo: an 18×18px square (accent fill, 2px ink border) + the word "AdsPeek" (22px, weight 800, tracking −0.02em). Links to `/`. (The final logo will replace this later — keep it in its own `Logo` sub-component.)
- Links: Services → `/shopify-development`, Growth System → `/#system`, Work → `/#work`, Guides → `/guides`, About → `/about`.
- Button: "Book a call" → `/contact`, `forest` variant. **No arrow.**

### Desktop (1024px and wider)
One row: logo · links (gap 28px, 15px weight 500) · button. Height about 80px (padding 18px 0). Bottom border 1px `line`. Background `paper`.

### Tablet (640–1023px)
Logo left, button and a menu button right. Links move into the mobile menu.

### Mobile (below 640px)
Logo left, menu button right (44×44px, three-line icon drawn with inline SVG, `aria-label="Open menu"`). "Book a call" moves **into** the menu as a full-width button at the bottom. Header height 64px.

### Mobile menu
Opens as a full-width panel directly under the header (not a slide-in, no animation), background `paper`, each link 56px tall with a 1px `line` divider, 18px weight 600. Close button `aria-label="Close menu"`. Closes on link click and on Escape. Body scroll is locked while open.

### Details
`position: sticky; top: 0; z-index: 50`, background `paper` (solid, not transparent).

### Accessibility
`<nav aria-label="Main">`. Menu button has `aria-expanded` and `aria-controls`.

### Done when
- Header stays at the top while scrolling on phone and desktop.
- At 360px nothing wraps or overlaps.
- Only the three files above changed.
## TASK 4 — Foundation 4 — Footer (all pages)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/contact.html` → the `<footer>` element (this is the full footer with the "Shopify by city" column).

### Files
- `components/layout/Footer.tsx`
- `app/layout.tsx` (only to render `<Footer />` below `{children}`)

### Content
Four columns: brand (small accent square + "AdsPeek" + address), Services, Shopify by city, Company. Bottom row: "© 2026 AdsPeek" left, Privacy and Terms right.
Links: Shopify Development → `/shopify-development`; Website Development, App Development, Meta Ads → `#` for now; Gurugram → `/shopify-development/gurugram`; Delhi, Mumbai, Dubai, London → `/shopify-development/[city]` (they will 404 until those city pages exist — that's expected); About → `/about`; Guides → `/guides`; Contact → `/contact`.

### Desktop (1024px and wider)
Background `ink`. Padding 64px top, 32px bottom. Four equal columns, gap 40px, 48px space then a 1px `footer-line` divider, then the bottom row (13px, `footer-muted`). Column titles mono 12px uppercase `footer-muted`; links 15px `footer-text`, no underline, gap 10px.

### Tablet (640–1023px)
Two columns × two rows.

### Mobile (below 640px)
One column, gap 32px. Each link at least 44px tall (padding 10px 0). Bottom row stacks: copyright, then Privacy · Terms.

### Accessibility
Each link column is a `<nav>` with an `aria-label` matching its title.

### Done when
- Readable on dark background; links easy to tap on phone.
- Only the two files above changed.
## TASK 5 — Foundation 5 — CTA band (used at the bottom of every page)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the lime section with id `book` ("Tell us about your brand.").

### Files
- `components/sections/CtaBand.tsx`

### What it does
Big statement on the lime accent background with two buttons. Each page passes its own heading and button labels.

### Props
`heading` (string, may include a line break), `primary` {label, href}, `secondary` {label, href} (default "WhatsApp us" → `#whatsapp`), `id` (optional).

### Desktop (1024px and wider)
Background `accent`, no bottom border, padding 96px top and bottom (props). Heading left (64px, weight 800, line height 1, tracking −0.035em, max about 60% width), buttons right aligned to the bottom of the heading. Primary = `dark`, secondary = `outline-thick`.

### Tablet (640–1023px)
Heading full width (48px), buttons below in a row, gap 12px.

### Mobile (below 640px)
Heading 36px. Buttons stack full width, gap 12px. Padding 64px top and bottom.

### Done when
- Works with a one-line and a two-line heading.
- Only `CtaBand.tsx` was created.

> **STOP — end of Phase 1.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 2.


---

# PHASE 2 — HOMEPAGE  /
## TASK 6 — Home · Section 1 — Hero with engagement spec

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the `<section id="top">` (headline "We build your store. Then the system that sells from it." and the "Engagement spec" box).

### Files
- `components/home/Hero.tsx`

### What this section does
States the positioning in one line and shows the key facts in a spec box, so the visitor understands the offer without scrolling.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **88px top / 80px bottom** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Two columns, gap 56px, aligned to the bottom: left about 60% (eyebrow, H1, lead paragraph, two buttons), right about 40% (`SpecList` with header "Engagement spec" / "AP-01" and five rows: Platform, Build time, After launch, Best for, Starts from — "Starts from" value is weight 700).
- H1 `display` 76px over three lines; the middle line "Then the system" is wrapped in `Highlight`.
- Lead paragraph max-width 560px, 20px, colour `body`, margin 32px top / 40px bottom.
- Buttons: "Book a free strategy call" (`dark`, → `/contact`) and "How the system works" (`outline`, → `#system`), gap 12px.

### Tablet (640–1023px)
- Stack: text block first, spec box below at full width, gap 48px.
- H1 56px; line breaks kept.

### Mobile (below 640px)
- Padding 40px top / 56px bottom.
- H1 42px, let lines wrap naturally (no forced breaks), highlight still on "Then the system".
- Eyebrow wraps onto two lines if needed.
- Buttons stack full width.
- Spec box full width; rows switch to label-above-value below 380px.

### Details
- Eyebrow text is mono, 13px, colour `muted`.

### Accessibility
- Only one `<h1>` on the page (this one).

### Done when
- Spec box sits under the text on tablet and phone.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 7 — Home · Section 2 — At-a-glance strip

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the section with `aria-label="At a glance"` (four cells: [XX] Stores launched, [X]+ yrs, [X] countries, Built with …).

### Files
- `components/home/TrustStrip.tsx`

### What this section does
Quick proof row under the hero. Numbers are placeholders until real figures are added.

### Desktop (1024px and wider)
- White background, bottom border, no vertical padding on the section itself — each cell has 28px top/bottom padding.
- Four equal columns separated by 1px `line` vertical dividers. Number 40px weight 800 tracking −0.03em; label 15px `muted` below, 6px gap.
- Fourth cell: mono label "Built with" then "Shopify · Meta · Google · Next.js · WhatsApp API" at 17px weight 600.

### Tablet (640–1023px)
- Two columns × two rows; dividers between columns and a 1px `line` between rows.

### Mobile (below 640px)
- Two columns × two rows for the three number cells + the "Built with" cell spanning full width underneath.
- Number 32px. Cell padding 20px. Remove the right divider on the last cell of each row.

### Done when
- Dividers never double up at row ends.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 8 — Home · Section 3 — Typical agency vs AdsPeek

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the section with eyebrow "01 — The difference".

### Files
- `components/home/Comparison.tsx`

### What this section does
Shows, row by row, where a typical agency stops and AdsPeek keeps going. This is the core positioning.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Top: eyebrow + H2 ("A store is the start, not the deliverable.") left, short paragraph right (max 420px), aligned to the bottom, gap 24px, 48px below.
- Table in a 1px ink box: header row on ink background (mono 12px uppercase white) with three columns: empty / "Typical agency" / "AdsPeek" (AdsPeek header cell on `accent` with ink text).
- Five rows (Scope ends at, Ads, Follow-up & retention, Tracking, When something breaks). Columns 220px / 1fr / 1fr. Cell padding 20px, 1px `line` between rows and columns. First column weight 600; middle column `muted`; AdsPeek column weight 500.
- Build it as a real `<table>` with `<th scope="col">` and `<th scope="row">`.

### Tablet (640–1023px)
- Same table, first column 180px.

### Mobile (below 640px)
- **Do not** use a sideways-scrolling table. Instead show **five stacked cards**, one per row: the row title as a bold line, then two lines — "Typical agency: …" in `muted` and "AdsPeek: …" with a 4px accent left marker block (a small square, not a coloured border line) — each card separated by 1px `line`.
- Keep the semantic `<table>` for 640px and up; render the card list only below 640px (hide the other with Tailwind classes).

### Done when
- Phone shows the stacked cards, tablet/desktop show the table.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 9 — Home · Section 4 — Services list

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → `<section id="services">` ("Four things we do. All of them connect.").

### Files
- `components/home/ServicesList.tsx`

### What this section does
Lists the four services as full-width rows (not cards), each linking to its service page.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background.
- Eyebrow "02 — Services", H2 with 48px below.
- 2px ink top rule, then four rows. Each row is one `<a>` with three columns (gap 24px): [code S1 in mono `muted` + service name 30px weight 700] / description 16px `body` / "For" label (mono 12px) above the audience line 15px `muted`. Row padding 32px 0, 1px `line` below.
- Links: Shopify Development → `/shopify-development`; the other three → `#` for now.
- Hover: service name colour changes to `forest`. No arrow.

### Tablet (640–1023px)
- Two columns: name on the left, description + "For" stacked on the right.

### Mobile (below 640px)
- One column per row: code + name (24px), description, then "For" line. Row padding 24px 0.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 10 — Home · Section 5 — Growth System (four parts, one loop)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → `<section id="system">` (dark green band).

### Files
- `components/home/GrowthSystem.tsx`

### What this section does
Explains the differentiator visually: Store → Ads → Automation → Tracking, and back to Store.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). Background `forest`, white text, no bottom border.
- Top: eyebrow (`onDark`) "03 — The Growth System" + H2 "Four parts, one loop." left; paragraph right in `forest-text`, max 440px; 56px below.
- Four equal columns inside a 1px `forest-line` box, separated by 1px `forest-line`. Each column padding 28px: top row has the number (01–04) in mono 13px **accent** colour on the left and a small mono marker on the right (columns 1–3 show a plain right-pointing chevron drawn as text "›" in `forest-muted`; column 4 shows "back to 01"). 40px gap, then H3 26px, then a 3-item list (15px, `forest-text`, gap 10px, no bullets).
- Note: the "›" here is a diagram marker inside the content, **not** on a button or link, so it is allowed.

### Tablet (640–1023px)
- Two columns × two rows. The column-4 marker reads "back to 01".

### Mobile (below 640px)
- One column, four stacked blocks. Between blocks show a centred mono "↓" in `forest-muted` (diagram marker). After block 4, a small line "back to 01 — the loop repeats" in mono 12px.
- Column padding 24px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 11 — Home · Section 6 — Selected work

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → `<section id="work">` ("Recent builds.").

### Files
- `components/home/SelectedWork.tsx`
- `data/work.ts` (new — the three projects as data so the service page can reuse them)

### What this section does
Shows three recent builds with placeholder screenshots until real images are added.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Header row: eyebrow + H2 left; "See all work" text link (16px weight 600, ink, underline) right. 48px below. No arrow.
- Three equal columns, gap 32px. Each card is one `<a>`: `Placeholder` ratio 4/3 ("[Homepage screenshot]"), mono meta row (category left, platform right), project name 20px weight 700, one-line result 15px `body`; gap 16px.

### Tablet (640–1023px)
- Two columns; third card wraps below left.

### Mobile (below 640px)
- **Horizontal swipe row**: cards 82% of screen width, scroll-snap (`snap-x snap-mandatory`, each card `snap-start`), gap 16px, the next card peeks in. No arrow buttons — swiping only. Hide the scrollbar visually but keep it usable.
- "See all work" link moves below the row.

### Done when
- On phone the row swipes and snaps; no page-level sideways scroll.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 12 — Home · Section 7 — Process timeline

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → `<section id="process">` ("From first call to monthly growth.").

### Files
- `components/home/ProcessTimeline.tsx`

### What this section does
Five steps from strategy call to monthly growth, each with a timing label.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background.
- Eyebrow, H2, 56px below.
- `<ol>` with 2px ink top rule; five equal columns. Each step: mono 12px timing label (`muted`; the last one "Every month" sits on an `accent` chip with 2px 6px padding), title 20px weight 700, one line 15px `body`; gap 10px; padding-top 24px.

### Tablet (640–1023px)
- Three columns then two (grid wraps).

### Mobile (below 640px)
- Vertical list: each step is a row with the timing label on the left (fixed 96px) and title + text on the right, 1px `line` between steps, padding 20px 0.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 13 — Home · Section 8 — Ways to work with us

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the section with eyebrow "06 — Ways to work with us".

### Files
- `components/home/WaysToWork.tsx`

### What this section does
Three ways to start (Store build, Store + Growth, Growth only) with placeholder prices. Teaches that packages are flexible.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Eyebrow, H2 "Pick where to start.", 48px below.
- One 1px ink box split into three equal columns (1px `line` dividers). Each column padding 32px, gap 16px: mono label, H3, price 32px weight 800, description 15px `body`.
- Middle column ("Store + Growth", label "Most chosen" in `forest`) has white background and a 6px accent bar along its top edge (a full-width block, not a border on one side of a card).

### Tablet (640–1023px)
- Same three columns, padding 24px, price 26px.

### Mobile (below 640px)
- Stack the three; put "Store + Growth" **first**. 1px `line` between them. Price 28px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 14 — Home · Section 9 — FAQ

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/index.html` → the section with eyebrow "07 — Questions".

### Files
- `components/home/Faq.tsx`
- `components/home/faq-data.ts`

### What this section does
Answers the five questions asked before every project. Answers are always visible (no accordion) and are also output as FAQ structured data.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background.
- Left column (about 30%): eyebrow + H2 "Asked before every project." Right column (about 70%): `<dl>` with a 2px ink top rule.
- Each item: question (`<dt>`, 18px weight 700) left half, answer (`<dd>`, 15px `body`) right half, gap 32px, padding 24px 0, 1px `line` below.
- Also render a `<script type="application/ld+json">` FAQPage schema from `faq-data.ts`.

### Tablet (640–1023px)
- Heading on top full width; list below; question and answer still side by side.

### Mobile (below 640px)
- Heading on top; each item stacks question above answer (gap 8px).

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 15 — Home · Step 10 — Assemble the homepage

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `app/page.tsx`

### Do this
Render in this order: `Hero`, `TrustStrip`, `Comparison`, `ServicesList`, `GrowthSystem`, `SelectedWork`, `ProcessTimeline`, `WaysToWork`, `Faq`, then `CtaBand` with:
- heading "Tell us about your brand." + line break + "We'll map the system."
- primary "Book a free strategy call" → `/contact`
- secondary "WhatsApp us" → `#whatsapp`
- `id="book"`

Add page metadata: title "AdsPeek — Shopify Development & Growth Studio, Gurugram", a 150–160 character description written from the hero paragraph, canonical `/`.

### Done when
- The page reads top to bottom exactly like `design-reference/index.html` (minus arrows).
- Only `app/page.tsx` changed.
## TASK 16 — Home · Step 11 — Organization and LocalBusiness schema

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `components/seo/OrganizationSchema.tsx`
- `app/page.tsx` (only to render it)

### Do this
Output one JSON-LD block with `Organization` + `LocalBusiness` (`ProfessionalService`): name AdsPeek, url [SITE URL], logo [LOGO URL], address Sector 22, Gurugram, Haryana, IN, [PIN], telephone [PHONE], sameAs [social links]. Keep every [placeholder] as a string for now.

### Done when
- Valid JSON (no trailing commas). Only the two files changed.

> **STOP — end of Phase 2.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 3.


---

# PHASE 3 — SHOPIFY DEVELOPMENT  /shopify-development
## TASK 17 — Shopify page · Section 1 — Overview

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → the first `<section>` (breadcrumb, "Shopify stores, built to your list." and the four-fact box).

### Files
- `components/shopify/Overview.tsx`
- `components/ui/Breadcrumb.tsx` (new, reused on other pages)

### What this section does
Short intro that says AdsPeek does custom packages, not fixed ones, before the visitor starts building.

### Desktop (1024px and wider)
- Padding 56px top / 80px bottom.
- Breadcrumb (mono 13px `muted`): Services / Shopify Development, 40px below. Output BreadcrumbList JSON-LD.
- Two columns aligned to the bottom, gap 56px: left (H1 72px, second line in `Highlight`; paragraph 20px max 600px), right a 1px ink white box with a 2×2 grid of facts (mono label + 16px weight 600 value, padding 20px, 1px `line` dividers).

### Tablet (640–1023px)
- Stack; fact box full width, still 2×2.

### Mobile (below 640px)
- H1 42px. Fact box becomes 1 column × 4 rows. Padding 40px / 56px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 18 — Shopify page · Step 2 — Package builder: data and state (no UI yet)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → the `<script>` at the bottom. It contains every option list (`platformDefs`, product and collection ranges, `pageDefs`, `intDefs`, `autoDefs`) and the default selections. Copy the labels and descriptions exactly.

### Files
- `components/shopify/builder/options.ts`
- `components/shopify/builder/useBuilder.ts`

### Do this
1. `options.ts` — export typed arrays:
   - `PLATFORMS` (4: id, label, desc)
   - `PRODUCT_RANGES` ["Up to 25","26–100","101–500","500+"], `COLLECTION_RANGES` ["1–5","6–15","16–40","40+"]
   - `PAGES` (16: id, label, `included` true for Homepage, Collection page, Product page, Cart & checkout)
   - `INTEGRATIONS` (12: id, label, desc)
   - `AUTOMATIONS` (9: id, label, desc)
2. `useBuilder.ts` — a client hook holding: `platform` (default "new"), `products` ("26–100"), `collections` ("6–15"), `pages` (Set, default about + contact), `integrations` (default payments, shipping, pixel), `automations` (default cart, orders), contact fields `name`, `brand`, `contact`, `timeline`, and `status` ("idle" | "sending" | "sent" | "error").
   Expose: setters, `toggle(group, id)` (ignores `included` pages), derived `summary` (labels of every selected item, counts, `itemCount` = 2 + pages + integrations + automations), and `submit()`.
3. `submit()` posts JSON to `process.env.NEXT_PUBLIC_QUOTE_ENDPOINT` (your Google Apps Script web-app URL). If the variable is missing, log the payload to the console and still set status "sent" so the page can be tested. Any selection change after "sent" sets status back to "idle".

### Done when
- No UI files touched. Types compile. Only the two files exist.
## TASK 19 — Shopify page · Section 2a — Builder steps 01 and 02

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → `<section id="build">`, the fieldsets "01 What are we building?" and "02 How big is your catalogue?".

### Files
- `components/shopify/builder/BuilderSection.tsx` (section shell + two-column layout; summary slot left empty for now)
- `components/shopify/builder/StepHeader.tsx`
- `components/shopify/builder/OptionCard.tsx`
- `components/shopify/builder/OptionChip.tsx`
- `components/shopify/builder/StepPlatform.tsx`
- `components/shopify/builder/StepCatalogue.tsx`

### What this section does
Starts the build-your-package form: choose what is being built, then catalogue size.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Mono eyebrow "Build your package · 6 steps · about 2 minutes", H2 "Tell us what your store needs.", 56px below.
- `BuilderSection`: two columns — form (flex 1, min 600px) and an empty `aside` slot (340px) for the summary, gap 48px. Form steps are separated by 64px.
- `StepHeader`: number (mono 14px `muted`) + title 26px weight 700, then a hint line 15px `muted` indented 40px.
- Step 01: four `OptionCard`s in a 4-column grid (min 220px each, gap 12px). Card: padding 20px, min-height 120px, title 18px weight 700 + status text right ("● Selected" / "○" in mono 13px), description 14px `body`. Selected = accent background + 2px ink border; unselected = white + 1px `line-strong` border (add 1px margin so size doesn't jump).
- Step 02: two rows of `OptionChip`s ("Products", "Collections" mono labels above). Chip: padding 12px 18px, min-height 44px, same selected/unselected styles.

### Tablet (640–1023px)
- Summary slot moves **below** the form (full width).
- Step 01 cards: 2 × 2.

### Mobile (below 640px)
- Step 01 cards: one column, min-height 96px.
- Chips wrap onto as many lines as needed, gap 8px.
- Step hint lines not indented.

### Details
- All options are `<button type="button">` with `aria-pressed`. Group each step in `<fieldset>` + `<legend>`.

### Done when
- Tapping options changes the selected style instantly (no transition).
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 20 — Shopify page · Section 2b — Builder steps 03, 04 and 05

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → fieldsets "03 Which pages do you need?", "04 Integrations", "05 Automations".

### Files
- `components/shopify/builder/OptionRow.tsx`
- `components/shopify/builder/StepPages.tsx`
- `components/shopify/builder/StepIntegrations.tsx`
- `components/shopify/builder/StepAutomations.tsx`
- `components/shopify/builder/BuilderSection.tsx` (only to add these three steps after step 02)

### What this section does
Lets the visitor add pages, integrations and automations. The first four pages are always included.

### Desktop (1024px and wider)
- `OptionRow`: flex row, label (15px weight 600) + optional description (13px `muted`) on the left, status on the right (mono 12px: "Included" / "✓ Added" / "+ Add" for pages; "✓" / "+" for the others). Padding 14px 16px, min-height 52px. Selected = accent + 2px ink border; unselected = white + 1px `line-strong`; included = `#EDEFE7` background + 1px ink border, `disabled`, default cursor.
- Pages: grid, columns min 200px (4 per row at 1280px), gap 8px.
- Integrations and Automations: grid, columns min 260px (3 per row), gap 8px.

### Tablet (640–1023px)
- Pages 3 per row, Integrations/Automations 2 per row.

### Mobile (below 640px)
- Pages **2 per row** (labels may wrap to 2 lines), Integrations/Automations 1 per row.

### Details
- Rows are `<button type="button" aria-pressed>`; included pages also `aria-disabled="true"`.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 21 — Shopify page · Section 2c — Builder step 06 (contact details)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → fieldset "06 Where should we send your quote?".

### Files
- `components/shopify/builder/StepContact.tsx`
- `components/shopify/builder/BuilderSection.tsx` (only to add this step and wrap the steps in a `<form>` whose submit calls `submit()`)

### What this section does
Collects name, brand, WhatsApp/email and launch timing.

### Desktop (1024px and wider)
- 2 × 2 grid, gap 16px. Each field: `<label>` 14px weight 600 above the input. Inputs/select: 16px, padding 14px, min-height 48px, 1px `#8A8F86` border, `paper` background, square.
- Fields: Your name (required, autocomplete name), Brand name or website (autocomplete organization), WhatsApp or email (required), When do you want to launch? (select: Choose one / As soon as possible / In 1–2 months / In 3+ months / Just exploring).

### Tablet (640–1023px)
- Same 2 × 2.

### Mobile (below 640px)
- One column. Font size stays 16px (prevents iPhone zoom).

### Details
- Required fields show the browser's own validation message on submit.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 22 — Shopify page · Section 2d — "Your package" summary panel

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → the `<aside aria-label="Your package">`.

### Files
- `components/shopify/builder/SummaryPanel.tsx`
- `components/shopify/builder/MobileSummaryBar.tsx`
- `components/shopify/builder/BuilderSection.tsx` (only to place these two)

### What this section does
Live list of everything selected, with the "Send my package" button and the sent confirmation.

### Desktop (1024px and wider)
- Panel in the right column, `position: sticky; top: 104px` (below the sticky header). 1px ink border, `paper` bg.
- Header row: "Your package" left, "N items" right (mono 12px uppercase, 1px ink bottom border).
- Five rows (Build, Catalogue, Pages · N, Integrations · N, Automations · N): mono label + value (16px weight 600 for the first two, 15px list text for the rest; "None yet" when empty).
- Footer: "Send my package" (`dark`, full width, 48px, **no arrow**) + note 13px `muted`. When status is "sent": accent box "Package sent." + text, and an "Edit package" outline button. "sending" disables the button and shows "Sending…".

### Tablet (640–1023px)
- Panel sits below the form, not sticky, full width.

### Mobile (below 640px)
- Panel below the form (not sticky).
- **Plus** `MobileSummaryBar`: fixed to the bottom of the screen while the builder section is in view (use IntersectionObserver, no animation): ink background, white text, "N items selected" left and a "Review package" accent button right that jumps to the panel (`#package-summary`). Height 64px, respects `env(safe-area-inset-bottom)`. Hidden on 640px and up.

### Details
- Panel `aria-live="polite"` on the counts. Confirmation uses `role="status"`.

### Done when
- On phone the bottom bar appears only inside the builder section.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 23 — Shopify page · Section 3 — After you send it (procedure)

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → `<section id="process">` ("From package to live store.").

### Files
- `components/shopify/Procedure.tsx`

### What this section does
Five steps, each saying what the client gets and what they need to give.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- `<ol>` with 2px ink top rule. Each step is a 3-column row: [number + title 22px] / "You get" (mono label above 15px text) / "You give" or "You choose". Padding 28px 0, 1px `line` below.

### Tablet (640–1023px)
- Two columns: number + title left; "You get" and "You give" stacked right.

### Mobile (below 640px)
- One column: number + title, then "You get", then "You give", gap 12px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 24 — Shopify page · Section 4 — Related work

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development.html` → `<section id="work">` ("Shopify stores we've built.").

### Files
- `components/shopify/RelatedWork.tsx`
- `data/work.ts` (only to add an optional `package` text field to each project)

### What this section does
Three projects, each showing the package that client picked, so visitors can compare with theirs.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Same card layout as Home · Selected work (reuse the card markup — extract it to `components/ui/WorkCard.tsx` if it isn't already). Extra line under the name: **Package:** [N] products · [N] pages · [integrations] · [automations] (14px).

### Tablet (640–1023px)
- Two columns.

### Mobile (below 640px)
- Swipe row with scroll-snap, cards 82% width (same as Home).

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 25 — Shopify page · Step 9 — Assemble the page

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `app/shopify-development/page.tsx`

### Do this
Order: `Overview`, `BuilderSection` (id `build`), `Procedure`, `RelatedWork`, `CtaBand` (heading "Rather talk it through?", primary "Build your package" → `#build`, secondary "WhatsApp us").
Metadata: title "Shopify Development Company — Custom Packages | AdsPeek", description from the overview paragraph, canonical `/shopify-development`. Add `Service` JSON-LD (serviceType "Shopify development", provider AdsPeek, areaServed India and worldwide).

### Done when
- Builder works end to end: select, review summary, send, see confirmation, edit again.
- Only `page.tsx` changed.

> **STOP — end of Phase 3.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 4.


---

# PHASE 4 — CONTACT  /contact
## TASK 26 — Contact · Section 1 — Hero

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/contact.html` → first `<section>` ("Let's talk about your store.").

### Files
- `components/contact/ContactHero.tsx`

### What this section does
Opening line and breadcrumb.

### Desktop (1024px and wider)
- Padding 56px top / 80px bottom. Breadcrumb Home / Contact. H1 72px, second line in `Highlight`. Paragraph 20px `body`, max 620px, 28px above.

### Tablet (640–1023px)
- H1 56px.

### Mobile (below 640px)
- H1 42px. Padding 40px / 56px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 27 — Contact · Section 2 — Three ways to reach us

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/contact.html` → second `<section>` (Book a call / WhatsApp / Email).

### Files
- `components/contact/ContactWays.tsx`

### What this section does
Three direct routes; WhatsApp is the fastest.

### Desktop (1024px and wider)
- Padding 64px. One 1px ink white box, three equal columns with 1px `line` dividers. Each: mono number, H3 26px, description 15px, the contact value 17px weight 600, then a text link at the bottom (16px weight 600, underline, **no arrow**): "Pick a time" / "Open WhatsApp" (`https://wa.me/[NUMBER]`) / "Send an email" (`mailto:`).

### Tablet (640–1023px)
- Three columns kept, padding 20px, H3 22px.

### Mobile (below 640px)
- Stack, **WhatsApp first**, then Book a call, then Email. 1px `line` between. Whole block tappable via the link (min 44px).

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 28 — Contact · Section 3 — Brief form + what happens next

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/contact.html` → section with eyebrow "Or write to us".

### Files
- `components/contact/BriefForm.tsx` (client)
- `components/contact/NextSteps.tsx`

### What this section does
Short brief form, posting to the same endpoint as the package builder.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background.
- Two columns, gap 56px: form (about 65%) and "What happens next" (about 35%, 3-step `<ol>` with 2px ink top rule, mono numbers).
- Form grid 2 columns, gap 16px: name, brand, WhatsApp (`type=tel`), email (`type=email`), "What do you need?" select, "Budget range" select ([RANGE] placeholders), message textarea (5 rows, full width). Submit "Send message" (dark, no arrow) + reply-time note.
- Posts JSON to `NEXT_PUBLIC_QUOTE_ENDPOINT` with `source: "contact"`. Show an accent "Message sent." status box on success; an error line in ink with a WhatsApp link on failure.

### Tablet (640–1023px)
- Form full width; "What happens next" below it.

### Mobile (below 640px)
- Form one column, button full width; inputs 16px font.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 29 — Contact · Section 4 — Office and map

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/contact.html` → section with eyebrow "Visit us".

### Files
- `components/contact/Office.tsx`

### What this section does
Address, hours and map for local trust and local SEO.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Left (about 35%): eyebrow, H2 40px "Sector 22, Gurugram", `<dl>` grid (120px label / value) for Address, Hours, Meetings. Right (about 65%): map placeholder 16:9 — later replaced by a lazy-loaded Google Maps `<iframe loading="lazy" title="AdsPeek office on Google Maps">`.

### Tablet (640–1023px)
- Stack, map full width below.

### Mobile (below 640px)
- Stack; `<dl>` label above value. Map ratio 4:3.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 30 — Contact · Step 5 — Assemble

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `app/contact/page.tsx`

### Do this
Order: `ContactHero`, `ContactWays`, `BriefForm` + `NextSteps` section, `Office`, `CtaBand` (heading "Not ready to talk yet?", primary "Build your package first" → `/shopify-development`).
Metadata: title "Contact AdsPeek — Shopify & Growth Studio, Gurugram", canonical `/contact`.

### Done when
- Only `page.tsx` changed.

> **STOP — end of Phase 4.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 5.


---

# PHASE 5 — ABOUT  /about
## TASK 31 — About · Section 1 — Hero

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/about.html` → first `<section>` ("We stay after launch.").

### Files
- `components/about/AboutHero.tsx`

### What this section does
Opening statement.

### Desktop (1024px and wider)
- Same layout as Contact hero: breadcrumb Home / About, H1 72px with "after launch." in `Highlight`, paragraph 20px.

### Tablet (640–1023px)
- H1 56px.

### Mobile (below 640px)
- H1 42px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 32 — About · Section 2 — Founder story

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/about.html` → section with eyebrow "Why AdsPeek exists".

### Files
- `components/about/Story.tsx`

### What this section does
Why AdsPeek exists, in the founder's words.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Two columns, gap 56px: photo `Placeholder` ratio 4/5 (about 40%) and text (about 60%): eyebrow, H2 "Too many good stores were left alone.", three paragraphs 18px `body` line height 1.65 max 640px, signature "Ritesh Kumar Singh · Founder".

### Tablet (640–1023px)
- Photo 40%, text 60%, H2 40px.

### Mobile (below 640px)
- Text first, photo after it (ratio 4/5, full width).

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 33 — About · Section 3 — Four rules we work by

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/about.html` → section with eyebrow "What we believe".

### Files
- `components/about/Beliefs.tsx`

### What this section does
Four working principles.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). Four equal columns, gap 32px. Each: 2px ink top rule, mono number, H3 24px, paragraph 15px `body`, padding 28px top.

### Tablet (640–1023px)
- Two × two.

### Mobile (below 640px)
- One column.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 34 — About · Section 4 — Numbers band

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/about.html` → the dark green band with [X]+ yrs, [XX] etc.

### Files
- `components/about/Numbers.tsx`

### What this section does
Four headline numbers (placeholders until real).

### Desktop (1024px and wider)
- Background `forest`, padding 64px. Four equal cells with a 1px `forest-line` left border, padding 28px 24px. Number 44px weight 800 white; label 15px `forest-text`.

### Tablet (640–1023px)
- Two × two.

### Mobile (below 640px)
- Two × two, number 32px, padding 20px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 35 — About · Section 5 — Team

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/about.html` → section with eyebrow "The team".

### Files
- `components/about/Team.tsx`
- `data/team.ts`

### What this section does
The people who work on client projects.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Four columns, gap 32px: square photo placeholder, name 18px weight 700, role 14px `muted`. Data from `team.ts` (first entry: Ritesh Kumar Singh, Founder · Strategy & creative direction; others placeholders).

### Tablet (640–1023px)
- Two columns.

### Mobile (below 640px)
- Two columns, gap 16px, name 16px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 36 — About · Step 6 — Assemble

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `app/about/page.tsx`

### Do this
Order: `AboutHero`, `Story`, `Beliefs`, `Numbers`, `Team`, `CtaBand` (heading "Work with a team that stays.", primary "Book a call" → `/contact`).
Metadata: title "About AdsPeek — Shopify & Growth Studio in Gurugram", canonical `/about`.

### Done when
- Only `page.tsx` changed.

> **STOP — end of Phase 5.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 6.


---

# PHASE 6 — CITY PAGE  /shopify-development/gurugram
## TASK 37 — City page · Step 1 — City data and dynamic route

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` (Gurugram is the first city; more will follow).

### Files
- `data/cities.ts`
- `app/shopify-development/[city]/page.tsx` (route shell only — renders nothing but a placeholder `<main>` for now)

### Do this
1. `cities.ts`: export a `City` type and a `CITIES` record keyed by slug. Fields: `slug`, `name`, `h1Highlight`, `heroText`, `office` (string or null), `meetings`, `storesBuilt`, `whyLocal` (4 × title/text), `marketText` (array of paragraphs), `areas` (string[]), `work` (3 × category/location), `faq` (4 × q/a), `nearby` (slugs).
   Fill **gurugram** with the exact text from the reference. Every city must have its own `marketText` and `faq` — never copy another city's.
2. `page.tsx`: `generateStaticParams` from `CITIES`; `notFound()` for unknown slugs; `generateMetadata` → title "Shopify Development Company in {name} | AdsPeek", canonical `/shopify-development/{slug}`.

### Done when
- `/shopify-development/gurugram` builds; `/shopify-development/unknown` 404s.
## TASK 38 — City page · Section 1 — Hero with local spec box

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → first `<section>`.

### Files
- `components/city/CityHero.tsx`

### What this section does
Ranks for "Shopify development company in {city}" and shows local facts.

### Desktop (1024px and wider)
- Breadcrumb Home / Shopify Development / {city} (+ BreadcrumbList JSON-LD). Two columns aligned bottom: left H1 72px "Shopify development company in" + city name in `Highlight`, paragraph, two buttons ("Build your package" → `/shopify-development`, "Visit our office" → `/contact`; outline). Right: `SpecList` header "AdsPeek · {city}" with rows Office, Meetings, Stores built, Quote.

### Tablet (640–1023px)
- Stack, spec box below full width.

### Mobile (below 640px)
- H1 40px (long city names must wrap, never overflow). Buttons full width. Spec rows label above value under 380px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 39 — City page · Section 2 — Why a local team

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → section with eyebrow "Why a Gurugram team".

### Files
- `components/city/WhyLocal.tsx`

### What this section does
Four reasons, from city data.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Eyebrow "Why a {city} team", H2. Four equal cells in a grid with 1px `line` borders on all sides (draw borders so they never double: top+left on the grid, right+bottom on cells). Each: mono number, H3 22px, text 15px.

### Tablet (640–1023px)
- Two × two.

### Mobile (below 640px)
- One column.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 40 — City page · Section 3 — Local market text

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → section with eyebrow "Gurugram market".

### Files
- `components/city/MarketContent.tsx`

### What this section does
Unique local text for SEO — the part that makes each city page different.

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). Two columns: heading block (about 35%) and paragraphs (about 65%, 17px, line height 1.65, gap 16px).

### Tablet (640–1023px)
- Stack.

### Mobile (below 640px)
- Stack; paragraphs 16px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 41 — City page · Section 4 — Areas we serve

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → section with eyebrow "Areas we serve".

### Files
- `components/city/Areas.tsx`

### What this section does
Local area names (plain text tags, not links).

### Desktop (1024px and wider)
- Padding 72px. White background. H2 32px below the eyebrow, then tags in a wrapping row, gap 8px: white, 1px `line-strong` border, padding 10px 14px, 15px.

### Tablet (640–1023px)
- Same.

### Mobile (below 640px)
- Padding 56px. Tags 14px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 42 — City page · Section 5 — Package builder band

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → dark green band "Pick your pages, integrations and automations."

### Files
- `components/city/BuilderBand.tsx`

### What this section does
Sends visitors to the package builder.

### Desktop (1024px and wider)
- Background `forest`, padding 72px. Heading 44px white left (max about 65%), accent button "Open the package builder" right → `/shopify-development#build`. No arrow.

### Tablet (640–1023px)
- Stack, button below left-aligned.

### Mobile (below 640px)
- Heading 30px; button full width.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 43 — City page · Section 6 — Work nearby

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → section with eyebrow "Work in NCR".

### Files
- `components/city/NearbyWork.tsx`

### What this section does
Three projects from this region (reuse `WorkCard`).

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). Three columns, gap 32px.

### Tablet (640–1023px)
- Two columns.

### Mobile (below 640px)
- Swipe row, scroll-snap, cards 82% width.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 44 — City page · Section 7 — City FAQ + other cities

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/shopify-development-gurugram.html` → sections with eyebrow "Questions" and "Other cities".

### Files
- `components/city/CityFaq.tsx`
- `components/city/OtherCities.tsx`

### What this section does
Local questions (with FAQPage JSON-LD) and links to other city pages for internal linking.

### Desktop (1024px and wider)
- FAQ: same layout as Home FAQ (heading left 30%, list right 70%), white background, Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Other cities: padding 64px, eyebrow, then a wrapping row of outlined link buttons "Shopify development in {city}" (1px ink border, 12px 16px padding, 15px weight 600, min-height 44px). Only list cities in `nearby`. No arrows.

### Tablet (640–1023px)
- FAQ heading on top.

### Mobile (below 640px)
- FAQ question above answer. City links full width, stacked, gap 8px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 45 — City page · Step 9 — Assemble

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Files
- `app/shopify-development/[city]/page.tsx`

### Do this
Order: `CityHero`, `WhyLocal`, `MarketContent`, `Areas`, `BuilderBand`, `NearbyWork`, `CityFaq`, `OtherCities`, `CtaBand` (heading "Building a store in {city}?", primary "Build your package" → `/shopify-development`). All text from `CITIES[slug]`.
Add `LocalBusiness` JSON-LD **only** when the city has an `office` (Gurugram does); other cities get `Service` JSON-LD with `areaServed` = the city.

### Done when
- Changing a city's data changes the page without touching components.
- Only `page.tsx` changed.

> **STOP — end of Phase 6.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 7.


---

# PHASE 7 — GUIDES  /guides
## TASK 46 — Guides · Step 1 — Guide data

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/guides.html` → featured guide and the six guide cards.

### Files
- `data/guides.ts`

### What this section does
Single source for guide titles, categories, summaries and slugs, so the blog index (and later the article pages) read from one place.

### Desktop (1024px and wider)
- Export `Guide` type: `slug`, `title`, `summary`, `category`, `readMinutes` (placeholder number), `date` (placeholder string), `featured` (boolean), `cover` (optional image path).
- Add the featured guide ("How much does a Shopify store cost in India?", Costs & pricing) and the six in the reference, with slugs made from the titles. Export `CATEGORIES` = All, Shopify, Costs & pricing, Meta ads, Automation, Migration, Growth.

### Tablet (640–1023px)
- n/a (data only)

### Mobile (below 640px)
- n/a (data only)

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 47 — Guides · Section 1 — Hero and search

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/guides.html` → first `<section>` ("Guides for D2C founders." + search box).

### Files
- `components/guides/GuidesHero.tsx`
- `components/guides/GuideSearch.tsx` (client)

### What this section does
Introduces the guides and lets visitors search titles and summaries.

### Desktop (1024px and wider)
- Breadcrumb Home / Guides. Left: H1 72px ("D2C founders." in `Highlight`) + paragraph. Right (about 35%), aligned bottom: search input + dark "Search" button joined (input 1px ink border, white). Search filters the guide grid client-side by title/summary (pass the query through the URL `?q=` so it can be shared).

### Tablet (640–1023px)
- Search box below the text, full width.

### Mobile (below 640px)
- H1 42px. Search full width; button stays on the right of the input, 48px tall.

### Accessibility
- Visually hidden `<label>` "Search guides"; `role="search"` on the form.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 48 — Guides · Section 2 — Category filter bar

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/guides.html` → `<nav aria-label="Categories">`.

### Files
- `components/guides/CategoryBar.tsx` (client)

### What this section does
Filters guides by category.

### Desktop (1024px and wider)
- White background, padding 24px, bottom border. Chips in one row, gap 8px: selected = accent + 2px ink border, weight 600; others white + 1px `line-strong`. Min-height 44px. Selection stored in `?category=` (links, not JS-only buttons, so filtered pages are crawlable).

### Tablet (640–1023px)
- Same, wraps if needed.

### Mobile (below 640px)
- **Single swipeable row** (horizontal scroll, scroll-snap, no wrapping, scrollbar hidden), first chip starts at the page padding.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 49 — Guides · Section 3 — Featured guide

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/guides.html` → the section with the "Featured · Costs & pricing" label.

### Files
- `components/guides/FeaturedGuide.tsx`

### What this section does
Promotes the most important guide.

### Desktop (1024px and wider)
- Padding 72px. Whole block is one link. Two columns: cover 16:9 (about 60%) and text (about 40%): accent label chip (mono 12px), H2 44px, summary 17px, mono "[X] min read · [Date]", "Read the guide" (16px weight 600, underlined, no arrow).

### Tablet (640–1023px)
- Stack: image on top, text below.

### Mobile (below 640px)
- Stack; H2 30px; padding 56px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 50 — Guides · Section 4 — Latest guides grid

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/guides.html` → section with eyebrow "Latest guides".

### Files
- `components/guides/GuideGrid.tsx`
- `components/guides/GuideCard.tsx`

### What this section does
All guides, filtered by search and category, with "Load more".

### Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Three columns, gap 40px rows / 32px columns. Card: cover 16:10, mono meta row (category / "[X] min read"), title 22px weight 700, summary 15px; 1px `line` under each card.
- Show 6, then an outline "Load more guides" button that reveals 6 more. Empty state when filters match nothing: "No guides match that yet." + a link to clear filters.

### Tablet (640–1023px)
- Two columns.

### Mobile (below 640px)
- One column; cover 16:9; title 20px.

### Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
## TASK 51 — Guides · Step 6 — Newsletter section and page assembly

### Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

### Reference
`design-reference/guides.html` → section with eyebrow "Newsletter", then the CTA band.

### Files
- `components/guides/Newsletter.tsx` (client)
- `app/guides/page.tsx`

### Newsletter section
- Desktop: padding 96px; heading 40px left ("One useful guide a month. Nothing else."), form right: email field (label "Email" above, 16px, 48px tall) + dark "Subscribe" button side by side. Posts to `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`; shows "You're subscribed." on success.
- Tablet: stack, form full width.
- Mobile: input and button stacked, both full width.

### Page order
`GuidesHero`, `CategoryBar`, `FeaturedGuide` (hidden when a search or category filter is active), `GuideGrid`, `Newsletter`, `CtaBand` (heading "Read enough? Let's build it.", primary "Build your package" → `/shopify-development`).
Metadata: title "Shopify & D2C Growth Guides | AdsPeek", canonical `/guides` (filtered URLs set canonical back to `/guides`).

### Done when
- Search and category filters work together.
- Only the two files changed.

> **STOP — end of Phase 7.** Report what you built (files created, anything you could not do) and wait for the user to reply "continue" before starting Phase 8.


---

# PHASE 8 — FINAL QA
## TASK 52 — Final QA — Responsive and link audit (read-only first)

### Rules
- **Do not change any file in this step.** Produce a report only. Fixes are done afterwards, one section at a time, using that section's own prompt.
- Do not open a browser. Audit by reading the code.

### Produce `QA-REPORT.md` with three tables

#### 1. Responsive check — one row per section on every page
| Page | Section | 360px | 768px | 1280px | Problem (if any) | Prompt file to fix it |
Check for: fixed widths over 360px, text that can't wrap (long words, `whitespace-nowrap`), grids without a mobile column count, images without `aspect-ratio`, buttons under 44px tall, inputs under 16px font, sideways scroll, sticky elements overlapping the sticky header.

#### 2. Rule check
| Rule | Pass / Fail | Where |
- No animations or transitions
- No arrows on buttons or links
- Square corners only
- Only foundation colours used
- Header sticky on all pages
- Every section has desktop and mobile padding props
- One `<h1>` per page
- Every page has title, description, canonical

#### 3. Link audit
| Page | Link / button text | Destination | Exists? | Logic / why it goes there |
List every link and button. Flag `#` placeholders and routes that don't exist yet (other city pages, other service pages, guide article pages).

> **STOP — build complete.** Share `QA-REPORT.md` with the user and wait for instructions.


---

# APPENDIX — Design reference files

The six approved, responsive designs. In **Task 0** you save each one, exactly as written between its markers, to the path shown. Do not edit them.

## Reference: `design-reference/index.html`

<!-- BEGIN design-reference/index.html -->
~~~~~~html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AdsPeek — Shopify Development & Growth Studio, Gurugram</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FAFAF7}
a{color:#0F3D2E}a:hover{color:#111410}
</style>
<style>
/* ---- Responsive: tablet 640–1023px ---- */
@media (max-width: 1023px){
.wrap.sec{padding-top:72px!important;padding-bottom:72px!important}
.h1{font-size:56px!important}
.h2{font-size:40px!important}
.hcta{font-size:48px!important}
.mainnav{display:none!important}
.menubtn{display:inline-flex!important}
.sticky-aside{position:static!important;flex-basis:100%!important}
.cmp-inner{min-width:0!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:24px!important;border-right:0!important;border-bottom:1px solid #D9DBD3}
.pr,.ways{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.pr>div,.ways>div{padding:24px!important}
}
/* ---- Responsive: phone below 640px ---- */
@media (max-width: 639px){
.wrap{padding-left:20px!important;padding-right:20px!important}
.wrap.sec{padding-top:56px!important;padding-bottom:56px!important}
.h1{font-size:42px!important;line-height:1.02!important}
.h2{font-size:32px!important;line-height:1.08!important}
.hcta{font-size:36px!important}
.hdrcta{display:none!important}
.btnrow{flex-direction:column!important;align-items:stretch!important}
.btnrow>a,.btnrow>button{width:100%;justify-content:center;box-sizing:border-box}
.swipe{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px!important;margin-right:-20px;padding-right:20px;scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}
.swipe>*{flex:0 0 82%;scroll-snap-align:start}
.cmp-table{display:none!important}
.cmp-cards{display:block!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:20px 0!important}
.trust>div:nth-child(odd){padding-right:12px!important}
.trust>div:last-child{grid-column:1/-1}
.trust p:first-child{font-size:30px!important}
.cellsd>div{border-right:0!important;border-bottom:1px solid #3C6A5A;padding:24px!important}
.cellsd>div:last-child{border-bottom:0}
.cellsd>div>div:first-child{margin-bottom:20px!important}
.pr,.ways{grid-template-columns:minmax(0,1fr)!important}
.pr>div,.ways>div{border-right:0!important;border-bottom:1px solid #D9DBD3;padding:24px!important}
.pr>div:last-child,.ways>div:last-child{border-bottom:0}
.first-m{order:-1}
.grid2m{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.noindent{margin-left:0!important}
.mbar{display:flex!important}
.svc-row{gap:10px!important;padding:24px 0!important}
.svc-row span[style*="font-size: 30px"]{font-size:24px!important}
.proc-ol>li{padding:20px 0!important;border-bottom:1px solid #D9DBD3}
.big-num{font-size:30px!important}
.fact-grid{grid-template-columns:minmax(0,1fr)!important}
.fact-grid>div{border-right:0!important;border-bottom:1px solid #D9DBD3}
.hero-pad{padding-top:40px!important;padding-bottom:56px!important}
.crumb{margin-bottom:24px!important}
.lead{font-size:17px!important}
}
</style>
</head>
<body>
<div style="font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #111410; background: #FAFAF7; width: 100%; min-width: 0">

<!-- HEADER -->
<header style="border-bottom: 1px solid #D9DBD3">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="#top" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111410">
<span style="width: 18px; height: 18px; background: #C8F03C; border: 2px solid #111410; display: block" aria-hidden="true"></span>
<span style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em">AdsPeek</span>
</a>
<nav aria-label="Main" class="mainnav" style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="#services" style="text-decoration: none; color: #111410">Services</a>
<a href="#system" style="text-decoration: none; color: #111410">Growth System</a>
<a href="#work" style="text-decoration: none; color: #111410">Work</a>
<a href="#process" style="text-decoration: none; color: #111410">Process</a>
<a href="#about" style="text-decoration: none; color: #111410">About</a>
</nav>
<div style="display: flex; align-items: center; gap: 8px"><a class="hdrcta" href="#book" style="background: #0F3D2E; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 20px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a call →</a><button type="button" class="menubtn" aria-label="Open menu" style="display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent; border: 1px solid #111410; padding: 0; cursor: pointer"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2" fill="#111410"/><rect y="6" width="20" height="2" fill="#111410"/><rect y="12" width="20" height="2" fill="#111410"/></svg></button></div>
</div>
</header>

<!-- HERO -->
<section id="top" style="border-bottom: 1px solid #D9DBD3">
<div class="wrap sec hero-pad" style="max-width: 1280px; margin: 0 auto; padding: 88px 32px 80px; display: flex; flex-wrap: wrap; gap: 56px; align-items: flex-end">
<div style="flex: 999 1 560px; min-width: 0">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 28px; color: #5B6159">Shopify development &amp; growth · Gurugram → worldwide</p>
<h1 class="h1" style="font-size: 76px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 800; margin: 0">We build your store.<br><span style="background: #C8F03C; padding: 0 10px; box-decoration-break: clone; -webkit-box-decoration-break: clone">Then the system</span><br>that sells from it.</h1>
<p class="lead" style="font-size: 20px; line-height: 1.5; color: #3A3F38; max-width: 560px; margin: 32px 0 40px">Most agencies hand over the store and leave. AdsPeek stays on — running the ads, automations and tracking that turn a launch into steady sales.</p>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px">
<a href="#book" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a free strategy call</a>
<a href="#system" style="border: 1px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">How the system works</a>
</div>
</div>
<!-- spec sheet -->
<div style="flex: 1 1 380px; min-width: 0; border: 1px solid #111410; background: #FFFFFF">
<div style="display: flex; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #111410; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase">
<span>Engagement spec</span><span style="color: #5B6159">AP-01</span>
</div>
<dl style="margin: 0">
<div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 16px; padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 3px">Platform</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 500">Shopify · Shopify Plus · Headless</dd>
</div>
<div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 16px; padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 3px">Build time</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 500">[X–Y] weeks</dd>
</div>
<div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 16px; padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 3px">After launch</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 500">Meta ads, WhatsApp automation, tracking</dd>
</div>
<div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 16px; padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 3px">Best for</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 500">Premium D2C brands, India &amp; overseas</dd>
</div>
<div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 16px; padding: 16px 20px">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 3px">Starts from</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 700">[YOUR PRICE]</dd>
</div>
</dl>
</div>
</div>
</section>

<!-- TRUST STRIP -->
<section aria-label="At a glance" style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF">
<div class="wrap trust" style="max-width: 1280px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr))">
<div style="padding: 28px 24px 28px 0; border-right: 1px solid #D9DBD3">
<p style="font-size: 40px; font-weight: 800; letter-spacing: -0.03em; margin: 0">[XX]</p>
<p style="margin: 6px 0 0; color: #5B6159; font-size: 15px">Stores launched</p>
</div>
<div style="padding: 28px 24px; border-right: 1px solid #D9DBD3">
<p style="font-size: 40px; font-weight: 800; letter-spacing: -0.03em; margin: 0">[X]+ yrs</p>
<p style="margin: 6px 0 0; color: #5B6159; font-size: 15px">Building and running D2C brands</p>
</div>
<div style="padding: 28px 24px; border-right: 1px solid #D9DBD3">
<p style="font-size: 40px; font-weight: 800; letter-spacing: -0.03em; margin: 0">[X] countries</p>
<p style="margin: 6px 0 0; color: #5B6159; font-size: 15px">Clients across India, UAE, UK, US</p>
</div>
<div style="padding: 28px 0 28px 24px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #5B6159; margin: 0 0 12px">Built with</p>
<p style="margin: 0; font-size: 17px; font-weight: 600; line-height: 1.6">Shopify · Meta · Google · Next.js · WhatsApp API</p>
</div>
</div>
</section>

<!-- COMPARISON -->
<section style="border-bottom: 1px solid #D9DBD3">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 48px">
<div style="flex: 1 1 520px; min-width: 0">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">01 — The difference</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0">A store is the start,<br>not the deliverable.</h2>
</div>
<p style="flex: 0 1 420px; font-size: 17px; line-height: 1.55; color: #3A3F38; margin: 0">Here is where a typical agency's job ends, and where ours keeps going.</p>
</div>
<div class="cmp-table" style="overflow-x: auto; border: 1px solid #111410">
<div class="cmp-inner" style="min-width: 720px">
<div style="display: grid; grid-template-columns: 220px minmax(0, 1fr) minmax(0, 1fr); background: #111410; color: #FFFFFF; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase">
<div style="padding: 16px 20px"></div>
<div style="padding: 16px 20px; border-left: 1px solid #3A3F38">Typical agency</div>
<div style="padding: 16px 20px; border-left: 1px solid #3A3F38; background: #C8F03C; color: #111410; font-weight: 500">AdsPeek</div>
</div>
<div style="display: grid; grid-template-columns: 220px minmax(0, 1fr) minmax(0, 1fr); border-top: 1px solid #D9DBD3; font-size: 16px">
<div style="padding: 20px; font-weight: 600">Scope ends at</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; color: #5B6159">Store handover</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; font-weight: 500">First sales, then monthly growth</div>
</div>
<div style="display: grid; grid-template-columns: 220px minmax(0, 1fr) minmax(0, 1fr); border-top: 1px solid #D9DBD3; font-size: 16px">
<div style="padding: 20px; font-weight: 600">Ads</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; color: #5B6159">Another vendor, briefed from zero</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; font-weight: 500">Same team that built the store</div>
</div>
<div style="display: grid; grid-template-columns: 220px minmax(0, 1fr) minmax(0, 1fr); border-top: 1px solid #D9DBD3; font-size: 16px">
<div style="padding: 20px; font-weight: 600">Follow-up &amp; retention</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; color: #5B6159">Not included</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; font-weight: 500">WhatsApp and email automations set up</div>
</div>
<div style="display: grid; grid-template-columns: 220px minmax(0, 1fr) minmax(0, 1fr); border-top: 1px solid #D9DBD3; font-size: 16px">
<div style="padding: 20px; font-weight: 600">Tracking</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; color: #5B6159">Pixel installed, if asked</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; font-weight: 500">Pixel, Conversions API, GA4, one weekly report</div>
</div>
<div style="display: grid; grid-template-columns: 220px minmax(0, 1fr) minmax(0, 1fr); border-top: 1px solid #D9DBD3; font-size: 16px">
<div style="padding: 20px; font-weight: 600">When something breaks</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; color: #5B6159">New quote</div>
<div style="padding: 20px; border-left: 1px solid #D9DBD3; font-weight: 500">Fixed inside the growth plan</div>
</div>
</div>

<div class="cmp-cards" style="display: none; border-top: 2px solid #111410">
<div style="padding: 20px 0; border-bottom: 1px solid #D9DBD3; display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-size: 18px; font-weight: 700">Scope ends at</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px">Typical agency</span>Store handover</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; font-weight: 500; display: flex; gap: 10px"><span style="width: 10px; height: 10px; background: #C8F03C; border: 1px solid #111410; flex: none; margin-top: 5px" aria-hidden="true"></span><span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px; font-weight: 400">AdsPeek</span>First sales, then monthly growth</span></p>
</div>
<div style="padding: 20px 0; border-bottom: 1px solid #D9DBD3; display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-size: 18px; font-weight: 700">Ads</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px">Typical agency</span>Another vendor, briefed from zero</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; font-weight: 500; display: flex; gap: 10px"><span style="width: 10px; height: 10px; background: #C8F03C; border: 1px solid #111410; flex: none; margin-top: 5px" aria-hidden="true"></span><span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px; font-weight: 400">AdsPeek</span>Same team that built the store</span></p>
</div>
<div style="padding: 20px 0; border-bottom: 1px solid #D9DBD3; display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-size: 18px; font-weight: 700">Follow-up &amp; retention</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px">Typical agency</span>Not included</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; font-weight: 500; display: flex; gap: 10px"><span style="width: 10px; height: 10px; background: #C8F03C; border: 1px solid #111410; flex: none; margin-top: 5px" aria-hidden="true"></span><span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px; font-weight: 400">AdsPeek</span>WhatsApp and email automations set up</span></p>
</div>
<div style="padding: 20px 0; border-bottom: 1px solid #D9DBD3; display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-size: 18px; font-weight: 700">Tracking</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px">Typical agency</span>Pixel installed, if asked</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; font-weight: 500; display: flex; gap: 10px"><span style="width: 10px; height: 10px; background: #C8F03C; border: 1px solid #111410; flex: none; margin-top: 5px" aria-hidden="true"></span><span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px; font-weight: 400">AdsPeek</span>Pixel, Conversions API, GA4, one weekly report</span></p>
</div>
<div style="padding: 20px 0; border-bottom: 1px solid #D9DBD3; display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-size: 18px; font-weight: 700">When something breaks</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px">Typical agency</span>New quote</p>
<p style="margin: 0; font-size: 15px; line-height: 1.45; font-weight: 500; display: flex; gap: 10px"><span style="width: 10px; height: 10px; background: #C8F03C; border: 1px solid #111410; flex: none; margin-top: 5px" aria-hidden="true"></span><span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 2px; font-weight: 400">AdsPeek</span>Fixed inside the growth plan</span></p>
</div>
</div>
</div>
</div>
</section>

<!-- SERVICES -->
<section id="services" style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">02 — Services</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">Four things we do.<br>All of them connect.</h2>
<div style="border-top: 2px solid #111410">
<a href="#shopify" class="svc-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 32px 0; border-bottom: 1px solid #D9DBD3; text-decoration: none; color: #111410">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">S1</span><span style="font-size: 30px; font-weight: 700; letter-spacing: -0.02em">Shopify Development</span></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3A3F38">Custom themes, headless storefronts, migrations from WooCommerce or marketplaces.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 4px">For</span>Brands launching or rebuilding their store</p>
</a>
<a href="#web" class="svc-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 32px 0; border-bottom: 1px solid #D9DBD3; text-decoration: none; color: #111410">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">S2</span><span style="font-size: 30px; font-weight: 700; letter-spacing: -0.02em">Website Development</span></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3A3F38">Business and brand sites in Next.js or WordPress — fast, editable, built to rank.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 4px">For</span>Companies that need leads, not a template</p>
</a>
<a href="#apps" class="svc-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 32px 0; border-bottom: 1px solid #D9DBD3; text-decoration: none; color: #111410">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">S3</span><span style="font-size: 30px; font-weight: 700; letter-spacing: -0.02em">App Development</span></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3A3F38">Custom apps, Shopify apps and internal tools that remove manual work.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 4px">For</span>Teams outgrowing spreadsheets and plugins</p>
</a>
<a href="#meta" class="svc-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 32px 0; border-bottom: 1px solid #D9DBD3; text-decoration: none; color: #111410">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">S4</span><span style="font-size: 30px; font-weight: 700; letter-spacing: -0.02em">Meta Ads</span></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3A3F38">Sales, retargeting and Click-to-WhatsApp campaigns, with creatives made in-house.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5B6159"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 4px">For</span>Stores ready to scale paid traffic</p>
</a>
</div>
</div>
</section>

<!-- GROWTH SYSTEM -->
<section id="system" style="background: #0F3D2E; color: #FFFFFF">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 56px">
<div style="flex: 1 1 520px; min-width: 0">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #B9CEC4; margin: 0 0 16px">03 — The Growth System</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0">Four parts, one loop.</h2>
</div>
<p style="flex: 0 1 440px; font-size: 17px; line-height: 1.55; color: #D3E0D9; margin: 0">Each part feeds the next. Tracking tells the ads what works, the ads bring buyers to the store, automations bring them back.</p>
</div>
<div class="cellsd" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); border: 1px solid #3C6A5A">
<div style="padding: 28px; border-right: 1px solid #3C6A5A">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #C8F03C">01</span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #B9CEC4" aria-hidden="true">→</span></div>
<h3 style="font-size: 26px; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.02em">Store</h3>
<ul style="margin: 0; padding: 0; list-style: none; font-size: 15px; line-height: 1.5; color: #D3E0D9; display: flex; flex-direction: column; gap: 10px">
<li>Custom Shopify build</li><li>Speed and mobile checkout</li><li>Pages designed to convert</li>
</ul>
</div>
<div style="padding: 28px; border-right: 1px solid #3C6A5A">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #C8F03C">02</span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #B9CEC4" aria-hidden="true">→</span></div>
<h3 style="font-size: 26px; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.02em">Ads</h3>
<ul style="margin: 0; padding: 0; list-style: none; font-size: 15px; line-height: 1.5; color: #D3E0D9; display: flex; flex-direction: column; gap: 10px">
<li>Meta sales campaigns</li><li>Click-to-WhatsApp</li><li>Static and video creatives</li>
</ul>
</div>
<div style="padding: 28px; border-right: 1px solid #3C6A5A">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #C8F03C">03</span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #B9CEC4" aria-hidden="true">→</span></div>
<h3 style="font-size: 26px; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.02em">Automation</h3>
<ul style="margin: 0; padding: 0; list-style: none; font-size: 15px; line-height: 1.5; color: #D3E0D9; display: flex; flex-direction: column; gap: 10px">
<li>Abandoned-cart recovery</li><li>WhatsApp lead replies</li><li>Repeat-order reminders</li>
</ul>
</div>
<div style="padding: 28px">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #C8F03C">04</span><span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #B9CEC4" aria-hidden="true">↺ 01</span></div>
<h3 style="font-size: 26px; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.02em">Tracking</h3>
<ul style="margin: 0; padding: 0; list-style: none; font-size: 15px; line-height: 1.5; color: #D3E0D9; display: flex; flex-direction: column; gap: 10px">
<li>Pixel + Conversions API</li><li>GA4 and sales dashboard</li><li>One clear weekly report</li>
</ul>
</div>
</div>
</div>
</section>

<!-- WORK -->
<section id="work" style="border-bottom: 1px solid #D9DBD3">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 48px">
<div>
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">04 — Selected work</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0">Recent builds.</h2>
</div>
<a href="#work-all" style="font-weight: 600; font-size: 16px; color: #111410; min-height: 44px; display: inline-flex; align-items: center">See all work →</a>
</div>
<div class="swipe" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px">
<a href="#p1" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 16px">
<div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em">[Homepage screenshot]</div>
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Handmade rugs</span><span>Shopify</span></div>
<p style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em">[Project name]</p>
<p style="margin: 0; font-size: 15px; color: #3A3F38; line-height: 1.5">[One line: what was built and one result]</p>
</a>
<a href="#p2" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 16px">
<div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em">[Homepage screenshot]</div>
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Recovery hardware</span><span>Shopify</span></div>
<p style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em">[Project name]</p>
<p style="margin: 0; font-size: 15px; color: #3A3F38; line-height: 1.5">[One line: what was built and one result]</p>
</a>
<a href="#p3" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 16px">
<div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em">[Homepage screenshot]</div>
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Sneakers</span><span>Headless Shopify</span></div>
<p style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em">[Project name]</p>
<p style="margin: 0; font-size: 15px; color: #3A3F38; line-height: 1.5">[One line: what was built and one result]</p>
</a>
</div>
</div>
</section>

<!-- PROCESS -->
<section id="process" style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">05 — Process</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 56px">From first call to monthly growth.</h2>
<ol class="proc-ol" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); border-top: 2px solid #111410">
<li style="padding: 24px 20px 0 0; display: flex; flex-direction: column; gap: 10px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Week [1]</span>
<span style="font-size: 20px; font-weight: 700">Strategy call</span>
<span style="font-size: 15px; line-height: 1.5; color: #3A3F38">Goals, products, budget and a fixed quote.</span>
</li>
<li style="padding: 24px 20px 0 0; display: flex; flex-direction: column; gap: 10px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Week [1–2]</span>
<span style="font-size: 20px; font-weight: 700">Design</span>
<span style="font-size: 15px; line-height: 1.5; color: #3A3F38">Homepage and key pages for your approval.</span>
</li>
<li style="padding: 24px 20px 0 0; display: flex; flex-direction: column; gap: 10px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Week [3–5]</span>
<span style="font-size: 20px; font-weight: 700">Build &amp; QA</span>
<span style="font-size: 15px; line-height: 1.5; color: #3A3F38">Store built, tested on every device.</span>
</li>
<li style="padding: 24px 20px 0 0; display: flex; flex-direction: column; gap: 10px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Week [6]</span>
<span style="font-size: 20px; font-weight: 700">Launch</span>
<span style="font-size: 15px; line-height: 1.5; color: #3A3F38">Tracking live, first campaigns switched on.</span>
</li>
<li style="padding: 24px 0 0 0; display: flex; flex-direction: column; gap: 10px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #111410; background: #C8F03C; align-self: flex-start; padding: 2px 6px">Every month</span>
<span style="font-size: 20px; font-weight: 700">Grow</span>
<span style="font-size: 15px; line-height: 1.5; color: #3A3F38">Ads, automations and a report you can read in 2 minutes.</span>
</li>
</ol>
</div>
</section>

<!-- PRICING -->
<section style="border-bottom: 1px solid #D9DBD3">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">06 — Ways to work with us</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">Pick where to start.</h2>
<div class="pr" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0; border: 1px solid #111410">
<div style="padding: 32px; display: flex; flex-direction: column; gap: 16px; border-right: 1px solid #D9DBD3">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #5B6159; margin: 0">One-time</p>
<h3 style="font-size: 26px; font-weight: 700; margin: 0">Store build</h3>
<p style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin: 0">from [PRICE]</p>
<p style="font-size: 15px; line-height: 1.55; color: #3A3F38; margin: 0">Design and build of your Shopify store, tracking set up, handed over ready to sell.</p>
</div>
<div class="first-m" style="padding: 32px; display: flex; flex-direction: column; gap: 16px; border-right: 1px solid #D9DBD3; border-top: 6px solid #C8F03C; background: #FFFFFF">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #0F3D2E; margin: 0; font-weight: 500">Most chosen</p>
<h3 style="font-size: 26px; font-weight: 700; margin: 0">Store + Growth</h3>
<p style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin: 0">[PRICE] + [PRICE]/mo</p>
<p style="font-size: 15px; line-height: 1.55; color: #3A3F38; margin: 0">The build plus ads, automations and monthly reporting — the full system.</p>
</div>
<div style="padding: 32px; display: flex; flex-direction: column; gap: 16px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #5B6159; margin: 0">Monthly</p>
<h3 style="font-size: 26px; font-weight: 700; margin: 0">Growth only</h3>
<p style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin: 0">[PRICE]/mo</p>
<p style="font-size: 15px; line-height: 1.55; color: #3A3F38; margin: 0">Already have a store? We run ads, automations and tracking on it.</p>
</div>
</div>
</div>
</section>

<!-- FAQ -->
<section style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px; display: flex; flex-wrap: wrap; gap: 56px">
<div style="flex: 1 1 300px; min-width: 0">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">07 — Questions</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0">Asked before<br>every project.</h2>
</div>
<dl style="flex: 999 1 560px; min-width: 0; margin: 0; border-top: 2px solid #111410">
<div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px">
<dt style="font-size: 18px; font-weight: 700">How much does a Shopify store cost?</dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Builds start from [PRICE]. The final quote depends on pages, custom features and integrations — fixed before we start.</dd>
</div>
<div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px">
<dt style="font-size: 18px; font-weight: 700">How long does it take?</dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Most stores go live in [X–Y] weeks from the first call.</dd>
</div>
<div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px">
<dt style="font-size: 18px; font-weight: 700">Do you work with brands outside India?</dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Yes. We're based in Gurugram and work remotely with brands in [COUNTRIES].</dd>
</div>
<div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px">
<dt style="font-size: 18px; font-weight: 700">What happens after launch?</dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">On the Growth plan we run your ads, automations and tracking, and send one report a week.</dd>
</div>
<div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px">
<dt style="font-size: 18px; font-weight: 700">Can you move my store from WooCommerce?</dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Yes — products, customers and order history move across, with redirects so you keep your search rankings.</dd>
</div>
</dl>
</div>
</section>

<!-- FINAL CTA -->
<section id="book" style="background: #C8F03C">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 40px">
<h2 class="hcta" style="flex: 1 1 560px; min-width: 0; font-size: 64px; line-height: 1; letter-spacing: -0.035em; font-weight: 800; margin: 0; color: #111410">Tell us about your brand.<br>We'll map the system.</h2>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px">
<a href="#call" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 18px 26px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a free strategy call</a>
<a href="#whatsapp" style="border: 2px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">WhatsApp us</a>
</div>
</div>
</section>

<!-- FOOTER -->
<footer id="about" style="background: #111410; color: #D3D6CE">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 32px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; padding-bottom: 48px; border-bottom: 1px solid #33372F">
<div style="display: flex; flex-direction: column; gap: 14px">
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 16px; height: 16px; background: #C8F03C; display: block" aria-hidden="true"></span><span style="font-size: 20px; font-weight: 800; color: #FFFFFF">AdsPeek</span></span>
<p style="margin: 0; font-size: 15px; line-height: 1.55">Sector 22, Gurugram<br>Haryana, India</p>
</div>
<nav aria-label="Services" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Services</span>
<a href="#shopify" style="color: #D3D6CE; text-decoration: none">Shopify Development</a>
<a href="#web" style="color: #D3D6CE; text-decoration: none">Website Development</a>
<a href="#apps" style="color: #D3D6CE; text-decoration: none">App Development</a>
<a href="#meta" style="color: #D3D6CE; text-decoration: none">Meta Ads</a>
</nav>
<nav aria-label="Company" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Company</span>
<a href="#system" style="color: #D3D6CE; text-decoration: none">Growth System</a>
<a href="#work" style="color: #D3D6CE; text-decoration: none">Work</a>
<a href="#process" style="color: #D3D6CE; text-decoration: none">Process</a>
<a href="#about" style="color: #D3D6CE; text-decoration: none">About</a>
</nav>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Contact</span>
<span>[EMAIL]</span>
<span>[PHONE / WHATSAPP]</span>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; padding-top: 24px; font-size: 13px; color: #9CA196">
<span>© 2026 AdsPeek</span>
<span style="display: flex; gap: 20px"><a href="#privacy" style="color: #9CA196">Privacy</a><a href="#terms" style="color: #9CA196">Terms</a></span>
</div>
</div>
</footer>

</div>
<script>
(function(){var b=document.querySelector('.menubtn'),n=document.querySelector('.mainnav'),c=document.querySelector('.hdrcta');if(!b||!n)return;
b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');
n.style.cssText=open?'display:flex!important;flex-direction:column;gap:0;width:100%;order:9;border-top:1px solid #D9DBD3;margin-top:8px':'';
n.style.setProperty('display',open?'flex':'','important');
[].forEach.call(n.querySelectorAll('a'),function(a){a.style.padding=open?'16px 0':'';a.style.borderBottom=open?'1px solid #D9DBD3':'';a.style.fontSize=open?'18px':'';a.style.fontWeight=open?'600':'';});
});})();
</script>
</body>
</html>
~~~~~~
<!-- END design-reference/index.html -->

## Reference: `design-reference/shopify-development.html`

<!-- BEGIN design-reference/shopify-development.html -->
~~~~~~html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AdsPeek — Shopify Development</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FAFAF7}
a{color:#0F3D2E}a:hover{color:#111410}
button{font-family:inherit;cursor:pointer}
input,select{font-family:inherit}
</style>
<style>
/* ---- Responsive: tablet 640–1023px ---- */
@media (max-width: 1023px){
.wrap.sec{padding-top:72px!important;padding-bottom:72px!important}
.h1{font-size:56px!important}
.h2{font-size:40px!important}
.hcta{font-size:48px!important}
.mainnav{display:none!important}
.menubtn{display:inline-flex!important}
.sticky-aside{position:static!important;flex-basis:100%!important}
.cmp-inner{min-width:0!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:24px!important;border-right:0!important;border-bottom:1px solid #D9DBD3}
.pr,.ways{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.pr>div,.ways>div{padding:24px!important}
}
/* ---- Responsive: phone below 640px ---- */
@media (max-width: 639px){
.wrap{padding-left:20px!important;padding-right:20px!important}
.wrap.sec{padding-top:56px!important;padding-bottom:56px!important}
.h1{font-size:42px!important;line-height:1.02!important}
.h2{font-size:32px!important;line-height:1.08!important}
.hcta{font-size:36px!important}
.hdrcta{display:none!important}
.btnrow{flex-direction:column!important;align-items:stretch!important}
.btnrow>a,.btnrow>button{width:100%;justify-content:center;box-sizing:border-box}
.swipe{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px!important;margin-right:-20px;padding-right:20px;scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}
.swipe>*{flex:0 0 82%;scroll-snap-align:start}
.cmp-table{display:none!important}
.cmp-cards{display:block!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:20px 0!important}
.trust>div:nth-child(odd){padding-right:12px!important}
.trust>div:last-child{grid-column:1/-1}
.trust p:first-child{font-size:30px!important}
.cellsd>div{border-right:0!important;border-bottom:1px solid #3C6A5A;padding:24px!important}
.cellsd>div:last-child{border-bottom:0}
.cellsd>div>div:first-child{margin-bottom:20px!important}
.pr,.ways{grid-template-columns:minmax(0,1fr)!important}
.pr>div,.ways>div{border-right:0!important;border-bottom:1px solid #D9DBD3;padding:24px!important}
.pr>div:last-child,.ways>div:last-child{border-bottom:0}
.first-m{order:-1}
.grid2m{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.noindent{margin-left:0!important}
.mbar{display:flex!important}
.svc-row{gap:10px!important;padding:24px 0!important}
.svc-row span[style*="font-size: 30px"]{font-size:24px!important}
.proc-ol>li{padding:20px 0!important;border-bottom:1px solid #D9DBD3}
.big-num{font-size:30px!important}
.fact-grid{grid-template-columns:minmax(0,1fr)!important}
.fact-grid>div{border-right:0!important;border-bottom:1px solid #D9DBD3}
.hero-pad{padding-top:40px!important;padding-bottom:56px!important}
.crumb{margin-bottom:24px!important}
.lead{font-size:17px!important}
}
</style>
</head>
<body>
<div style="font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #111410; background: #FAFAF7; width: 100%; min-width: 0">

<!-- HEADER -->
<header style="border-bottom: 1px solid #D9DBD3">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111410">
<span style="width: 18px; height: 18px; background: #C8F03C; border: 2px solid #111410; display: block" aria-hidden="true"></span>
<span style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em">AdsPeek</span>
</a>
<nav aria-label="Main" class="mainnav" style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="#build" style="text-decoration: none; color: #111410">Services</a>
<a href="index.html" style="text-decoration: none; color: #111410">Growth System</a>
<a href="#work" style="text-decoration: none; color: #111410">Work</a>
<a href="#process" style="text-decoration: none; color: #111410">Process</a>
<a href="index.html" style="text-decoration: none; color: #111410">About</a>
</nav>
<div style="display: flex; align-items: center; gap: 8px"><a class="hdrcta" href="#build" style="background: #0F3D2E; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 20px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Build your package →</a><button type="button" class="menubtn" aria-label="Open menu" style="display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent; border: 1px solid #111410; padding: 0; cursor: pointer"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2" fill="#111410"/><rect y="6" width="20" height="2" fill="#111410"/><rect y="12" width="20" height="2" fill="#111410"/></svg></button></div>
</div>
</header>

<!-- OVERVIEW -->
<section style="border-bottom: 1px solid #D9DBD3">
<div class="wrap sec hero-pad" style="max-width: 1280px; margin: 0 auto; padding: 56px 32px 80px">
<p class="crumb" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.04em; margin: 0 0 40px; color: #5B6159"><a href="index.html" style="color: #5B6159">Services</a> / Shopify Development</p>
<div style="display: flex; flex-wrap: wrap; gap: 56px; align-items: flex-end">
<div style="flex: 999 1 560px; min-width: 0">
<h1 class="h1" style="font-size: 72px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 800; margin: 0">Shopify stores,<br><span style="background: #C8F03C; padding: 0 10px">built to your list.</span></h1>
<p class="lead" style="font-size: 20px; line-height: 1.5; color: #3A3F38; max-width: 600px; margin: 32px 0 0">We don't sell fixed packages. You pick exactly what your store needs — catalogue size, pages, integrations and automations — and we quote for that, nothing more.</p>
</div>
<div class="fact-grid" style="flex: 1 1 360px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); border: 1px solid #111410; background: #FFFFFF">
<div style="padding: 20px; border-bottom: 1px solid #D9DBD3; border-right: 1px solid #D9DBD3">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; margin: 0 0 8px">What we build</p>
<p style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.4">New stores, migrations, redesigns, headless</p>
</div>
<div style="padding: 20px; border-bottom: 1px solid #D9DBD3">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; margin: 0 0 8px">You pay for</p>
<p style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.4">Only the parts you select</p>
</div>
<div style="padding: 20px; border-right: 1px solid #D9DBD3">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; margin: 0 0 8px">Quote in</p>
<p style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.4">[24 hours]</p>
</div>
<div style="padding: 20px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; margin: 0 0 8px">After launch</p>
<p style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.4">Optional ads + automation plan</p>
</div>
</div>
</div>
</div>
</section>

<!-- BUILDER -->
<section id="build" style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 88px 32px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Build your package · 6 steps · about 2 minutes</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 56px">Tell us what your store needs.</h2>

<div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start">

<!-- FORM -->
<form id="builder" style="flex: 999 1 600px; min-width: 0; display: flex; flex-direction: column; gap: 64px">

<!-- STEP 1 -->
<fieldset style="border: 0; margin: 0; padding: 0; min-width: 0">
<legend style="padding: 0; margin: 0 0 8px; display: flex; gap: 16px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">01</span><span style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">What are we building?</span></legend>
<p class="noindent" style="margin: 0 0 20px 40px; color: #5B6159; font-size: 15px">Pick one.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px">
<div id="opt-platforms" style="display: contents"></div>
</div>
</fieldset>

<!-- STEP 2 -->
<fieldset style="border: 0; margin: 0; padding: 0; min-width: 0">
<legend style="padding: 0; margin: 0 0 8px; display: flex; gap: 16px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">02</span><span style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">How big is your catalogue?</span></legend>
<p class="noindent" style="margin: 0 0 20px 40px; color: #5B6159; font-size: 15px">We upload and organise these for you.</p>
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; margin: 0 0 10px">Products</p>
<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px">
<div id="opt-productOpts" style="display: contents"></div>
</div>
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; margin: 0 0 10px">Collections</p>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
<div id="opt-collectionOpts" style="display: contents"></div>
</div>
</fieldset>

<!-- STEP 3 -->
<fieldset style="border: 0; margin: 0; padding: 0; min-width: 0">
<legend style="padding: 0; margin: 0 0 8px; display: flex; gap: 16px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">03</span><span style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">Which pages do you need?</span></legend>
<p class="noindent" style="margin: 0 0 20px 40px; color: #5B6159; font-size: 15px">The first four come with every store. Add the rest as needed.</p>
<div class="grid2m" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px">
<div id="opt-pages" style="display: contents"></div>
</div>
</fieldset>

<!-- STEP 4 -->
<fieldset style="border: 0; margin: 0; padding: 0; min-width: 0">
<legend style="padding: 0; margin: 0 0 8px; display: flex; gap: 16px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">04</span><span style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">Integrations</span></legend>
<p class="noindent" style="margin: 0 0 20px 40px; color: #5B6159; font-size: 15px">Tools your store connects to. Not sure? Skip — we'll suggest them on the call.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 8px">
<div id="opt-integrations" style="display: contents"></div>
</div>
</fieldset>

<!-- STEP 5 -->
<fieldset style="border: 0; margin: 0; padding: 0; min-width: 0">
<legend style="padding: 0; margin: 0 0 8px; display: flex; gap: 16px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">05</span><span style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">Automations</span></legend>
<p class="noindent" style="margin: 0 0 20px 40px; color: #5B6159; font-size: 15px">The part most agencies skip. These keep selling after launch.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 8px">
<div id="opt-automations" style="display: contents"></div>
</div>
</fieldset>

<!-- STEP 6 -->
<fieldset style="border: 0; margin: 0; padding: 0; min-width: 0">
<legend style="padding: 0; margin: 0 0 20px; display: flex; gap: 16px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">06</span><span style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">Where should we send your quote?</span></legend>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px">
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Your name
<input type="text" name="name" autocomplete="name" required style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400">
</label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Brand name or website
<input type="text" name="brand" autocomplete="organization" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400">
</label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">WhatsApp or email
<input type="text" name="contact" autocomplete="email" required style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400">
</label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">When do you want to launch?
<select name="timeline" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400">
<option value="">Choose one</option>
<option value="ASAP">As soon as possible</option>
<option value="1–2 months">In 1–2 months</option>
<option value="3+ months">In 3+ months</option>
<option value="Exploring">Just exploring</option>
</select>
</label>
</div>
</fieldset>
</form>

<!-- SUMMARY -->
<aside id="package-summary" class="sticky-aside" aria-label="Your package" style="flex: 1 1 340px; min-width: 0; position: sticky; top: 24px; border: 1px solid #111410; background: #FAFAF7">
<div style="display: flex; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #111410; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase">
<span>Your package</span><span style="color: #5B6159"><span data-s="itemCount"></span> items</span>
</div>
<dl style="margin: 0">
<div style="padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px">Build</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 600"><span data-s="platformLabel"></span></dd>
</div>
<div style="padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px">Catalogue</dt>
<dd style="margin: 0; font-size: 16px; font-weight: 600"><span data-s="catalogueLabel"></span></dd>
</div>
<div style="padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px">Pages · <span data-s="pageCount"></span></dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.5"><span data-s="pageList"></span></dd>
</div>
<div style="padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px">Integrations · <span data-s="integrationCount"></span></dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.5"><span data-s="integrationList"></span></dd>
</div>
<div style="padding: 16px 20px; border-bottom: 1px solid #D9DBD3">
<dt style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px">Automations · <span data-s="automationCount"></span></dt>
<dd style="margin: 0; font-size: 15px; line-height: 1.5"><span data-s="automationList"></span></dd>
</div>
</dl>
<div style="padding: 20px; display: flex; flex-direction: column; gap: 12px">
<div id="if-notSubmitted" style="display: flex; flex-direction: column; gap: 12px">
<button type="button" data-action="submit" style="background: #111410; color: #FFFFFF; border: 0; font-weight: 600; font-size: 16px; padding: 16px 20px; min-height: 48px">Send my package →</button>
<p style="margin: 0; font-size: 13px; line-height: 1.5; color: #5B6159">No payment now. You get an itemised quote on WhatsApp or email within [24 hours].</p>
</div>
<div id="if-submitted" style="display: none; flex-direction: column; gap: 12px">
<div role="status" style="background: #C8F03C; padding: 16px; font-size: 15px; line-height: 1.5"><strong style="display: block; font-size: 17px; margin-bottom: 4px">Package sent.</strong>We'll send your itemised quote within [24 hours].</div>
<button type="button" data-action="reset" style="background: transparent; border: 1px solid #111410; color: #111410; font-weight: 600; font-size: 15px; padding: 12px 16px; min-height: 44px">Edit package</button>
</div>
</div>
</aside>

</div>
<a href="#package-summary" class="mbar" style="display: none; position: sticky; bottom: 0; margin: 32px -20px 0; background: #111410; color: #FFFFFF; text-decoration: none; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px; min-height: 64px; box-sizing: border-box; z-index: 5">
<span style="font-size: 15px; font-weight: 600"><span style="font-family: 'IBM Plex Mono', monospace"><span data-s="itemCount"></span></span> items selected</span>
<span style="background: #C8F03C; color: #111410; font-weight: 700; font-size: 15px; padding: 10px 14px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Review package</span>
</a>
</div>
</section>

<!-- PROCESS -->
<section id="process" style="border-bottom: 1px solid #D9DBD3">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">After you send it</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 56px">From package to live store.</h2>
<ol style="list-style: none; margin: 0; padding: 0; border-top: 2px solid #111410">
<li style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px 32px; padding: 28px 0; border-bottom: 1px solid #D9DBD3">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">01</span><span style="font-size: 22px; font-weight: 700">Quote &amp; call</span></div>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You get</span>Itemised quote for your package, then a call to confirm scope.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You give</span>Brand assets, product list, any reference stores you like.</p>
</li>
<li style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px 32px; padding: 28px 0; border-bottom: 1px solid #D9DBD3">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">02</span><span style="font-size: 22px; font-weight: 700">Design</span></div>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You get</span>Homepage and key page designs, desktop and mobile.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You give</span>Feedback and approval, up to [2] revision rounds.</p>
</li>
<li style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px 32px; padding: 28px 0; border-bottom: 1px solid #D9DBD3">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">03</span><span style="font-size: 22px; font-weight: 700">Build &amp; set up</span></div>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You get</span>Store built, products uploaded, integrations and automations connected.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You give</span>Access to payment, shipping and app accounts.</p>
</li>
<li style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px 32px; padding: 28px 0; border-bottom: 1px solid #D9DBD3">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">04</span><span style="font-size: 22px; font-weight: 700">Test &amp; launch</span></div>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You get</span>Test orders on every device, tracking checked, store goes live.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You give</span>Final sign-off.</p>
</li>
<li style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px 32px; padding: 28px 0; border-bottom: 1px solid #D9DBD3">
<div style="display: flex; gap: 20px; align-items: baseline"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #5B6159">05</span><span style="font-size: 22px; font-weight: 700">Handover or grow</span></div>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You get</span>Training session and [X] days of support — or we keep running ads and automations monthly.</p>
<p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159; display: block; margin-bottom: 4px">You choose</span>Run it yourself, or keep us on the Growth plan.</p>
</li>
</ol>
</div>
</section>

<!-- RELATED WORK -->
<section id="work" style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 48px">
<div>
<p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Related work</p>
<h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0">Shopify stores we've built.</h2>
</div>
<a href="#work-all" style="font-weight: 600; font-size: 16px; color: #111410; min-height: 44px; display: inline-flex; align-items: center">See all work →</a>
</div>
<div class="swipe" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px">
<a href="#p1" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px">
<div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em">[Store screenshot]</div>
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Handmade rugs</span><span>New store</span></div>
<p style="margin: 0; font-size: 20px; font-weight: 700">[Project name]</p>
<p style="margin: 0; font-size: 14px; color: #3A3F38; line-height: 1.5"><strong>Package:</strong> [N] products · [N] pages · [integrations] · [automations]</p>
</a>
<a href="#p2" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px">
<div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em">[Store screenshot]</div>
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Recovery hardware</span><span>New store</span></div>
<p style="margin: 0; font-size: 20px; font-weight: 700">[Project name]</p>
<p style="margin: 0; font-size: 14px; color: #3A3F38; line-height: 1.5"><strong>Package:</strong> [N] products · [N] pages · [integrations] · [automations]</p>
</a>
<a href="#p3" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px">
<div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em">[Store screenshot]</div>
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Sneakers</span><span>Headless</span></div>
<p style="margin: 0; font-size: 20px; font-weight: 700">[Project name]</p>
<p style="margin: 0; font-size: 14px; color: #3A3F38; line-height: 1.5"><strong>Package:</strong> [N] products · [N] pages · [integrations] · [automations]</p>
</a>
</div>
</div>
</section>

<!-- CTA -->
<section style="background: #C8F03C">
<div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 80px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="hcta" style="flex: 1 1 520px; min-width: 0; font-size: 56px; line-height: 1; letter-spacing: -0.035em; font-weight: 800; margin: 0">Rather talk it through?</h2>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px">
<a href="#build" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 18px 26px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Build your package</a>
<a href="#whatsapp" style="border: 2px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">WhatsApp us</a>
</div>
</div>
</section>

<footer style="background: #111410; color: #D3D6CE">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 32px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; font-size: 14px">
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 14px; height: 14px; background: #C8F03C; display: block" aria-hidden="true"></span><span style="font-weight: 800; color: #FFFFFF">AdsPeek</span><span style="color: #9CA196">· Sector 22, Gurugram</span></span>
<span style="color: #9CA196">© 2026 AdsPeek</span>
</div>
</footer>

</div>
<script>
(function () {
  var ACC = '#C8F03C';
  var s = {
    platform: 'new', products: '26–100', collections: '6–15',
    pages: { about: true, contact: true },
    integrations: { payments: true, shipping: true, pixel: true },
    automations: { cart: true, orders: true },
    submitted: false
  };
  var cardOn = 'display:flex;flex-direction:column;gap:10px;text-align:left;padding:20px;min-height:120px;border:2px solid #111410;background:' + ACC + ';color:#111410';
  var cardOff = 'display:flex;flex-direction:column;gap:10px;text-align:left;padding:20px;min-height:120px;border:1px solid #C9CCC3;background:#FFFFFF;color:#111410;margin:1px';
  var chipOn = 'padding:12px 18px;min-height:44px;font-size:15px;font-weight:600;border:2px solid #111410;background:' + ACC + ';color:#111410';
  var chipOff = 'padding:12px 18px;min-height:44px;font-size:15px;font-weight:500;border:1px solid #C9CCC3;background:#FFFFFF;color:#111410;margin:1px';
  var rowOn = 'display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;min-height:52px;border:2px solid #111410;background:' + ACC + ';color:#111410;text-align:left';
  var rowOff = 'display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;min-height:52px;border:1px solid #C9CCC3;background:#FFFFFF;color:#111410;margin:1px;text-align:left';
  var rowLocked = 'display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;min-height:52px;border:1px solid #111410;background:#EDEFE7;color:#111410;text-align:left;cursor:default';
  var MONO = "font-family:'IBM Plex Mono',monospace";

  var platformDefs = [
    ['new', 'New Shopify store', 'Starting fresh — design, build and launch.'],
    ['migrate', 'Move to Shopify', 'From WooCommerce, Wix or a marketplace, keeping your SEO.'],
    ['redesign', 'Redesign my store', 'Already on Shopify; needs a better look and conversion.'],
    ['headless', 'Headless Shopify', 'Custom Next.js storefront for maximum speed and control.']
  ];
  var productVals = ['Up to 25', '26–100', '101–500', '500+'];
  var collectionVals = ['1–5', '6–15', '16–40', '40+'];
  var pageDefs = [
    ['home', 'Homepage', true], ['collection', 'Collection page', true], ['product', 'Product page', true], ['cart', 'Cart & checkout', true],
    ['about', 'About / brand story'], ['contact', 'Contact'], ['faq', 'FAQ'], ['blog', 'Blog'], ['size', 'Size guide'], ['lookbook', 'Lookbook'],
    ['track', 'Track order'], ['wholesale', 'Wholesale / B2B'], ['stores', 'Store locator'], ['policies', 'Policy pages'], ['landing', 'Campaign landing page'], ['quiz', 'Product finder quiz']
  ];
  var intDefs = [
    ['payments', 'Payments', 'Razorpay, PhonePe, PayPal, Stripe'], ['shipping', 'Shipping', 'Shiprocket, Delhivery or local courier'],
    ['pixel', 'Meta Pixel + Conversions API', 'Accurate ad tracking'], ['ga4', 'Google Analytics 4', 'Traffic and sales reports'],
    ['merchant', 'Google Merchant Center', 'Products on Google Shopping'], ['reviews', 'Product reviews', 'Photo reviews on product pages'],
    ['email', 'Email marketing', 'Klaviyo or Shopify Email'], ['whatsapp', 'WhatsApp chat button', 'Talk to buyers in one tap'],
    ['gst', 'GST invoicing', 'Automatic tax invoices'], ['markets', 'Multi-currency', 'Sell abroad in local prices'],
    ['erp', 'Inventory / ERP sync', 'Tally, Zoho or Unicommerce'], ['loyalty', 'Loyalty & rewards', 'Points and referrals']
  ];
  var autoDefs = [
    ['cart', 'Abandoned-cart recovery', 'WhatsApp + email reminders'], ['orders', 'Order updates on WhatsApp', 'Confirmed, shipped, delivered'],
    ['cod', 'COD confirmation', 'Cut fake and returned COD orders'], ['review', 'Review requests', 'Asked automatically after delivery'],
    ['stock', 'Back-in-stock alerts', 'Notify buyers who were waiting'], ['repeat', 'Repeat-order reminders', 'For consumables and refills'],
    ['lead', 'WhatsApp AI replies', 'Answers buyer questions 24/7'], ['lowstock', 'Low-stock alerts to your team', 'Never run out quietly'],
    ['report', 'Weekly sales report', 'Sent to you every Monday']
  ];

  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function btn(attrs, style, inner, pressed, disabled) {
    return '<button type="button" ' + attrs + ' aria-pressed="' + pressed + '"' + (disabled ? ' disabled' : '') + ' style="' + style + '">' + inner + '</button>';
  }
  function set(id, html) { document.getElementById(id).innerHTML = html; }
  function text(id, t) { var k = id.replace('s-', ''); document.querySelectorAll('[data-s="' + k + '"]').forEach(function (el) { el.textContent = t; }); }

  function render() {
    set('opt-platforms', platformDefs.map(function (p) {
      var on = s.platform === p[0];
      return btn('data-platform="' + p[0] + '"', on ? cardOn : cardOff,
        '<span style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span style="font-size:18px;font-weight:700">' + esc(p[1]) + '</span><span style="' + MONO + ';font-size:13px" aria-hidden="true">' + (on ? '● Selected' : '○') + '</span></span>' +
        '<span style="font-size:14px;line-height:1.45;color:#3A3F38">' + esc(p[2]) + '</span>', on);
    }).join(''));
    set('opt-productOpts', productVals.map(function (v) { var on = s.products === v; return btn('data-products="' + v + '"', on ? chipOn : chipOff, esc(v) + ' products', on); }).join(''));
    set('opt-collectionOpts', collectionVals.map(function (v) { var on = s.collections === v; return btn('data-collections="' + v + '"', on ? chipOn : chipOff, esc(v) + ' collections', on); }).join(''));
    set('opt-pages', pageDefs.map(function (p) {
      var locked = !!p[2], on = locked || !!s.pages[p[0]];
      return btn('data-group="pages" data-id="' + p[0] + '"', locked ? rowLocked : (on ? rowOn : rowOff),
        '<span style="font-size:15px;font-weight:600">' + esc(p[1]) + '</span><span style="' + MONO + ';font-size:12px" aria-hidden="true">' + (locked ? 'Included' : (on ? '✓ Added' : '+ Add')) + '</span>', on, locked);
    }).join(''));
    function rows(defs, group) {
      return defs.map(function (d) {
        var on = !!s[group][d[0]];
        return btn('data-group="' + group + '" data-id="' + d[0] + '"', on ? rowOn : rowOff,
          '<span style="display:flex;flex-direction:column;gap:4px;text-align:left"><span style="font-size:15px;font-weight:600">' + esc(d[1]) + '</span><span style="font-size:13px;color:#5B6159">' + esc(d[2]) + '</span></span><span style="' + MONO + ';font-size:12px" aria-hidden="true">' + (on ? '✓' : '+') + '</span>', on);
      }).join('');
    }
    set('opt-integrations', rows(intDefs, 'integrations'));
    set('opt-automations', rows(autoDefs, 'automations'));

    var pages = pageDefs.filter(function (p) { return p[2] || s.pages[p[0]]; }).map(function (p) { return p[1]; });
    var ints = intDefs.filter(function (d) { return s.integrations[d[0]]; }).map(function (d) { return d[1]; });
    var autos = autoDefs.filter(function (d) { return s.automations[d[0]]; }).map(function (d) { return d[1]; });
    text('s-platformLabel', platformDefs.filter(function (p) { return p[0] === s.platform; })[0][1]);
    text('s-catalogueLabel', s.products + ' products · ' + s.collections + ' collections');
    text('s-pageCount', pages.length); text('s-pageList', pages.join(', '));
    text('s-integrationCount', ints.length); text('s-integrationList', ints.length ? ints.join(', ') : 'None yet');
    text('s-automationCount', autos.length); text('s-automationList', autos.length ? autos.join(', ') : 'None yet');
    text('s-itemCount', 2 + pages.length + ints.length + autos.length);
    document.getElementById('if-notSubmitted').style.display = s.submitted ? 'none' : 'flex';
    document.getElementById('if-submitted').style.display = s.submitted ? 'flex' : 'none';
  }

  function payload() {
    var f = document.getElementById('builder');
    return {
      build: s.platform, products: s.products, collections: s.collections,
      pages: pageDefs.filter(function (p) { return p[2] || s.pages[p[0]]; }).map(function (p) { return p[1]; }),
      integrations: intDefs.filter(function (d) { return s.integrations[d[0]]; }).map(function (d) { return d[1]; }),
      automations: autoDefs.filter(function (d) { return s.automations[d[0]]; }).map(function (d) { return d[1]; }),
      name: f.elements.namedItem('name').value, brand: f.elements.namedItem('brand').value, contact: f.elements.namedItem('contact').value, timeline: f.elements.namedItem('timeline').value
    };
  }

  function submit() {
    var f = document.getElementById('builder');
    if (!f.reportValidity()) return;
    // TODO for your developer: send payload() to your Google Sheets quote system (Apps Script web app URL) or WhatsApp.
    console.log('AdsPeek package', payload());
    s.submitted = true; render();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.platform) { s.platform = b.dataset.platform; s.submitted = false; render(); }
    else if (b.dataset.products) { s.products = b.dataset.products; s.submitted = false; render(); }
    else if (b.dataset.collections) { s.collections = b.dataset.collections; s.submitted = false; render(); }
    else if (b.dataset.group && !b.disabled) { var g = s[b.dataset.group]; g[b.dataset.id] = !g[b.dataset.id]; s.submitted = false; render(); }
    else if (b.dataset.action === 'submit') submit();
    else if (b.dataset.action === 'reset') { s.submitted = false; render(); }
  });
  document.getElementById('builder').addEventListener('submit', function (e) { e.preventDefault(); submit(); });
  render();
})();

</script><script>
(function(){var b=document.querySelector('.menubtn'),n=document.querySelector('.mainnav'),c=document.querySelector('.hdrcta');if(!b||!n)return;
b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');
n.style.cssText=open?'display:flex!important;flex-direction:column;gap:0;width:100%;order:9;border-top:1px solid #D9DBD3;margin-top:8px':'';
n.style.setProperty('display',open?'flex':'','important');
[].forEach.call(n.querySelectorAll('a'),function(a){a.style.padding=open?'16px 0':'';a.style.borderBottom=open?'1px solid #D9DBD3':'';a.style.fontSize=open?'18px':'';a.style.fontWeight=open?'600':'';});
});})();
</script>
</body>
</html>
~~~~~~
<!-- END design-reference/shopify-development.html -->

## Reference: `design-reference/contact.html`

<!-- BEGIN design-reference/contact.html -->
~~~~~~html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AdsPeek — Contact</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FAFAF7}
a{color:#0F3D2E}a:hover{color:#111410}
</style>
<style>
/* ---- Responsive: tablet 640–1023px ---- */
@media (max-width: 1023px){
.wrap.sec{padding-top:72px!important;padding-bottom:72px!important}
.h1{font-size:56px!important}
.h2{font-size:40px!important}
.hcta{font-size:48px!important}
.mainnav{display:none!important}
.menubtn{display:inline-flex!important}
.sticky-aside{position:static!important;flex-basis:100%!important}
.cmp-inner{min-width:0!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:24px!important;border-right:0!important;border-bottom:1px solid #D9DBD3}
.pr,.ways{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.pr>div,.ways>div{padding:24px!important}
}
/* ---- Responsive: phone below 640px ---- */
@media (max-width: 639px){
.wrap{padding-left:20px!important;padding-right:20px!important}
.wrap.sec{padding-top:56px!important;padding-bottom:56px!important}
.h1{font-size:42px!important;line-height:1.02!important}
.h2{font-size:32px!important;line-height:1.08!important}
.hcta{font-size:36px!important}
.hdrcta{display:none!important}
.btnrow{flex-direction:column!important;align-items:stretch!important}
.btnrow>a,.btnrow>button{width:100%;justify-content:center;box-sizing:border-box}
.swipe{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px!important;margin-right:-20px;padding-right:20px;scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}
.swipe>*{flex:0 0 82%;scroll-snap-align:start}
.cmp-table{display:none!important}
.cmp-cards{display:block!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:20px 0!important}
.trust>div:nth-child(odd){padding-right:12px!important}
.trust>div:last-child{grid-column:1/-1}
.trust p:first-child{font-size:30px!important}
.cellsd>div{border-right:0!important;border-bottom:1px solid #3C6A5A;padding:24px!important}
.cellsd>div:last-child{border-bottom:0}
.cellsd>div>div:first-child{margin-bottom:20px!important}
.pr,.ways{grid-template-columns:minmax(0,1fr)!important}
.pr>div,.ways>div{border-right:0!important;border-bottom:1px solid #D9DBD3;padding:24px!important}
.pr>div:last-child,.ways>div:last-child{border-bottom:0}
.first-m{order:-1}
.grid2m{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.noindent{margin-left:0!important}
.mbar{display:flex!important}
.svc-row{gap:10px!important;padding:24px 0!important}
.svc-row span[style*="font-size: 30px"]{font-size:24px!important}
.proc-ol>li{padding:20px 0!important;border-bottom:1px solid #D9DBD3}
.big-num{font-size:30px!important}
.fact-grid{grid-template-columns:minmax(0,1fr)!important}
.fact-grid>div{border-right:0!important;border-bottom:1px solid #D9DBD3}
.hero-pad{padding-top:40px!important;padding-bottom:56px!important}
.crumb{margin-bottom:24px!important}
.lead{font-size:17px!important}
}
</style>
</head>
<body>
<div style="font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #111410; background: #FAFAF7; width: 100%; min-width: 0">
<header style="border-bottom: 1px solid #D9DBD3">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111410">
<span style="width: 18px; height: 18px; background: #C8F03C; border: 2px solid #111410; display: block" aria-hidden="true"></span>
<span style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em">AdsPeek</span>
</a>
<nav aria-label="Main" class="mainnav" style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="shopify-development.html" style="text-decoration: none; color: #111410">Services</a>
<a href="index.html" style="text-decoration: none; color: #111410">Growth System</a>
<a href="index.html" style="text-decoration: none; color: #111410">Work</a>
<a href="guides.html" style="text-decoration: none; color: #111410">Guides</a>
<a href="about.html" style="text-decoration: none; color: #111410">About</a>
</nav>
<div style="display: flex; align-items: center; gap: 8px"><a class="hdrcta" href="contact.html" style="background: #0F3D2E; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 20px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a call →</a><button type="button" class="menubtn" aria-label="Open menu" style="display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent; border: 1px solid #111410; padding: 0; cursor: pointer"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2" fill="#111410"/><rect y="6" width="20" height="2" fill="#111410"/><rect y="12" width="20" height="2" fill="#111410"/></svg></button></div>
</div>
</header>
<section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec hero-pad" style="max-width: 1280px; margin: 0 auto; padding: 56px 32px 80px"><nav aria-label="Breadcrumb" class="crumb" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.04em; margin: 0 0 40px; color: #5B6159"><a href="index.html" style="color: #5B6159">Home</a> / Contact</nav><h1 class="h1" style="font-size: 72px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 800; margin: 0">Let's talk about<br><span style="background: #C8F03C; padding: 0 10px">your store.</span></h1><p class="lead" style="font-size: 20px; line-height: 1.5; color: #3A3F38; max-width: 620px; margin: 28px 0 0">Pick the way that suits you. Every message is read by the person who will work on your project.</p></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px"><div class="ways" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); border: 1px solid #111410; background: #FFFFFF"><div style="padding: 28px; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid #D9DBD3;">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">01</span><h3 style="font-size: 26px; font-weight: 700; margin: 0">Book a call</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">30-minute strategy call. Pick a time that suits you.</p>
<p style="margin: 0; font-size: 17px; font-weight: 600">[Calendar link]</p>
<a href="#0" style="font-weight: 600; font-size: 15px; color: #111410; min-height: 44px; display: inline-flex; align-items: center; margin-top: auto">Pick a time →</a></div><div class="first-m" style="padding: 28px; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid #D9DBD3;">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">02</span><h3 style="font-size: 26px; font-weight: 700; margin: 0">WhatsApp</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">Fastest reply. Send us your store link or idea.</p>
<p style="margin: 0; font-size: 17px; font-weight: 600">[+91 XXXXX XXXXX]</p>
<a href="#1" style="font-weight: 600; font-size: 15px; color: #111410; min-height: 44px; display: inline-flex; align-items: center; margin-top: auto">Open WhatsApp →</a></div><div style="padding: 28px; display: flex; flex-direction: column; gap: 12px; ">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">03</span><h3 style="font-size: 26px; font-weight: 700; margin: 0">Email</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">For briefs, RFQs and documents.</p>
<p style="margin: 0; font-size: 17px; font-weight: 600">[hello@adspeek.com]</p>
<a href="#2" style="font-weight: 600; font-size: 15px; color: #111410; min-height: 44px; display: inline-flex; align-items: center; margin-top: auto">Send an email →</a></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Or write to us</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">Send a short brief.</h2><div style="display: flex; flex-wrap: wrap; gap: 56px; align-items: flex-start"><form style="flex: 999 1 560px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px">
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Your name<input type="text" name="name" autocomplete="name" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410"></label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Brand or company<input type="text" name="company" autocomplete="organization" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410"></label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">WhatsApp number<input type="tel" name="phone" autocomplete="tel" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410"></label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Email<input type="email" name="email" autocomplete="email" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410"></label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">What do you need?<select name="service" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410"><option>Choose one</option><option>Shopify store</option><option>Website</option><option>App</option><option>Meta ads</option><option>Not sure yet</option></select></label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Budget range<select name="budget" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410"><option>Choose one</option><option>[RANGE 1]</option><option>[RANGE 2]</option><option>[RANGE 3]</option><option>Not decided</option></select></label>
<label style="display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600; grid-column: 1 / -1">Tell us a little about it
<textarea name="message" rows="5" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410; resize: vertical"></textarea></label>
<div style="grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 20px">
<button type="submit" style="background: #111410; color: #FFFFFF; border: 0; font-weight: 600; font-size: 16px; padding: 16px 28px; min-height: 48px; font-family: inherit; cursor: pointer">Send message →</button>
<span style="font-size: 14px; color: #5B6159">We reply within [X hours] on working days.</span></div>
</form><div style="flex: 1 1 300px; min-width: 0"><p style="font-size: 18px; font-weight: 700; margin: 0 0 8px">What happens next</p><ol style="list-style: none; margin: 0; padding: 0; border-top: 2px solid #111410"><li style="display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">01</span><span style="font-size: 16px; line-height: 1.5">We read your message and look at your store or idea.</span></li><li style="display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">02</span><span style="font-size: 16px; line-height: 1.5">You get a reply on WhatsApp or email with first thoughts.</span></li><li style="display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">03</span><span style="font-size: 16px; line-height: 1.5">If it fits, we book a call and send a quote after it.</span></li></ol></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: stretch">
<div style="flex: 1 1 320px; min-width: 0; display: flex; flex-direction: column; gap: 20px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Visit us</p><h2 class="h2" style="font-size: 40px; line-height: 1.05; letter-spacing: -0.03em; font-weight: 800; margin: 0">Sector 22, Gurugram</h2>
<dl style="margin: 0; display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 14px 16px; font-size: 16px">
<dt><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Address</span></dt><dd style="margin: 0">[Full street address]<br>Sector 22, Gurugram, Haryana [PIN]</dd>
<dt><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Hours</span></dt><dd style="margin: 0">[Mon–Sat, 10:00–19:00 IST]</dd>
<dt><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Meetings</span></dt><dd style="margin: 0">In person by appointment; online for clients outside NCR</dd></dl></div>
<div style="flex: 999 1 560px; min-width: 0"><div style="aspect-ratio: 16 / 9; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Google Map embed]</div></div></div></div></section><section style="background: #C8F03C"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 80px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="hcta" style="flex: 1 1 520px; min-width: 0; font-size: 56px; line-height: 1; letter-spacing: -0.035em; font-weight: 800; margin: 0">Not ready to talk yet?</h2>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px"><a href="shopify-development.html" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Build your package first</a><a href="#whatsapp" style="border: 2px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">WhatsApp us</a></div>
</div></section>
<footer style="background: #111410; color: #D3D6CE">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 32px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; padding-bottom: 48px; border-bottom: 1px solid #33372F">
<div style="display: flex; flex-direction: column; gap: 14px">
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 16px; height: 16px; background: #C8F03C; display: block" aria-hidden="true"></span><span style="font-size: 20px; font-weight: 800; color: #FFFFFF">AdsPeek</span></span>
<p style="margin: 0; font-size: 15px; line-height: 1.55">Sector 22, Gurugram<br>Haryana, India</p>
</div>
<nav aria-label="Services" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Services</span>
<a href="shopify-development.html" style="color: #D3D6CE; text-decoration: none">Shopify Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Website Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">App Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Meta Ads</a>
</nav>
<nav aria-label="Shopify by city" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Shopify by city</span>
<a href="shopify-development-gurugram.html" style="color: #D3D6CE; text-decoration: none">Gurugram</a>
<a href="#delhi" style="color: #D3D6CE; text-decoration: none">Delhi</a>
<a href="#mumbai" style="color: #D3D6CE; text-decoration: none">Mumbai</a>
<a href="#dubai" style="color: #D3D6CE; text-decoration: none">Dubai</a>
<a href="#london" style="color: #D3D6CE; text-decoration: none">London</a>
</nav>
<nav aria-label="Company" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Company</span>
<a href="about.html" style="color: #D3D6CE; text-decoration: none">About</a>
<a href="guides.html" style="color: #D3D6CE; text-decoration: none">Guides</a>
<a href="contact.html" style="color: #D3D6CE; text-decoration: none">Contact</a>
</nav>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; padding-top: 24px; font-size: 13px; color: #9CA196">
<span>© 2026 AdsPeek</span>
<span style="display: flex; gap: 20px"><a href="#privacy" style="color: #9CA196">Privacy</a><a href="#terms" style="color: #9CA196">Terms</a></span>
</div>
</div>
</footer>
</div>
<script>
(function(){var b=document.querySelector('.menubtn'),n=document.querySelector('.mainnav'),c=document.querySelector('.hdrcta');if(!b||!n)return;
b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');
n.style.cssText=open?'display:flex!important;flex-direction:column;gap:0;width:100%;order:9;border-top:1px solid #D9DBD3;margin-top:8px':'';
n.style.setProperty('display',open?'flex':'','important');
[].forEach.call(n.querySelectorAll('a'),function(a){a.style.padding=open?'16px 0':'';a.style.borderBottom=open?'1px solid #D9DBD3':'';a.style.fontSize=open?'18px':'';a.style.fontWeight=open?'600':'';});
});})();
</script>
</body>
</html>
~~~~~~
<!-- END design-reference/contact.html -->

## Reference: `design-reference/about.html`

<!-- BEGIN design-reference/about.html -->
~~~~~~html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AdsPeek — About</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FAFAF7}
a{color:#0F3D2E}a:hover{color:#111410}
</style>
<style>
/* ---- Responsive: tablet 640–1023px ---- */
@media (max-width: 1023px){
.wrap.sec{padding-top:72px!important;padding-bottom:72px!important}
.h1{font-size:56px!important}
.h2{font-size:40px!important}
.hcta{font-size:48px!important}
.mainnav{display:none!important}
.menubtn{display:inline-flex!important}
.sticky-aside{position:static!important;flex-basis:100%!important}
.cmp-inner{min-width:0!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:24px!important;border-right:0!important;border-bottom:1px solid #D9DBD3}
.pr,.ways{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.pr>div,.ways>div{padding:24px!important}
}
/* ---- Responsive: phone below 640px ---- */
@media (max-width: 639px){
.wrap{padding-left:20px!important;padding-right:20px!important}
.wrap.sec{padding-top:56px!important;padding-bottom:56px!important}
.h1{font-size:42px!important;line-height:1.02!important}
.h2{font-size:32px!important;line-height:1.08!important}
.hcta{font-size:36px!important}
.hdrcta{display:none!important}
.btnrow{flex-direction:column!important;align-items:stretch!important}
.btnrow>a,.btnrow>button{width:100%;justify-content:center;box-sizing:border-box}
.swipe{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px!important;margin-right:-20px;padding-right:20px;scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}
.swipe>*{flex:0 0 82%;scroll-snap-align:start}
.cmp-table{display:none!important}
.cmp-cards{display:block!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:20px 0!important}
.trust>div:nth-child(odd){padding-right:12px!important}
.trust>div:last-child{grid-column:1/-1}
.trust p:first-child{font-size:30px!important}
.cellsd>div{border-right:0!important;border-bottom:1px solid #3C6A5A;padding:24px!important}
.cellsd>div:last-child{border-bottom:0}
.cellsd>div>div:first-child{margin-bottom:20px!important}
.pr,.ways{grid-template-columns:minmax(0,1fr)!important}
.pr>div,.ways>div{border-right:0!important;border-bottom:1px solid #D9DBD3;padding:24px!important}
.pr>div:last-child,.ways>div:last-child{border-bottom:0}
.first-m{order:-1}
.grid2m{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.noindent{margin-left:0!important}
.mbar{display:flex!important}
.svc-row{gap:10px!important;padding:24px 0!important}
.svc-row span[style*="font-size: 30px"]{font-size:24px!important}
.proc-ol>li{padding:20px 0!important;border-bottom:1px solid #D9DBD3}
.big-num{font-size:30px!important}
.fact-grid{grid-template-columns:minmax(0,1fr)!important}
.fact-grid>div{border-right:0!important;border-bottom:1px solid #D9DBD3}
.hero-pad{padding-top:40px!important;padding-bottom:56px!important}
.crumb{margin-bottom:24px!important}
.lead{font-size:17px!important}
}
</style>
</head>
<body>
<div style="font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #111410; background: #FAFAF7; width: 100%; min-width: 0">
<header style="border-bottom: 1px solid #D9DBD3">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111410">
<span style="width: 18px; height: 18px; background: #C8F03C; border: 2px solid #111410; display: block" aria-hidden="true"></span>
<span style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em">AdsPeek</span>
</a>
<nav aria-label="Main" class="mainnav" style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="shopify-development.html" style="text-decoration: none; color: #111410">Services</a>
<a href="index.html" style="text-decoration: none; color: #111410">Growth System</a>
<a href="index.html" style="text-decoration: none; color: #111410">Work</a>
<a href="guides.html" style="text-decoration: none; color: #111410">Guides</a>
<a href="about.html" style="text-decoration: none; color: #111410">About</a>
</nav>
<div style="display: flex; align-items: center; gap: 8px"><a class="hdrcta" href="contact.html" style="background: #0F3D2E; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 20px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a call →</a><button type="button" class="menubtn" aria-label="Open menu" style="display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent; border: 1px solid #111410; padding: 0; cursor: pointer"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2" fill="#111410"/><rect y="6" width="20" height="2" fill="#111410"/><rect y="12" width="20" height="2" fill="#111410"/></svg></button></div>
</div>
</header>
<section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec hero-pad" style="max-width: 1280px; margin: 0 auto; padding: 56px 32px 80px"><nav aria-label="Breadcrumb" class="crumb" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.04em; margin: 0 0 40px; color: #5B6159"><a href="index.html" style="color: #5B6159">Home</a> / About</nav><h1 class="h1" style="font-size: 72px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 800; margin: 0">We stay<br><span style="background: #C8F03C; padding: 0 10px">after launch.</span></h1><p class="lead" style="font-size: 20px; line-height: 1.5; color: #3A3F38; max-width: 620px; margin: 28px 0 0">AdsPeek is a Shopify and growth studio in Gurugram. We build stores for D2C brands, then run the ads and automations that make them sell.</p></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><div style="display: flex; flex-wrap: wrap; gap: 56px; align-items: flex-start">
<div style="flex: 1 1 360px; min-width: 0"><div style="aspect-ratio: 4 / 5; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Founder / team photo at the Gurugram office]</div></div>
<div style="flex: 999 1 520px; min-width: 0"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Why AdsPeek exists</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 32px">Too many good stores<br>were left alone.</h2>
<div style="font-size: 18px; line-height: 1.65; color: #3A3F38; display: flex; flex-direction: column; gap: 18px; max-width: 640px">
<p style="margin: 0">[Your story in 2–3 short paragraphs: what you saw while selling ads and building stores — brands paying for a beautiful store, then being handed over with no traffic, no follow-up and no tracking.]</p>
<p style="margin: 0">[Why you started AdsPeek to fix that: one team that builds the store and stays on to grow it.]</p>
<p style="margin: 0">[Where you are today: the brands you work with, in India and abroad.]</p>
</div>
<p style="margin: 28px 0 0; font-size: 16px; font-weight: 700">Ritesh Kumar Singh <span style="font-weight: 400; color: #5B6159">· Founder</span></p></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">What we believe</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">Four rules we work by.</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); column-gap: 32px"><div style="padding: 28px 28px 28px 0; border-top: 2px solid #111410; display: flex; flex-direction: column; gap: 12px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">01</span><h3 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.01em">Launch is the start.</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">A store with no traffic, follow-up or tracking is a cost, not an asset. We plan the selling before we design the store.</p></div><div style="padding: 28px 28px 28px 0; border-top: 2px solid #111410; display: flex; flex-direction: column; gap: 12px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">02</span><h3 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.01em">One team, not three vendors.</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">The people who build your store run your ads and automations, so nothing gets lost in a hand-off.</p></div><div style="padding: 28px 28px 28px 0; border-top: 2px solid #111410; display: flex; flex-direction: column; gap: 12px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">03</span><h3 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.01em">Pay for what you use.</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Every project is built from the parts you need. No padded packages.</p></div><div style="padding: 28px 28px 28px 0; border-top: 2px solid #111410; display: flex; flex-direction: column; gap: 12px"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">04</span><h3 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.01em">Show the numbers.</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">One clear weekly report. If something isn't working, you hear it from us first.</p></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #0F3D2E"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px"><div class="grid2m" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))"><div style="padding: 28px 24px; border-left: 1px solid #3C6A5A"><p class="big-num" style="font-size: 44px; font-weight: 800; letter-spacing: -0.03em; margin: 0; color: #FFFFFF">[X]+ yrs</p><p style="margin: 6px 0 0; color: #D3E0D9; font-size: 15px">Running AdsPeek</p></div><div style="padding: 28px 24px; border-left: 1px solid #3C6A5A"><p class="big-num" style="font-size: 44px; font-weight: 800; letter-spacing: -0.03em; margin: 0; color: #FFFFFF">[XX]</p><p style="margin: 6px 0 0; color: #D3E0D9; font-size: 15px">Stores launched</p></div><div style="padding: 28px 24px; border-left: 1px solid #3C6A5A"><p class="big-num" style="font-size: 44px; font-weight: 800; letter-spacing: -0.03em; margin: 0; color: #FFFFFF">[X]</p><p style="margin: 6px 0 0; color: #D3E0D9; font-size: 15px">Countries served</p></div><div style="padding: 28px 24px; border-left: 1px solid #3C6A5A"><p class="big-num" style="font-size: 44px; font-weight: 800; letter-spacing: -0.03em; margin: 0; color: #FFFFFF">[XX]</p><p style="margin: 6px 0 0; color: #D3E0D9; font-size: 15px">Brands running ads with us</p></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">The team</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">The people on your project.</h2><div class="grid2m" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px"><div style="display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 1 / 1; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Photo]</div><p style="margin: 0; font-size: 18px; font-weight: 700">Ritesh Kumar Singh</p><p style="margin: 0; font-size: 14px; color: #5B6159">Founder · Strategy &amp; creative direction</p></div><div style="display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 1 / 1; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Photo]</div><p style="margin: 0; font-size: 18px; font-weight: 700">[Name]</p><p style="margin: 0; font-size: 14px; color: #5B6159">[Role — Shopify development]</p></div><div style="display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 1 / 1; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Photo]</div><p style="margin: 0; font-size: 18px; font-weight: 700">[Name]</p><p style="margin: 0; font-size: 14px; color: #5B6159">[Role — Performance ads]</p></div><div style="display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 1 / 1; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Photo]</div><p style="margin: 0; font-size: 18px; font-weight: 700">[Name]</p><p style="margin: 0; font-size: 14px; color: #5B6159">[Role — Design]</p></div></div></div></section><section style="background: #C8F03C"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 80px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="hcta" style="flex: 1 1 520px; min-width: 0; font-size: 56px; line-height: 1; letter-spacing: -0.035em; font-weight: 800; margin: 0">Work with a team that stays.</h2>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px"><a href="contact.html" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a call</a><a href="#whatsapp" style="border: 2px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">WhatsApp us</a></div>
</div></section>
<footer style="background: #111410; color: #D3D6CE">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 32px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; padding-bottom: 48px; border-bottom: 1px solid #33372F">
<div style="display: flex; flex-direction: column; gap: 14px">
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 16px; height: 16px; background: #C8F03C; display: block" aria-hidden="true"></span><span style="font-size: 20px; font-weight: 800; color: #FFFFFF">AdsPeek</span></span>
<p style="margin: 0; font-size: 15px; line-height: 1.55">Sector 22, Gurugram<br>Haryana, India</p>
</div>
<nav aria-label="Services" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Services</span>
<a href="shopify-development.html" style="color: #D3D6CE; text-decoration: none">Shopify Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Website Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">App Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Meta Ads</a>
</nav>
<nav aria-label="Shopify by city" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Shopify by city</span>
<a href="shopify-development-gurugram.html" style="color: #D3D6CE; text-decoration: none">Gurugram</a>
<a href="#delhi" style="color: #D3D6CE; text-decoration: none">Delhi</a>
<a href="#mumbai" style="color: #D3D6CE; text-decoration: none">Mumbai</a>
<a href="#dubai" style="color: #D3D6CE; text-decoration: none">Dubai</a>
<a href="#london" style="color: #D3D6CE; text-decoration: none">London</a>
</nav>
<nav aria-label="Company" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Company</span>
<a href="about.html" style="color: #D3D6CE; text-decoration: none">About</a>
<a href="guides.html" style="color: #D3D6CE; text-decoration: none">Guides</a>
<a href="contact.html" style="color: #D3D6CE; text-decoration: none">Contact</a>
</nav>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; padding-top: 24px; font-size: 13px; color: #9CA196">
<span>© 2026 AdsPeek</span>
<span style="display: flex; gap: 20px"><a href="#privacy" style="color: #9CA196">Privacy</a><a href="#terms" style="color: #9CA196">Terms</a></span>
</div>
</div>
</footer>
</div>
<script>
(function(){var b=document.querySelector('.menubtn'),n=document.querySelector('.mainnav'),c=document.querySelector('.hdrcta');if(!b||!n)return;
b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');
n.style.cssText=open?'display:flex!important;flex-direction:column;gap:0;width:100%;order:9;border-top:1px solid #D9DBD3;margin-top:8px':'';
n.style.setProperty('display',open?'flex':'','important');
[].forEach.call(n.querySelectorAll('a'),function(a){a.style.padding=open?'16px 0':'';a.style.borderBottom=open?'1px solid #D9DBD3':'';a.style.fontSize=open?'18px':'';a.style.fontWeight=open?'600':'';});
});})();
</script>
</body>
</html>
~~~~~~
<!-- END design-reference/about.html -->

## Reference: `design-reference/shopify-development-gurugram.html`

<!-- BEGIN design-reference/shopify-development-gurugram.html -->
~~~~~~html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Shopify development company in Gurugram — AdsPeek</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FAFAF7}
a{color:#0F3D2E}a:hover{color:#111410}
</style>
<style>
/* ---- Responsive: tablet 640–1023px ---- */
@media (max-width: 1023px){
.wrap.sec{padding-top:72px!important;padding-bottom:72px!important}
.h1{font-size:56px!important}
.h2{font-size:40px!important}
.hcta{font-size:48px!important}
.mainnav{display:none!important}
.menubtn{display:inline-flex!important}
.sticky-aside{position:static!important;flex-basis:100%!important}
.cmp-inner{min-width:0!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:24px!important;border-right:0!important;border-bottom:1px solid #D9DBD3}
.pr,.ways{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.pr>div,.ways>div{padding:24px!important}
}
/* ---- Responsive: phone below 640px ---- */
@media (max-width: 639px){
.wrap{padding-left:20px!important;padding-right:20px!important}
.wrap.sec{padding-top:56px!important;padding-bottom:56px!important}
.h1{font-size:42px!important;line-height:1.02!important}
.h2{font-size:32px!important;line-height:1.08!important}
.hcta{font-size:36px!important}
.hdrcta{display:none!important}
.btnrow{flex-direction:column!important;align-items:stretch!important}
.btnrow>a,.btnrow>button{width:100%;justify-content:center;box-sizing:border-box}
.swipe{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px!important;margin-right:-20px;padding-right:20px;scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}
.swipe>*{flex:0 0 82%;scroll-snap-align:start}
.cmp-table{display:none!important}
.cmp-cards{display:block!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:20px 0!important}
.trust>div:nth-child(odd){padding-right:12px!important}
.trust>div:last-child{grid-column:1/-1}
.trust p:first-child{font-size:30px!important}
.cellsd>div{border-right:0!important;border-bottom:1px solid #3C6A5A;padding:24px!important}
.cellsd>div:last-child{border-bottom:0}
.cellsd>div>div:first-child{margin-bottom:20px!important}
.pr,.ways{grid-template-columns:minmax(0,1fr)!important}
.pr>div,.ways>div{border-right:0!important;border-bottom:1px solid #D9DBD3;padding:24px!important}
.pr>div:last-child,.ways>div:last-child{border-bottom:0}
.first-m{order:-1}
.grid2m{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.noindent{margin-left:0!important}
.mbar{display:flex!important}
.svc-row{gap:10px!important;padding:24px 0!important}
.svc-row span[style*="font-size: 30px"]{font-size:24px!important}
.proc-ol>li{padding:20px 0!important;border-bottom:1px solid #D9DBD3}
.big-num{font-size:30px!important}
.fact-grid{grid-template-columns:minmax(0,1fr)!important}
.fact-grid>div{border-right:0!important;border-bottom:1px solid #D9DBD3}
.hero-pad{padding-top:40px!important;padding-bottom:56px!important}
.crumb{margin-bottom:24px!important}
.lead{font-size:17px!important}
}
</style>
</head>
<body>
<div style="font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #111410; background: #FAFAF7; width: 100%; min-width: 0">
<header style="border-bottom: 1px solid #D9DBD3">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111410">
<span style="width: 18px; height: 18px; background: #C8F03C; border: 2px solid #111410; display: block" aria-hidden="true"></span>
<span style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em">AdsPeek</span>
</a>
<nav aria-label="Main" class="mainnav" style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="shopify-development.html" style="text-decoration: none; color: #111410">Services</a>
<a href="index.html" style="text-decoration: none; color: #111410">Growth System</a>
<a href="index.html" style="text-decoration: none; color: #111410">Work</a>
<a href="guides.html" style="text-decoration: none; color: #111410">Guides</a>
<a href="about.html" style="text-decoration: none; color: #111410">About</a>
</nav>
<div style="display: flex; align-items: center; gap: 8px"><a class="hdrcta" href="contact.html" style="background: #0F3D2E; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 20px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a call →</a><button type="button" class="menubtn" aria-label="Open menu" style="display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent; border: 1px solid #111410; padding: 0; cursor: pointer"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2" fill="#111410"/><rect y="6" width="20" height="2" fill="#111410"/><rect y="12" width="20" height="2" fill="#111410"/></svg></button></div>
</div>
</header>
<section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec hero-pad" style="max-width: 1280px; margin: 0 auto; padding: 56px 32px 80px"><nav aria-label="Breadcrumb" class="crumb" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.04em; margin: 0 0 40px; color: #5B6159"><a href="index.html" style="color: #5B6159">Home</a> / <a href="shopify-development.html" style="color: #5B6159">Shopify Development</a> / Gurugram</nav><div style="display: flex; flex-wrap: wrap; gap: 56px; align-items: flex-end"><div style="flex: 999 1 560px; min-width: 0"><h1 class="h1" style="font-size: 72px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 800; margin: 0">Shopify development<br>company in <span style="background: #C8F03C; padding: 0 10px">Gurugram</span></h1><p class="lead" style="font-size: 20px; line-height: 1.5; color: #3A3F38; max-width: 620px; margin: 28px 0 0">We design and build Shopify stores for Gurugram brands — then run the ads and automations that bring in sales. Meet us at our Sector 22 office.</p><div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px"><a href="shopify-development.html" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Build your package</a><a href="contact.html" style="border: 1px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Visit our office</a></div></div><div style="flex: 1 1 340px; min-width: 0; border: 1px solid #111410; background: #FFFFFF"><div style="padding: 14px 20px; border-bottom: 1px solid #111410; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase">AdsPeek · Gurugram</div><dl style="margin: 0; display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 0"><dt style="padding: 14px 20px; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Office</span></dt><dd style="margin: 0; padding: 14px 20px; border-bottom: 1px solid #D9DBD3; font-size: 15px; font-weight: 500">Sector 22, Gurugram</dd><dt style="padding: 14px 20px; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Meetings</span></dt><dd style="margin: 0; padding: 14px 20px; border-bottom: 1px solid #D9DBD3; font-size: 15px; font-weight: 500">In person or online</dd><dt style="padding: 14px 20px; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Stores built</span></dt><dd style="margin: 0; padding: 14px 20px; border-bottom: 1px solid #D9DBD3; font-size: 15px; font-weight: 500">[XX] across NCR</dd><dt style="padding: 14px 20px; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">Quote</span></dt><dd style="margin: 0; padding: 14px 20px; border-bottom: 1px solid #D9DBD3; font-size: 15px; font-weight: 500">Within [24 hours]</dd></dl></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Why a Gurugram team</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">What you get by working local.</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); border-top: 1px solid #D9DBD3; border-left: 1px solid #D9DBD3"><div style="padding: 28px; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid #D9DBD3; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">01</span><h3 style="font-size: 22px; font-weight: 700; margin: 0">Meet in person</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Our office is in Sector 22. Workshops and handovers happen at your desk or ours.</p></div><div style="padding: 28px; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid #D9DBD3; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">02</span><h3 style="font-size: 22px; font-weight: 700; margin: 0">Built for Indian buyers</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">UPI, Razorpay, COD confirmation, Shiprocket and GST invoicing set up from day one.</p></div><div style="padding: 28px; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid #D9DBD3; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">03</span><h3 style="font-size: 22px; font-weight: 700; margin: 0">Same time zone, same team</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">No overnight hand-offs. The person you meet is the person building your store.</p></div><div style="padding: 28px; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid #D9DBD3; border-bottom: 1px solid #D9DBD3"><span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159">04</span><h3 style="font-size: 22px; font-weight: 700; margin: 0">Ready to sell abroad too</h3><p style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Multi-currency and international shipping when you want to reach buyers outside India.</p></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><div style="display: flex; flex-wrap: wrap; gap: 48px"><div style="flex: 1 1 340px; min-width: 0"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Gurugram market</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 24px">Selling to Gurugram<br>buyers.</h2></div><div style="flex: 999 1 520px; min-width: 0; font-size: 17px; line-height: 1.65; color: #3A3F38; display: flex; flex-direction: column; gap: 16px"><p style="margin: 0">[2–3 paragraphs of genuinely local content — what Gurugram D2C brands sell, how local buyers shop (mobile-first, UPI, fast delivery expectations), and what that means for store design. Each city page needs its own text; copy-pasted city pages get treated as spam by Google.]</p><p style="margin: 0">[A short local example: a Gurugram brand you built for and what changed.]</p></div></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 72px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Areas we serve</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 32px">Across Gurugram and NCR.</h2><div style="display: flex; flex-wrap: wrap; gap: 8px"><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Cyber City</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Golf Course Road</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Sohna Road</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Udyog Vihar</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">DLF Phases 1–5</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">MG Road</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Sector 29</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Golf Course Extension</span><span style="border: 1px solid #C9CCC3; background: #FFFFFF; padding: 10px 14px; font-size: 15px">Manesar</span></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #0F3D2E"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 72px 32px"><div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center; justify-content: space-between"><div style="flex: 1 1 520px; min-width: 0"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #B9CEC4; margin: 0 0 16px">Custom packages</p><h2 class="h2" style="font-size: 44px; line-height: 1.05; letter-spacing: -0.03em; font-weight: 800; margin: 0; color: #FFFFFF">Pick your pages, integrations and automations.<br>Get an itemised quote.</h2></div><a href="shopify-development.html" style="background: #C8F03C; color: #111410; text-decoration: none; font-weight: 700; font-size: 17px; padding: 18px 26px; min-height: 48px; box-sizing: border-box; display: inline-flex; align-items: center">Open the package builder →</a></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Work in NCR</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 48px">Stores we've built nearby.</h2><div class="swipe" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px"><a href="#p0" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Store screenshot]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>[Category]</span><span>Gurugram</span></div><p style="margin: 0; font-size: 20px; font-weight: 700">[Project name]</p></a><a href="#p1" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Store screenshot]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>[Category]</span><span>Delhi NCR</span></div><p style="margin: 0; font-size: 20px; font-weight: 700">[Project name]</p></a><a href="#p2" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 12px"><div style="aspect-ratio: 4 / 3; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Store screenshot]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>[Category]</span><span>[City]</span></div><p style="margin: 0; font-size: 20px; font-weight: 700">[Project name]</p></a></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><div style="display: flex; flex-wrap: wrap; gap: 56px"><div style="flex: 1 1 300px; min-width: 0"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Questions</p><h2 class="h2" style="font-size: 48px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 0px">Gurugram FAQs</h2></div><dl style="flex: 999 1 560px; min-width: 0; margin: 0; border-top: 2px solid #111410"><div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px"><dt style="font-size: 18px; font-weight: 700">How much does a Shopify store cost in Gurugram?</dt><dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">It depends on what you choose in the package builder. Stores start from [₹ PRICE]; you get an itemised quote within [24 hours].</dd></div><div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px"><dt style="font-size: 18px; font-weight: 700">Can we meet at your office?</dt><dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Yes. We are in Sector 22, Gurugram. Book a time and come over, or we can visit you anywhere in Gurugram.</dd></div><div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px"><dt style="font-size: 18px; font-weight: 700">Do you set up GST invoices and Indian payment gateways?</dt><dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">Yes — Razorpay, PhonePe, UPI, COD and automatic GST invoices are part of the setup if you select them.</dd></div><div style="padding: 24px 0; border-bottom: 1px solid #D9DBD3; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 32px"><dt style="font-size: 18px; font-weight: 700">Do you only work with Gurugram brands?</dt><dd style="margin: 0; font-size: 15px; line-height: 1.55; color: #3A3F38">No. We work with brands across India and abroad; Gurugram clients simply get in-person meetings.</dd></div></dl></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Other cities</p><div style="display: flex; flex-wrap: wrap; gap: 8px"><a href="#delhi" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in Delhi →</a><a href="#noida" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in Noida →</a><a href="#faridabad" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in Faridabad →</a><a href="#mumbai" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in Mumbai →</a><a href="#bangalore" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in Bangalore →</a><a href="#dubai" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in Dubai →</a><a href="#london" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in London →</a><a href="#new-york" style="border: 1px solid #111410; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #111410; text-decoration: none; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Shopify development in New York →</a></div></div></section><section style="background: #C8F03C"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 80px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="hcta" style="flex: 1 1 520px; min-width: 0; font-size: 56px; line-height: 1; letter-spacing: -0.035em; font-weight: 800; margin: 0">Building a store in Gurugram?</h2>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px"><a href="shopify-development.html" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Build your package</a><a href="#whatsapp" style="border: 2px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">WhatsApp us</a></div>
</div></section>
<footer style="background: #111410; color: #D3D6CE">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 32px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; padding-bottom: 48px; border-bottom: 1px solid #33372F">
<div style="display: flex; flex-direction: column; gap: 14px">
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 16px; height: 16px; background: #C8F03C; display: block" aria-hidden="true"></span><span style="font-size: 20px; font-weight: 800; color: #FFFFFF">AdsPeek</span></span>
<p style="margin: 0; font-size: 15px; line-height: 1.55">Sector 22, Gurugram<br>Haryana, India</p>
</div>
<nav aria-label="Services" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Services</span>
<a href="shopify-development.html" style="color: #D3D6CE; text-decoration: none">Shopify Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Website Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">App Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Meta Ads</a>
</nav>
<nav aria-label="Shopify by city" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Shopify by city</span>
<a href="shopify-development-gurugram.html" style="color: #D3D6CE; text-decoration: none">Gurugram</a>
<a href="#delhi" style="color: #D3D6CE; text-decoration: none">Delhi</a>
<a href="#mumbai" style="color: #D3D6CE; text-decoration: none">Mumbai</a>
<a href="#dubai" style="color: #D3D6CE; text-decoration: none">Dubai</a>
<a href="#london" style="color: #D3D6CE; text-decoration: none">London</a>
</nav>
<nav aria-label="Company" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Company</span>
<a href="about.html" style="color: #D3D6CE; text-decoration: none">About</a>
<a href="guides.html" style="color: #D3D6CE; text-decoration: none">Guides</a>
<a href="contact.html" style="color: #D3D6CE; text-decoration: none">Contact</a>
</nav>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; padding-top: 24px; font-size: 13px; color: #9CA196">
<span>© 2026 AdsPeek</span>
<span style="display: flex; gap: 20px"><a href="#privacy" style="color: #9CA196">Privacy</a><a href="#terms" style="color: #9CA196">Terms</a></span>
</div>
</div>
</footer>
</div>
<script>
(function(){var b=document.querySelector('.menubtn'),n=document.querySelector('.mainnav'),c=document.querySelector('.hdrcta');if(!b||!n)return;
b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');
n.style.cssText=open?'display:flex!important;flex-direction:column;gap:0;width:100%;order:9;border-top:1px solid #D9DBD3;margin-top:8px':'';
n.style.setProperty('display',open?'flex':'','important');
[].forEach.call(n.querySelectorAll('a'),function(a){a.style.padding=open?'16px 0':'';a.style.borderBottom=open?'1px solid #D9DBD3':'';a.style.fontSize=open?'18px':'';a.style.fontWeight=open?'600':'';});
});})();
</script>
</body>
</html>
~~~~~~
<!-- END design-reference/shopify-development-gurugram.html -->

## Reference: `design-reference/guides.html`

<!-- BEGIN design-reference/guides.html -->
~~~~~~html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AdsPeek — Guides</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;background:#FAFAF7}
a{color:#0F3D2E}a:hover{color:#111410}
</style>
<style>
/* ---- Responsive: tablet 640–1023px ---- */
@media (max-width: 1023px){
.wrap.sec{padding-top:72px!important;padding-bottom:72px!important}
.h1{font-size:56px!important}
.h2{font-size:40px!important}
.hcta{font-size:48px!important}
.mainnav{display:none!important}
.menubtn{display:inline-flex!important}
.sticky-aside{position:static!important;flex-basis:100%!important}
.cmp-inner{min-width:0!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:24px!important;border-right:0!important;border-bottom:1px solid #D9DBD3}
.pr,.ways{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.pr>div,.ways>div{padding:24px!important}
}
/* ---- Responsive: phone below 640px ---- */
@media (max-width: 639px){
.wrap{padding-left:20px!important;padding-right:20px!important}
.wrap.sec{padding-top:56px!important;padding-bottom:56px!important}
.h1{font-size:42px!important;line-height:1.02!important}
.h2{font-size:32px!important;line-height:1.08!important}
.hcta{font-size:36px!important}
.hdrcta{display:none!important}
.btnrow{flex-direction:column!important;align-items:stretch!important}
.btnrow>a,.btnrow>button{width:100%;justify-content:center;box-sizing:border-box}
.swipe{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px!important;margin-right:-20px;padding-right:20px;scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}
.swipe>*{flex:0 0 82%;scroll-snap-align:start}
.cmp-table{display:none!important}
.cmp-cards{display:block!important}
.trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.trust>div{padding:20px 0!important}
.trust>div:nth-child(odd){padding-right:12px!important}
.trust>div:last-child{grid-column:1/-1}
.trust p:first-child{font-size:30px!important}
.cellsd>div{border-right:0!important;border-bottom:1px solid #3C6A5A;padding:24px!important}
.cellsd>div:last-child{border-bottom:0}
.cellsd>div>div:first-child{margin-bottom:20px!important}
.pr,.ways{grid-template-columns:minmax(0,1fr)!important}
.pr>div,.ways>div{border-right:0!important;border-bottom:1px solid #D9DBD3;padding:24px!important}
.pr>div:last-child,.ways>div:last-child{border-bottom:0}
.first-m{order:-1}
.grid2m{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.noindent{margin-left:0!important}
.mbar{display:flex!important}
.svc-row{gap:10px!important;padding:24px 0!important}
.svc-row span[style*="font-size: 30px"]{font-size:24px!important}
.proc-ol>li{padding:20px 0!important;border-bottom:1px solid #D9DBD3}
.big-num{font-size:30px!important}
.fact-grid{grid-template-columns:minmax(0,1fr)!important}
.fact-grid>div{border-right:0!important;border-bottom:1px solid #D9DBD3}
.hero-pad{padding-top:40px!important;padding-bottom:56px!important}
.crumb{margin-bottom:24px!important}
.lead{font-size:17px!important}
}
</style>
</head>
<body>
<div style="font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #111410; background: #FAFAF7; width: 100%; min-width: 0">
<header style="border-bottom: 1px solid #D9DBD3">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111410">
<span style="width: 18px; height: 18px; background: #C8F03C; border: 2px solid #111410; display: block" aria-hidden="true"></span>
<span style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em">AdsPeek</span>
</a>
<nav aria-label="Main" class="mainnav" style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="shopify-development.html" style="text-decoration: none; color: #111410">Services</a>
<a href="index.html" style="text-decoration: none; color: #111410">Growth System</a>
<a href="index.html" style="text-decoration: none; color: #111410">Work</a>
<a href="guides.html" style="text-decoration: none; color: #111410">Guides</a>
<a href="about.html" style="text-decoration: none; color: #111410">About</a>
</nav>
<div style="display: flex; align-items: center; gap: 8px"><a class="hdrcta" href="contact.html" style="background: #0F3D2E; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 20px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Book a call →</a><button type="button" class="menubtn" aria-label="Open menu" style="display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent; border: 1px solid #111410; padding: 0; cursor: pointer"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2" fill="#111410"/><rect y="6" width="20" height="2" fill="#111410"/><rect y="12" width="20" height="2" fill="#111410"/></svg></button></div>
</div>
</header>
<section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec hero-pad" style="max-width: 1280px; margin: 0 auto; padding: 56px 32px 64px"><nav aria-label="Breadcrumb" class="crumb" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.04em; margin: 0 0 40px; color: #5B6159"><a href="index.html" style="color: #5B6159">Home</a> / Guides</nav><div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-end; justify-content: space-between"><div style="flex: 999 1 560px; min-width: 0"><h1 class="h1" style="font-size: 72px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 800; margin: 0">Guides for<br><span style="background: #C8F03C; padding: 0 10px">D2C founders.</span></h1><p class="lead" style="font-size: 20px; line-height: 1.5; color: #3A3F38; max-width: 620px; margin: 28px 0 0">Straight answers on building, selling and scaling a Shopify store. No fluff, written by the team that does the work.</p></div><form role="search" style="flex: 1 1 320px; min-width: 0; display: flex"><label style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)" for="q">Search guides</label><input id="q" type="search" name="q" placeholder="Search guides" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410; flex: 1 1 auto; min-width: 0; background: #FFFFFF; border-color: #111410"><button type="submit" style="background: #111410; color: #FFFFFF; border: 0; padding: 0 20px; min-height: 48px; font-weight: 600; font-size: 15px; font-family: inherit; cursor: pointer">Search</button></form></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 24px 32px"><nav aria-label="Categories" style="display: flex; flex-wrap: wrap; gap: 8px"><a href="#c0" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 600; text-decoration: none; color: #111410; border: 2px solid #111410; background: #C8F03C">All</a><a href="#c1" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #111410; border: 1px solid #C9CCC3; background: #FFFFFF">Shopify</a><a href="#c2" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #111410; border: 1px solid #C9CCC3; background: #FFFFFF">Costs &amp; pricing</a><a href="#c3" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #111410; border: 1px solid #C9CCC3; background: #FFFFFF">Meta ads</a><a href="#c4" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #111410; border: 1px solid #C9CCC3; background: #FFFFFF">Automation</a><a href="#c5" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #111410; border: 1px solid #C9CCC3; background: #FFFFFF">Migration</a><a href="#c6" style="padding: 10px 16px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #111410; border: 1px solid #C9CCC3; background: #FFFFFF">Growth</a></nav></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 72px 32px"><a href="#featured" style="text-decoration: none; color: #111410; display: flex; flex-wrap: wrap; gap: 48px; align-items: center">
<div style="flex: 999 1 560px; min-width: 0"><div style="aspect-ratio: 16 / 9; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Featured cover image]</div></div>
<div style="flex: 1 1 360px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; background: #C8F03C; align-self: flex-start; padding: 4px 8px">Featured · Costs &amp; pricing</span>
<h2 class="h2" style="font-size: 44px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 800; margin: 0">How much does a Shopify store cost in India?</h2>
<p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3A3F38">Every cost line — theme, apps, development, payment fees — and what you can skip at launch.</p>
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #5B6159">[X] min read · [Date]</span>
<span style="font-weight: 600; font-size: 16px">Read the guide →</span></div></a></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FFFFFF"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Latest guides</p><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px 32px"><a href="#post0" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid #D9DBD3"><div style="aspect-ratio: 16 / 10; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Cover image]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Shopify</span><span>[X] min read</span></div><h3 style="margin: 0; font-size: 22px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em">Shopify vs WooCommerce for D2C brands</h3><p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">Which one to pick, and when moving makes sense.</p></a><a href="#post1" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid #D9DBD3"><div style="aspect-ratio: 16 / 10; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Cover image]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Meta ads</span><span>[X] min read</span></div><h3 style="margin: 0; font-size: 22px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em">Meta ads for a new Shopify store: the first 90 days</h3><p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">What to run, what to measure, when to scale.</p></a><a href="#post2" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid #D9DBD3"><div style="aspect-ratio: 16 / 10; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Cover image]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Automation</span><span>[X] min read</span></div><h3 style="margin: 0; font-size: 22px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em">Cut fake COD orders with WhatsApp confirmation</h3><p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">The simplest automation with the fastest payback.</p></a><a href="#post3" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid #D9DBD3"><div style="aspect-ratio: 16 / 10; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Cover image]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Shopify</span><span>[X] min read</span></div><h3 style="margin: 0; font-size: 22px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em">Headless Shopify: when is it worth it?</h3><p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">Speed, control and cost — the honest trade-off.</p></a><a href="#post4" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid #D9DBD3"><div style="aspect-ratio: 16 / 10; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Cover image]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Migration</span><span>[X] min read</span></div><h3 style="margin: 0; font-size: 22px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em">Move from WooCommerce to Shopify without losing SEO</h3><p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">Redirects, data and the launch-day checklist.</p></a><a href="#post5" style="text-decoration: none; color: #111410; display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid #D9DBD3"><div style="aspect-ratio: 16 / 10; background: #E7E9E1; border: 1px solid #D9DBD3; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5B6159; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; padding: 12px; box-sizing: border-box">[Cover image]</div><div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #5B6159"><span>Automation</span><span>[X] min read</span></div><h3 style="margin: 0; font-size: 22px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em">Abandoned-cart recovery: WhatsApp vs email</h3><p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3A3F38">Which channel to use for Indian and overseas buyers.</p></a></div><div style="display: flex; justify-content: center; margin-top: 48px"><a href="#more" style="border: 1px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Load more guides</a></div></div></section><section  style="border-bottom: 1px solid #D9DBD3; background: #FAFAF7"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 96px 32px"><div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-end; justify-content: space-between"><div style="flex: 1 1 480px; min-width: 0"><p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6159; margin: 0 0 16px">Newsletter</p><h2 class="h2" style="font-size: 40px; line-height: 1.05; letter-spacing: -0.03em; font-weight: 800; margin: 0">One useful guide a month.<br>Nothing else.</h2></div><form style="flex: 1 1 420px; min-width: 0; display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-end"><label style="flex: 1 1 240px; display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600">Email<input type="email" name="email" autocomplete="email" style="font-size: 16px; padding: 14px; border: 1px solid #8A8F86; background: #FAFAF7; min-height: 48px; box-sizing: border-box; font-weight: 400; font-family: inherit; color: #111410; background: #FFFFFF"></label><button type="submit" style="background: #111410; color: #FFFFFF; border: 0; padding: 0 24px; min-height: 48px; font-weight: 600; font-size: 16px; font-family: inherit; cursor: pointer">Subscribe</button></form></div></div></section><section style="background: #C8F03C"><div class="wrap sec" style="max-width: 1280px; margin: 0 auto; padding: 80px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="hcta" style="flex: 1 1 520px; min-width: 0; font-size: 56px; line-height: 1; letter-spacing: -0.035em; font-weight: 800; margin: 0">Read enough? Let's build it.</h2>
<div class="btnrow" style="display: flex; flex-wrap: wrap; gap: 12px"><a href="shopify-development.html" style="background: #111410; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">Build your package</a><a href="#whatsapp" style="border: 2px solid #111410; color: #111410; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 24px; min-height: 44px; box-sizing: border-box; display: inline-flex; align-items: center">WhatsApp us</a></div>
</div></section>
<footer style="background: #111410; color: #D3D6CE">
<div class="wrap" style="max-width: 1280px; margin: 0 auto; padding: 64px 32px 32px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; padding-bottom: 48px; border-bottom: 1px solid #33372F">
<div style="display: flex; flex-direction: column; gap: 14px">
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 16px; height: 16px; background: #C8F03C; display: block" aria-hidden="true"></span><span style="font-size: 20px; font-weight: 800; color: #FFFFFF">AdsPeek</span></span>
<p style="margin: 0; font-size: 15px; line-height: 1.55">Sector 22, Gurugram<br>Haryana, India</p>
</div>
<nav aria-label="Services" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Services</span>
<a href="shopify-development.html" style="color: #D3D6CE; text-decoration: none">Shopify Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Website Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">App Development</a>
<a href="index.html" style="color: #D3D6CE; text-decoration: none">Meta Ads</a>
</nav>
<nav aria-label="Shopify by city" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Shopify by city</span>
<a href="shopify-development-gurugram.html" style="color: #D3D6CE; text-decoration: none">Gurugram</a>
<a href="#delhi" style="color: #D3D6CE; text-decoration: none">Delhi</a>
<a href="#mumbai" style="color: #D3D6CE; text-decoration: none">Mumbai</a>
<a href="#dubai" style="color: #D3D6CE; text-decoration: none">Dubai</a>
<a href="#london" style="color: #D3D6CE; text-decoration: none">London</a>
</nav>
<nav aria-label="Company" style="display: flex; flex-direction: column; gap: 10px; font-size: 15px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA196">Company</span>
<a href="about.html" style="color: #D3D6CE; text-decoration: none">About</a>
<a href="guides.html" style="color: #D3D6CE; text-decoration: none">Guides</a>
<a href="contact.html" style="color: #D3D6CE; text-decoration: none">Contact</a>
</nav>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; padding-top: 24px; font-size: 13px; color: #9CA196">
<span>© 2026 AdsPeek</span>
<span style="display: flex; gap: 20px"><a href="#privacy" style="color: #9CA196">Privacy</a><a href="#terms" style="color: #9CA196">Terms</a></span>
</div>
</div>
</footer>
</div>
<script>
(function(){var b=document.querySelector('.menubtn'),n=document.querySelector('.mainnav'),c=document.querySelector('.hdrcta');if(!b||!n)return;
b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');
n.style.cssText=open?'display:flex!important;flex-direction:column;gap:0;width:100%;order:9;border-top:1px solid #D9DBD3;margin-top:8px':'';
n.style.setProperty('display',open?'flex':'','important');
[].forEach.call(n.querySelectorAll('a'),function(a){a.style.padding=open?'16px 0':'';a.style.borderBottom=open?'1px solid #D9DBD3':'';a.style.fontSize=open?'18px':'';a.style.fontWeight=open?'600':'';});
});})();
</script>
</body>
</html>
~~~~~~
<!-- END design-reference/guides.html -->
