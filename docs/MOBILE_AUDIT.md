# Mobile Audit (360 × 640 px) — AdsPeek Package Builder

**Target Viewport:** 360 × 640 px (Smallest supported mobile phone screen)  
**Modal Card Available Size (with 5% / 5dvh margins):** 324 × 576 px  
**Available Inner Content Width (16px card padding):** 292 px  

This audit identifies all root causes of overflow, clipping, zooming, and scrolling issues across mobile screens (< 768px).

---

## 1. Summary of Console Overflow Check
Evaluating:
```js
[...document.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth + 1)
```
Identified overflowing elements:
1. `.app-container` / `html.is-standalone body` (`width: 100vw` forces 360px width inside a 324px iframe card, generating a 36px horizontal scrollbar).
2. `.summary-group` & `.summary-group-title-col` (`width: 120px` title column leaves insufficient width for items and amounts).
3. `.filter-pills` on Features screen (wrapping or horizontal container expansion due to missing `overflow-x: auto` row styling).
4. `.stepper-header` in Catalogue when component title is long alongside stepper buttons.
5. `.staff-pricing-fixed` row inside Staff Summary (horizontal inline controls exceed 292px width).
6. Inputs with font size `13px` triggering iOS WebKit page-level zoom on focus.

---

## 2. Root Causes by Category

### A. Modal Dimensions & Embed Sizing
- **File:** `embed/adspeek-estimate-modal.js` (lines 42–51)
  - **Issue:** On mobile, `dialogEl.style` hardcodes `width: 100vw; height: 100dvh; borderRadius: 0;`.
  - **Problem:** Fills the screen 100% edge-to-edge without margins. Does not respect the new `--m-gap-x: 5vw` and `--m-gap-y: 5dvh` spec (90vw × 90dvh = 324 × 576 px).
  - **Backdrop issue:** `overlayEl.addEventListener('click', ...)` closes the modal on mobile, violating Section 1 ("Tapping the backdrop does NOT close the form on mobile").
  - **Safe area insets:** Missing `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` calculation for the gap.
  - **Small screen fallback:** Missing fallback for viewport height < 560px (landscape / small screens).

- **File:** `Styles.html` (lines 156–168, 1504–1513)
  - **Issue:** `.app-container` and `html.is-standalone .app-container` are styled with `width: 100vw !important; height: 100dvh !important;`.
  - **Problem:** When loaded inside an iframe with width 324px, `100vw` evaluates to 360px, causing the iframe content to exceed the card boundaries and scroll horizontally.

---

### B. Header Height & Structure (The "Double Header" Bug)
- **File:** `App.html` (lines 1275–1280) & `Styles.html` (lines 1516–1534)
  - **Issue:** `.split-card` uses `display: contents;`. Inside it, `.left-panel` is assigned `grid-row: 1`.
  - **Problem:**
    1. The inner wrapper of `.left-panel` is a plain `<div>` without `.left-panel-content`, so its `brand-badge`, `left-title`, and `left-desc` remain visible.
    2. `.mobile-top-nav` sits in the DOM without an explicit `grid-row`, creating an extra or overlapping row.
    3. `.right-panel` contains `.screen-header-wrap` with another title (`screen-title`) and subtitle (`screen-subtitle`).
    4. Together, these elements occupy over 240px of vertical space, leaving less than 260px for the scrollable options area.
  - **Requirement:** A single unified 3-row grid:
    - Row 1: Fixed compact header (max 120px): Logo + "Close" button, progress bar + step pill, step heading + 1-line subhead.
    - Row 2: Scrollable options area (`minmax(0, 1fr)`).
    - Row 3: Fixed bottom bar (max 76px).

---

### C. Screen-by-Screen Component Overflows

#### 1. Welcome & Service Screens
- **File:** `Styles.html` (lines 660, 672) & `App.html` (lines 497, 560)
  - **Issue:** `.tile.tile-large` has `min-height: 140px; padding: 24px;`.
  - **Problem:** Two large tiles at 140px height + 24px padding = 328px total height, causing the screen to overflow vertically on 360×640. Inner padding of 24px on each side leaves only 244px for content.
  - **Planned Fix:** On mobile, tiles use 1 column, `padding: 14px`, `min-height: 72px`, `gap: 10px`.

