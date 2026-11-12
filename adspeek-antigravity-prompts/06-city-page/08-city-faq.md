# City page · Section 7 — City FAQ + other cities

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development-gurugram.html` → sections with eyebrow "Questions" and "Other cities".

## Files
- `components/city/CityFaq.tsx`
- `components/city/OtherCities.tsx`

## What this section does
Local questions (with FAQPage JSON-LD) and links to other city pages for internal linking.

## Desktop (1024px and wider)
- FAQ: same layout as Home FAQ (heading left 30%, list right 70%), white background, Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **96px**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section).
- Other cities: padding 64px, eyebrow, then a wrapping row of outlined link buttons "Shopify development in {city}" (1px ink border, 12px 16px padding, 15px weight 600, min-height 44px). Only list cities in `nearby`. No arrows.

## Tablet (640–1023px)
- FAQ heading on top.

## Mobile (below 640px)
- FAQ question above answer. City links full width, stacked, gap 8px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
