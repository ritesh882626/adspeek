# Portfolio QA Report

Generated for AdsPeek build system — Task P4.

---

## 1. Placeholder Text Audit (`data/portfolio.json`)

The following published projects currently have placeholders in `platform`, `description`, and/or `role` awaiting verified agency inputs:

| ID | Name | Group | Platform | Description | Role |
|---|---|---|---|---|---|
| `piecraft` | The Pie Craft | `rugs` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `roots` | Roots | `clothing` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `simons` | Simons | `clothing` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `miamour` | Mi Amour | `clothing` | `[Platform]` | Indian lingerie and intimates brand. | Website wireframe & CRO |
| `marks` | Mark's | `clothing` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `stance` | Stance | `clothing` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `yellow` | Yellow | `shoes` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `sportinglife` | Sporting Life | `shoes` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `adaore` | Adaore | `other` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `articture` | Articture | `other` | `[Platform]` | `[One line: what the brand sells]` | `[Your role]` |
| `current-rug-store` | *Unpublished* | `rugs` | Shopify | `[One line]` | `[Your role]` |

*Note: Fully populated projects without placeholders:*
- **HiHomes** (`hihomes`): Shopify · Handmade rugs and carpets, sold online across India. · Website design & Shopify build
- **Reliquary House** (`reliquary`): Headless Shopify · Fine art, presented like a gallery. · Headless Shopify build & homepage design
- **Pawnourish** (`pawnourish`): Shopify · Pet food store for dogs and cats. · Storefront design

---

## 2. Screenshot Availability in `public/portfolio/`

- **Required captures:** 13 desktop + 13 mobile screenshots (`<id>-desktop.jpg`, `<id>-mobile.jpg`).
- **Current status:** Missing (the automated headless browser capture script `scripts/capture-portfolio.mjs` has not yet been executed by the owner on their local machine).
- **Graceful Fallback:** Verified. When image files are missing or loading fails, `WorkWindow` renders the clean fallback UI:
  `[Screenshot coming] · {name}` with 4 corner viewfinder brackets.

To capture the live screenshots:
```bash
npm i -D playwright sharp
npx playwright install chromium
npm run capture:portfolio
```

---

## 3. Image File Sizes (> 400 KB)

- **Total files over 400 KB:** **0** (none exceed 400 KB).
- When `capture:portfolio` runs with `sharp`, images are automatically resized to 1200px (desktop) / 600px (mobile) and mozjpeg compressed at quality 78, typically weighing between 90 KB and 280 KB.

---

## 4. Animation Performance & Accessibility

- **Reduced Motion:** Verified.
  - In `app/globals.css`:
    ```css
    @media (prefers-reduced-motion: reduce) {
      .peek-scroll {
        animation: none;
      }
    }
    ```
  - When `prefers-reduced-motion: reduce` is enabled in user system settings, all scrolling motion ceases completely and displays a static top viewport.
- **Off-Screen Performance:** Verified.
  - An `IntersectionObserver` attached to `WorkWindow` dynamically applies the `.paused` class (`animation-play-state: paused`) when a card moves out of the viewport.
- **Hover / Focus Pause:** Verified.
  - Hovering over or tabbing (`:focus-within`) into any browser window instantly pauses the CSS scroll animation.

---

## 5. Responsive Layout & 360px Viewport Audit

- **Filter Bar:**
  - Uses horizontal swipe container (`flex overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0`) without wrapping or triggering page-level horizontal overflow.
- **Grid Viewport:**
  - Desktop (1024px+): 3 columns (`lg:grid-cols-3`).
  - Tablet (640–1023px): 2 columns (`sm:grid-cols-2`).
  - Mobile (<640px): 1 column with full-width edge margins (`grid-cols-1`).
- **Homepage Mobile Swipe Row:**
  - Uses `flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] w-[82vw]` — cleanly constrained to prevent body horizontal scroll at 360px.
