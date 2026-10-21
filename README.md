# AdsPeek Build System: How to Use It

For Ritesh. Antigravity follows `AGENTS.md`; this page is how you drive it, step by step.

---

## Step 1: Fill in the facts (once, 30–60 minutes)

Open `state/BUSINESS_FACTS.md` and fill in what you can: domain, contact details, pricing ranges, timelines, case studies, your author bio.

Anything you leave blank becomes a `TODO:` on the page instead of a made-up claim. You can fill it later.

## Step 2: Add reference images

Save screenshots of pages or sections you like into `references/`:

```
references/
├── _global/                  ← header and footer
│   ├── 01-header-desktop.png
│   └── 02-footer-desktop.png
├── home/
│   ├── 01-hero-desktop.png
│   ├── 01-hero-mobile.png    ← optional; add when mobile layout matters
│   ├── 02-logos-desktop.png
│   └── 03-services-desktop.png
└── custom-shopify-store-development/
    └── ...
```

Naming: `<number>-<section-name>-<desktop|tablet|mobile>.png`. The number sets the section order on the page.

Remember: images give **structure only**. Antigravity always uses the Shopify-style fonts, colours, buttons and spacing from the design guide, whatever the image looks like.

No images for a page? Antigravity uses the standard template from the SEO plan.

## Step 3: Run Phase 0 (once)

Tell Antigravity:

> Read AGENTS.md and run Phase 0.

This sets up the project, design tokens, reusable components, header and footer, and the SEO checks. Every page after this reuses them, which is where most of the time and credit saving comes from.

## Step 4: Build pages one at a time

> Build next page.

Antigravity picks the next page from `state/PROJECT_STATE.md`, researches top-ranking pages, writes the copy, builds the sections from your images, makes them responsive and runs QA. It stops after one page and reports in a few lines.

Other commands:

| Say | What happens |
| --- | --- |
| `Build page /services/shopify-store-design/` | Builds that page |
| `Write content for /questions/shopify-store-cost-india/` | Copy only |
| `Build section from references/home/04-process-desktop.png` | One section |
| `Fix on mobile (390px): /locations/india/gurugram/, hero, buttons overflow` | Responsive fix (attach a phone screenshot if you have one) |
| `QA /services/shopify-migration/` | Checks only |
| `Status` | Short progress summary |

## Step 5: Your checks after each deploy

Antigravity doesn't open a browser to check the site, by design. After you deploy, you check:

1. The page on your phone, a tablet (or browser resized to ~800px) and desktop.
2. Lighthouse (Chrome DevTools or PageSpeed Insights) on mobile: Performance ≥ 90, SEO = 100, Accessibility ≥ 95.
3. Report problems with the "Fix on…" command above.

## Step 6: Moving to the next phase

Each phase in the SEO plan has a gate (for example: "all Phase 1 pages indexed in Search Console"). When a gate is met, tell Antigravity:

> Phase 1 gate met. Start Phase 2.

---

## What's in the folder

| File | What it is |
| --- | --- |
| `AGENTS.md` | Antigravity's master instructions |
| `agents/efficiency-agent.md` | Credit Guard: keeps reading and rework to a minimum |
| `agents/content-writer-agent.md` | Researches top pages, writes original SEO copy |
| `agents/section-builder-agent.md` | Turns your images into components using the design system |
| `agents/responsive-agent.md` | Mobile, tablet and desktop behaviour |
| `agents/qa-agent.md` | Final checks per page |
| `guides/adspeek-seo-plan.md` | Keyword, pages, templates, phases |
| `guides/adspeek-seo-technical-guide.md` | How the site is coded for SEO |
| `guides/adspeek-seo-best-practices.md` | How each page is written |
| `guides/ui-ux-design-guide.md` | Shopify-style visual system |
| `guides/responsive-guide.md` | Device rules |
| `state/PROJECT_STATE.md` | Progress tracker (Antigravity updates it) |
| `state/CONTEXT_INDEX.md` | Which guide sections each task may read |
| `state/BUSINESS_FACTS.md` | Your facts (you fill this) |
| `briefs/` | Cached research and briefs, so nothing is redone |
