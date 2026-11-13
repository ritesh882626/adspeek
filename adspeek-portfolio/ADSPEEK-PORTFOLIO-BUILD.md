# AdsPeek — Portfolio (auto-scrolling windows) — build instructions for Antigravity

Adds a **Work** page (`/work`) where every project plays in a mini browser window that scrolls the full site top to bottom, pauses on hover, and switches between desktop and phone view. The homepage "Selected work" section reuses the same window. Run after Phases 1–2 of `ADSPEEK-ANTIGRAVITY-BUILD.md`.

Design reference: the "Work — portfolio" boards on the AdsPeek design canvas (desktop and phone 390). The grey blocks inside each window there are stand-ins for the real screenshots.

## How to work through this file
- Tasks in order, one at a time. Edit only the files each task lists. Add a line to `CHANGELOG.md` after each.
- Foundation tokens only, square corners, no arrows on buttons or links.
- Desktop (1024px+), tablet (640–1023px) and mobile (<640px) rules are all given — follow them; don't open a browser.
- Stop after P2 and wait for "continue".

---

## TASK P0 — Data and screenshots

### Files
- `data/portfolio.json` (copy from this package)
- `data/portfolio.ts` (new)
- `scripts/capture-portfolio.mjs` (copy from this package)
- `package.json` (devDependencies: `playwright`, `sharp`; script `"capture:portfolio": "node scripts/capture-portfolio.mjs"`)

### Do this
1. `data/portfolio.ts`: import the JSON, export a typed `Project` (`id, name, url, group: 'rugs'|'clothing'|'shoes'|'other', platform, description, role, published, desktop, mobile`), `PROJECTS` (only `published: true`), and `GROUP_LABELS` = { rugs: 'Rugs & home', clothing: 'Clothing', shoes: 'Shoes', other: 'Other projects' }.
2. **Do not run the capture script yourself.** Tell the user to run, in their own terminal:
   ```
   npm i -D playwright sharp
   npx playwright install chromium
   npm run capture:portfolio
   ```
   It writes `public/portfolio/<id>-desktop.jpg` (1200px wide) and `<id>-mobile.jpg` (600px wide). Until they exist, components show the grey placeholder.

---

## TASK P1 — `WorkWindow` component

### Files
- `components/work/WorkWindow.tsx` (client)
- `app/motion.css` or `app/globals.css` (only the keyframes below)

### What it renders
A square-cornered browser frame: 1px ink border, white.
- **Address bar** (padding 9px 12px, 1px ink bottom border, mono 11px): small accent square + the site's host (ellipsis when long) on the left; current view ("Desktop" / "Phone", uppercase `muted`) on the right.
- **Viewport** `aspect-ratio: 16 / 10`, `overflow: hidden`, `position: relative`, background `#E7E9E1`.
  - **Desktop view:** `<img src={desktop}>` full width, `height: 100%`, `object-fit: cover`, `object-position: 50% 0%`, animated with the keyframes below. `alt` = "{name} website, desktop".
  - **Phone view:** centred phone frame (3px ink border, `aspect-ratio: 9 / 19.5`, height 88% of the viewport) on `#EDEFE7`, containing the mobile image with the same animation.
  - If the image fails to load (`onError`), show the placeholder: grey block with mono label "[Screenshot coming] · {name}".
  - Four viewfinder corner brackets (16px, 2px ink, inset 10px), `aria-hidden`: hidden until hover on desktop, always visible on touch screens.

### Auto-scroll (pure CSS, no JS)
```css
@keyframes peekScroll { 0%, 8% { object-position: 50% 0%; } 92%, 100% { object-position: 50% 100%; } }
.peek-scroll { animation: peekScroll var(--peek-duration, 14s) ease-in-out infinite alternate; }
.peek-window:hover .peek-scroll, .peek-window:focus-within .peek-scroll { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .peek-scroll { animation: none; } }
```
Animating `object-position` scrolls any image height without measuring it. Vary `--peek-duration` per card (14s, 16s, 18s repeating) so windows don't move in sync.
Pause animations of windows that are off-screen: one `IntersectionObserver` toggles a `paused` class (`animation-play-state: paused`) when a window leaves the viewport.

### Props
`project`, `view` ('desktop' | 'phone'), `duration` (seconds). Window is focusable (`tabIndex={0}`) with `aria-label="{name} website preview, scrolling"`.

### Images
Use `next/image` with `fill`, `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`, lazy loading, and `quality={75}`.

---

## TASK P2 — The Work page `/work`

### Files
- `app/work/page.tsx`
- `components/work/WorkHero.tsx`
- `components/work/WorkGrid.tsx` (client — filters and view toggles)
- `components/layout/Header.tsx` (only: "Work" link → `/work`)
- `components/layout/Footer.tsx` (only: add "Work" → `/work` in Company)

### Layout (match the canvas board)
1. **Hero** — breadcrumb Home / Work; H1 "Scroll through" + line break + `Highlight`("stores we've built."); lead "Every window scrolls the real site from top to bottom. Hover to pause. Switch to phone view to see the mobile store." Right side: a 3-cell stat box (Projects = count, Categories = 4, Countries = [X]).
   - Desktop: two columns aligned bottom. Tablet/mobile: stacked; H1 56px / 42px.
2. **Filter bar** — white, padding 20px. Chips: All, Rugs & home, Clothing, Shoes, Other, each with its count (mono 12px). Selected = accent + 2px ink border. Right: "Showing N of M" (mono 12px). Filter state in the URL (`?category=`).
   - Mobile: chips in one swipeable row (no wrap, scrollbar hidden).
3. **Grid** — padding 72px top / 96px bottom (56/56 mobile). `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))`, gap 48px rows / 32px columns → 3 columns at 1280, 2 on tablet, 1 on phone. Each card:
   - `WorkWindow`
   - Row: Desktop | Phone toggle (two joined buttons, 1px ink border, selected = ink background white text, min-height 40px, `aria-pressed`) and the group label (mono 12px uppercase) on the right.
   - Name (22px, 700) with platform on the right (mono 12px `muted`).
   - Description (15px `body`).
   - "Our role · {role}" (mono label + 14px text).
   - "Visit {host}" link (opens the live site in a new tab, `rel="noopener"`). No arrow.
4. **CTA band** — heading "Your store could be next in this list.", primary "Build your package" → `/shopify-development`, secondary "Book a call" → `/contact`.

### SEO
Metadata title "Our Work — Shopify Stores We've Built | AdsPeek"; description written from the lead; canonical `/work`. Add `/work` to `app/sitemap.ts`.

> **STOP** — report and wait for "continue".

---

## TASK P3 — Homepage "Selected work" uses the windows

### Files
- `components/home/SelectedWork.tsx`

### Do this
Replace the three placeholder cards with three `WorkWindow` cards (desktop view, no toggle) for `hihomes`, `reliquary` and `pawnourish`, keeping the existing heading, "See all work" link (→ `/work`) and the existing layout rules (3 columns desktop, 2 tablet, swipe row on mobile). If the homepage motion phase is installed, keep the iris reveal on the window's viewport.

---

## TASK P4 — Portfolio QA (report only)
Write `PORTFOLIO-QA.md`: which projects still have placeholder text ([Platform], [Your role], [One line…]); which screenshots are missing in `public/portfolio/`; image file sizes over 400 KB; confirm animations stop with reduced motion and off-screen; confirm no horizontal page scroll at 360px.
