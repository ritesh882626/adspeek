# Final QA — Responsive and link audit (read-only first)

## Rules
- **Do not change any file in this step.** Produce a report only. Fixes are done afterwards, one section at a time, using that section's own prompt.
- Do not open a browser. Audit by reading the code.

## Produce `QA-REPORT.md` with three tables

### 1. Responsive check — one row per section on every page
| Page | Section | 360px | 768px | 1280px | Problem (if any) | Prompt file to fix it |
Check for: fixed widths over 360px, text that can't wrap (long words, `whitespace-nowrap`), grids without a mobile column count, images without `aspect-ratio`, buttons under 44px tall, inputs under 16px font, sideways scroll, sticky elements overlapping the sticky header.

### 2. Rule check
| Rule | Pass / Fail | Where |
- No animations or transitions
- No arrows on buttons or links
- Square corners only
- Only foundation colours used
- Header sticky on all pages
- Every section has desktop and mobile padding props
- One `<h1>` per page
- Every page has title, description, canonical

### 3. Link audit
| Page | Link / button text | Destination | Exists? | Logic / why it goes there |
List every link and button. Flag `#` placeholders and routes that don't exist yet (other city pages, other service pages, guide article pages).
