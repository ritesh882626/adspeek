# Home · Section 8 — Ways to work with us

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the section with eyebrow "06 — Ways to work with us".

## Files
- `components/home/WaysToWork.tsx`

## What this section does
Three ways to start (Store build, Store + Growth, Growth only) with placeholder prices. Teaches that packages are flexible.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Eyebrow, H2 "Pick where to start.", 48px below.
- One 1px ink box split into three equal columns (1px `line` dividers). Each column padding 32px, gap 16px: mono label, H3, price 32px weight 800, description 15px `body`.
- Middle column ("Store + Growth", label "Most chosen" in `forest`) has white background and a 6px accent bar along its top edge (a full-width block, not a border on one side of a card).

## Tablet (640–1023px)
- Same three columns, padding 24px, price 26px.

## Mobile (below 640px)
- Stack the three; put "Store + Growth" **first**. 1px `line` between them. Price 28px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
