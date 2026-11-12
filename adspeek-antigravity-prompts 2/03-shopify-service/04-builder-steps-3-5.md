# Shopify page · Section 2b — Builder steps 03, 04 and 05

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → fieldsets "03 Which pages do you need?", "04 Integrations", "05 Automations".

## Files
- `components/shopify/builder/OptionRow.tsx`
- `components/shopify/builder/StepPages.tsx`
- `components/shopify/builder/StepIntegrations.tsx`
- `components/shopify/builder/StepAutomations.tsx`
- `components/shopify/builder/BuilderSection.tsx` (only to add these three steps after step 02)

## What this section does
Lets the visitor add pages, integrations and automations. The first four pages are always included.

## Desktop (1024px and wider)
- `OptionRow`: flex row, label (15px weight 600) + optional description (13px `muted`) on the left, status on the right (mono 12px: "Included" / "✓ Added" / "+ Add" for pages; "✓" / "+" for the others). Padding 14px 16px, min-height 52px. Selected = accent + 2px ink border; unselected = white + 1px `line-strong`; included = `#EDEFE7` background + 1px ink border, `disabled`, default cursor.
- Pages: grid, columns min 200px (4 per row at 1280px), gap 8px.
- Integrations and Automations: grid, columns min 260px (3 per row), gap 8px.

## Tablet (640–1023px)
- Pages 3 per row, Integrations/Automations 2 per row.

## Mobile (below 640px)
- Pages **2 per row** (labels may wrap to 2 lines), Integrations/Automations 1 per row.

## Details
- Rows are `<button type="button" aria-pressed>`; included pages also `aria-disabled="true"`.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
