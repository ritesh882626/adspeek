# Shopify page · Section 3 — After you send it (procedure)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → `<section id="process">` ("From package to live store.").

## Files
- `components/shopify/Procedure.tsx`

## What this section does
Five steps, each saying what the client gets and what they need to give.

## Desktop (1024px and wider)
- Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **96px**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section).
- `<ol>` with 2px ink top rule. Each step is a 3-column row: [number + title 22px] / "You get" (mono label above 15px text) / "You give" or "You choose". Padding 28px 0, 1px `line` below.

## Tablet (640–1023px)
- Two columns: number + title left; "You get" and "You give" stacked right.

## Mobile (below 640px)
- One column: number + title, then "You get", then "You give", gap 12px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
