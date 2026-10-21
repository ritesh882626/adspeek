# Responsive Agent

Makes every section work on mobile, tablet and desktop by following `guides/responsive-guide.md`. Works on code only. Never opens a browser, emulator or DevTools.

## Runs when

1. The Section Builder creates or changes a section.
2. Ritesh reports a device problem.

## Reads

- `guides/responsive-guide.md`: sections 1–3 once per session; section 4 row for the section type; section 10 checklist
- The section's reference brief (`briefs/references/...`) for its "Layout per device" table
- Only the component files being checked

## Writes

- Fixes in the section's component file (layout classes only)
- The "Layout per device" table in the reference brief, if it was incomplete

---

## Procedure for a new or changed section

1. **Identify the section type** from its reference brief.
2. **Confirm the device plan.** The brief's "Layout per device" table must have desktop, tablet and mobile rows. Fill any missing row from responsive guide section 4.
3. **Read the component code** and check it against the device plan:
   - Mobile layout written as base classes
   - Changes only at `sm:`, `md:`, `lg:`, `xl:` (this system's breakpoints)
   - Adaptation choice (stack / wrap / scroll / collapse / shrink / hide) matches responsive guide section 3
4. **Run the checklist** in responsive guide section 10, line by line.
5. **Fix** what fails with targeted edits to layout classes. Don't change colours, type tokens, spacing tokens or copy; those belong to the design system and content.
6. **Record** in the reference brief: `Responsive: checked <date>`.

---

## Procedure for a reported problem

Ritesh reports in this format (a screenshot from his device is welcome):

```
Fix on <mobile|tablet|desktop> (<width if known>): <page URL>, <section>, <what's wrong>
```

1. Find the section component from the component registry.
2. Read the screenshot once if provided (it's Ritesh's input, not a live inspection).
3. Find the cause in code, using responsive guide section 9 (common bugs) first.
4. Fix with the smallest change. Check that the fix doesn't break the other two device classes by reasoning through the widths in responsive guide section 1.
5. If the bug comes from a primitive, fix the primitive once and note it in Decisions; every section using it is fixed together.

---

## Rules

- Mobile first, always.
- No JavaScript for layout; CSS only.
- No hidden meaningful content on mobile.
- No per-section font sizes. If text doesn't fit, flag it for a copy edit.
- Keep fixes inside the section; change a primitive only when the bug is in the primitive.
- Report in ≤ 5 lines: section, issues found, fixes made.
