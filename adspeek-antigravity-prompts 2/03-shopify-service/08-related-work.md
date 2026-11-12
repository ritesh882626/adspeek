# Shopify page · Section 4 — Related work

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → `<section id="work">` ("Shopify stores we've built.").

## Files
- `components/shopify/RelatedWork.tsx`
- `data/work.ts` (only to add an optional `package` text field to each project)

## What this section does
Three projects, each showing the package that client picked, so visitors can compare with theirs.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Same card layout as Home · Selected work (reuse the card markup — extract it to `components/ui/WorkCard.tsx` if it isn't already). Extra line under the name: **Package:** [N] products · [N] pages · [integrations] · [automations] (14px).

## Tablet (640–1023px)
- Two columns.

## Mobile (below 640px)
- Swipe row with scroll-snap, cards 82% width (same as Home).

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
