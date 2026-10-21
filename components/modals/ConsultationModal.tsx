'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { detectUserRegionCurrency, REGION_CURRENCIES, type RegionCurrency } from '@/lib/currency';
import { IconHeroCheck } from '@/components/ui/PremiumIcons';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  defaultService = 'Custom Shopify Store Development',
}: ConsultationModalProps) {
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
    service: defaultService,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  }, [isOpen]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: defaultService }));
  }, [defaultService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim() || !formData.phoneOrEmail.trim()) {
      setError('Please provide your name, city, and email or phone.');
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
          type: 'consultation',
          name: formData.name,
          city: formData.city,
          phone: formData.phoneOrEmail.includes('@') ? '' : formData.phoneOrEmail,
          email: formData.phoneOrEmail.includes('@') ? formData.phoneOrEmail : '',
          productsCount: formData.productsCount,
          timeline: formData.timeline,
          budget: formData.budget,
          detectedCurrency: formData.currency,
          service: formData.service,
          sourceUrl: window.location.href,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again or email hello@adspeek.in');
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
    '250 – 1,000 products',
    '1,000+ products (Enterprise)',
  ];

  const timelineOptions = [
    'Immediately (within 2 weeks)',
    '2 – 4 weeks (Standard sprint)',
    '1 – 2 months',
    'Just exploring & planning',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center animate-in fade-in duration-300">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white via-[#F4F9F6] to-[#E6F4EE] border border-[#0C5A48]/20 shadow-[0_8px_24px_rgba(12,90,72,0.12)] flex items-center justify-center mx-auto mb-4">
              <IconHeroCheck size={36} />
            </div>
            <h3 className="text-2xl font-light text-gray-950 mb-2">
              Consultation Request Received!
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Thanks <strong className="text-gray-900">{formData.name}</strong>! Ritesh and the AdsPeek engineering team will review your {formData.productsCount} requirements and get back to you with honest architecture advice within 2 business hours.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs space-y-1.5 max-w-sm mx-auto mb-6 font-mono text-gray-700">
              <p><span className="text-gray-400">City:</span> {formData.city}</p>
              <p><span className="text-gray-400">Products:</span> {formData.productsCount}</p>
              <p><span className="text-gray-400">Timeline:</span> {formData.timeline}</p>
              <p><span className="text-gray-400">Budget:</span> {formData.budget}</p>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-[#0C5A48] text-white text-sm font-medium hover:bg-[#084537] transition-all cursor-pointer shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Form Headline with Refined Value Proposition */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7F2] text-[#0C5A48] text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 border border-[#D1EFE3]">
                <Clock className="w-3.5 h-3.5" />
                <span>Takes 10 Seconds &bull; Zero Sales Push</span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-light text-gray-950 tracking-tight">
                {step === 1 ? (
                  <span>Free Consultation — <span className="font-normal text-[#0C5A48]">No Salesy Push</span></span>
                ) : (
                  <span>Thanks <span className="font-normal text-[#0C5A48]">{formData.name}</span>, for your interest!</span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1.5 font-light leading-relaxed">
                {step === 1 ? (
                  'Direct engineering review from senior Shopify specialists. We don’t charge for consultation and don’t do high-pressure sales calls.'
                ) : (
                  'Tell us a few quick details about your store so we can prepare a tailored timeline and architecture plan.'
                )}
              </p>

              {/* Step indicator bar */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 h-1.5 rounded-full bg-[#0C5A48]" />
                <div className={`flex-1 h-1.5 rounded-full transition-colors ${step === 2 ? 'bg-[#0C5A48]' : 'bg-gray-200'}`} />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            {/* STEP 1: Name, City, Contact */}
            {step === 1 && (
              <form onSubmit={handleStep1Next} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-gray-200">
                  <p className="text-xs font-medium text-gray-900 mb-1">
                    Hi, can I know your name and city?
                  </p>
                  <p className="text-[11px] text-gray-500 font-light">
                    This helps us understand your market and match you with the right regional team.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ritesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    City &amp; Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurugram, Delhi NCR or New York, USA"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Work Email or WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. name@brand.com or +91 98765 43210"
                    value={formData.phoneOrEmail}
                    onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer mt-2"
                >
                  Continue to Store Details
                </button>
              </form>
            )}

            {/* STEP 2: Products Count, Timeline, Dynamic Currency Budget */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Question 1: How many products */}
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-2">
                    How many products do you want to list on your store? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {productCountOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, productsCount: opt })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                          formData.productsCount === opt
                            ? 'bg-[#0C5A48] text-white border-[#0C5A48] shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2: How soon */}
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-2">
                    How soon do you need the store? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {timelineOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, timeline: opt })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                          formData.timeline === opt
                            ? 'bg-[#0C5A48] text-white border-[#0C5A48] shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Dynamic Currency Budget */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-800">
                      Estimated Project Budget
                    </label>
                    {/* Region / Currency Switcher */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 font-mono">Currency:</span>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        className="text-xs font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700 cursor-pointer"
                      >
                        <option value="INR">INR (₹ India)</option>
                        <option value="USD">USD ($ USA)</option>
                        <option value="GBP">GBP (£ UK)</option>
                        <option value="AED">AED (UAE)</option>
                        <option value="AUD">AUD (A$ Aus)</option>
                        <option value="EUR">EUR (€ Europe)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {region.budgetOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, budget: opt })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-mono font-medium border text-center transition-all cursor-pointer ${
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

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </div>
                    ) : (
                      <span>Get Free Architecture Consultation</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="text-[11px] text-center text-gray-400 font-light mt-4">
              🔒 100% Privacy. We never share your details or cold call you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