#### 2. Catalogue Screen (Products & Categories)
- **File:** `Styles.html` (lines 867–890) & `App.html` (lines 600–633)
  - **Issue:** `.stepper-header` uses horizontal flex (`justify-content: space-between`).
  - **Problem:** Long component titles compete with the stepper controls. Stepper buttons are 34×34px (failing thumb-friendly 44px standard).
  - **Planned Fix:** Stack header so stepper controls are full width `[−] [ input ] [+]` with 44×44px buttons, flexible centered input (`flex: 1; min-width: 0`), and wrapping helper text below.

#### 3. Pages Screen
- **File:** `Styles.html` (lines 926–930) & `App.html` (lines 668–728)
  - **Issue:** `.locked-chip` uses large card styling. `.tile-with-stepper` uses desktop `padding: 20px`.
  - **Problem:** Vertical space is exhausted by 6+ full-sized included chips.
  - **Planned Fix:** Render included pages as compact wrapping text pills (`flex-wrap: wrap; gap: 6px;`). Optional pages render as 1-column tiles with 14px padding.

#### 4. Features & Integrations Screens
- **File:** `Styles.html` (lines 950–960) & `App.html` (lines 767–870)
  - **Issue:** `.filter-pills` wraps into multi-line rows or expands width. Long integration titles with monthly subscription notes ("Sub: ₹1,500/mo") and price tags collide in horizontal space.
  - **Problem:** Stretches card width or creates unsightly multi-line filter stacks.
  - **Planned Fix:**
    - Filter pills set to single horizontal row: `display: flex; overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; scrollbar-width: none;`.
    - Monthly tool subscription text wraps cleanly under the integration title.

#### 5. Review & Summary Screen
- **File:** `Styles.html` (lines 992–1045) & `App.html` (lines 915–950)
  - **Issue:**
    - `.summary-items-list` has `padding: 16px 20px;`.
    - `.summary-group-title-col` has fixed `width: 120px; flex-shrink: 0;`.
  - **Problem:** In a 292px card area, a 120px title column leaves only ~132px for item names and prices, truncating text or forcing numbers onto new lines.
  - **Planned Fix:**
    - Summary groups stack cleanly or use dedicated full-width rows.
    - Amounts right-aligned in a dedicated 84px column (`flex-shrink: 0; text-align: right;`).
    - Bottom bar shows "Total incl. GST ₹…" with a "View breakdown" button opening an inline modal/panel for Subtotal, 18% GST, and Total.

#### 6. Client Details Form
- **File:** `Styles.html` (lines 1142–1154)
  - **Issue:** `.form-input`, `.form-select`, `.form-textarea` are set to `font-size: 13px;`.
  - **Problem:** On iOS Safari / Chrome, any input with font size < 16px triggers automatic page zooming, displacing the card layout and clipping controls.
  - **Planned Fix:** Set `font-size: 16px;` on all form inputs, selects, and textareas for mobile viewports.
  - Add inline `+91` mobile prefix with flexible phone input.
  - Add `overflow-wrap: anywhere; min-width: 0;` to email, GSTIN, and error message containers.

---

### D. Keyboard & Viewport Interaction
- **Issue:** When the virtual keyboard opens on mobile, available height shrinks from ~576px to ~280–320px.
- **Problem:** Currently, the fixed bottom bar remains active and covers the input fields; no auto-scroll mechanism centers the active field.
- **Planned Fix:**
  - Attach listener to `window.visualViewport`.
  - On keyboard open / viewport shrinkage: hide the bottom bar and allow the options area full height.
  - On focus of any input: call `el.scrollIntoView({ block: 'center', behavior: 'smooth' })`.
  - On blur / keyboard close: restore bottom bar.

---

## 3. Planned Implementation Order (Section 6)
1. **Phase 1: Audit (Complete)** — Documented in this file (`docs/MOBILE_AUDIT.md`).
2. **Phase 2: Mobile Popup & Card Layout (Sections 1 & 3)** — Implement `--m-gap-x: 5vw` / `--m-gap-y: 5dvh`, safe-area insets, backdrop no-close, and 3-row grid card.
3. **Phase 3: Screen-by-Screen Fixes & Keyboard Handling (Section 4)** — Steppers, pills, 1-column layouts, font-size 16px inputs, visualViewport keyboard handler.
4. **Phase 4: Acceptance Checklist & Multi-Resolution Verification (Section 5)** — Test and verify across 360×640, 360×740, 375×667, 390×844, 412×915.

