# City page · Section 1 — Hero with local spec box

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development-gurugram.html` → first `<section>`.

## Files
- `components/city/CityHero.tsx`

## What this section does
Ranks for "Shopify development company in {city}" and shows local facts.

## Desktop (1024px and wider)
- Breadcrumb Home / Shopify Development / {city} (+ BreadcrumbList JSON-LD). Two columns aligned bottom: left H1 72px "Shopify development company in" + city name in `Highlight`, paragraph, two buttons ("Build your package" → `/shopify-development`, "Visit our office" → `/contact`; outline). Right: `SpecList` header "AdsPeek · {city}" with rows Office, Meetings, Stores built, Quote.

## Tablet (640–1023px)
- Stack, spec box below full width.

## Mobile (below 640px)
- H1 40px (long city names must wrap, never overflow). Buttons full width. Spec rows label above value under 380px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
