'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFbCookies, trackEvent } from '@/lib/metaPixel';
import './quiz.css';

interface BusinessOption {
  label: string;
  msg: string;
}

const BUSINESS: Record<string, BusinessOption> = {
  marketplace: { label: 'Amazon / Flipkart / Meesho', msg: 'on Amazon/Flipkart/Meesho' },
  social: { label: 'Instagram / WhatsApp', msg: 'on Instagram/WhatsApp' },
  website: { label: 'My own website', msg: 'on my own website' },
  offline: { label: 'Offline shop', msg: 'in my offline shop' },
  buyer: { label: 'I want to buy a product', msg: '' },
};

const SALES: Record<string, string> = {
  starting: 'Just starting out',
  under1: 'Under ₹1 lakh',
  '1-5': '₹1–5 lakh',
  '5-20': '₹5–20 lakh',
  '20plus': '₹20 lakh+',
};

const SALES_MSG: Record<string, string> = {
  under1: 'under ₹1 lakh',
  '1-5': '₹1–5 lakh',
  '5-20': '₹5–20 lakh',
  '20plus': '₹20 lakh+',
};

const TIMELINE: Record<string, string> = {
  now: 'This month',
  '1-3': 'In 1–3 months',
  exploring: 'Just exploring for now',
};

const TIMELINE_MSG: Record<string, string> = {
  now: 'this month',
  '1-3': 'in 1–3 months',
};

const PLAN_IMG: Record<string, string> = {
  marketplace: '/start/stores/store-ordinary.webp',
  social: '/start/stores/store-ivl.webp',
  website: '/start/stores/store-kanno.webp',
  offline: '/start/stores/store-kanno.webp',
};

const SHORT: Record<string, string> = {
  marketplace: 'Amazon / Flipkart',
  social: 'Instagram',
  website: 'Own website',
  offline: 'Offline shop',
};

const REDIRECT_SECONDS = 5;

function validName(v: string) {
  const s = String(v || '').trim();
  return s.length >= 2 && /[\p{L}]{2,}/u.test(s);
}

function linkOk(v: string) {
  const s = String(v || '').trim();
  if (!s) return true;
  if (/^@[A-Za-z0-9._]{2,30}$/.test(s)) return true;
  return /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(s);
}

function digits10(v: string) {
  const d = String(v || '').replace(/\D/g, '');
  return d.length > 10 ? d.slice(-10) : d;
}

function pretty(d: string) {
  return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
}

