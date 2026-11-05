/**
 * AdsPeek Package Builder Modal Embed Script
 * Enables centered popup quote builder on any website with a single script tag.
 *
 * Desktop: Centered modal (70vw × 70vh, min 880×600, max 94vw×94vh) with dimmed backdrop
 * Mobile: Full-screen modal (100vw × 100dvh)
 *
 * Usage:
 *   <script src="/embed/adspeek-estimate-modal.js"></script>
 *   <button data-adspeek-estimate>Get a Quote</button>
 *
 * Auto-open option:
 *   <script src="/embed/adspeek-estimate-modal.js" data-adspeek-estimate-autoopen></script>
 *   or window.AdsPeekEstimate.open();
 */

(function () {
  'use strict';

  // Config: The deployed Google Apps Script Web App URL
  const ADSPEEK_ESTIMATE_URL = 'https://script.google.com/macros/s/AKfycbwqFiXEXNJW1AnQqpphxRjrkURQdAvEfquF0od2MTvJxCBu4iAWkdy-kHyoVGpsLU_BZA/exec';

  let overlayEl = null;
  let dialogEl = null;
  let iframeEl = null;
  let previousFocusedElement = null;
  let scrollYBeforeLock = 0;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function applyResponsiveDialogStyles() {
    if (!dialogEl) return;
    const mobile = isMobile();

    if (mobile) {
      const isShort = window.innerHeight < 560;
      if (isShort) {
        Object.assign(dialogEl.style, {
          width: '100vw',
          height: '100dvh',
          minWidth: '0',
          minHeight: '0',
          maxWidth: 'none',
          maxHeight: 'none',
          borderRadius: '0',
          boxShadow: 'none'
        });
      } else {
        Object.assign(dialogEl.style, {
          width: 'calc(100vw - 2 * var(--m-gap-x, 5vw))',
          height: 'calc(100dvh - 2 * var(--m-gap-y, 5dvh))',
          minWidth: '0',
          minHeight: '0',
          maxWidth: 'none',
          maxHeight: 'none',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(17, 24, 39, 0.3)'
        });
      }
    } else {
      Object.assign(dialogEl.style, {
        width: '70vw',
        height: '70vh',
        minWidth: 'min(880px, 94vw)',
        minHeight: 'min(600px, 94vh)',
        maxWidth: '94vw',
        maxHeight: '94vh',
        borderRadius: '20px',
        boxShadow: '0 24px 80px rgba(17, 24, 39, 0.25)'
      });
    }
  }

  function createModal() {
    if (overlayEl) return overlayEl;

    // 1. Overlay Backdrop covering full page
    overlayEl = document.createElement('div');
    overlayEl.id = 'adspeek-estimate-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('aria-label', 'AdsPeek Package Builder');

    Object.assign(overlayEl.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100vw',
      height: '100dvh',
      zIndex: '2147483000',
      backgroundColor: 'rgba(17, 24, 39, 0.55)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'none',
      placeItems: 'center',
      opacity: '0',
      transition: 'opacity 180ms ease',
      padding: '0',
      margin: '0',
      boxSizing: 'border-box',
      overflow: 'hidden'
    });

    // 2. Centered Modal Dialog Card
    dialogEl = document.createElement('div');
    dialogEl.id = 'adspeek-estimate-dialog';
    Object.assign(dialogEl.style, {
      position: 'relative',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      transition: prefersReducedMotion() ? 'none' : 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      transform: 'scale(0.98)'
    });

    applyResponsiveDialogStyles();
    window.addEventListener('resize', applyResponsiveDialogStyles);

    // 3. Web App Iframe (Fills dialog card 100%)
    iframeEl = document.createElement('iframe');
    iframeEl.id = 'adspeek-estimate-iframe';
    iframeEl.setAttribute('aria-label', 'AdsPeek Package Builder'); // Accessible name without tooltip
    iframeEl.setAttribute('allow', 'clipboard-write');
    iframeEl.setAttribute('loading', 'lazy');

    Object.assign(iframeEl.style, {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block',
      backgroundColor: 'transparent'
    });

    dialogEl.appendChild(iframeEl);
    overlayEl.appendChild(dialogEl);
    document.body.appendChild(overlayEl);

    // Ensure mobile gap CSS variables exist on host document
    if (!document.getElementById('adspeek-estimate-root-vars')) {
      const vStyle = document.createElement('style');
      vStyle.id = 'adspeek-estimate-root-vars';
      vStyle.textContent = ':root { --m-gap-x: 5vw; --m-gap-y: 5dvh; }';
      document.head.appendChild(vStyle);
    }

    // Close on backdrop click (click outside dialog) — desktop only, never on mobile
    overlayEl.addEventListener('click', function (e) {
      if (e.target === overlayEl) {
        if (!isMobile()) {
          requestModalClose();
        }
      }
    });

    // Listen for postMessage events from the Google Apps Script Web App iframe
    window.addEventListener('message', function (event) {
      const data = event.data;
      if (!data || data.source !== 'adspeek-estimate') return;

      if (data.action === 'close') {
        forceCloseModal();
      } else if (data.action === 'submitted') {
        const customEvt = new CustomEvent('adspeek:estimate-submitted', {
          detail: { submissionId: data.submissionId }
        });
        window.dispatchEvent(customEvt);
      }
    });

    return overlayEl;
  }

  function requestModalClose() {
    // Notify iframe so it can display unsaved changes confirm dialog if needed
    try {
      if (iframeEl && iframeEl.contentWindow) {
        iframeEl.contentWindow.postMessage({
          source: 'adspeek-estimate-host',
          action: 'request-close'
        }, '*');
        return;
      }
    } catch (e) {}
    forceCloseModal();
  }

  function openModal() {
    createModal();
    previousFocusedElement = document.activeElement;

    // Load iframe URL on first open
    if (!iframeEl.src || iframeEl.src === 'about:blank') {
      iframeEl.src = ADSPEEK_ESTIMATE_URL;
    }

    // Lock page scroll
    scrollYBeforeLock = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    applyResponsiveDialogStyles();

    overlayEl.style.display = 'grid';

    // Animate open
    const mobile = isMobile();
    const reducedMotion = prefersReducedMotion();

    if (mobile) {
      dialogEl.style.transform = reducedMotion ? 'none' : 'translateY(100%)';
      dialogEl.style.transition = reducedMotion ? 'none' : 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      dialogEl.style.transform = reducedMotion ? 'none' : 'scale(0.98)';
      dialogEl.style.transition = reducedMotion ? 'none' : 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)';
    }

    requestAnimationFrame(function () {
      overlayEl.style.opacity = '1';
      if (mobile) {
        dialogEl.style.transform = 'translateY(0)';
      } else {
        dialogEl.style.transform = 'scale(1)';
      }
    });

    window.addEventListener('keydown', handleKeyDown);

    if (iframeEl) {
      setTimeout(function () {
        try { iframeEl.focus(); } catch (e) {}
      }, 120);
    }
  }

  function forceCloseModal() {
    if (!overlayEl || overlayEl.style.display === 'none') return;

    const mobile = isMobile();
    const reducedMotion = prefersReducedMotion();

    overlayEl.style.opacity = '0';
    if (!reducedMotion) {
      if (mobile) {
        dialogEl.style.transform = 'translateY(100%)';
      } else {
        dialogEl.style.transform = 'scale(0.98)';
      }
    }

    setTimeout(function () {
      overlayEl.style.display = 'none';

      // Restore scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollYBeforeLock);

      window.removeEventListener('keydown', handleKeyDown);

      if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
        previousFocusedElement.focus();
      }
    }, 180);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      requestModalClose();
    }
  }

  function bindTriggers() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-adspeek-estimate]');
      if (trigger) {
        e.preventDefault();
        openModal();
      }
    });

    // Auto-open if script has data-adspeek-estimate-autoopen or on /quote path
    const isQuoteRoute = typeof window !== 'undefined' && (
      window.location.pathname === '/quote' ||
      window.location.pathname === '/quote/'
    );

    let hasAutoOpenAttr = false;
    const currentScript = document.currentScript || document.querySelector('script[src*="adspeek-estimate-modal"]');
    if (currentScript && currentScript.hasAttribute('data-adspeek-estimate-autoopen')) {
      hasAutoOpenAttr = true;
    }

    if (isQuoteRoute || hasAutoOpenAttr) {
      setTimeout(openModal, 150);
    }
  }

  // Public API
  window.AdsPeekEstimate = {
    open: openModal,
    close: requestModalClose,
    forceClose: forceCloseModal
  };
  // Backward compatibility
  window.AdsPeekEstimateModal = window.AdsPeekEstimate;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTriggers);
  } else {
    bindTriggers();
  }
})();
