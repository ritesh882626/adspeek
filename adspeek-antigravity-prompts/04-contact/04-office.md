# Contact · Section 4 — Office and map

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/contact.html` → section with eyebrow "Visit us".

## Files
- `components/contact/Office.tsx`

## What this section does
Address, hours and map for local trust and local SEO.

## Desktop (1024px and wider)
- Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **96px**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section).
- Left (about 35%): eyebrow, H2 40px "Sector 22, Gurugram", `<dl>` grid (120px label / value) for Address, Hours, Meetings. Right (about 65%): map placeholder 16:9 — later replaced by a lazy-loaded Google Maps `<iframe loading="lazy" title="AdsPeek office on Google Maps">`.

## Tablet (640–1023px)
- Stack, map full width below.

## Mobile (below 640px)
- Stack; `<dl>` label above value. Map ratio 4:3.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
