// AdsPeek — capture full-page screenshots of every portfolio site (desktop + phone).
// Run on your own computer (normal internet), from the project root:
//   npm i -D playwright sharp
//   npx playwright install chromium
//   node scripts/capture-portfolio.mjs            (all published sites)
//   node scripts/capture-portfolio.mjs hihomes    (one site by id)
// Output: public/portfolio/<id>-desktop.jpg and <id>-mobile.jpg (resized, compressed).

import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'portfolio');
const sites = JSON.parse(await fs.readFile(path.join(ROOT, 'data', 'portfolio.json'), 'utf8'));
const only = process.argv[2];
let sharp = null;
try { sharp = (await import('sharp')).default; } catch { console.log('sharp not installed — saving full-size JPGs'); }

const VIEWS = [
  { name: 'desktop', context: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, maxHeight: 9000, outWidth: 1200 },
  { name: 'mobile', context: { ...devices['iPhone 13'] }, maxHeight: 12000, outWidth: 600 },
];

async function tidy(page) {
  // close cookie banners and pop-ups where we can; ignore failures
  for (const label of [/accept all/i, /accept/i, /agree/i, /got it/i, /allow all/i, /^ok$/i]) {
    try { const b = page.getByRole('button', { name: label }).first(); if (await b.isVisible({ timeout: 500 })) await b.click({ timeout: 1500 }); } catch {}
  }
  try { await page.keyboard.press('Escape'); } catch {}
  try { const c = page.getByRole('button', { name: /close/i }).first(); if (await c.isVisible({ timeout: 500 })) await c.click({ timeout: 1500 }); } catch {}
}

async function loadLazy(page) {
  // scroll down slowly so lazy images and sections load, then back to top
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
for (const site of sites) {
  if (only ? site.id !== only : !site.published) continue;
  for (const v of VIEWS) {
    const ctx = await browser.newContext({ ...v.context, locale: 'en-IN' });
    const page = await ctx.newPage();
    const file = path.join(OUT, `${site.id}-${v.name}.jpg`);
    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await tidy(page);
      await loadLazy(page);
      await tidy(page);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const w = page.viewportSize().width;
      const buf = await page.screenshot({ type: 'jpeg', quality: 85, fullPage: true, clip: { x: 0, y: 0, width: w, height: Math.min(height, v.maxHeight) } });
      if (sharp) await sharp(buf).resize({ width: v.outWidth }).jpeg({ quality: 78, mozjpeg: true }).toFile(file);
      else await fs.writeFile(file, buf);
      console.log('✓', site.id, v.name, Math.min(height, v.maxHeight) + 'px');
    } catch (e) {
      console.log('✗', site.id, v.name, '—', e.message.split('\n')[0]);
    }
    await ctx.close();
  }
}
await browser.close();
console.log('Done. Check public/portfolio/ — re-run a single site with: node scripts/capture-portfolio.mjs <id>');
