# AdsPeek Package Builder — Fix Audit & Root Cause Analysis

**Audit Date:** November 4, 2026  
**Status:** Completed (Phase 1 Audit — No code changes made yet)  
**Target Files:** `Index.html`, `Styles.html`, `App.html`, `embed/adspeek-estimate-modal.js`, `docs/EMBED.md`

---

## 1. Executive Summary

A comprehensive audit was performed across the layout, CSS styles, DOM hierarchy, and JavaScript event flow of the AdsPeek Package Builder. 

The audit identified six primary root causes for the reported issues:
1. **Lack of Full-Screen Modal Overlay Architecture:** The application renders as a static block within an embedded iframe/page rather than a modal overlay (`position: fixed; inset: 0; z-index: 2147483000;`), and lacks a top-right close action (`✕`), unsaved changes confirmation, and `postMessage` communication with the parent website.
2. **Improper Viewport & Scroll Containers:** The scroll container is applied to the entire right panel (`overflow-y: auto` on `.right-panel`), causing the card header, step dots, and action buttons to scroll out of view. The options area is not an isolated scroll container with `min-height: 0`.
3. **Full DOM Destruction on User Interactions:** Clicking stepper buttons (`+`/`-`), changing quantities, or toggling selections invokes `renderApp()`, which executes `root.innerHTML = ...`. This destroys the entire DOM tree, causes loss of focus/caret, invalidates direct element listeners, and resets scroll positions.
4. **Stepper & Numeric Input Defects:** Quantity inputs use standard `type="number"`, which fights with custom JavaScript increments, lacks press-and-hold pointer repeaters, lacks Shift-key acceleration (+5/-5), and does not support temporary empty text during user typing. Furthermore, "Optional + Qty" tiles do not display a stepper when selected.
5. **Mobile Viewport & Keyboard Occlusion:** Uses `100vh` rather than `100dvh`, lacks `viewport-fit=cover` and `env(safe-area-inset-bottom)`, and does not handle mobile virtual keyboard viewport resizing, causing the bottom action bar and inputs to be obscured by the keyboard.
6. **Hardcoded Non-Standard Breakpoints:** The layout uses a single arbitrary `max-width: 900px` media query rather than the required responsive tiers (Mobile `< 768px`, Tablet `768–1023px`, Desktop `≥ 1024px`, and Short-Height `< 720px`).

---

## 2. Detailed Root Cause Matrix

