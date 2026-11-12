# Home · Section 7 — Process timeline

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → `<section id="process">` ("From first call to monthly growth.").

## Files
- `components/home/ProcessTimeline.tsx`

## What this section does
Five steps from strategy call to monthly growth, each with a timing label.

## Desktop (1024px and wider)
- Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **96px**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section). White background.
- Eyebrow, H2, 56px below.
- `<ol>` with 2px ink top rule; five equal columns. Each step: mono 12px timing label (`muted`; the last one "Every month" sits on an `accent` chip with 2px 6px padding), title 20px weight 700, one line 15px `body`; gap 10px; padding-top 24px.

## Tablet (640–1023px)
- Three columns then two (grid wraps).

## Mobile (below 640px)
- Vertical list: each step is a row with the timing label on the left (fixed 96px) and title + text on the right, 1px `line` between steps, padding 20px 0.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
