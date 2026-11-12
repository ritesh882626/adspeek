# Home · Section 1 — Hero with engagement spec

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/index.html` → the `<section id="top">` (headline "We build your store. Then the system that sells from it." and the "Engagement spec" box).

## Files
- `components/home/Hero.tsx`

## What this section does
States the positioning in one line and shows the key facts in a spec box, so the visitor understands the offer without scrolling.

## Desktop (1024px and wider)
- Section padding: use the `Section` component with `padTopDesktop`/`padBottomDesktop` **88px top / 80px bottom**, `padTopMobile`/`padBottomMobile` **64px** (all four values are props, so they can be changed per section).
- Two columns, gap 56px, aligned to the bottom: left about 60% (eyebrow, H1, lead paragraph, two buttons), right about 40% (`SpecList` with header "Engagement spec" / "AP-01" and five rows: Platform, Build time, After launch, Best for, Starts from — "Starts from" value is weight 700).
- H1 `display` 76px over three lines; the middle line "Then the system" is wrapped in `Highlight`.
- Lead paragraph max-width 560px, 20px, colour `body`, margin 32px top / 40px bottom.
- Buttons: "Book a free strategy call" (`dark`, → `/contact`) and "How the system works" (`outline`, → `#system`), gap 12px.

## Tablet (640–1023px)
- Stack: text block first, spec box below at full width, gap 48px.
- H1 56px; line breaks kept.

## Mobile (below 640px)
- Padding 48px top / 64px bottom.
- H1 44px, let lines wrap naturally (no forced breaks), highlight still on "Then the system".
- Eyebrow wraps onto two lines if needed.
- Buttons stack full width.
- Spec box full width; rows switch to label-above-value below 380px.

## Details
- Eyebrow text is mono, 13px, colour `muted`.

## Accessibility
- Only one `<h1>` on the page (this one).

## Done when
- Spec box sits under the text on tablet and phone.
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
