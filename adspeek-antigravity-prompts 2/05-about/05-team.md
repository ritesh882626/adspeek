# About · Section 5 — Team

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/about.html` → section with eyebrow "The team".

## Files
- `components/about/Team.tsx`
- `data/team.ts`

## What this section does
The people who work on client projects.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background. Four columns, gap 32px: square photo placeholder, name 18px weight 700, role 14px `muted`. Data from `team.ts` (first entry: Ritesh Kumar Singh, Founder · Strategy & creative direction; others placeholders).

## Tablet (640–1023px)
- Two columns.

## Mobile (below 640px)
- Two columns, gap 16px, name 16px.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
