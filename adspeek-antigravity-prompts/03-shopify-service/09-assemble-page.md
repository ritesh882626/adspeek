# Shopify page · Step 9 — Assemble the page

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Files
- `app/shopify-development/page.tsx`

## Do this
Order: `Overview`, `BuilderSection` (id `build`), `Procedure`, `RelatedWork`, `CtaBand` (heading "Rather talk it through?", primary "Build your package" → `#build`, secondary "WhatsApp us").
Metadata: title "Shopify Development Company — Custom Packages | AdsPeek", description from the overview paragraph, canonical `/shopify-development`. Add `Service` JSON-LD (serviceType "Shopify development", provider AdsPeek, areaServed India and worldwide).

## Done when
- Builder works end to end: select, review summary, send, see confirmation, edit again.
- Only `page.tsx` changed.
