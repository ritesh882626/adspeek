# AdsPeek Package Builder — Centered Modal Embed Guide

This document explains how to trigger the AdsPeek Package Builder as a centered popup modal on the AdsPeek website or any external landing page.

---

## 1. Quick Setup (Vanilla HTML)

Add the script once before `</body>` and add `data-adspeek-estimate` to any button or link:

```html
<!-- 1. Include the modal script -->
<script src="/embed/adspeek-estimate-modal.js" defer></script>

<!-- 2. Any trigger button -->
<button type="button" data-adspeek-estimate>
  Get an Instant Quote
</button>
```

### Auto-Open on Page Load
To automatically launch the modal when a page loads (e.g. on landing pages or `/quote`), add `data-adspeek-estimate-autoopen`:

```html
<script src="/embed/adspeek-estimate-modal.js" data-adspeek-estimate-autoopen defer></script>
```

---

## 2. Next.js Setup

### Option A: Via Next.js Script in Layout (`app/layout.tsx`)
```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="/embed/adspeek-estimate-modal.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
```

Then simply use `data-adspeek-estimate` on buttons anywhere in your React components:
```tsx
<button type="button" data-adspeek-estimate className="...">
  Get a Quote
</button>
```

### Option B: Programmatic Trigger via JavaScript
```ts
// Open programmatically
if (typeof window !== 'undefined' && (window as any).AdsPeekEstimate) {
  (window as any).AdsPeekEstimate.open();
}

// Close programmatically
(window as any).AdsPeekEstimate.close();
```

---

## 3. Popup Sizing & Responsive Architecture

- **Desktop & Tablet (≥ 768px):**
  - **Width & Height:** `70vw × 70vh`
  - **Boundaries:** `min-width: min(880px, 94vw); min-height: min(600px, 94vh); max-width: 94vw; max-height: 94vh;`
  - **Placement:** Centered with `display: grid; place-items: center;`
  - **Styling:** White background, 20px border radius, soft drop shadow (`0 24px 80px rgba(17, 24, 39, 0.25)`).
  - **Backdrop:** Dimmed `rgba(17, 24, 39, 0.55)` with 4px backdrop blur. Background page scrolling is locked while open.
- **Mobile (< 768px):**
  - **Width & Height:** Full screen (`100vw × 100dvh`), zero border-radius, slides up smoothly from bottom.

---

## 4. Analytics & Event Tracking

When an estimate is submitted, the modal dispatches a custom window event:

```javascript
window.addEventListener('adspeek:estimate-submitted', function (e) {
  console.log('Submission ID:', e.detail.submissionId);
  // Example Google Analytics 4 event:
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', {
      transaction_id: e.detail.submissionId
    });
  }
});
```
