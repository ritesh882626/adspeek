# Shopify page · Step 2 — Package builder: data and state (no UI yet)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → the `<script>` at the bottom. It contains every option list (`platformDefs`, product and collection ranges, `pageDefs`, `intDefs`, `autoDefs`) and the default selections. Copy the labels and descriptions exactly.

## Files
- `components/shopify/builder/options.ts`
- `components/shopify/builder/useBuilder.ts`

## Do this
1. `options.ts` — export typed arrays:
   - `PLATFORMS` (4: id, label, desc)
   - `PRODUCT_RANGES` ["Up to 25","26–100","101–500","500+"], `COLLECTION_RANGES` ["1–5","6–15","16–40","40+"]
   - `PAGES` (16: id, label, `included` true for Homepage, Collection page, Product page, Cart & checkout)
   - `INTEGRATIONS` (12: id, label, desc)
   - `AUTOMATIONS` (9: id, label, desc)
2. `useBuilder.ts` — a client hook holding: `platform` (default "new"), `products` ("26–100"), `collections` ("6–15"), `pages` (Set, default about + contact), `integrations` (default payments, shipping, pixel), `automations` (default cart, orders), contact fields `name`, `brand`, `contact`, `timeline`, and `status` ("idle" | "sending" | "sent" | "error").
   Expose: setters, `toggle(group, id)` (ignores `included` pages), derived `summary` (labels of every selected item, counts, `itemCount` = 2 + pages + integrations + automations), and `submit()`.
3. `submit()` posts JSON to `process.env.NEXT_PUBLIC_QUOTE_ENDPOINT` (your Google Apps Script web-app URL). If the variable is missing, log the payload to the console and still set status "sent" so the page can be tested. Any selection change after "sent" sets status back to "idle".

## Done when
- No UI files touched. Types compile. Only the two files exist.
