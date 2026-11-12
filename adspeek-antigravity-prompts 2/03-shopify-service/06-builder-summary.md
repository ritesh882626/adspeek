# Shopify page · Section 2d — "Your package" summary panel

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → the `<aside aria-label="Your package">`.

## Files
- `components/shopify/builder/SummaryPanel.tsx`
- `components/shopify/builder/MobileSummaryBar.tsx`
- `components/shopify/builder/BuilderSection.tsx` (only to place these two)

## What this section does
Live list of everything selected, with the "Send my package" button and the sent confirmation.

## Desktop (1024px and wider)
- Panel in the right column, `position: sticky; top: 104px` (below the sticky header). 1px ink border, `paper` bg.
- Header row: "Your package" left, "N items" right (mono 12px uppercase, 1px ink bottom border).
- Five rows (Build, Catalogue, Pages · N, Integrations · N, Automations · N): mono label + value (16px weight 600 for the first two, 15px list text for the rest; "None yet" when empty).
- Footer: "Send my package" (`dark`, full width, 48px, **no arrow**) + note 13px `muted`. When status is "sent": accent box "Package sent." + text, and an "Edit package" outline button. "sending" disables the button and shows "Sending…".

## Tablet (640–1023px)
- Panel sits below the form, not sticky, full width.

## Mobile (below 640px)
- Panel below the form (not sticky).
- **Plus** `MobileSummaryBar`: fixed to the bottom of the screen while the builder section is in view (use IntersectionObserver, no animation): ink background, white text, "N items selected" left and a "Review package" accent button right that jumps to the panel (`#package-summary`). Height 64px, respects `env(safe-area-inset-bottom)`. Hidden on 640px and up.

## Details
- Panel `aria-live="polite"` on the counts. Confirmation uses `role="status"`.

## Done when
- On phone the bottom bar appears only inside the builder section.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
