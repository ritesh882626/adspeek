# Guides · Section 3 — Featured guide

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/guides.html` → the section with the "Featured · Costs & pricing" label.

## Files
- `components/guides/FeaturedGuide.tsx`

## What this section does
Promotes the most important guide.

## Desktop (1024px and wider)
- Padding 72px. Whole block is one link. Two columns: cover 16:9 (about 60%) and text (about 40%): accent label chip (mono 12px), H2 44px, summary 17px, mono "[X] min read · [Date]", "Read the guide" (16px weight 600, underlined, no arrow).

## Tablet (640–1023px)
- Stack: image on top, text below.

## Mobile (below 640px)
- Stack; H2 30px; padding 56px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
