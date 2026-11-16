/**
 * Meta Pixel helper functions
 */

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
  eventId?: string
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (eventId) {
      window.fbq('track', name, params, { eventID: eventId });
    } else if (params) {
      window.fbq('track', name, params);
    } else {
      window.fbq('track', name);
    }
  }
}

export function trackCustom(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('trackCustom', name, params);
    } else {
      window.fbq('trackCustom', name);
    }
  }
}

export function getFbCookies(): { fbp: string; fbc: string } {
  if (typeof document === 'undefined') {
    return { fbp: '', fbc: '' };
  }

  const cookies = document.cookie ? document.cookie.split('; ') : [];
  let fbp = '';
  let fbc = '';

  for (const cookie of cookies) {
    const [key, ...vals] = cookie.split('=');
    const val = vals.join('=');
    if (key === '_fbp') {
      fbp = decodeURIComponent(val);
    } else if (key === '_fbc') {
      fbc = decodeURIComponent(val);
    }
  }

  return { fbp, fbc };
}

export function generateEventId(prefix: string = 'lead'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}_${random}`;
}
