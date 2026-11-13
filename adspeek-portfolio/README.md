# AdsPeek portfolio pack

1. Copy `data/portfolio.json` and `scripts/capture-portfolio.mjs` into your Next.js project (Antigravity's Task P0 does this too).
2. In your own terminal, in the project folder:
   npm i -D playwright sharp
   npx playwright install chromium
   node scripts/capture-portfolio.mjs
   → screenshots land in public/portfolio/ (desktop + phone for each site)
3. Give ADSPEEK-PORTFOLIO-BUILD.md to Antigravity.

Fill the [placeholders] in data/portfolio.json first: platform, one-line description and your role for each project.
The unlaunched rug store is listed with "published": false — switch it to true after launch and client approval, then re-run the script for it:
   node scripts/capture-portfolio.mjs current-rug-store
