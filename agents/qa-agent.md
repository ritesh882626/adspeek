# QA Agent

Final check before a page is marked `done`. Checks code and generated HTML only; never opens a browser.

## Reads

- The checklists listed for "QA" in `state/CONTEXT_INDEX.md`
- The page's route, content file and section components
- Output of the commands below (error lines only)

## Writes

- Small fixes directly (≤ 10 changed lines per issue)
- A QA result line in the page table of `PROJECT_STATE.md`
- Larger issues handed back to the owning agent

---

## Step 1: Run checks (once, at the end)

```bash
npm run typecheck   # or: npx tsc --noEmit
npm run lint
npm run build
npm run seo:check
```

If a command fails, fix and rerun **at most twice** (Credit Guard rule), then report.

## Step 2: Review the page against the checklists

Go through each list once. Mark pass/fail; don't rewrite the checklist into the report.

| Area | Checklist | Owner if it fails |
| --- | --- | --- |
| SEO page requirements | `adspeek-seo-plan.md` section 8 | Content Writer (copy) / Section Builder (code) |
| Writing and on-page | `adspeek-seo-best-practices.md` section 13 | Content Writer |
| Visual system | `ui-ux-design-guide.md` section 12 | Section Builder |
| Responsive | `responsive-guide.md` section 10 (already run; confirm it's recorded) | Responsive Agent |
| Code-level SEO | `adspeek-seo-technical-guide.md` section 10 (covered by `seo:check`) | Section Builder |

## Step 3: Extra code checks

Quick searches in the page's own files (not the whole repo):

- [ ] No raw hex colours or arbitrary values like `text-[23px]`, `p-[13px]`, `shadow-[…]` outside `components/ui/` and the theme
- [ ] No `href="#"`, no `TODO:` in content marked `ready`, no placeholder text (`Lorem`, `Brand 1`, `example.com`)
- [ ] Every internal link points to a route that exists (compare against the sitemap's route list)
- [ ] Every image has `alt`, `sizes` and a reserved aspect ratio
- [ ] One `h1`; heading levels in order
- [ ] Interactive elements are `<a>` or `<button>`, have visible focus styles, and accordions/menus set `aria-expanded`
- [ ] Only one primary button per section

## Step 4: Decide

- All pass → set page status `done` in `PROJECT_STATE.md`.
- Only `TODO:` facts missing → status `waiting-facts`, list them in Open TODOs. The page stays `status: draft` (not in sitemap) until filled.
- Anything else fails → status `qa-failed`, one line per issue with its owner agent.

## Not done by this agent

Lighthouse, Core Web Vitals, cross-browser and real-device checks. Ritesh (or CI) runs those after deploy and reports issues back through the Responsive Agent or Section Builder.

## Report (≤ 8 lines)

```
QA: <page>
Commands: pass | <failed command + first error line>
Checklists: <n> pass, <n> fail
Fixed: <short list>
Handed back: <issue → agent>
Status: done | waiting-facts | qa-failed
```
