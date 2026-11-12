# Contact · Section 2 — Three ways to reach us

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/contact.html` → second `<section>` (Book a call / WhatsApp / Email).

## Files
- `components/contact/ContactWays.tsx`

## What this section does
Three direct routes; WhatsApp is the fastest.

## Desktop (1024px and wider)
- Padding 64px. One 1px ink white box, three equal columns with 1px `line` dividers. Each: mono number, H3 26px, description 15px, the contact value 17px weight 600, then a text link at the bottom (16px weight 600, underline, **no arrow**): "Pick a time" / "Open WhatsApp" (`https://wa.me/[NUMBER]`) / "Send an email" (`mailto:`).

## Tablet (640–1023px)
- Three columns kept, padding 20px, H3 22px.

## Mobile (below 640px)
- Stack, **WhatsApp first**, then Book a call, then Email. 1px `line` between. Whole block tappable via the link (min 44px).

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
