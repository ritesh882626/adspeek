# Contact · Section 3 — Brief form + what happens next

## Rules for this prompt
- Build **only** what this prompt describes. Create or edit **only** the files listed under "Files". Do not reformat, rename or "improve" any other file.
- Copy every word of text exactly from the reference file. Text in [square brackets] is a placeholder — keep it as it is.
- No animations, transitions, hover-zoom, parallax or scroll effects. Hover may change colour only.
- No arrow characters or arrow icons on buttons or links.
- Use only the design tokens and shared components from `01-foundation`. No new colours, fonts, shadows, gradients or rounded corners (all corners are square, radius 0).
- Do not open a browser or inspect the page live. Make it responsive by following the desktop / tablet / mobile rules below exactly.
- When done, add one line to `CHANGELOG.md`: date, prompt file name, files touched.

## Reference
`design-reference/contact.html` → section with eyebrow "Or write to us".

## Files
- `components/contact/BriefForm.tsx` (client)
- `components/contact/NextSteps.tsx`

## What this section does
Short brief form, posting to the same endpoint as the package builder.

## Desktop (1024px and wider)
- Section padding: use the `Section` component — top/bottom **96px** desktop, **72px** tablet, **56px** phone (all values are props, so they can be changed per section). White background.
- Two columns, gap 56px: form (about 65%) and "What happens next" (about 35%, 3-step `<ol>` with 2px ink top rule, mono numbers).
- Form grid 2 columns, gap 16px: name, brand, WhatsApp (`type=tel`), email (`type=email`), "What do you need?" select, "Budget range" select ([RANGE] placeholders), message textarea (5 rows, full width). Submit "Send message" (dark, no arrow) + reply-time note.
- Posts JSON to `NEXT_PUBLIC_QUOTE_ENDPOINT` with `source: "contact"`. Show an accent "Message sent." status box on success; an error line in ink with a WhatsApp link on failure.

## Tablet (640–1023px)
- Form full width; "What happens next" below it.

## Mobile (below 640px)
- Form one column, button full width; inputs 16px font.

## Done when
- Nothing overflows sideways at 360px, 390px, 768px, 1024px, 1280px and 1440px widths.
- All text matches the reference file word for word.
- Only the files listed above were changed.