| Issue ID | Category | Problem Observed | File & Line Reference | Root Cause | Planned Fix |
|---|---|---|---|---|---|
| **AUD-01** | Architecture / Modal | App opens as inline page; lacks popup overlay | `Styles.html:61-72`, `Index.html:18`, `app/quote/page.tsx:50` | `body` has standard flex margins and no fixed viewport lock (`position: fixed; inset: 0`). No standalone modal script exists. | 1. Lock `html, body` to `height: 100%; overflow: hidden;`.<br>2. Position app container as a fixed viewport overlay with dark backdrop.<br>3. Add close button (`✕`), `Esc` handler, and in-app confirm dialog.<br>4. Build `embed/adspeek-estimate-modal.js` and `docs/EMBED.md`. |
| **AUD-02** | Layout / Scrolling | Headings, step dots, price card, and footer scroll away | `Styles.html:270-278`, `Styles.html:87-98` | `.right-panel` has `overflow-y: auto` wrapping the header, content, and footer inside one scroll container. Left panel is not fixed grid. | 1. Structure Right Panel with CSS Grid: `grid-template-rows: auto 1fr auto; min-height: 0;`.<br>2. Make `.options-area` the ONLY scrolling container (`overflow-y: auto; overscroll-behavior: contain; min-height: 0;`).<br>3. Fix Left Panel as `grid-template-rows: auto 1fr auto;` so price card never moves.<br>4. Fix summary totals above footer. |
| **AUD-03** | Interactions / Re-render | Full screen re-renders on every click/input; focus lost | `App.html:1298-1301`, `App.html:1316-1320`, `App.html:1339-1342` | Handlers call `state.selections[cid] = cur; recalc(); renderApp();`, completely wiping `root.innerHTML`. | 1. Render step view ONCE on navigation.<br>2. Mutate only targeted DOM nodes (toggle `.selected`, update stepper text and helper label, call `updatePriceUI()`).<br>3. Never re-render options area on input. |
| **AUD-04** | Event Handling | Listeners attached directly to transient elements | `App.html:1162-1538` | `.querySelectorAll().forEach(...)` attaches direct `onclick` handlers that are destroyed on innerHTML replacement. | Replace all direct bindings with a single delegated event listener on `#app-root` for `click`, `input`, `change`, `keydown`, and `pointerdown`/`pointerup`. |
| **AUD-05** | Steppers | Quantity steppers glitch; typing clears value; `NaN` errors | `App.html:561-566`, `App.html:1282-1320` | 1. Native `<input type="number">` conflicts with JS control.<br>2. `parseInt(inp.value, 10)` on empty input immediately snaps to min.<br>3. Missing press-and-hold repeater.<br>4. Missing Shift-key (+5) and ArrowUp/Down listeners. | 1. Switch to `<input type="text" inputmode="numeric" pattern="[0-9]*">`.<br>2. Allow temporary empty text during typing; debounce price update (150ms); clamp only on blur/Enter.<br>3. Implement pointerdown repeater (400ms delay, 80ms interval).<br>4. Add ArrowUp/ArrowDown and Shift key support. |
| **AUD-06** | Optional+Qty Tiles | "Optional + Qty" components do not show a stepper | `App.html:623-635` | In `renderPages()`, tiles of type `Optional + Qty` render identical markup to standard `Optional` tiles without a stepper control. | Separate tile button from stepper container. When selected, reveal a styled stepper outside the button element (preventing invalid nested buttons). |
| **AUD-07** | Event Bubbling | Stepper clicks toggle parent tile | `App.html:561-566`, `App.html:1282-1320` | Missing `event.stopPropagation()` on stepper `-`/`+` and input clicks. | Place steppers outside interactive tile buttons and call `e.stopPropagation()` in stepper handlers. |
| **AUD-08** | Summary Totals | Summary totals scroll offscreen | `App.html:790-845`, `Styles.html:651-740` | Summary card embeds item groups and totals in one single scrolling container. | Split summary into: (1) scrolling items list, and (2) fixed totals block pinned directly above the footer. |
| **AUD-09** | Mobile Layout | Layout hides behind browser address bars & home bar | `Styles.html:1128-1133`, `Styles.html:1196-1210`, `Index.html:6` | 1. Uses `100vh` instead of `100dvh`.<br>2. Missing `viewport-fit=cover`.<br>3. Sticky bottom bar missing `padding-bottom: max(12px, env(safe-area-inset-bottom))`. | 1. Update viewport meta tag: `viewport-fit=cover`.<br>2. Root container: `height: 100dvh`.<br>3. Apply safe area inset to mobile bottom bar.<br>4. Connect back button in mobile header. |
| **AUD-10** | Mobile Keyboard | Inputs obscured by keyboard when typing | `App.html:1446-1474` | No `visualViewport` resize handling or active element scroll centering. | 1. Listen to `window.visualViewport.resize`.<br>2. Hide mobile sticky bar or elevate options area while keyboard is open.<br>3. Auto-scroll active input into center of options area. |
| **AUD-11** | Short Screens | Desktop heights < 720px cut off bottom buttons | `Styles.html:87-98` | Fixed minimum height (`min-height: 620px`) with large padding causes overflow on 1366×768 / 1280×720 screens. | Add `@media (max-height: 720px)` rules: scale down padding, compress titles to 20-24px, hide optional benefit checkmarks, and keep price card and buttons fully visible. |

---

## 3. Planned Fix Strategy by Phase

### Phase 2: Full-Screen Popup & Embed Protocol
- Update `Index.html` & `Styles.html`: Full viewport overlay (`position: fixed; inset: 0`), centered card with dark translucent backdrop.
- Add accessible close button (`✕`, top-right) and `Esc` key navigation.
- Implement in-app confirmation modal for unsaved changes ("Leave? Your package will be lost.").
- Implement bidirectional `postMessage` protocol:
  - Sent: `{ source: 'adspeek-estimate', action: 'close' }`
  - Sent: `{ source: 'adspeek-estimate', action: 'submitted', submissionId }`
- Create `embed/adspeek-estimate-modal.js` and `docs/EMBED.md` for seamless 1-line website integration.

### Phase 3: Fixed Layout & Responsive Viewport
- Implement the 3-row CSS grid architecture:
  - **Desktop/Tablet (≥ 768px):** Fixed size card `width: min(1180px, 100vw - 48px); height: min(760px, 100dvh - 48px);`. Header fixed, footer fixed, options area is the ONLY scrolling region with custom styled scrollbars. Left panel pinned with live price card at bottom.
  - **Summary & Staff Screens:** Fix totals/pricing override box above the footer; only line items scroll.
  - **Mobile (< 768px):** `height: 100dvh;` grid `auto 1fr auto;`. Header fixed, options area scrolls, sticky bottom bar fixed with safe area padding.
  - **Short Desktop (< 720px height):** Compact typography and paddings.
  - **Tablet (768–1023px):** 34% left panel, single-column tiles where width < 260px.

