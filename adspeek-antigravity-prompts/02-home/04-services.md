# Home · Section 4 — Services list

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → `<section id="services">` ("Four things we do. All of them connect.").

## Files
- `components/home/ServicesList.tsx`

## What this section does
Lists the four services as full-width rows (not cards), each linking to its service page.

## Desktop (1024px and wider)
- Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **96px**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section). White background.
- Eyebrow "02 — Services", H2 with 48px below.
- 2px ink top rule, then four rows. Each row is one `<a>` with three columns (gap 24px): [code S1 in mono `muted` + service name 30px weight 700] / description 16px `body` / "For" label (mono 12px) above the audience line 15px `muted`. Row padding 32px 0, 1px `line` below.
- Links: Shopify Development → `/shopify-development`; the other three → `#` for now.
- Hover: service name colour changes to `forest`. No arrow.

## Tablet (640–1023px)
- Two columns: name on the left, description + "For" stacked on the right.

## Mobile (below 640px)
- One column per row: code + name (24px), description, then "For" line. Row padding 24px 0.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
