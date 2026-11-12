# Guides · Section 1 — Hero and search

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/guides.html` → first `<section>` ("Guides for D2C founders." + search box).

## Files
- `components/guides/GuidesHero.tsx`
- `components/guides/GuideSearch.tsx` (client)

## What this section does
Introduces the guides and lets visitors search titles and summaries.

## Desktop (1024px and wider)
- Breadcrumb Home / Guides. Left: H1 72px ("D2C founders." in `Highlight`) + paragraph. Right (about 35%), aligned bottom: search input + dark "Search" button joined (input 1px ink border, white). Search filters the guide grid client-side by title/summary (pass the query through the URL `?q=` so it can be shared).

## Tablet (640–1023px)
- Search box below the text, full width.

## Mobile (below 640px)
- H1 44px. Search full width; button stays on the right of the input, 48px tall.

## Accessibility
- Visually hidden `<label>` "Search guides"; `role="search"` on the form.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
