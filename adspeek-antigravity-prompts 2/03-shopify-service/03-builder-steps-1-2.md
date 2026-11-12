# Shopify page · Section 2a — Builder steps 01 and 02

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/shopify-development.html` → `<section id="build">`, the fieldsets "01 What are we building?" and "02 How big is your catalogue?".

## Files
- `components/shopify/builder/BuilderSection.tsx` (section shell + two-column layout; summary slot left empty for now)
- `components/shopify/builder/StepHeader.tsx`
- `components/shopify/builder/OptionCard.tsx`
- `components/shopify/builder/OptionChip.tsx`
- `components/shopify/builder/StepPlatform.tsx`
- `components/shopify/builder/StepCatalogue.tsx`

## What this section does
Starts the build-your-package form: choose what is being built, then catalogue size.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Mono eyebrow "Build your package · 6 steps · about 2 minutes", H2 "Tell us what your store needs.", 56px below.
- `BuilderSection`: two columns — form (flex 1, min 600px) and an empty `aside` slot (340px) for the summary, gap 48px. Form steps are separated by 64px.
- `StepHeader`: number (mono 14px `muted`) + title 26px weight 700, then a hint line 15px `muted` indented 40px.
- Step 01: four `OptionCard`s in a 4-column grid (min 220px each, gap 12px). Card: padding 20px, min-height 120px, title 18px weight 700 + status text right ("● Selected" / "○" in mono 13px), description 14px `body`. Selected = accent background + 2px ink border; unselected = white + 1px `line-strong` border (add 1px margin so size doesn't jump).
- Step 02: two rows of `OptionChip`s ("Products", "Collections" mono labels above). Chip: padding 12px 18px, min-height 44px, same selected/unselected styles.

## Tablet (640–1023px)
- Summary slot moves **below** the form (full width).
- Step 01 cards: 2 × 2.

## Mobile (below 640px)
- Step 01 cards: one column, min-height 96px.
- Chips wrap onto as many lines as needed, gap 8px.
- Step hint lines not indented.

## Details
- All options are `<button type="button">` with `aria-pressed`. Group each step in `<fieldset>` + `<legend>`.

## Done when
- Tapping options changes the selected style instantly (no transition).
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
