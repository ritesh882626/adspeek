# Guides · Section 2 — Category filter bar

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/guides.html` → `<nav aria-label="Categories">`.

## Files
- `components/guides/CategoryBar.tsx` (client)

## What this section does
Filters guides by category.

## Desktop (1024px and wider)
- White background, padding 24px, bottom border. Chips in one row, gap 8px: selected = accent + 2px ink border, weight 600; others white + 1px `line-strong`. Min-height 44px. Selection stored in `?category=` (links, not JS-only buttons, so filtered pages are crawlable).

## Tablet (640–1023px)
- Same, wraps if needed.

## Mobile (below 640px)
- **Single swipeable row** (horizontal scroll, scroll-snap, no wrapping, scrollbar hidden), first chip starts at the page padding.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
