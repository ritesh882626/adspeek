'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import './quiz.css';

interface BusinessOption {
  label: string;
  short: string;
  msg: string;
  note: string;
}

const BUSINESS: Record<string, BusinessOption> = {
  website: {
    label: 'Own website / Shopify',
    short: 'Own website',
    msg: 'I sell through my own website',
    note: "We'll rebuild it to convert better — not just look better.",
  },
  marketplace: {
    label: 'Amazon / Flipkart',
    short: 'Amazon / Flipkart',
    msg: 'I sell on Amazon/Flipkart',
    note: 'Marketplace sellers keep the full margin on orders from their own store — no commission cut.',
  },
  social: {
    label: 'Instagram / WhatsApp',
    short: 'Instagram / WhatsApp',
    msg: 'I sell on Instagram/WhatsApp',
    note: 'Turn DMs into a checkout that takes orders while you sleep.',
  },
  offline: {
    label: 'Offline shop',
    short: 'Offline shop',
    msg: 'I run an offline shop',
    note: 'Take your shop online and sell beyond your area.',
  },
  buyer: {
    label: 'Looking to buy a product',
    short: 'Buyer',
    msg: "I'm looking to buy a product",
    note: 'Got it — share a few details and we will guide you.',
  },
};

const SALES: Record<string, string> = {
  under1: 'Under ₹1L',
  '1-5': '₹1–5L',
  '5-20': '₹5–20L',
  '20plus': '₹20L+',
};

interface VariantData {
  eyebrow: string;
  headline: string;
  cta: string;
}

const VARIANTS: Record<string, VariantData> = {
  default: {
    eyebrow: 'For brands and sellers only',
    headline: 'Get a store that <strong>sells for you.</strong>',
    cta: 'Get started',
  },
};

const REDIRECT_SECONDS = 5;

