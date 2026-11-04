# AdsPeek Package Builder — Full-Screen Modal Embed Guide

This document explains how to trigger the AdsPeek Package Builder as a full-screen popup modal on the AdsPeek website or any external landing page.

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
if (typeof window !== 'undefined' && window.AdsPeekEstimateModal) {
  window.AdsPeekEstimateModal.open();
}

// Close programmatically
window.AdsPeekEstimateModal.close();
```

---

## 3. Analytics & Event Tracking

When an estimate is submitted, the modal dispatches a custom window event:

```javascript
window.addEventListener('adspeek:estimate-submitted', function (e) {
  console.log('Submission ID:', e.detail.submissionId);
  // Example Google Analytics 4 event:
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', {
      transaction_id: e.detail.submissionId,
      value: 19499,
      currency: 'INR'
    });
  }
});
```

---

## 4. How It Works
- **Zero Scroll Bleed:** Opening the modal locks `document.documentElement` and `document.body` scroll without causing layout shift.
- **Bi-directional `postMessage` Communication:**
  - When the user clicks the close `✕` button inside the web app or presses `Esc`, the Apps Script iframe posts `{ source: 'adspeek-estimate', action: 'close' }` to the parent window, instantly closing and unmounting the overlay.
  - When a quote is completed, the app posts `{ source: 'adspeek-estimate', action: 'submitted', submissionId: 'EST-...' }`.
