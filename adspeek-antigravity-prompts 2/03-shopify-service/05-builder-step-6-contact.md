# Shopify page · Section 2c — Builder step 06 (contact details)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → fieldset "06 Where should we send your quote?".

## Files
- `components/shopify/builder/StepContact.tsx`
- `components/shopify/builder/BuilderSection.tsx` (only to add this step and wrap the steps in a `<form>` whose submit calls `submit()`)

## What this section does
Collects name, brand, WhatsApp/email and launch timing.

## Desktop (1024px and wider)
- 2 × 2 grid, gap 16px. Each field: `<label>` 14px weight 600 above the input. Inputs/select: 16px, padding 14px, min-height 48px, 1px `#8A8F86` border, `paper` background, square.
- Fields: Your name (required, autocomplete name), Brand name or website (autocomplete organization), WhatsApp or email (required), When do you want to launch? (select: Choose one / As soon as possible / In 1–2 months / In 3+ months / Just exploring).

## Tablet (640–1023px)
- Same 2 × 2.

## Mobile (below 640px)
- One column. Font size stays 16px (prevents iPhone zoom).

## Details
- Required fields show the browser's own validation message on submit.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
