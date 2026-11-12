# Foundation 1 — Project setup and design tokens

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Files
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/globals.css`
- `CHANGELOG.md` (create if missing)

## Do this
1. **Fonts** with `next/font/google`:
   - `Schibsted_Grotesk` weights 400, 500, 600, 700, 800 → CSS variable `--font-sans` (all headings and body)
   - `IBM_Plex_Mono` weights 400, 500 → CSS variable `--font-mono` (small labels, numbers, eyebrows)
   Apply both variables on `<html>`; set `font-sans` as the body default.
2. **Colours** in `tailwind.config.ts` → `theme.extend.colors`:
   | Token | Hex | Use |
   |---|---|---|
   | `ink` | #111410 | main text, dark buttons, borders that should read strong |
   | `paper` | #FAFAF7 | page background |
   | `white` | #FFFFFF | alternate section background, cards |
   | `forest` | #0F3D2E | header button, Growth System band, dark bands |
   | `accent` | #C8F03C | lime highlight, selected states, CTA band |
   | `line` | #D9DBD3 | thin dividers |
   | `line-strong` | #C9CCC3 | unselected option borders |
   | `muted` | #5B6159 | secondary text and labels |
   | `body` | #3A3F38 | paragraph text |
   | `placeholder` | #E7E9E1 | image placeholders |
   | `forest-line` | #3C6A5A | dividers on forest |
   | `forest-muted` | #B9CEC4 | labels on forest |
   | `forest-text` | #D3E0D9 | paragraphs on forest |
   | `footer-text` | #D3D6CE, `footer-muted` #9CA196, `footer-line` #33372F | footer only |
3. **Radius:** set `borderRadius.DEFAULT` and all sizes to `0`. Nothing on the site is rounded.
4. **Container:** max width 1280px, centred, horizontal padding 32px on desktop and tablet, 20px on mobile.
5. **Type scale** (add as `fontSize` tokens, mobile → desktop):
   | Token | Mobile | Tablet | Desktop | Line height / tracking |
   |---|---|---|---|---|
   | `display` (page H1) | 42px (line height 1.02) | 56px | 72–76px | 0.98 / −0.035em, weight 800 |
   | `h2` | 32px (line height 1.08) | 40px | 48px | 1.04 / −0.03em, weight 800 |
   | `h3` | 22px | 24px | 26px | 1.2 / −0.02em, weight 700 |
   | `lead` | 17px | 18px | 20px | 1.5 |
   | `body` | 15px | 16px | 16–17px | 1.55 |
   | `label` (mono) | 12px | 12px | 12–13px | uppercase, +0.06em tracking |
6. `globals.css`: `body` background `paper`, colour `ink`; `a` colour `forest`, hover `ink`; no `scroll-behavior: smooth`; `*` box-sizing border-box; `img` max-width 100%.
7. `app/layout.tsx`: `<html lang="en">`, default metadata title "AdsPeek — Shopify Development & Growth Studio, Gurugram". Render `{children}` only — header and footer are added in Foundation 3 and 4.

## Done when
- `npm run build` passes.
- Only the four files above changed.
