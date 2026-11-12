# Home · Step 10 — Assemble the homepage

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Files
- `app/page.tsx`

## Do this
Render in this order: `Hero`, `TrustStrip`, `Comparison`, `ServicesList`, `GrowthSystem`, `SelectedWork`, `ProcessTimeline`, `WaysToWork`, `Faq`, then `CtaBand` with:
- heading "Tell us about your brand." + line break + "We'll map the system."
- primary "Book a free strategy call" → `/contact`
- secondary "WhatsApp us" → `#whatsapp`
- `id="book"`

Add page metadata: title "AdsPeek — Shopify Development & Growth Studio, Gurugram", a 150–160 character description written from the hero paragraph, canonical `/`.

## Done when
- The page reads top to bottom exactly like `design-reference/index.html` (minus arrows).
- Only `app/page.tsx` changed.
