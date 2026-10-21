'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Clock, Globe } from 'lucide-react';
import { detectUserRegionCurrency, REGION_CURRENCIES, type RegionCurrency } from '@/lib/currency';

export function HeroInquiryCard() {
  const [step, setStep] = useState<1 | 2>(1);
  const [region, setRegion] = useState<RegionCurrency>(REGION_CURRENCIES.INR);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phoneOrEmail: '',
    productsCount: '10 – 50 products',
    timeline: '2 – 4 weeks',
    budget: '',
    currency: 'INR',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detected = detectUserRegionCurrency();
      setRegion(detected);
      setFormData((prev) => ({
        ...prev,
        currency: detected.code,
        budget: detected.budgetOptions[1] || detected.budgetOptions[0],
      }));
    }
  }, []);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim() || !formData.phoneOrEmail.trim()) {
      setError('Please provide your name, city, and email or phone to continue.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/inquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hero_inquiry',
          name: formData.name,
          city: formData.city,
          phone: formData.phoneOrEmail.includes('@') ? '' : formData.phoneOrEmail,
          email: formData.phoneOrEmail.includes('@') ? formData.phoneOrEmail : '',
          productsCount: formData.productsCount,
          timeline: formData.timeline,
          budget: formData.budget,
          detectedCurrency: formData.currency,
          service: 'Custom Shopify Store Development',
          sourceUrl: window.location.href,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please check your inputs.');
      } else {
        setSuccess('Your consultation request has been logged successfully!');
        setInquiryId(data.leadId);
      }
    } catch {
      setError('Unable to submit inquiry. Please check your connection or email hello@adspeek.in.');
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (code: string) => {
    const newReg = REGION_CURRENCIES[code] || REGION_CURRENCIES.INR;
    setRegion(newReg);
    setFormData((prev) => ({
      ...prev,
      currency: code,
      budget: newReg.budgetOptions[1] || newReg.budgetOptions[0],
    }));
  };

  const productCountOptions = [
    '1 – 10 products',
    '10 – 50 products',
    '50 – 250 products',
    '250+ products',
  ];

  const timelineOptions = [
    'Immediately (<2 wks)',
    '2 – 4 weeks',
    '1 – 2 months',
    'Exploring',
  ];

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-card-light text-center animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-[#EBF7F2] text-[#0C5A48] flex items-center justify-center mx-auto mb-4 border border-[#D1EFE3]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-light text-gray-950 mb-2">
          Consultation Booked!
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
          Thanks <strong className="text-gray-900">{formData.name}</strong>! We’ve received your {formData.productsCount} project details for {formData.city}. Ritesh will reach out with a direct engineering proposal within 2 hours.
        </p>
        {inquiryId && (
          <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-600 mb-6">
            Reference: <span className="font-semibold text-gray-900">{inquiryId}</span>
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              setSuccess(null);
              setStep(1);
            }}
            className="text-xs sm:text-sm font-medium text-[#0C5A48] hover:underline cursor-pointer"
          >
            Submit another project inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 border border-gray-200/90 shadow-card-light w-full box-border">
      <div className="mb-4 sm:mb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider mb-2 border border-[#D1EFE3]">
          <Clock className="w-3 h-3" />
          <span>Takes 10 Seconds &bull; Zero Sales Push</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-light text-gray-900 tracking-tight">
          {step === 1 ? (
            <span>Start Your <span className="font-normal text-[#0C5A48]">Shopify Build</span></span>
          ) : (
            <span>Thanks <span className="font-normal text-[#0C5A48]">{formData.name}</span>! Store Details</span>
          )}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-light">
          {step === 1
            ? 'We do not charge consultation. Get honest engineering advice with zero sales pressure.'
            : 'Tell us about your catalog size and target launch date.'}
        </p>

        {/* 2-Step Progress Indicator */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-1 rounded-full bg-[#0C5A48]" />
          <div className={`flex-1 h-1 rounded-full transition-colors ${step === 2 ? 'bg-[#0C5A48]' : 'bg-gray-200'}`} />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Name, City, Contact */}
      {step === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Hi, can I know your name and city? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Full Name (e.g. Ritesh)"
              className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0C5A48]/20 focus:border-[#0C5A48] transition-all min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                City &amp; Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Gurugram, India"
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0C5A48]/20 focus:border-[#0C5A48] transition-all min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email or WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.phoneOrEmail}
                onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                placeholder="Email or Phone"
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0C5A48]/20 focus:border-[#0C5A48] transition-all min-h-[44px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer min-h-[48px]"
          >
            Continue to Store Questions
          </button>
        </form>
      )}

      {/* STEP 2: Products Count, Timeline, Currency Budget */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1.5">
              How many products do you want to list on the store? *
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {productCountOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFormData({ ...formData, productsCount: opt })}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    formData.productsCount === opt
                      ? 'bg-[#0C5A48] text-white border-[#0C5A48] shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1.5">
              How soon do you need the store? *
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {timelineOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFormData({ ...formData, timeline: opt })}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    formData.timeline === opt
                      ? 'bg-[#0C5A48] text-white border-[#0C5A48] shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-800">
                Estimated Budget ({region.label})
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="text-[11px] font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700 cursor-pointer"
              >
                <option value="INR">INR (₹ India)</option>
                <option value="USD">USD ($ USA)</option>
                <option value="GBP">GBP (£ UK)</option>
                <option value="AED">AED (UAE)</option>
                <option value="AUD">AUD (A$ Aus)</option>
                <option value="EUR">EUR (€ Europe)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {region.budgetOptions.slice(0, 4).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFormData({ ...formData, budget: opt })}
                  className={`px-2.5 py-2 rounded-lg text-xs font-mono font-medium border text-center transition-all cursor-pointer truncate ${
                    formData.budget === opt
                      ? 'bg-[#0C5A48] text-white border-[#0C5A48] shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-all cursor-pointer min-h-[44px]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 px-5 rounded-xl bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer min-h-[48px] disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <span>Get Free Consultation</span>
              )}
            </button>
          </div>
        </form>
      )}

      <p className="text-[10px] text-gray-400 text-center mt-3 font-light">
        🔒 No spam. Direct technical reply within 2 hours.
      </p>
    </div>
  );
}