export function LeadQuiz() {
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    business: string;
    sales: string;
    timeline: string;
  }>({
    business: '',
    sales: '',
    timeline: '',
  });

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [hp, setHp] = useState<string>('');

  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [phoneInvalid, setPhoneInvalid] = useState<boolean>(false);
  const [linkInvalid, setLinkInvalid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [countdown, setCountdown] = useState<number>(REDIRECT_SECONDS);
  const [countText, setCountText] = useState<string>(`Opening WhatsApp in ${REDIRECT_SECONDS}…`);
  const [returnedVisible, setReturnedVisible] = useState<boolean>(false);
  const [isPulse, setIsPulse] = useState<boolean>(false);
  const [waUrl, setWaUrl] = useState<string>('#');
  const [doneName, setDoneName] = useState<string>('there');

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const leadSentRef = useRef<boolean>(false);
  const submittingRef = useRef<boolean>(false);
  const contactSentRef = useRef<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

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

    window.history.replaceState({ s: 0 }, '', window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      let s = e.state && typeof e.state.s === 'number' ? e.state.s : 0;
      if (s === 5 && !leadSentRef.current) s = 4;
      showStep(s, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchParams]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const showStep = (i: number, pushHistory: boolean = true) => {
    if (i < 0 || i > 5) return;
    if (current === 5 && i !== 5) clearAllTimers();

    setCurrent(i);

    if (pushHistory) {
      window.history.pushState({ s: i }, '', window.location.href);
    }
    window.scrollTo(0, 0);

    setTimeout(() => {
      if (i === 4 && nameInputRef.current) {
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
      const prev = current === 4 && answers.business === 'buyer' ? 1 : Math.max(0, current - 1);
      showStep(prev, true);
    }
  };

  // Option selection with 180ms delay
  const handleSelectOption = (key: 'business' | 'sales' | 'timeline', val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    const from = current;
    const next = key === 'business' && val === 'buyer' ? 4 : from + 1;
    setTimeout(() => {
      if (current === from) {
        showStep(next, true);
      }
    }, 180);
  };

  // Phone input handling
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const d = raw.replace(/\D/g, '');
    if (/[+]/.test(raw) || d.length > 10) {
      setPhone(pretty(digits10(raw)));
    } else {
      setPhone(raw);
    }
    if (/^[6-9]\d{9}$/.test(digits10(raw))) {
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
    if (validName(e.target.value)) {
      setNameInvalid(false);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (linkOk(e.target.value)) {
      setLinkInvalid(false);
    }
  };

  // Lead quality
  const getQuality = () => {
    if (answers.business === 'buyer') return 'Not a fit (buyer)';
    const big = answers.sales === '5-20' || answers.sales === '20plus';
    const soon = answers.timeline === 'now' || answers.timeline === '1-3';
    if (big && soon) return 'Hot';
    if (big || (answers.sales === '1-5' && soon)) return 'Warm';
    return 'Cold';
  };

  // Build WhatsApp message
  const buildWhatsApp = (leadName: string, storeUrl: string) => {
    let msg: string;
    if (answers.business === 'buyer') {
      msg = 'Hi, I came across your ad and want to buy a product.';
    } else if (answers.sales === 'starting' || answers.timeline === 'exploring') {
      msg = `Hi AdsPeek, I’m ${leadName}. I’m ${
        answers.sales === 'starting' ? 'just starting out' : 'just exploring'
      } and would like to know how a Shopify store could work for me.`;
      if (storeUrl) msg += ` My store: ${storeUrl}.`;
    } else {
      const b = BUSINESS[answers.business];
      msg = `Hi AdsPeek, I’m ${leadName}. I sell ${b ? b.msg : 'online'}, about ${
        SALES_MSG[answers.sales] || 'some sales'
      } a month, and want my store live ${TIMELINE_MSG[answers.timeline] || 'soon'}.`;
      if (storeUrl) msg += ` My store: ${storeUrl}.`;
      msg += ' Please send my store plan and price.';
    }

    const waNum = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918796279223').replace(/\D/g, '');
    const url = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
    setWaUrl(url);
    const fName = leadName.split(' ')[0] || 'there';
    setDoneName(fName);
    return url;
  };

  // Save lead via /api/lead
  const saveLead = (payload: Record<string, unknown>) => {
    const body = JSON.stringify(payload);
    return fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
      .then((r) => r.ok)
      .catch(() => {
        try {
          if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
            return navigator.sendBeacon('/api/lead', new Blob([body], { type: 'application/json' }));
          }
        } catch {}
        return false;
      });
  };

  const waitMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().replace(/\s+/g, ' ');
    const d = digits10(phone);
    const trimmedLink = link.trim().slice(0, 200);

    const okName = validName(trimmedName);
    const okPhone = /^[6-9]\d{9}$/.test(d);
    const okLink = linkOk(trimmedLink);

    setNameInvalid(!okName);
    setPhoneInvalid(!okPhone);
    setLinkInvalid(!okLink);

    if (!okName) {
      nameInputRef.current?.focus();
      return;
    }
    if (!okPhone) {
      phoneInputRef.current?.focus();
      return;
    }
    if (!okLink) {
      linkInputRef.current?.focus();
      return;
    }

    setPhone(pretty(d));
    const targetWaUrl = buildWhatsApp(trimmedName, trimmedLink);

    // Bot trap: no Lead, nothing saved
    if (hp) {
      leadSentRef.current = true;
      showStep(5, true);
      startRedirect(targetWaUrl);
      return;
    }

    // Session deduplication: one person = one Lead
    const seenKey = 'lq_lead_' + d;
    let prevId: string | null = null;
    try {
      prevId = sessionStorage.getItem(seenKey);
    } catch {}

    if (submittingRef.current || isSubmitting) return; // double tap ignored
    if (prevId) {
      leadSentRef.current = true;
      showStep(5, true);
      startRedirect(targetWaUrl);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    const leadId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `lq-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    try {
      sessionStorage.setItem(seenKey, leadId);
    } catch {}

    let utm: Record<string, string> = {};
    try {
      utm = JSON.parse(sessionStorage.getItem('lq_utm') || '{}');
    } catch {}

    const { fbp, fbc: fbcCookie } = getFbCookies();
    const fbclid = utm.fbclid || '';
    const fbc = !fbcCookie && fbclid ? `fb.1.${Date.now()}.${fbclid}` : fbcCookie;

    const payload = {
      leadId,
      name: trimmedName,
      phone: `+91${d}`,
      storeLink: trimmedLink,
      business: BUSINESS[answers.business] ? BUSINESS[answers.business].label : '',
      sales: SALES[answers.sales] || '',
      timeline: TIMELINE[answers.timeline] || '',
      quality: getQuality(),
      variant: searchParams.get('v') || 'default',
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
      utm_term: utm.utm_term || '',
      fbclid,
      fbp,
      fbc,
      pageUrl: typeof window !== 'undefined' ? window.location.href.slice(0, 300) : '',
      device: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 200) : '',
      hp: '',
    };

    // Browser Lead — exact same eventID as server Lead sent by /api/lead
    trackEvent(
      'Lead',
      {
        content_name: 'lead_quiz',
        business_type: payload.business,
        monthly_sales: payload.sales,
        start: payload.timeline,
        lead_quality: payload.quality,
      },
      leadId
    );

    Promise.race([saveLead(payload), waitMs(2500)]).then(() => {
      leadSentRef.current = true;
      submittingRef.current = false;
      setIsSubmitting(false);
      showStep(5, true);
      startRedirect(targetWaUrl);
    });
  };

  // WhatsApp Contact event
  const sendContact = (src: string) => {
    const k = 'lq_contact_' + digits10(phone);
    let done = false;
    try {
      done = !!sessionStorage.getItem(k);
    } catch {}
    if (contactSentRef.current || done) {
      contactSentRef.current = true;
      return;
    }
    trackEvent('Contact', { content_name: src });
    contactSentRef.current = true;
    try {
      sessionStorage.setItem(k, '1');
    } catch {}
  };

  const returnedState = () => {
    setCountText('WhatsApp didn’t open?');
    setReturnedVisible(true);
    setIsPulse(true);
  };

  const startRedirect = (targetUrl: string) => {
    clearAllTimers();
    setReturnedVisible(false);
    setIsPulse(false);
    let n = REDIRECT_SECONDS;
    setCountdown(n);
    setCountText(`Opening WhatsApp in ${n}…`);

    for (let k = 1; k <= n; k++) {
      const t = setTimeout(() => {
        if (current !== 5) return;
        if (k < n) {
          setCountdown(n - k);
          setCountText(`Opening WhatsApp in ${n - k}…`);
        } else {
          setCountdown(0);
          setCountText('Opening WhatsApp…');
          sendContact('whatsapp_redirect');
          window.location.href = targetUrl;
          const fallbackTimer = setTimeout(() => {
            if (document.visibilityState === 'visible') {
              returnedState();
            }
          }, 2000);
          timersRef.current.push(fallbackTimer);
        }
      }, k * 1000);
      timersRef.current.push(t);
    }
  };

  // Listeners for return from WhatsApp
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted && current === 5) {
        clearAllTimers();
        returnedState();
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && current === 5 && contactSentRef.current) {
        clearAllTimers();
        returnedState();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [current]);

  // Plan card chips
  const isBuyer = answers.business === 'buyer';
  const planChips = [SHORT[answers.business], SALES[answers.sales], TIMELINE[answers.timeline]].filter(Boolean);
  const planImgSrc = PLAN_IMG[answers.business] || PLAN_IMG.marketplace;

  return (
    <main className="wrap">
      <div className={`card ${current === 0 ? 'wide' : ''}`} id="card">
        {/* Top logo */}
        <div className="top">
          <span className="logo" aria-label="AdsPeek">
            Ads<span>Peek</span>
          </span>
        </div>

        {/* Progress header (Step 1-4) */}
        {current >= 1 && current <= 4 && (
          <div id="nav">
            <div className="nav">
              <button className="back" id="back" type="button" onClick={handleBack}>
                ← Back
              </button>
              <span className="steplabel" id="steplabel">
                {current === 4 ? 'Last step' : `Step ${current} of 3`}
              </span>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={Math.min(current, 3)}
              id="progress"
            >
              <span
                id="bar"
                style={{ width: `${current === 4 ? 100 : Math.round((current * 100) / 3)}%` }}
              />
            </div>
          </div>
        )}

        {/* 0 · HOOK: store showcase */}
        <section className={`step ${current === 0 ? 'on' : ''}`} data-step="0" aria-labelledby="h-hook">
          <div className="s0">
            <div className="s0-copy">
              <h1 id="h-hook" tabIndex={-1} ref={(el) => { headingRefs.current[0] = el; }}>
                Get your free store plan <strong>in 30 seconds</strong>
              </h1>
              <p className="sub" id="v-sub">
                For brands selling on Amazon, Instagram or offline. Answer 3 quick taps and get your Shopify plan + price on WhatsApp.
              </p>
              <ul className="proofs proofs-desk">
                <li>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    Stores from <b>₹25,000</b>, with payments and delivery set up
                  </span>
                </li>
                <li>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    Live in <b>2–3 weeks</b>
                  </span>
                </li>
                <li>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    Plus the <b>Meta ads</b> that bring buyers
                  </span>
                </li>
              </ul>
              <button
                className="cta cta-desk"
                type="button"
                data-start
                onClick={() => showStep(1, true)}
              >
                Get my free store plan →
              </button>
            </div>

            <figure className="stage" aria-label="Stores we’ve built for brands like yours">
              <div className="fan">
                <img
                  className="ph ph1"
                  src="/start/stores/store-ordinary.webp"
                  alt="Skincare store design by AdsPeek"
                  width={420}
                  height={865}
                  decoding="async"
                />
                <img
                  className="ph ph2"
                  src="/start/stores/store-ivl.webp"
                  alt="Activewear store design by AdsPeek"
                  width={420}
                  height={867}
                  decoding="async"
                />
                <img
                  className="ph ph3"
                  src="/start/stores/store-kanno.webp"
                  alt="Furniture store design by AdsPeek"
                  width={420}
                  height={890}
                  decoding="async"
                />
                <figcaption>Stores we’ve built for brands like yours</figcaption>
              </div>
            </figure>

            <div className="s0-mob">
              <div className="pills">
                <span>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <em>Stores from <b>₹25,000</b></em>
                </span>
                <span>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <em>Payments + delivery set up</em>
                </span>
                <span>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <em>Live in <b>2–3 weeks</b></em>
                </span>
                <span>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <em>Plus <b>Meta ads</b> that bring buyers</em>
                </span>
              </div>
              <button
                className="cta"
                type="button"
                data-start
                onClick={() => showStep(1, true)}
              >
                Get my free store plan →
              </button>
            </div>

            <p className="trust s0-trust">
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#0A0A0A" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              No calls, no spam. One WhatsApp message from our team.
            </p>
          </div>
        </section>

        {/* 1 · QUESTION 1 */}
        <section className={`step ${current === 1 ? 'on' : ''}`} data-step="1" aria-labelledby="h-q1">
          <h2 id="h-q1" tabIndex={-1} ref={(el) => { headingRefs.current[1] = el; }}>
            Where do you <strong>sell right now?</strong>
          </h2>
          <p className="helper">Pick the one that brings most of your orders.</p>
          <div className="opts" data-q="business" role="group" aria-labelledby="h-q1">
            <button
              className="opt"
              type="button"
              data-v="marketplace"
              aria-pressed={answers.business === 'marketplace'}
              onClick={() => handleSelectOption('business', 'marketplace')}
            >
              <span className="radio" />
              Amazon / Flipkart / Meesho
            </button>
            <button
              className="opt"
              type="button"
              data-v="social"
              aria-pressed={answers.business === 'social'}
              onClick={() => handleSelectOption('business', 'social')}
            >
              <span className="radio" />
              Instagram / WhatsApp
            </button>
            <button
              className="opt"
              type="button"
              data-v="website"
              aria-pressed={answers.business === 'website'}
              onClick={() => handleSelectOption('business', 'website')}
            >
              <span className="radio" />
              My own website
            </button>
            <button
              className="opt"
              type="button"
              data-v="offline"
              aria-pressed={answers.business === 'offline'}
              onClick={() => handleSelectOption('business', 'offline')}
            >
              <span className="radio" />
              Offline shop
            </button>
            <button
              className="opt"
              type="button"
              data-v="buyer"
              aria-pressed={answers.business === 'buyer'}
              onClick={() => handleSelectOption('business', 'buyer')}
            >
              <span className="radio" />
              I want to buy a product
            </button>
          </div>
          <p className="trust">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#0A0A0A" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            </svg>
            No calls, no spam. One WhatsApp message from our team.
          </p>
        </section>

        {/* 2 · MONTHLY SALES */}
        <section className={`step ${current === 2 ? 'on' : ''}`} data-step="2" aria-labelledby="h-q2">
          <h2 id="h-q2" tabIndex={-1} ref={(el) => { headingRefs.current[2] = el; }}>
            How much do you <strong>sell in a month?</strong>
          </h2>
          <p className="helper">A rough idea is fine. It helps us suggest the right plan.</p>
          <div className="opts" data-q="sales" role="group" aria-labelledby="h-q2">
            <button
              className="opt"
              type="button"
              data-v="starting"
              aria-pressed={answers.sales === 'starting'}
              onClick={() => handleSelectOption('sales', 'starting')}
            >
              <span className="radio" />
              Just starting out
            </button>
            <button
              className="opt"
              type="button"
              data-v="under1"
              aria-pressed={answers.sales === 'under1'}
              onClick={() => handleSelectOption('sales', 'under1')}
            >
              <span className="radio" />
              Under ₹1 lakh
            </button>
            <button
              className="opt"
              type="button"
              data-v="1-5"
              aria-pressed={answers.sales === '1-5'}
              onClick={() => handleSelectOption('sales', '1-5')}
            >
              <span className="radio" />
              ₹1–5 lakh
            </button>
            <button
              className="opt"
              type="button"
              data-v="5-20"
              aria-pressed={answers.sales === '5-20'}
              onClick={() => handleSelectOption('sales', '5-20')}
            >
              <span className="radio" />
              ₹5–20 lakh
            </button>
            <button
              className="opt"
              type="button"
              data-v="20plus"
              aria-pressed={answers.sales === '20plus'}
              onClick={() => handleSelectOption('sales', '20plus')}
            >
              <span className="radio" />
              ₹20 lakh+
            </button>
          </div>
        </section>

        {/* 3 · WHEN LIVE */}
        <section className={`step ${current === 3 ? 'on' : ''}`} data-step="3" aria-labelledby="h-q3">
          <h2 id="h-q3" tabIndex={-1} ref={(el) => { headingRefs.current[3] = el; }}>
            When do you want <strong>your store live?</strong>
          </h2>
          <div className="opts" data-q="timeline" role="group" aria-labelledby="h-q3">
            <button
              className="opt"
              type="button"
              data-v="now"
              aria-pressed={answers.timeline === 'now'}
              onClick={() => handleSelectOption('timeline', 'now')}
            >
              <span className="radio" />
              This month
            </button>
            <button
              className="opt"
              type="button"
              data-v="1-3"
              aria-pressed={answers.timeline === '1-3'}
              onClick={() => handleSelectOption('timeline', '1-3')}
            >
              <span className="radio" />
              In 1–3 months
            </button>
            <button
              className="opt"
              type="button"
              data-v="exploring"
              aria-pressed={answers.timeline === 'exploring'}
              onClick={() => handleSelectOption('timeline', 'exploring')}
            >
              <span className="radio" />
              Just exploring for now
            </button>
          </div>
        </section>

        {/* 4 · CONTACT */}
        <section className={`step ${current === 4 ? 'on' : ''}`} data-step="4" aria-labelledby="h-contact">
          <h2 id="h-contact" tabIndex={-1} ref={(el) => { headingRefs.current[4] = el; }}>
            Your store plan <strong>is ready</strong>
          </h2>
          <p className="helper">Tell us where to send it. We’ll reply on WhatsApp with your plan and price.</p>

          {!isBuyer && (
            <div className="plan" id="plan">
              <img
                className="plan-img"
                id="plan-img"
                src={planImgSrc}
                alt=""
                width={420}
                height={865}
              />
              <div className="plan-body">
                <div className="plan-t">
                  <span className="plan-k">Your plan</span> Shopify store + payments, delivery &amp; Meta ads
                </div>
                <div className="chips" id="plan-chips">
                  {planChips.map((c, idx) => (
                    <span key={idx}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                placeholder="e.g. Rahul Sharma"
                aria-describedby="e-name"
                value={name}
                onChange={handleNameChange}
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
                  ref={phoneInputRef}
                  id="lq-phone"
                  name="tel"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="next"
                  placeholder="10-digit number"
                  aria-describedby="e-phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  required
                />
              </div>
              <div className="err" id="e-phone">
                Enter a valid 10-digit WhatsApp number
              </div>
            </div>

            <div className={`field ${linkInvalid ? 'invalid' : ''}`} id="f-link">
              <label htmlFor="lq-link">
                Store or Instagram link <span className="opt-l">(optional)</span>
              </label>
              <input
                ref={linkInputRef}
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
                placeholder="instagram.com/yourbrand or amazon.in/…"
                aria-describedby="h-link e-link"
                value={link}
                onChange={handleLinkChange}
              />
              <div className="fhelp" id="h-link">
                Sharing this gets you a more accurate plan.
              </div>
              <div className="err" id="e-link">
                This doesn’t look like a link. Leave it blank if you don’t have one.
              </div>
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
              <span id="submit-text">
                {isSubmitting ? 'Saving…' : 'Get my store plan on WhatsApp →'}
              </span>
            </button>
          </form>

          <p className="trust">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#0A0A0A" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Your number is only used to send your plan. No spam.
          </p>
        </section>

        {/* 5 · WHATSAPP REDIRECT */}
        <section className={`step done ${current === 5 ? 'on' : ''}`} data-step="5" aria-labelledby="h-done">
          <div className="tick">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 id="h-done" tabIndex={-1} ref={(el) => { headingRefs.current[5] = el; }}>
            Done, <strong id="done-name">{doneName}</strong>! Opening WhatsApp…
          </h2>
          <p className="helper">
            Just tap <b>Send</b> in WhatsApp. Our team will reply with your store plan and price.
          </p>
          <div className="count" role="status" aria-live="polite">
            <span className="ring" id="ring">
              {returnedVisible ? '!' : countdown}
            </span>
            <span id="count-text">{countText}</span>
          </div>
          <a
            className={`cta ${isPulse ? 'pulse' : ''}`}
            id="wa-btn"
            href={waUrl}
            onClick={() => {
              clearAllTimers();
              sendContact('whatsapp_button');
            }}
          >
            Open WhatsApp now
          </a>
          <p className="returned" id="returned" hidden={!returnedVisible}>
            Didn’t open? Tap the button above to send your message.
          </p>
          <p className="hours" id="hours">
            Replies usually within 1 hour, 10 am – 8 pm.
          </p>
        </section>
      </div>
    </main>
  );
}

export default LeadQuiz;
