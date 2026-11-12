# City page · Section 5 — Package builder band

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development-gurugram.html` → dark green band "Pick your pages, integrations and automations."

## Files
- `components/city/BuilderBand.tsx`

## What this section does
Sends visitors to the package builder.

## Desktop (1024px and wider)
- Background `forest`, padding 72px. Heading 44px white left (max about 65%), accent button "Open the package builder" right → `/shopify-development#build`. No arrow.

## Tablet (640–1023px)
- Stack, button below left-aligned.

## Mobile (below 640px)
- Heading 30px; button full width.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
