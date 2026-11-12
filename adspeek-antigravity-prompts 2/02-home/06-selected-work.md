# Home · Section 6 — Selected work

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → `<section id="work">` ("Recent builds.").

## Files
- `components/home/SelectedWork.tsx`
- `data/work.ts` (new — the three projects as data so the service page can reuse them)

## What this section does
Shows three recent builds with placeholder screenshots until real images are added.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Header row: eyebrow + H2 left; "See all work" text link (16px weight 600, ink, underline) right. 48px below. No arrow.
- Three equal columns, gap 32px. Each card is one `<a>`: `Placeholder` ratio 4/3 ("[Homepage screenshot]"), mono meta row (category left, platform right), project name 20px weight 700, one-line result 15px `body`; gap 16px.

## Tablet (640–1023px)
- Two columns; third card wraps below left.

## Mobile (below 640px)
- **Horizontal swipe row**: cards 82% of screen width, scroll-snap (`snap-x snap-mandatory`, each card `snap-start`), gap 16px, the next card peeks in. No arrow buttons — swiping only. Hide the scrollbar visually but keep it usable.
- "See all work" link moves below the row.

## Done when
- On phone the row swipes and snaps; no page-level sideways scroll.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
