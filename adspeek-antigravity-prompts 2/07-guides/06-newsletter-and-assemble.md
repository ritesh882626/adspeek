# Guides · Step 6 — Newsletter section and page assembly

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/guides.html` → section with eyebrow "Newsletter", then the CTA band.

## Files
- `components/guides/Newsletter.tsx` (client)
- `app/guides/page.tsx`

## Newsletter section
- Desktop: padding 96px; heading 40px left ("One useful guide a month. Nothing else."), form right: email field (label "Email" above, 16px, 48px tall) + dark "Subscribe" button side by side. Posts to `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`; shows "You're subscribed." on success.
- Tablet: stack, form full width.
- Mobile: input and button stacked, both full width.

## Page order
`GuidesHero`, `CategoryBar`, `FeaturedGuide` (hidden when a search or category filter is active), `GuideGrid`, `Newsletter`, `CtaBand` (heading "Read enough? Let's build it.", primary "Build your package" → `/shopify-development`).
Metadata: title "Shopify & D2C Growth Guides | AdsPeek", canonical `/guides` (filtered URLs set canonical back to `/guides`).

## Done when
- Search and category filters work together.
- Only the two files changed.
