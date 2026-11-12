# Foundation 5 — CTA band (used at the bottom of every page)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the lime section with id `book` ("Tell us about your brand.").

## Files
- `components/sections/CtaBand.tsx`

## What it does
Big statement on the lime accent background with two buttons. Each page passes its own heading and button labels.

## Props
`heading` (string, may include a line break), `primary` {label, href}, `secondary` {label, href} (default "WhatsApp us" → `#whatsapp`), `id` (optional).

## Desktop (1024px and wider)
Background `accent`, no bottom border, padding 96px top and bottom (props). Heading left (64px, weight 800, line height 1, tracking −0.035em, max about 60% width), buttons right aligned to the bottom of the heading. Primary = `dark`, secondary = `outline-thick`.

## Tablet (640–1023px)
Heading full width (48px), buttons below in a row, gap 12px.

## Mobile (below 640px)
Heading 36px. Buttons stack full width, gap 12px. Padding 64px top and bottom.

## Done when
- Works with a one-line and a two-line heading.
- Only `CtaBand.tsx` was created.
