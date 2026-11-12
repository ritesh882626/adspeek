# Home · Section 2 — At-a-glance strip

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the section with `aria-label="At a glance"` (four cells: [XX] Stores launched, [X]+ yrs, [X] countries, Built with …).

## Files
- `components/home/TrustStrip.tsx`

## What this section does
Quick proof row under the hero. Numbers are placeholders until real figures are added.

## Desktop (1024px and wider)
- White background, bottom border, no vertical padding on the section itself — each cell has 28px top/bottom padding.
- Four equal columns separated by 1px `line` vertical dividers. Number 40px weight 800 tracking −0.03em; label 15px `muted` below, 6px gap.
- Fourth cell: mono label "Built with" then "Shopify · Meta · Google · Next.js · WhatsApp API" at 17px weight 600.

## Tablet (640–1023px)
- Two columns × two rows; dividers between columns and a 1px `line` between rows.

## Mobile (below 640px)
- Two columns × two rows for the three number cells + the "Built with" cell spanning full width underneath.
- Number 32px. Cell padding 20px. Remove the right divider on the last cell of each row.

## Done when
- Dividers never double up at row ends.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
