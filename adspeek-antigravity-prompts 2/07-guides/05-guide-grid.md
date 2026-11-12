# Guides · Section 4 — Latest guides grid

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/guides.html` → section with eyebrow "Latest guides".

## Files
- `components/guides/GuideGrid.tsx`
- `components/guides/GuideCard.tsx`

## What this section does
All guides, filtered by search and category, with "Load more".

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Three columns, gap 40px rows / 32px columns. Card: cover 16:10, mono meta row (category / "[X] min read"), title 22px weight 700, summary 15px; 1px `line` under each card.
- Show 6, then an outline "Load more guides" button that reveals 6 more. Empty state when filters match nothing: "No guides match that yet." + a link to clear filters.

## Tablet (640–1023px)
- Two columns.

## Mobile (below 640px)
- One column; cover 16:9; title 20px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
