# Home · Section 5 — Growth System (four parts, one loop)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → `<section id="system">` (dark green band).

## Files
- `components/home/GrowthSystem.tsx`

## What this section does
Explains the differentiator visually: Store → Ads → Automation → Tracking, and back to Store.

## Desktop (1024px and wider)
- Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **96px**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section). Background `forest`, white text, no bottom border.
- Top: eyebrow (`onDark`) "03 — The Growth System" + H2 "Four parts, one loop." left; paragraph right in `forest-text`, max 440px; 56px below.
- Four equal columns inside a 1px `forest-line` box, separated by 1px `forest-line`. Each column padding 28px: top row has the number (01–04) in mono 13px **accent** colour on the left and a small mono marker on the right (columns 1–3 show a plain right-pointing chevron drawn as text "›" in `forest-muted`; column 4 shows "back to 01"). 40px gap, then H3 26px, then a 3-item list (15px, `forest-text`, gap 10px, no bullets).
- Note: the "›" here is a diagram marker inside the content, **not** on a button or link, so it is allowed.

## Tablet (640–1023px)
- Two columns × two rows. The column-4 marker reads "back to 01".

## Mobile (below 640px)
- One column, four stacked blocks. Between blocks show a centred mono "↓" in `forest-muted` (diagram marker). After block 4, a small line "back to 01 — the loop repeats" in mono 12px.
- Column padding 24px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
