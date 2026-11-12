# Foundation 4 — Footer (all pages)

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/contact.html` → the `<footer>` element (this is the full footer with the "Shopify by city" column).

## Files
- `components/layout/Footer.tsx`
- `app/layout.tsx` (only to render `<Footer />` below `{children}`)

## Content
Four columns: brand (small accent square + "AdsPeek" + address), Services, Shopify by city, Company. Bottom row: "© 2026 AdsPeek" left, Privacy and Terms right.
Links: Shopify Development → `/shopify-development`; Website Development, App Development, Meta Ads → `#` for now; Gurugram → `/shopify-development/gurugram`; Delhi, Mumbai, Dubai, London → `/shopify-development/[city]` (they will 404 until those city pages exist — that's expected); About → `/about`; Guides → `/guides`; Contact → `/contact`.

## Desktop (1024px and wider)
Background `ink`. Padding 64px top, 32px bottom. Four equal columns, gap 40px, 48px space then a 1px `footer-line` divider, then the bottom row (13px, `footer-muted`). Column titles mono 12px uppercase `footer-muted`; links 15px `footer-text`, no underline, gap 10px.

## Tablet (640–1023px)
Two columns × two rows.

## Mobile (below 640px)
One column, gap 32px. Each link at least 44px tall (padding 10px 0). Bottom row stacks: copyright, then Privacy · Terms.

## Accessibility
Each link column is a `<nav>` with an `aria-label` matching its title.

## Done when
- Readable on dark background; links easy to tap on phone.
- Only the two files above changed.
