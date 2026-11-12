# Guides · Step 1 — Guide data

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/guides.html` → featured guide and the six guide cards.

## Files
- `data/guides.ts`

## What this section does
Single source for guide titles, categories, summaries and slugs, so the blog index (and later the article pages) read from one place.

## Desktop (1024px and wider)
- Export `Guide` type: `slug`, `title`, `summary`, `category`, `readMinutes` (placeholder number), `date` (placeholder string), `featured` (boolean), `cover` (optional image path).
- Add the featured guide ("How much does a Shopify store cost in India?", Costs & pricing) and the six in the reference, with slugs made from the titles. Export `CATEGORIES` = All, Shopify, Costs & pricing, Meta ads, Automation, Migration, Growth.

## Tablet (640–1023px)
- n/a (data only)

## Mobile (below 640px)
- n/a (data only)

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
