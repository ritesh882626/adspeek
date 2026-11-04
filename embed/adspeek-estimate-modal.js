/**
 * AdsPeek Package Builder Modal Embed Script
 * Enables full-screen popup quote builder on any website with a single script tag.
 *
 * Usage:
 *   <script src="/embed/adspeek-estimate-modal.js"></script>
 *   <button data-adspeek-estimate>Get a Quote</button>
 */

(function () {
  'use strict';

  // Config: The deployed Google Apps Script Web App URL
  const ADSPEEK_ESTIMATE_URL = 'https://script.google.com/macros/s/AKfycbyEI8hwDUImKXXJYjvHkF0zq03ao6EUi7s9C86bkLKdFxerFI8nYZtQV7qf-TRfswMWpg/exec';

  let modalEl = null;
  let iframeEl = null;
  let previousFocusedElement = null;
  let scrollYBeforeLock = 0;

  function createModal() {
    if (modalEl) return modalEl;

    // Overlay container
    modalEl = document.createElement('div');
    modalEl.id = 'adspeek-estimate-overlay';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'AdsPeek Package Builder');

    // Inline critical styling
    Object.assign(modalEl.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100vw',
      height: '100dvh',
      zIndex: '2147483000',
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'none',
      opacity: '0',
      transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      margin: '0',
      boxSizing: 'border-box',
      overflow: 'hidden'
    });

    // Web App Iframe
    iframeEl = document.createElement('iframe');
    iframeEl.id = 'adspeek-estimate-iframe';
    iframeEl.setAttribute('title', 'AdsPeek Package Builder');
    iframeEl.setAttribute('allow', 'clipboard-write');
    iframeEl.setAttribute('loading', 'lazy');

    Object.assign(iframeEl.style, {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block',
      backgroundColor: 'transparent'
    });

    modalEl.appendChild(iframeEl);
    document.body.appendChild(modalEl);

    // Close on backdrop click (if target is modal itself)
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) {
        closeModal();
      }
    });

    // Listen for postMessage events from the Google Apps Script Web App iframe
    window.addEventListener('message', function (event) {
      // Validate origin if coming from Google Apps Script
      const isGoogle = typeof event.origin === 'string' && (
        event.origin.endsWith('.googleusercontent.com') ||
        event.origin.endsWith('script.google.com')
      );
      
      const data = event.data;
      if (!data || data.source !== 'adspeek-estimate') return;

      if (data.action === 'close') {
        closeModal();
      } else if (data.action === 'submitted') {
        // Broadcast custom DOM event for analytics/conversions
        const customEvt = new CustomEvent('adspeek:estimate-submitted', {
          detail: { submissionId: data.submissionId }
        });
        window.dispatchEvent(customEvt);
      }
    });

    return modalEl;
  }

  function openModal() {
    createModal();
    previousFocusedElement = document.activeElement;

    // Load iframe URL on first open or reload
    if (!iframeEl.src || iframeEl.src === 'about:blank') {
      iframeEl.src = ADSPEEK_ESTIMATE_URL;
    }

    // Lock page scroll cleanly
    scrollYBeforeLock = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    modalEl.style.display = 'flex';
    requestAnimationFrame(function () {
      modalEl.style.opacity = '1';
    });

    // Keyboard trap & escape handler
    window.addEventListener('keydown', handleKeyDown);

    // Focus iframe
    if (iframeEl) {
      setTimeout(function () {
        iframeEl.focus();
      }, 100);
    }
  }

  function closeModal() {
    if (!modalEl || modalEl.style.display === 'none') return;

    modalEl.style.opacity = '0';
    setTimeout(function () {
      modalEl.style.display = 'none';

      // Restore scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollYBeforeLock);

      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus
      if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
        previousFocusedElement.focus();
      }
    }, 200);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal();
    }
  }

  // Auto-bind any elements with data-adspeek-estimate
  function bindTriggers() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-adspeek-estimate]');
      if (trigger) {
        e.preventDefault();
        openModal();
      }
    });
  }

  // Public API on window
  window.AdsPeekEstimateModal = {
    open: openModal,
    close: closeModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTriggers);
  } else {
    bindTriggers();
  }
})();
