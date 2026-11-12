# Foundation 3 — Header (all pages)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the `<header>` element at the top.

## Files
- `components/layout/Header.tsx`
- `components/layout/MobileMenu.tsx` (client component)
- `app/layout.tsx` (only to render `<Header />` above `{children}`)

## What it does
Logo left, five nav links, one "Book a call" button. **Sticky** at the top on every page and every screen size.

## Content
- Logo: an 18×18px square (accent fill, 2px ink border) + the word "AdsPeek" (22px, weight 800, tracking −0.02em). Links to `/`. (The final logo will replace this later — keep it in its own `Logo` sub-component.)
- Links: Services → `/shopify-development`, Growth System → `/#system`, Work → `/#work`, Guides → `/guides`, About → `/about`.
- Button: "Book a call" → `/contact`, `forest` variant. **No arrow.**

## Desktop (1024px and wider)
One row: logo · links (gap 28px, 15px weight 500) · button. Height about 80px (padding 18px 0). Bottom border 1px `line`. Background `paper`.

## Tablet (640–1023px)
Logo left, button and a menu button right. Links move into the mobile menu.

## Mobile (below 640px)
Logo left, menu button right (44×44px, three-line icon drawn with inline SVG, `aria-label="Open menu"`). "Book a call" moves **into** the menu as a full-width button at the bottom. Header height 64px.

## Mobile menu
Opens as a full-width panel directly under the header (not a slide-in, no animation), background `paper`, each link 56px tall with a 1px `line` divider, 18px weight 600. Close button `aria-label="Close menu"`. Closes on link click and on Escape. Body scroll is locked while open.

## Details
`position: sticky; top: 0; z-index: 50`, background `paper` (solid, not transparent).

## Accessibility
`<nav aria-label="Main">`. Menu button has `aria-expanded` and `aria-controls`.

## Done when
- Header stays at the top while scrolling on phone and desktop.
- At 360px nothing wraps or overlaps.
- Only the three files above changed.
