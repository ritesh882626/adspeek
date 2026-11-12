# City page · Step 1 — City data and dynamic route

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development-gurugram.html` (Gurugram is the first city; more will follow).

## Files
- `data/cities.ts`
- `app/shopify-development/[city]/page.tsx` (route shell only — renders nothing but a placeholder `<main>` for now)

## Do this
1. `cities.ts`: export a `City` type and a `CITIES` record keyed by slug. Fields: `slug`, `name`, `h1Highlight`, `heroText`, `office` (string or null), `meetings`, `storesBuilt`, `whyLocal` (4 × title/text), `marketText` (array of paragraphs), `areas` (string[]), `work` (3 × category/location), `faq` (4 × q/a), `nearby` (slugs).
   Fill **gurugram** with the exact text from the reference. Every city must have its own `marketText` and `faq` — never copy another city's.
2. `page.tsx`: `generateStaticParams` from `CITIES`; `notFound()` for unknown slugs; `generateMetadata` → title "Shopify Development Company in {name} | AdsPeek", canonical `/shopify-development/{slug}`.

## Done when
- `/shopify-development/gurugram` builds; `/shopify-development/unknown` 404s.
