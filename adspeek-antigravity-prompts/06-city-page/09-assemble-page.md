# City page · Step 9 — Assemble

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Files
- `app/shopify-development/[city]/page.tsx`

## Do this
Order: `CityHero`, `WhyLocal`, `MarketContent`, `Areas`, `BuilderBand`, `NearbyWork`, `CityFaq`, `OtherCities`, `CtaBand` (heading "Building a store in {city}?", primary "Build your package" → `/shopify-development`). All text from `CITIES[slug]`.
Add `LocalBusiness` JSON-LD **only** when the city has an `office` (Gurugram does); other cities get `Service` JSON-LD with `areaServed` = the city.

## Done when
- Changing a city's data changes the page without touching components.
- Only `page.tsx` changed.
