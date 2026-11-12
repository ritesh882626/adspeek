# Shopify page · Section 1 — Overview

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → the first `<section>` (breadcrumb, "Shopify stores, built to your list." and the four-fact box).

## Files
- `components/shopify/Overview.tsx`
- `components/ui/Breadcrumb.tsx` (new, reused on other pages)

## What this section does
Short intro that says AdsPeek does custom packages, not fixed ones, before the visitor starts building.

## Desktop (1024px and wider)
- Padding 56px top / 80px bottom.
- Breadcrumb (mono 13px `muted`): Services / Shopify Development, 40px below. Output BreadcrumbList JSON-LD.
- Two columns aligned to the bottom, gap 56px: left (H1 72px, second line in `Highlight`; paragraph 20px max 600px), right a 1px ink white box with a 2×2 grid of facts (mono label + 16px weight 600 value, padding 20px, 1px `line` dividers).

## Tablet (640–1023px)
- Stack; fact box full width, still 2×2.

## Mobile (below 640px)
- H1 42px. Fact box becomes 1 column × 4 rows. Padding 40px / 56px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