export function LeadQuiz() {
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<{ business: string; sales: string }>({
    business: '',
    sales: '',
  });

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [hp, setHp] = useState<string>('');

  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [phoneInvalid, setPhoneInvalid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [countdown, setCountdown] = useState<number>(REDIRECT_SECONDS);
  const [countText, setCountText] = useState<string>(`Opening WhatsApp in ${REDIRECT_SECONDS} seconds…`);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [waUrl, setWaUrl] = useState<string>('#');
  const [bubbleMsg, setBubbleMsg] = useState<string>('');

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const leadSentRef = useRef<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Variant config
  const variantKey = VARIANTS[searchParams.get('v') || ''] ? (searchParams.get('v') as string) : 'default';
  const V = VARIANTS[variantKey] || VARIANTS.default;

  // Stored UTM parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    let utm: Record<string, string> = {};
    try {
      utm = JSON.parse(sessionStorage.getItem('lq_utm') || '{}');
    } catch {}
    UTM_KEYS.forEach((k) => {
      const val = searchParams.get(k);
      if (val) utm[k] = val;
    });
    try {
      sessionStorage.setItem('lq_utm', JSON.stringify(utm));
    } catch {}

    // Initialize history
    window.history.replaceState({ s: 0 }, '', window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      let s = e.state && typeof e.state.s === 'number' ? e.state.s : 0;
      if (s === 4 && !leadSentRef.current) s = 3;
      showStep(s, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchParams]);

  // Clear timers helper
  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Step transition
  const showStep = (i: number, pushHistory: boolean = true) => {
    if (i < 0 || i > 4) return;
    if (current === 4 && i !== 4) clearAllTimers();

    setCurrent(i);

    if (pushHistory) {
      window.history.pushState({ s: i }, '', window.location.href);
    }
    window.scrollTo(0, 0);

    setTimeout(() => {
      if (i === 3 && nameInputRef.current) {
        try {
          nameInputRef.current.focus({ preventScroll: true });
        } catch {
          nameInputRef.current.focus();
        }
      } else if (headingRefs.current[i]) {
        try {
          headingRefs.current[i]?.focus({ preventScroll: true });
        } catch {
          headingRefs.current[i]?.focus();
        }
      }
    }, 50);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      showStep(Math.max(0, current - 1), true);
    }
  };

  // Option selection with 180ms delay
  const handleSelectOption = (key: 'business' | 'sales', val: string, nextStep: number) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    const from = current;
    setTimeout(() => {
      if (current === from) {
        showStep(nextStep, true);
      }
    }, 180);
  };

  // Phone sanitization & formatting
  const digits10 = (v: string) => {
    const d = String(v || '').replace(/\D/g, '');
    return d.length > 10 ? d.slice(-10) : d;
  };

  const pretty = (d: string) => {
    return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const d = raw.replace(/\D/g, '');
    if (/[+]/.test(raw) || d.length > 10) {
      setPhone(pretty(digits10(raw)));
    } else {
      setPhone(raw);
    }
    if (phoneInvalid && /^[6-9]\d{9}$/.test(digits10(raw))) {
      setPhoneInvalid(false);
    }
  };

  const handlePhoneBlur = () => {
    const d = digits10(phone);
    setPhone(pretty(d));
    if (d && !/^[6-9]\d{9}$/.test(d)) {
      setPhoneInvalid(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.trim().length >= 2) {
      setNameInvalid(false);
    }
  };

  const handleNameBlur = () => {
    const v = name.trim();
    if (v && v.length < 2) {
      setNameInvalid(true);
    }
  };

  // Quality calculation
  const getQuality = () => {
    if (answers.business === 'buyer') return 'Not a fit (buyer)';
    if (answers.sales === '5-20' || answers.sales === '20plus') return 'Hot';
    if (answers.sales === '1-5') return 'Warm';
    return 'Cold';
  };

  // WhatsApp builder
  const buildWhatsApp = (leadName: string, dPhone: string, storeUrl: string) => {
    const b = BUSINESS[answers.business];
    let msg = `Hi AdsPeek, I'm ${leadName}. `;
    if (b && answers.business !== 'buyer') {
      msg += `${b.msg}, monthly sales ${SALES[answers.sales] || 'not sure'}. I'd like a free consultation for a store that sells.`;
    } else {
      msg += "I'm looking to buy a product.";
    }
    if (storeUrl) msg += ` Store: ${storeUrl}`;

    const waNum = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918796279223').replace(/\D/g, '');
    const url = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
    setWaUrl(url);
    setBubbleMsg(msg);
    return url;
  };

  // Send to Google Sheet
  const sendToSheet = (payload: Record<string, unknown>) => {
    const sheetUrl = process.env.NEXT_PUBLIC_LEAD_SHEET_URL || '';
    if (!/^https:\/\/script\.google\.com\//.test(sheetUrl)) {
      console.warn('[LeadQuiz] NEXT_PUBLIC_LEAD_SHEET_URL is not set — lead not saved.');
      return Promise.resolve();
    }
    const body = JSON.stringify(payload);
    return fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      keepalive: true,
    }).catch(() => {
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon(sheetUrl, new Blob([body], { type: 'text/plain;charset=utf-8' }));
        }
      } catch {}
    });
  };

  const waitMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().replace(/\s+/g, ' ');
    const d = digits10(phone);
    const trimmedLink = link.trim().slice(0, 200);

    const okName = trimmedName.length >= 2;
    const okPhone = /^[6-9]\d{9}$/.test(d);

    setNameInvalid(!okName);
    setPhoneInvalid(!okPhone);

    if (!okName) {
      nameInputRef.current?.focus();
      return;
    }
    if (!okPhone) {
      return;
    }

    setPhone(pretty(d));
    setIsSubmitting(true);

    const leadId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `lq-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    let utm: Record<string, string> = {};
    try {
      utm = JSON.parse(sessionStorage.getItem('lq_utm') || '{}');
    } catch {}

    const payload = {
      leadId,
      name: trimmedName,
      phone: `+91${d}`,
      storeLink: trimmedLink,
      business: BUSINESS[answers.business] ? BUSINESS[answers.business].label : '',
      sales: SALES[answers.sales] || '',
      quality: getQuality(),
      variant: variantKey,
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
      utm_term: utm.utm_term || '',
      fbclid: utm.fbclid || '',
      pageUrl: typeof window !== 'undefined' ? window.location.href.slice(0, 300) : '',
      device: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 200) : '',
      hp,
    };

    const targetWaUrl = buildWhatsApp(trimmedName, d, trimmedLink);

    const sendPromise = hp ? Promise.resolve() : sendToSheet(payload);
    Promise.race([sendPromise, waitMs(2500)]).then(() => {
      leadSentRef.current = true;
      setIsSubmitting(false);
      showStep(4, true);
      startRedirect(targetWaUrl);
    });
  };

  // 5-second countdown & redirect
  const triggerFallback = () => {
    setIsFallback(true);
    setCountText('Tap the button to open WhatsApp');
  };

  const startRedirect = (targetUrl: string) => {
    clearAllTimers();
    let n = REDIRECT_SECONDS;
    setCountdown(n);
    setCountText(`Opening WhatsApp in ${n} seconds…`);
    setIsFallback(false);

    for (let k = 1; k <= n; k++) {
      const t = setTimeout(() => {
        if (k < n) {
          setCountdown(n - k);
          setCountText(`Opening WhatsApp in ${n - k} ${n - k === 1 ? 'second…' : 'seconds…'}`);
        } else {
          setCountdown(0);
          setCountText('Opening WhatsApp…');
          window.location.href = targetUrl;
          const fallbackTimer = setTimeout(() => {
            if (document.visibilityState === 'visible') {
              triggerFallback();
            }
          }, 2000);
          timersRef.current.push(fallbackTimer);
        }
      }, k * 1000);
      timersRef.current.push(t);
    }
  };

  // Handle pageshow (back from WhatsApp)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted && current === 4) {
        clearAllTimers();
        triggerFallback();
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [current]);

  // Summary rendering
  const summaryParts: string[] = [];
  if (BUSINESS[answers.business]) summaryParts.push(BUSINESS[answers.business].short);
  if (SALES[answers.sales]) summaryParts.push(`${SALES[answers.sales]} / month`);

  return (
    <div className="quiz-root">
      <main className="wrap">
        <div className="card" id="card">
          {/* Header */}
          <div className="top">
            <button
              className="back"
              id="back"
              type="button"
              aria-label="Back"
              hidden={current === 0}
              onClick={handleBack}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <span className="logo" id="logo">
              <img src="/logo-black.svg" alt="AdsPeek" height={28} />
            </span>

            <span
              className="steplabel"
              id="steplabel"
              style={{ color: current === 3 ? '#008060' : undefined }}
            >
              {current >= 1 && current <= 2
                ? `Step ${current} of 2`
                : current === 3
                ? 'Last step'
                : ''}
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="progress"
            id="progress"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={2}
            aria-valuenow={Math.min(current, 2)}
            hidden={current === 0 || current === 4}
          >
            <span
              id="bar"
              style={{ width: `${current === 3 ? 100 : current * 50}%` }}
            />
          </div>

          {/* 0 · HOOK */}
          <section className={`step ${current === 0 ? 'on' : ''}`} data-step="0" aria-labelledby="h-hook">
            <div className="hero">
              <span className="pill" id="v-eyebrow">
                {V.eyebrow}
              </span>
              <h1
                id="h-hook"
                tabIndex={-1}
                ref={(el) => { headingRefs.current[0] = el; }}
                dangerouslySetInnerHTML={{ __html: V.headline }}
              />
              <ul className="perks" id="v-perks">
                <li>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Takes 5 seconds
                </li>
                <li>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Free consultation
                </li>
                <li>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Reply on WhatsApp
                </li>
              </ul>
              <button
                className="cta"
                id="start"
                type="button"
                onClick={() => showStep(1, true)}
              >
                <span id="v-cta">{V.cta}</span>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <p className="private">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#008060" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#008060" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="15.5" r="1.4" fill="#fff" />
              </svg>
              Your details stay private. We never share them.
            </p>
          </section>

          {/* 1 · BUSINESS */}
          <section className={`step ${current === 1 ? 'on' : ''}`} data-step="1" aria-labelledby="h-q1">
            <h2 id="h-q1" tabIndex={-1} ref={(el) => { headingRefs.current[1] = el; }}>
              How do you <strong>sell now?</strong>
            </h2>
            <div className="opts" data-q="business">
              <button
                className="opt"
                type="button"
                data-v="website"
                aria-pressed={answers.business === 'website'}
                onClick={() => handleSelectOption('business', 'website', 2)}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="6.5" cy="6.5" r=".6" fill="#008060" />
                </svg>
                <span>Own website / Shopify</span>
                <svg className="chev" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C9196" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>

              <button
                className="opt"
                type="button"
                data-v="marketplace"
                aria-pressed={answers.business === 'marketplace'}
                onClick={() => handleSelectOption('business', 'marketplace', 2)}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Amazon / Flipkart</span>
                <svg className="chev" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C9196" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>

              <button
                className="opt"
                type="button"
                data-v="social"
                aria-pressed={answers.business === 'social'}
                onClick={() => handleSelectOption('business', 'social', 2)}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".8" fill="#008060" />
                </svg>
                <span>Instagram / WhatsApp</span>
                <svg className="chev" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C9196" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>

              <button
                className="opt"
                type="button"
                data-v="offline"
                aria-pressed={answers.business === 'offline'}
                onClick={() => handleSelectOption('business', 'offline', 2)}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l1.5-5h15L21 9" />
                  <path d="M4 9v11h16V9" />
                  <path d="M3 9h18" />
                  <path d="M10 20v-6h4v6" />
                </svg>
                <span>Offline shop</span>
                <svg className="chev" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C9196" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>

              <button
                className="opt"
                type="button"
                data-v="buyer"
                aria-pressed={answers.business === 'buyer'}
                onClick={() => handleSelectOption('business', 'buyer', 2)}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M2 3h3l2.5 12h11.5l2-8H6.5" />
                </svg>
                <span>Looking to buy a product</span>
                <svg className="chev" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C9196" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
            <p className="hint">Tap one to continue</p>
          </section>

          {/* 2 · MONTHLY SALES */}
          <section className={`step ${current === 2 ? 'on' : ''}`} data-step="2" aria-labelledby="h-q2">
            {BUSINESS[answers.business] && (
              <div className="note" id="note2">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{BUSINESS[answers.business].note}</span>
              </div>
            )}
            <h2 id="h-q2" tabIndex={-1} ref={(el) => { headingRefs.current[2] = el; }}>
              Monthly <strong>sales?</strong>
            </h2>
            <p className="lead">A rough number is fine — across all channels.</p>
            <div className="opts grid2" data-q="sales">
              <button
                className="opt tile"
                type="button"
                data-v="under1"
                aria-pressed={answers.sales === 'under1'}
                onClick={() => handleSelectOption('sales', 'under1', 3)}
              >
                <span className="num">Under ₹1L</span>
                <span className="sub">per month</span>
              </button>

              <button
                className="opt tile"
                type="button"
                data-v="1-5"
                aria-pressed={answers.sales === '1-5'}
                onClick={() => handleSelectOption('sales', '1-5', 3)}
              >
                <span className="num">₹1–5L</span>
                <span className="sub">per month</span>
              </button>

              <button
                className="opt tile"
                type="button"
                data-v="5-20"
                aria-pressed={answers.sales === '5-20'}
                onClick={() => handleSelectOption('sales', '5-20', 3)}
              >
                <span className="num">₹5–20L</span>
                <span className="sub">per month</span>
              </button>

              <button
                className="opt tile"
                type="button"
                data-v="20plus"
                aria-pressed={answers.sales === '20plus'}
                onClick={() => handleSelectOption('sales', '20plus', 3)}
              >
                <span className="num">₹20L+</span>
                <span className="sub">per month</span>
              </button>
            </div>
            <p className="hint">Last question</p>
          </section>

          {/* 3 · CONTACT */}
          <section className={`step ${current === 3 ? 'on' : ''}`} data-step="3" aria-labelledby="h-contact">
            <div className="summary" id="summary">
              <b>Your business:</b> {summaryParts.join(' · ')}
            </div>
            <h2 id="h-contact" tabIndex={-1} ref={(el) => { headingRefs.current[3] = el; }}>
              Where should we <strong>connect you?</strong>
            </h2>
            <form id="form" method="post" action="#" autoComplete="on" noValidate onSubmit={handleSubmit}>
              <div className={`field ${nameInvalid ? 'invalid' : ''}`} id="f-name">
                <label htmlFor="lq-name">Your name</label>
                <input
                  ref={nameInputRef}
                  className="input"
                  id="lq-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoCapitalize="words"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  required
                />
                <div className="err" id="e-name">
                  Please enter your name
                </div>
              </div>

              <div className={`field ${phoneInvalid ? 'invalid' : ''}`} id="f-phone">
                <label htmlFor="lq-phone">WhatsApp number</label>
                <div className="phone">
                  <span className="cc" aria-hidden="true">
                    +91
                  </span>
                  <input
                    id="lq-phone"
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
                    placeholder="98765 43210"
                    aria-describedby="e-phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    required
                  />
                </div>
                <div className="err" id="e-phone">
                  Enter a 10-digit WhatsApp number
                </div>
              </div>

              <div className="field">
                <label htmlFor="lq-link">
                  Store or Instagram link <span className="opt-l">(optional)</span>
                </label>
                <input
                  className="input"
                  id="lq-link"
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="done"
                  placeholder="amazon.in/… or @yourbrand"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className="hp" aria-hidden="true">
                <label htmlFor="lq-hp">Leave empty</label>
                <input
                  id="lq-hp"
                  name="lq_hp_x"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>

              <button className="cta" id="submit" type="submit" disabled={isSubmitting}>
                <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
                </svg>
                <span id="submit-text">
                  {isSubmitting ? 'Saving…' : 'Connect me on WhatsApp'}
                </span>
              </button>
            </form>

            <p className="private">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#008060" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#008060" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="15.5" r="1.4" fill="#fff" />
              </svg>
              100% private · Never shared or sold
            </p>
          </section>

          {/* 4 · DONE / WHATSAPP */}
          <section className={`step done ${current === 4 ? 'on' : ''}`} data-step="4" aria-labelledby="h-done">
            <div className="tick">
              <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 id="h-done" tabIndex={-1} ref={(el) => { headingRefs.current[4] = el; }}>
              You&apos;re all set — <strong>let&apos;s talk</strong>
            </h2>
            <p className="lead">
              Just tap <b>Send</b> in WhatsApp — our team replies for your free consultation.
            </p>
            <div className="count" role="status" aria-live="polite">
              <span className="ring" id="ring">
                {isFallback ? '!' : countdown}
              </span>
              <span id="count-text">{countText}</span>
            </div>
            <div className="wa">
              <small>Your message (pre-filled)</small>
              <div className="bubble" id="bubble">
                {bubbleMsg}
              </div>
            </div>
            <a
              className={`cta ${isFallback ? 'pulse' : ''}`}
              id="wa-btn"
              href={waUrl}
              onClick={() => clearAllTimers()}
            >
              <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
              </svg>
              Open WhatsApp now
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LeadQuiz;
