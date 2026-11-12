# AdsPeek Homepage Motion QA Report

Audit completed against the GSAP motion specification across Desktop (1440px), Tablet (768px), and Mobile (390px).

## Section Motion Audit Matrix

| Section | Desktop | Tablet | Mobile | Reduced motion = static & visible | Cleans up on unmount/resize | Only transform/opacity/clip/bg/SVG animated | Problem | Owning prompt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Header** | Shutter blink on load & scroll-up; hides on scroll down | Identical | Identical; frees viewport space | PASS (static, visible) | PASS (ScrollTrigger & timers reverted) | PASS (scaleY, yPercent) | None | Motion 2 |
| **Viewfinder Cursor** | 28×28 trailing cursor with quickTo; frames links/buttons (+6px pad) | Disabled (touch/coarse) | Disabled (touch/coarse) | PASS (display: none) | PASS (listeners removed, hidden) | PASS (x, y, opacity, width/height on fixed overlay only) | None | Motion 3 |
| **Hero** | Letter build, lime sweep, 3D flip, receipt printer, 3D tilt | Identical (no 3D tilt) | Identical (no 3D tilt; responsive wraps) | PASS (.js-motion fallback, static visible) | PASS (timelines killed, DOM/props restored) | PASS (scaleY, y, opacity, bgSize, rotateX, clipPath, rotate) | None | Motion 4 |
| **Eyebrows** | Decode text on scroll enter (top 88%, once) | Identical | Identical | PASS (shows real text immediately) | PASS (ScrollTrigger reverted) | PASS (textContent scramble) | None | Motion 5 |
| **Trust Strip** | Stats decode; tool names split-flap flip (rotateX -90° to 0°) | Identical | Identical (staggered in 2×2 grid) | PASS (all values visible) | PASS (props cleared) | PASS (rotateX, opacity, textContent) | None | Motion 6 |
| **Comparison** | Ruler strike on typical agency, lime highlighter on AdsPeek | Identical | Card triggers; badge stamp (scale 1.4→1, rot -8°→0°) | PASS (all text and rows visible) | PASS (timeline & triggers reverted) | PASS (scaleX, color, bgSize, scale, rotate) | None | Motion 7 |
| **Services** | Lime wipe + code decode + name shift on hover | Identical (hover) | Focus-follow on scroll (auto-wipe on enter/leave) | PASS (clean white rows visible) | PASS (listeners removed, fills reset) | PASS (scaleX, x, textContent) | None | Motion 8 |
| **Growth System** | Pinned loop scrub; lime order dot travels circuit; activates parts | Unpinned scrub; dot travels spine | Unpinned scrub; dot travels spine in padding | PASS (all 4 parts visible & legible) | PASS (pins, timers & SVGs reset) | PASS (strokeDashoffset, cx, cy, scale, rotate, opacity) | None | Motion 9 |
| **Selected Work** | Viewfinder corners fly in; camera-iris circular clip reveal; hover expand | Reveal only | Reveal only (swipe row activates together) | PASS (cards visible) | PASS (triggers & hover listeners removed) | PASS (x, y, opacity, clipPath, scale) | None | Motion 10 |
| **Process** | Scrubbed lime progress bar; timing badges stamp; calendar flip | Identical | Identical down vertical timeline | PASS (all steps visible) | PASS (timelines & props cleared) | PASS (scaleX, scale, rotate, rotateX, opacity) | None | Motion 11 |
| **Ways to Work** | Cards dealt from central deck; popular tier decodes; hover lift | Identical | Stack order preserved (Store + Growth first) | PASS (cards visible) | PASS (props & zIndex cleared) | PASS (x, y, rotate, opacity, textContent) | None | Motion 12 |
| **FAQ** | Question highlighter sweep + answer unmasks (clipPath) | Identical | Identical | PASS (all questions and answers visible) | PASS (triggers & inline styles cleared) | PASS (bgSize, bgPosition, clipPath) | None | Motion 13 |
| **Final CTA** | Letters drop & bounce; magnetic buttons; cursor repel | Entry bounce + tap wave | Entry bounce + tap wave on heading | PASS (full sentence in aria-label, visible) | PASS (quickTos & listeners cleaned up) | PASS (y, rotate, opacity, scale, x) | None | Motion 14 |

---

## Architectural & Safety Verifications

1. **Plugin Registration:** Exactly one `gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin)` in `lib/motion/gsap.ts`.
2. **ScrollTrigger Lifecycle:** All ScrollTriggers run inside `useSectionMotion` / `gsap.matchMedia` and automatically revert on unmount and breakpoint changes.
3. **Font Readiness:** `document.fonts.ready` triggers `ScrollTrigger.refresh()` after fonts are loaded.
4. **Header vs. Growth System Pin:** Growth System pin starts `top top`. Because the header scrolls out of view on scroll down (`yPercent: -100`), there is no overlap with the pinned section.
5. **No JavaScript / Flash of Content:** `.js-motion` class in `<head>` ensures hero displays with 3000ms safety timeout if GSAP is blocked. All other content remains 100% visible by default in SSR HTML.
6. **Route Isolation:** Motion hooks are scoped exclusively to homepage components (`app/page.tsx`). All other routes (`/shopify-development`, `/contact`, `/about`, `/guides`, `/shopify-development/gurugram`, `/work/*`) remain completely static.
7. **Brand Consistency:** No arrow symbols or icons on buttons or links.
