# Home · Section 9 — FAQ

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the section with eyebrow "07 — Questions".

## Files
- `components/home/Faq.tsx`
- `components/home/faq-data.ts`

## What this section does
Answers the five questions asked before every project. Answers are always visible (no accordion) and are also output as FAQ structured data.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background.
- Left column (about 30%): eyebrow + H2 "Asked before every project." Right column (about 70%): `<dl>` with a 2px ink top rule.
- Each item: question (`<dt>`, 18px weight 700) left half, answer (`<dd>`, 15px `body`) right half, gap 32px, padding 24px 0, 1px `line` below.
- Also render a `<script type="application/ld+json">` FAQPage schema from `faq-data.ts`.

## Tablet (640–1023px)
- Heading on top full width; list below; question and answer still side by side.

## Mobile (below 640px)
- Heading on top; each item stacks question above answer (gap 8px).

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
