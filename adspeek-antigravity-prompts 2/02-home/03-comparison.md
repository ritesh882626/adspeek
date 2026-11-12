# Home · Section 3 — Typical agency vs AdsPeek

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the section with eyebrow "01 — The difference".

## Files
- `components/home/Comparison.tsx`

## What this section does
Shows, row by row, where a typical agency stops and AdsPeek keeps going. This is the core positioning.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section).
- Top: eyebrow + H2 ("A store is the start, not the deliverable.") left, short paragraph right (max 420px), aligned to the bottom, gap 24px, 48px below.
- Table in a 1px ink box: header row on ink background (mono 12px uppercase white) with three columns: empty / "Typical agency" / "AdsPeek" (AdsPeek header cell on `accent` with ink text).
- Five rows (Scope ends at, Ads, Follow-up & retention, Tracking, When something breaks). Columns 220px / 1fr / 1fr. Cell padding 20px, 1px `line` between rows and columns. First column weight 600; middle column `muted`; AdsPeek column weight 500.
- Build it as a real `<table>` with `<th scope="col">` and `<th scope="row">`.

## Tablet (640–1023px)
- Same table, first column 180px.

## Mobile (below 640px)
- **Do not** use a sideways-scrolling table. Instead show **five stacked cards**, one per row: the row title as a bold line, then two lines — "Typical agency: …" in `muted` and "AdsPeek: …" with a 4px accent left marker block (a small square, not a coloured border line) — each card separated by 1px `line`.
- Keep the semantic `<table>` for 640px and up; render the card list only below 640px (hide the other with Tailwind classes).

## Done when
- Phone shows the stacked cards, tablet/desktop show the table.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
