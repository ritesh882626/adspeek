# Home · Step 11 — Organization and LocalBusiness schema

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Files
- `components/seo/OrganizationSchema.tsx`
- `app/page.tsx` (only to render it)

## Do this
Output one JSON-LD block with `Organization` + `LocalBusiness` (`ProfessionalService`): name AdsPeek, url [SITE URL], logo [LOGO URL], address Sector 22, Gurugram, Haryana, IN, [PIN], telephone [PHONE], sameAs [social links]. Keep every [placeholder] as a string for now.

## Done when
- Valid JSON (no trailing commas). Only the two files changed.
