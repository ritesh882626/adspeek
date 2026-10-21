# Credit Guard (Efficiency Agent)

Keeps development fast and credit use low. Runs at the **start and end of every task**, and its rules apply to every other agent the whole time.

## Purpose

Most wasted credits come from four things: re-reading the same files, regenerating work that already exists, running commands and checks that aren't needed, and long outputs nobody reads. This agent prevents all four.

---

## At the start of a task

1. Read `state/PROJECT_STATE.md`. This is the only file you read in full.
2. Pick the task:
   - If Ritesh named a task, do that.
   - Otherwise take the first page in the page table whose status isn't `done`, in phase order.
3. Look up the task type in `state/CONTEXT_INDEX.md`. That row is the **reading list**: the exact guide sections allowed for this task.
4. Check what's already cached for this page:
   - `briefs/research/<slug>.md`
   - `briefs/content/<slug>.md`
   - `briefs/references/<page-slug>/*.md`
   - the content file and components listed in `PROJECT_STATE.md`
5. Check `state/BUSINESS_FACTS.md` only for the fields this page needs (find them by heading).
6. Hand over to the next agent with: task, page slug, reading list, cached files to reuse.

---

## Rules for every agent

### Reading

| Do | Don't |
| --- | --- |
| Open guide sections by searching for the section heading and reading that section only | Read whole guide files |
| Read a file once per session; keep what you need in your working notes | Re-open a file you already read this session (unless it changed) |
| Use cached briefs and research notes | Re-research or re-analyse something that has a brief |
| Analyse each reference image once, into a reference brief | Re-open an image after its brief exists (unless Ritesh replaced it) |
| Use the component registry in `PROJECT_STATE.md` to find components | Read every component file to find out what exists |
| Read only the files you're about to change | Read `node_modules/`, lock files, `.next/`, build output, or the whole repo tree |

### Building

| Do | Don't |
| --- | --- |
| Reuse an existing primitive or section component | Create a near-duplicate component |
| Make targeted edits to the lines that change | Rewrite whole files to change a few lines |
| Build programmatic templates once; then add data files only | Hand-build each city or question page separately |
| Batch same-type pages (e.g. all Phase 1 city data files) in one task | Interleave unrelated work in one task |
| Use tokens and primitives from Phase 0 | Re-derive values from the design guide |
| Install only packages named in the technical guide | Add libraries without Ritesh's approval |

### Running commands

| Do | Don't |
| --- | --- |
| Run type-check, lint, `seo:check` and build **once at the end** of a page task | Run them after every edit |
| Retry a failing command at most **2 times**, each after a real fix | Loop on the same error |
| Read only the error lines of command output | Paste or reread full logs |
| | Start a dev server, open a browser, take screenshots, run Lighthouse or emulate devices |

### Writing output

| Do | Don't |
| --- | --- |
| Keep task reports to ≤ 15 lines | Summarise guides back to Ritesh |
| Write results to files, then reference the path | Echo full file contents in chat |
| Pick the documented default when unsure and log it in Decisions | Offer multiple alternatives unless asked |
| Write `TODO:` for missing facts and continue | Stop the whole task for a missing fact |

---

## When to stop and ask Ritesh

Only for these. Everything else: use the documented default, log the decision, continue.

- A required reference image is missing **and** no section pattern in `responsive-guide.md` section 4 fits.
- A command still fails after 2 fixes.
- The task needs a package, service or account not in the technical guide.
- Ritesh's instruction conflicts with a guide on something that can't be undone (deleting pages, changing URLs that are live).

---

## At the end of a task

Update `state/PROJECT_STATE.md` with targeted edits:

1. Page table: set the page's status and fill the stage columns.
2. Component registry: add new components (name, path, one-line purpose, key props).
3. Decisions: add any default you chose (one line each).
4. Open TODOs: add missing facts (field + page).
5. Session log: add one entry at the top (date, task, files changed, result, next task). Keep the 5 most recent entries; delete older ones.
6. Set **Next task**.

The next session must be able to continue from `PROJECT_STATE.md` alone.

---

## Report format (to Ritesh)

```
Task: <page or task>
Result: done | partly done | blocked
Files: <changed paths, max 8; "+N more" if longer>
TODOs: <facts needed, or "none">
Next: <next task>
```
