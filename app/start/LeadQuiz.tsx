'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CATEGORY_OPTIONS,
  CHANNEL_OPTIONS,
  ORDERS_OPTIONS,
  BUDGET_OPTIONS,
  STEP3_MICROCOPY,
  STEP4_MICROCOPY,
  STORE_FEATURES_INCLUDED,
  calculateLeadQuality,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_NUMBER,
} from './quiz-config';
import { getVariant } from './variants';
import { trackLead, trackQuizCustom } from './MetaPixel';

export function LeadQuiz() {
  const searchParams = useSearchParams();
  const variantKey = searchParams.get('v') || 'default';
  const variant = getVariant(variantKey);

  // Steps: 1 (Hook), 2 (Category), 3 (Channel), 4 (Orders), 5 (Budget), 6 (Contact), 7 (WhatsApp Redirect)
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [category, setCategory] = useState<string>('skincare');
  const [channel, setChannel] = useState<string>('marketplace');
  const [orders, setOrders] = useState<string>('100-500');
  const [budget, setBudget] = useState<string>('25-50');

  // Contact inputs
  const [name, setName] = useState<string>('');
  const [phoneDigits, setPhoneDigits] = useState<string>('');
  const [storeLink, setStoreLink] = useState<string>('');
  const [honeypotCompany, setHoneypotCompany] = useState<string>('');

  // Validation & Submission
  const [phoneTouched, setPhoneTouched] = useState<boolean>(false);
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 7 Redirect
  const [countdown, setCountdown] = useState<number>(5);
  const [redirectBlocked, setRedirectBlocked] = useState<boolean>(false);

  // Headings focus ref for a11y
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Unique IDs for form
  const nameId = useId();
  const phoneId = useId();
  const linkId = useId();

  // Save UTMs to sessionStorage on initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    utmKeys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        sessionStorage.setItem(`lq_${key}`, val);
      }
    });

    // Initialize history state if not already set
    if (!window.history.state || typeof window.history.state.step !== 'number') {
      window.history.replaceState({ step: 1 }, '');
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.step === 'number') {
        setStep(e.state.step);
      } else {
        setStep(1);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchParams]);

  // Focus heading on step change for screen readers
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
    // Auto-focus name input on step 6 to trigger mobile autofill
    if (step === 6 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [step]);

  // Handle countdown & redirect on Step 7
  const waMessage = buildWhatsAppMessage({
    name: name || 'there',
    category,
    channel,
    orders,
    budget,
    storeLink,
  });
  const waUrl = buildWhatsAppUrl(waMessage);

  useEffect(() => {
    if (step !== 7) return;

    setCountdown(5);
    setRedirectBlocked(false);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          window.location.href = waUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Fallback if browser blocks automatic redirect
    const blockTimer = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setRedirectBlocked(true);
      }
    }, 7000);

    const handleVisibility = () => {
      if (document.hidden && countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      clearTimeout(blockTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [step, waUrl]);

  // Navigation helpers
  const goToStep = (nextStep: number) => {
    window.history.pushState({ step: nextStep }, '');
    setStep(nextStep);
    trackQuizCustom('QuizStep', { step: nextStep });
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setStep((prev) => Math.max(1, prev - 1));
    }
  };

  // Option selection with 180ms auto-advance
  const handleSelectOption = (
    setter: (val: string) => void,
    val: string,
    nextStep: number
  ) => {
    setter(val);
    setTimeout(() => {
      goToStep(nextStep);
    }, 180);
  };

  // Phone sanitization: strip non-digits, drop 91 if 12 digits, drop 0 if 11 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let digits = raw.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    digits = digits.slice(0, 10);
    setPhoneDigits(digits);
  };

  const formatPhoneDisplay = (digits: string) => {
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  };

  const isPhoneValid = /^[6-9]\d{9}$/.test(phoneDigits);
  const isNameValid = name.trim().length >= 2;

  // Form submission handler
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setPhoneTouched(true);

    if (!isNameValid || !isPhoneValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const leadId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lq_${Date.now()}`;
    const quality = calculateLeadQuality(channel, orders, budget);

    // 1. Fire Meta Pixel Lead event
    trackLead(leadId, {
      category,
      channel,
      orders,
      budget,
      quality,
    });

    // 2. Gather UTMs & Device info
    const getStored = (k: string) => (typeof window !== 'undefined' ? sessionStorage.getItem(`lq_${k}`) || '' : '');
    const utm_source = getStored('utm_source');
    const utm_medium = getStored('utm_medium');
    const utm_campaign = getStored('utm_campaign');
    const utm_content = getStored('utm_content');
    const utm_term = getStored('utm_term');
    const fbclid = getStored('fbclid');
    const device = typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 200) : '';
    const pageUrl = typeof window !== 'undefined' ? window.location.href.slice(0, 500) : '';

    const payload = {
      leadId,
      name: name.trim(),
      phone: `+91${phoneDigits}`,
      storeLink: storeLink.trim(),
      category,
      channel,
      orders,
      budget,
      quality,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      variant: variantKey,
      pageUrl,
      device,
      company: honeypotCompany,
    };

    // 3. Post to /api/lead with max 2.5s race timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch {
      // If fetch timed out or failed, fallback to sendBeacon
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon('/api/lead', blob);
        }
      } catch {
        // Continue regardless
      }
    }

    // Always proceed to Step 7
    setIsSubmitting(false);
    goToStep(7);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#F6F6F7] flex justify-center text-[#202223] font-sans antialiased selection:bg-[#E3F1EC] selection:text-[#004C3F]">
      <div className="w-full max-w-[440px] min-h-[100dvh] bg-white flex flex-col shadow-sm sm:my-auto sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[24px] sm:overflow-hidden sm:border sm:border-[#E1E3E5]">

        {/* ================= STEP 1: HOOK ================= */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDEEEF]">
              <div className="text-[20px] font-extrabold tracking-[-0.02em] text-[#004C3F]">
                AdsPeek
              </div>
              <div className="text-[12px] font-semibold text-[#004C3F] bg-[#E3F1EC] px-2.5 py-1 rounded-full">
                Shopify store experts
              </div>
            </div>

            {/* Main Hook Body */}
            <div className="flex-1 bg-[#F1F8F5] px-5 py-8 flex flex-col justify-center gap-4">
              <div className="self-start text-[12px] font-semibold text-[#004C3F] bg-white border border-[#C9E3D8] px-2.5 py-1 rounded-full">
                {variant.eyebrow}
              </div>

              <h1
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[32px] sm:text-[34px] leading-[1.12] font-extrabold tracking-[-0.025em] text-[#202223] outline-none"
              >
                {variant.headline}
              </h1>

              <p className="m-0 text-[16px] sm:text-[17px] leading-[1.5] text-[#4A4F55]">
                {variant.sub}
              </p>

              <button
                type="button"
                onClick={() => {
                  trackQuizCustom('QuizStart');
                  goToStep(2);
                }}
                className="mt-2 flex items-center justify-center gap-2.5 min-h-[58px] rounded-[14px] bg-[#008060] text-white text-[17px] font-bold shadow-[0_2px_0_#004C3F] hover:bg-[#007054] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{variant.cta}</span>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>

              <div className="flex justify-center gap-3.5 text-[13px] text-[#4A4F55]">
                <span>No payment needed</span>
                <span aria-hidden="true">·</span>
                <span>No spam calls</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 sm:pb-6 flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#008060" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#008060" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="15.5" r="1.4" fill="#FFFFFF" />
              </svg>
              <span>Your details stay private. We never share them.</span>
            </div>
          </div>
        )}

        {/* ================= STEP 2: WHAT DO YOU SELL? ================= */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header & Progress */}
            <div className="px-5 pt-3.5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Back"
                  className="w-11 h-11 -ml-2.5 flex items-center justify-center rounded-xl text-[#202223] hover:bg-black/5 cursor-pointer"
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div className="text-[13px] font-semibold text-[#5C6166]">Step 1 of 4</div>
                <div className="text-[17px] font-extrabold text-[#004C3F]">AdsPeek</div>
              </div>
              <div role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} className="h-1.5 rounded-full bg-[#E3F1EC] overflow-hidden">
                <div className="w-[25%] h-full bg-[#008060] rounded-full transition-all duration-300" />
              </div>
            </div>

            {/* Question Heading */}
            <div className="px-5 pt-7 flex flex-col gap-2">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#202223] outline-none"
              >
                What do you sell?
              </h2>
              <p className="m-0 text-[15px] text-[#4A4F55]">
                Pick one — we&apos;ll show stores built for your category.
              </p>
            </div>

            {/* Category 2-Column Grid */}
            <div className="px-5 pt-5 grid grid-cols-2 gap-3">
              {CATEGORY_OPTIONS.map((item) => {
                const isSelected = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectOption(setCategory, item.id, 3)}
                    className={`flex flex-col gap-2.5 p-4 min-h-[108px] text-left rounded-[16px] transition-all cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-2 border-[#008060] bg-[#F1F8F5]'
                        : 'border-[1.5px] border-[#E1E3E5] bg-white hover:border-[#C9CCCF]'
                    }`}
                  >
                    {/* Category SVG Icons */}
                    {item.id === 'skincare' && (
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 3h6v4H9z" />
                        <path d="M8 7h8l1 4v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z" />
                      </svg>
                    )}
                    {item.id === 'fashion' && (
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0z" />
                      </svg>
                    )}
                    {item.id === 'wellness' && (
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z" />
                        <path d="M4 20 14 10" />
                      </svg>
                    )}
                    {item.id === 'home' && (
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11 12 4l9 7" />
                        <path d="M5 10v10h14V10" />
                        <path d="M10 20v-6h4v6" />
                      </svg>
                    )}
                    {item.id === 'pets' && (
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="7" cy="8" r="2" />
                        <circle cx="17" cy="8" r="2" />
                        <circle cx="4" cy="14" r="2" />
                        <circle cx="20" cy="14" r="2" />
                        <path d="M12 13c-3 0-5 3-5 5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-2-2-5-5-5z" />
                      </svg>
                    )}
                    {item.id === 'other' && (
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="5" cy="12" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="19" cy="12" r="1.5" />
                      </svg>
                    )}
                    <span className="text-[16px] font-bold text-[#202223] leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="mt-auto px-5 py-4 pb-6 flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>Takes about 30 seconds · Tap to continue</span>
            </div>
          </div>
        )}

        {/* ================= STEP 3: WHERE DO YOU SELL TODAY? ================= */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header & Progress */}
            <div className="px-5 pt-3.5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Back"
                  className="w-11 h-11 -ml-2.5 flex items-center justify-center rounded-xl text-[#202223] hover:bg-black/5 cursor-pointer"
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div className="text-[13px] font-semibold text-[#5C6166]">Step 2 of 4</div>
                <div className="text-[17px] font-extrabold text-[#004C3F]">AdsPeek</div>
              </div>
              <div role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} className="h-1.5 rounded-full bg-[#E3F1EC] overflow-hidden">
                <div className="w-[50%] h-full bg-[#008060] rounded-full transition-all duration-300" />
              </div>
            </div>

            {/* Microcopy box based on category */}
            <div className="mx-5 mt-5 p-3 rounded-[12px] bg-[#F1F8F5] flex items-start gap-2.5">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-[14px] leading-[1.45] text-[#004C3F]">
                {STEP3_MICROCOPY[category] || STEP3_MICROCOPY.other}
              </span>
            </div>

            {/* Question Heading */}
            <div className="px-5 pt-5 flex flex-col gap-2">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#202223] outline-none"
              >
                Where do you sell today?
              </h2>
              <p className="m-0 text-[15px] text-[#4A4F55]">
                Your main channel right now.
              </p>
            </div>

            {/* Channel Options */}
            <div className="px-5 pt-5 flex flex-col gap-3">
              {CHANNEL_OPTIONS.map((item) => {
                const isSelected = channel === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectOption(setChannel, item.id, 4)}
                    className={`flex items-center gap-3.5 min-h-[64px] px-4.5 rounded-[16px] text-left transition-all cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-2 border-[#008060] bg-[#F1F8F5]'
                        : 'border-[1.5px] border-[#E1E3E5] bg-white hover:border-[#C9CCCF]'
                    }`}
                  >
                    <span
                      className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#008060] bg-[#008060]' : 'border-[#8C9196]'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[16px] font-bold text-[#202223]">{item.label}</span>
                      <span className="text-[13px] text-[#5C6166]">{item.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="mt-auto px-5 py-4 pb-6 flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>2 more taps</span>
            </div>
          </div>
        )}

        {/* ================= STEP 4: MONTHLY ORDERS ================= */}
        {step === 4 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header & Progress */}
            <div className="px-5 pt-3.5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Back"
                  className="w-11 h-11 -ml-2.5 flex items-center justify-center rounded-xl text-[#202223] hover:bg-black/5 cursor-pointer"
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div className="text-[13px] font-semibold text-[#5C6166]">Step 3 of 4</div>
                <div className="text-[17px] font-extrabold text-[#004C3F]">AdsPeek</div>
              </div>
              <div role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} className="h-1.5 rounded-full bg-[#E3F1EC] overflow-hidden">
                <div className="w-[75%] h-full bg-[#008060] rounded-full transition-all duration-300" />
              </div>
            </div>

            {/* Microcopy box based on channel */}
            <div className="mx-5 mt-5 p-3 rounded-[12px] bg-[#F1F8F5] flex items-start gap-2.5">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-[14px] leading-[1.45] text-[#004C3F]">
                {STEP4_MICROCOPY[channel] || STEP4_MICROCOPY.marketplace}
              </span>
            </div>

            {/* Question Heading */}
            <div className="px-5 pt-5 flex flex-col gap-2">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#202223] outline-none"
              >
                How many orders a month?
              </h2>
              <p className="m-0 text-[15px] text-[#4A4F55]">
                A rough number is fine — across all channels.
              </p>
            </div>

            {/* Orders 2-Column Grid */}
            <div className="px-5 pt-5 grid grid-cols-2 gap-3">
              {ORDERS_OPTIONS.map((item) => {
                const isSelected = orders === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectOption(setOrders, item.id, 5)}
                    className={`flex flex-col justify-center gap-1 p-4 min-h-[96px] text-left rounded-[16px] transition-all cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-2 border-[#008060] bg-[#F1F8F5]'
                        : 'border-[1.5px] border-[#E1E3E5] bg-white hover:border-[#C9CCCF]'
                    }`}
                  >
                    <span className="text-[24px] font-extrabold tracking-[-0.02em] text-[#202223]">
                      {item.label}
                    </span>
                    <span className={`text-[13px] ${isSelected ? 'text-[#004C3F] font-semibold' : 'text-[#5C6166]'}`}>
                      {item.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="mt-auto px-5 py-4 pb-6 flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>Almost done — 1 more tap</span>
            </div>
          </div>
        )}

        {/* ================= STEP 5: BUDGET ================= */}
        {step === 5 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header & Progress */}
            <div className="px-5 pt-3.5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Back"
                  className="w-11 h-11 -ml-2.5 flex items-center justify-center rounded-xl text-[#202223] hover:bg-black/5 cursor-pointer"
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div className="text-[13px] font-semibold text-[#5C6166]">Step 4 of 4</div>
                <div className="text-[17px] font-extrabold text-[#004C3F]">AdsPeek</div>
              </div>
              <div role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} className="h-1.5 rounded-full bg-[#E3F1EC] overflow-hidden">
                <div className="w-[100%] h-full bg-[#008060] rounded-full transition-all duration-300" />
              </div>
            </div>

            {/* Question Heading */}
            <div className="px-5 pt-7 flex flex-col gap-2">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#202223] outline-none"
              >
                What budget feels right for your store?
              </h2>
              <p className="m-0 text-[15px] text-[#4A4F55]">
                So we suggest the right plan — no hidden costs later.
              </p>
            </div>

            {/* Budget Options */}
            <div className="px-5 pt-5 flex flex-col gap-3">
              {BUDGET_OPTIONS.map((item) => {
                const isSelected = budget === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectOption(setBudget, item.id, 6)}
                    className={`flex items-center justify-between gap-3 min-h-[64px] px-4.5 rounded-[16px] text-left transition-all cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-2 border-[#008060] bg-[#F1F8F5]'
                        : 'border-[1.5px] border-[#E1E3E5] bg-white hover:border-[#C9CCCF]'
                    }`}
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[17px] font-bold text-[#202223]">{item.label}</span>
                      <span className={`text-[13px] ${isSelected ? 'text-[#004C3F] font-semibold' : 'text-[#5C6166]'}`}>
                        {item.sub}
                      </span>
                    </span>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isSelected ? '#008060' : '#8C9196'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                );
              })}
            </div>

            {/* Every store includes chips */}
            <div className="mx-5 mt-5 flex flex-col gap-2.5">
              <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#5C6166]">
                Every store includes
              </div>
              <div className="flex flex-wrap gap-2">
                {STORE_FEATURES_INCLUDED.map((feat) => (
                  <span
                    key={feat}
                    className="text-[13px] font-semibold px-3 py-2 rounded-full bg-[#F6F6F7] text-[#303438]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="mt-auto px-5 py-4 pb-6 flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>Last question</span>
            </div>
          </div>
        )}

        {/* ================= STEP 6: CONTACT ================= */}
        {step === 6 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header & Progress */}
            <div className="px-5 pt-3.5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Back"
                  className="w-11 h-11 -ml-2.5 flex items-center justify-center rounded-xl text-[#202223] hover:bg-black/5 cursor-pointer"
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div className="text-[13px] font-bold text-[#008060]">You qualify</div>
                <div className="text-[17px] font-extrabold text-[#004C3F]">AdsPeek</div>
              </div>
              <div role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} className="h-1.5 rounded-full bg-[#008060]" />
            </div>

            {/* Selected Answers Summary Chips */}
            <div className="mx-5 mt-5 p-3.5 rounded-[14px] bg-[#F1F8F5] flex flex-col gap-2.5">
              <div className="text-[13px] font-bold text-[#004C3F]">
                Your store plan is ready for
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[12px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#C9E3D8] text-[#004C3F]">
                  {CATEGORY_OPTIONS.find((c) => c.id === category)?.shortLabel || category}
                </span>
                <span className="text-[12px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#C9E3D8] text-[#004C3F]">
                  {CHANNEL_OPTIONS.find((c) => c.id === channel)?.shortLabel || channel}
                </span>
                <span className="text-[12px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#C9E3D8] text-[#004C3F]">
                  {ORDERS_OPTIONS.find((o) => o.id === orders)?.shortLabel || orders}
                </span>
                <span className="text-[12px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#C9E3D8] text-[#004C3F]">
                  {BUDGET_OPTIONS.find((b) => b.id === budget)?.shortLabel || budget}
                </span>
              </div>
            </div>

            {/* Question Heading */}
            <div className="px-5 pt-5 flex flex-col gap-1.5">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#202223] outline-none"
              >
                Where should we send it?
              </h2>
              <p className="m-0 text-[15px] text-[#4A4F55]">
                We&apos;ll WhatsApp your plan — no calls unless you ask.
              </p>
            </div>

            {/* Semantic Form */}
            <form
              onSubmit={handleSubmitContact}
              noValidate
              autoComplete="on"
              method="post"
              action="/api/lead"
              className="px-5 pt-5 flex flex-col gap-3.5"
            >
              {/* Honeypot field for bot spam prevention */}
              <input
                type="text"
                name="company"
                value={honeypotCompany}
                onChange={(e) => setHoneypotCompany(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className="text-[14px] font-semibold text-[#202223]">
                  Your name
                </label>
                <input
                  ref={nameInputRef}
                  id={nameId}
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setNameTouched(true)}
                  autoComplete="name"
                  autoCapitalize="words"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  placeholder="e.g. Priya"
                  required
                  className={`h-[52px] px-3.5 rounded-[12px] border text-[16px] text-[#202223] placeholder:text-[#8C9196] outline-none transition-all ${
                    nameTouched && !isNameValid
                      ? 'border-[#D72C0D] focus:ring-2 focus:ring-[#D72C0D]/20'
                      : 'border-[#C9CCCF] focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/20'
                  }`}
                />
                {nameTouched && !isNameValid && (
                  <span className="text-[12px] text-[#D72C0D]">Please enter your name (at least 2 letters)</span>
                )}
              </div>

              {/* WhatsApp Phone Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={phoneId} className="text-[14px] font-semibold text-[#202223]">
                  WhatsApp number
                </label>
                <div
                  className={`flex h-[52px] rounded-[12px] overflow-hidden border transition-all ${
                    phoneTouched && !isPhoneValid
                      ? 'border-[#D72C0D] focus-within:ring-2 focus-within:ring-[#D72C0D]/20'
                      : 'border-[#C9CCCF] focus-within:border-[#008060] focus-within:ring-2 focus-within:ring-[#008060]/20'
                  }`}
                >
                  <span className="flex items-center px-3 bg-[#F6F6F7] text-[16px] font-semibold text-[#303438] border-r border-[#E1E3E5] select-none">
                    +91
                  </span>
                  <input
                    id={phoneId}
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    value={formatPhoneDisplay(phoneDigits)}
                    onChange={handlePhoneChange}
                    onBlur={() => setPhoneTouched(true)}
                    autoComplete="tel"
                    enterKeyHint="next"
                    placeholder="98765 43210"
                    required
                    className="flex-1 min-w-0 px-3 text-[16px] text-[#202223] placeholder:text-[#8C9196] outline-none bg-white"
                  />
                </div>
                {phoneTouched && !isPhoneValid && (
                  <span className="text-[12px] text-[#D72C0D]">Enter a 10-digit WhatsApp number</span>
                )}
              </div>

              {/* Store or Instagram Link (Optional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={linkId} className="text-[14px] font-semibold text-[#202223]">
                  Store or Instagram link <span className="font-normal text-[#5C6166]">(optional)</span>
                </label>
                <input
                  id={linkId}
                  name="url"
                  type="text"
                  inputMode="url"
                  value={storeLink}
                  onChange={(e) => setStoreLink(e.target.value)}
                  autoComplete="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="done"
                  placeholder="amazon.in/… or @yourbrand"
                  maxLength={200}
                  className="h-[52px] px-3.5 rounded-[12px] border border-[#C9CCCF] text-[16px] text-[#202223] placeholder:text-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/20"
                />
              </div>

              {/* Submit CTA & Privacy */}
              <div className="mt-4 flex flex-col gap-3 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2.5 min-h-[56px] rounded-[14px] bg-[#008060] text-white text-[17px] font-bold shadow-[0_2px_0_#004C3F] hover:bg-[#007054] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
                  </svg>
                  <span>{isSubmitting ? 'Saving…' : 'Get my store plan on WhatsApp'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span>100% private · Never shared or sold</span>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 7: WHATSAPP REDIRECT ================= */}
        {step === 7 && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-center px-5 py-4 border-b border-[#EDEEEF]">
              <div className="text-[20px] font-extrabold tracking-[-0.02em] text-[#004C3F]">
                AdsPeek
              </div>
            </div>

            {/* Success Hero */}
            <div className="px-5 pt-8 flex flex-col items-center gap-3.5 text-center">
              <div className="w-[72px] h-[72px] rounded-full bg-[#E3F1EC] flex items-center justify-center">
                <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#008060" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <h2
                ref={headingRef}
                tabIndex={-1}
                className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#202223] outline-none"
              >
                You&apos;re a great fit for a Shopify store
              </h2>

              <p className="m-0 text-[15px] leading-[1.5] text-[#4A4F55]">
                Just tap <b>Send</b> in WhatsApp and our team replies with your plan.
              </p>

              {/* Status Pill with Countdown */}
              <div
                role="status"
                aria-live="polite"
                className={`flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-[#F1F8F5] border border-[#C9E3D8] transition-all ${
                  redirectBlocked ? 'animate-pulse' : ''
                }`}
              >
                <span className="w-[34px] h-[34px] rounded-full border-[3px] border-[#008060] flex items-center justify-center text-[15px] font-extrabold text-[#004C3F]">
                  {countdown}
                </span>
                <span className="text-[14px] font-semibold text-[#004C3F]">
                  {redirectBlocked ? 'Tap the button to open WhatsApp' : `Opening WhatsApp in ${countdown} seconds…`}
                </span>
              </div>
            </div>

            {/* WhatsApp Message Preview Bubble */}
            <div className="mx-5 mt-6 p-4 rounded-[16px] bg-[#EFEAE2] flex flex-col gap-2">
              <div className="text-[12px] font-semibold text-[#5C6166]">
                Your message (pre-filled)
              </div>
              <div className="self-end max-w-[88%] p-3.5 rounded-[14px_14px_4px_14px] bg-[#D9FDD3] text-[14px] leading-[1.5] text-[#202223] shadow-xs">
                {waMessage}
              </div>
            </div>

            {/* Immediate Action Buttons */}
            <div className="px-5 pt-5 flex flex-col gap-3">
              <a
                href={waUrl}
                className="flex items-center justify-center gap-2.5 min-h-[56px] rounded-[14px] bg-[#008060] text-white text-[17px] font-bold no-underline shadow-[0_2px_0_#004C3F] hover:bg-[#007054] active:scale-[0.98] transition-all"
              >
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
                </svg>
                <span>Open WhatsApp now</span>
              </a>
              <div className="text-center text-[13px] text-[#5C6166]">
                Didn&apos;t open?{' '}
                <a href={waUrl} className="font-semibold text-[#008060] underline">
                  Tap here
                </a>
              </div>
            </div>

            {/* What happens next section */}
            <div className="mx-5 mt-6 flex flex-col gap-3">
              <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#5C6166]">
                What happens next
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#E3F1EC] text-[#004C3F] text-[13px] font-extrabold flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-[14px] text-[#303438]">
                  We reply with stores built for your category
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#E3F1EC] text-[#004C3F] text-[13px] font-extrabold flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-[14px] text-[#303438]">
                  A 10-min call to plan your store — only if you want
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#E3F1EC] text-[#004C3F] text-[13px] font-extrabold flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-[14px] text-[#303438]">
                  Fixed quote. No surprises.
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto px-5 py-4 pb-6 flex items-center justify-center gap-2 text-[12px] text-[#5C6166]">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>AdsPeek · Sector 22, Gurugram</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
export default LeadQuiz;
