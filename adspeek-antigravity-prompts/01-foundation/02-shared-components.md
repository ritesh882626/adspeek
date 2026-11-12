# Foundation 2 — Shared components

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Files
- `components/ui/Container.tsx`
- `components/ui/Section.tsx`
- `components/ui/Eyebrow.tsx`
- `components/ui/Heading.tsx`
- `components/ui/Button.tsx`
- `components/ui/Placeholder.tsx`
- `components/ui/Highlight.tsx`
- `components/ui/SpecList.tsx`

## Build these
1. **Container** — max-width 1280px, centred, padding-x 20px mobile / 32px from 640px up.
2. **Section** — `<section>` with props: `id`, `bg` (`paper` | `white` | `forest` | `accent` | `ink`), `border` (bottom 1px `line`, default true), `padTopDesktop` (default 96), `padBottomDesktop` (96), `padTopMobile` (64), `padBottomMobile` (64). Mobile values apply below 1024px, desktop values from 1024px. Wraps children in `Container`.
3. **Eyebrow** — mono, 13px desktop / 12px mobile, uppercase, tracking 0.06em, colour `muted` (prop `tone="onDark"` → `forest-muted`), margin-bottom 16px. Renders a `<p>`.
4. **Heading** — `level` 1 | 2 | 3 using the type scale tokens. `<br>` from the reference is kept on desktop only: render line breaks as `<span className="hidden lg:inline"><br/></span>` so lines flow naturally on mobile.
5. **Button** — renders `<a>` (Next `Link`). Variants:
   - `dark`: ink background, white text
   - `outline`: 1px ink border, ink text, transparent
   - `outline-thick`: 2px ink border
   - `forest`: forest background, white text (header only)
   - `accent`: accent background, ink text
   Sizes: padding 16px 24px, font 16px weight 600, **min-height 44px**, inline-flex centred. On mobile below 640px buttons inside a button row become **full width**. Hover: background or border colour change only. No arrows.
6. **Placeholder** — grey box (`placeholder` bg, 1px `line` border) with a centred mono uppercase 12px label in `muted`. Prop `ratio` (e.g. `4/3`, `16/9`, `1/1`, `4/5`, `16/10`) via `aspect-ratio`. This is where real images go later — accept an optional `src` + `alt` and render `next/image` with `object-cover` when given.
7. **Highlight** — inline span with accent background and 0 10px padding, `box-decoration-break: clone` so it wraps cleanly over two lines.
8. **SpecList** — a bordered box (1px ink, white bg) with an optional header row (mono label left, mono code right, 1px ink bottom border) and rows of `label` / `value`. Rows: 2 columns (label 110–130px, value fills), 1px `line` between rows, padding 16px 20px. Below 380px the label sits **above** the value (single column).

## Done when
- Each component has typed props and no page-specific text inside it.
- Only the files above were created.