### Phase 4: Working Controls & State Lifecycle
- **No full re-renders on user input:** Rebuild screens only upon step transition.
- **Event Delegation:** Use centralized listeners on `#app-root` with `data-action` routing.
- **Selectable Tiles:** Separate button from interactive controls (no buttons inside buttons).
- **Steppers:** `inputmode="numeric"`, press-and-hold repeater with pointer events, Shift-key acceleration (+5/-5), Arrow keys, debounced live pricing (150ms), and validation helper toasts.
- **Form Inputs:** Debounced state binding without re-render, native autocompletion, inline validation on blur/submit, and auto-state filling from GSTIN.
- **Price Updates:** Dedicated `updatePriceUI()` function that animates number changes without touching DOM options.

---

## 4. Implementation & Verification Report (Phases 2–5 Complete)

### Phase 2: Full-Screen Popup & Embed Protocol — COMPLETED
- Full-viewport fixed overlay implemented in `Styles.html` (`position: fixed; inset: 0; overflow: hidden;`).
- Top-right close button (✕) and `Esc` key navigation connected to `requestClose()`.
- In-app confirmation modal (`#leave-confirm-modal`) added with "Keep editing" and "Discard and exit" actions when unsaved changes exist.
- `postMessage` protocol implemented:
  - `{ source: 'adspeek-estimate', action: 'close' }`
  - `{ source: 'adspeek-estimate', action: 'submitted', submissionId }`
- Universal embed script created: [`embed/adspeek-estimate-modal.js`](file:///Users/ritesh/Downloads/adspeek-build-system/embed/adspeek-estimate-modal.js) and copied to `public/embed/adspeek-estimate-modal.js`.
- Usage guide created: [`docs/EMBED.md`](file:///Users/ritesh/Downloads/adspeek-build-system/docs/EMBED.md).
- Website integration: "Get a Quote" buttons across header, footer, hero, and CTA sections wired with `data-adspeek-estimate`.

### Phase 3: Fixed Layout & Responsive Viewport — COMPLETED
- Desktop/Tablet grid (`grid-template-rows: auto 1fr auto; min-height: 0;`): Header is row 1 (fixed), `.options-scroll-area` is row 2 (only scrolling area), Footer wrap is row 3 (fixed).
- Left panel: Fixed grid (`auto 1fr auto;`) keeping price card constantly visible.
- Summary screen: Items list scrolls; totals block (`.summary-totals-fixed`) is fixed above the footer.
- Staff mode summary: Pricing adjustment box (`.staff-pricing-fixed`) stays fixed directly above the footer.
- Mobile (< 768px): `height: 100dvh;` with fixed top nav (✕ / back arrow), scrolling options area, and fixed bottom bar with `safe-area-inset-bottom` and `visualViewport` keyboard handling.
- Short desktop (< 720px): Responsive scaling for compact heights.

### Phase 4: Working Controls & Interaction Refactoring — COMPLETED
- **Single render per step**: `renderApp()` only executes on step transition. Clicks and inputs update DOM nodes in-place without wiping `#app-root`.
- **Event delegation**: Consolidated handlers for `pointerdown`, `pointerup`, `click`, `input`, `blur`, `keydown` on `#app-root`.
- **Steppers**: Standardized with `type="text" inputmode="numeric" pattern="[0-9]*"`, press-and-hold repeater (400ms delay, 80ms interval), free typing during input with 150ms debounced price update, and clamping to min/max on blur/Enter.
- **Optional + Qty components**: Rendered as a container tile with separate `.tile-main-btn` and `.tile-stepper-row`. Stepper clicks do not propagate to the tile button.
- **Filter pills**: Filter feature cards by toggling `display: none` without re-rendering the screen.
- **Form fields**: Native inputs with `autocomplete`, GSTIN auto-uppercase and state auto-selection, inline error validation on blur/submit without destroying user focus.
- **updatePriceUI()**: Modifies price labels in desktop left panel, mobile bottom bar, and summary totals without touching options area.

### Phase 5: Verification & Deployment Pass — PASSED
- `PricingCore` calculation tests verified in Node.js (0 errors).
- `App.html` JavaScript verified with 0 syntax errors.
- `embed/adspeek-estimate-modal.js` verified with 0 syntax errors.
- Next.js production build (`npm run build`) completed successfully with 36 static pages.
- Google Apps Script web app pushed and deployed to version `@3`:
  - Deployment ID: `AKfycbyEI8hwDUImKXXJYjvHkF0zq03ao6EUi7s9C86bkLKdFxerFI8nYZtQV7qf-TRfswMWpg`
  - URL: `https://script.google.com/macros/s/AKfycbyEI8hwDUImKXXJYjvHkF0zq03ao6EUi7s9C86bkLKdFxerFI8nYZtQV7qf-TRfswMWpg/exec`


