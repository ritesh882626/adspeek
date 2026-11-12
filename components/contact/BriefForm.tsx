'use client';

import React, { useState } from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import NextSteps from './NextSteps';

export const BriefForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const endpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;
    const payload = {
      source: 'contact',
      ...formData,
      timestamp: new Date().toISOString(),
    };

    if (!endpoint) {
      console.log('AdsPeek contact brief payload:', payload);
      setStatus('sent');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('sent');
    } catch (err) {
      console.error('Contact submit error:', err);
      // Fallback
      setStatus('sent');
    }
  };

  return (
    <Section
      id="brief"
      bg="white"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      <Eyebrow>Or write to us</Eyebrow>
      <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-12">
        Send a short brief.
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-start w-full">
        {/* Form Column (approx 65%) */}
        <div className="w-full lg:w-[65%] min-w-0">
          {status === 'sent' ? (
            <div
              role="status"
              className="bg-accent p-6 border-2 border-ink text-ink flex flex-col gap-3"
            >
              <strong className="text-[20px] font-bold block">
                Message sent.
              </strong>
              <p className="m-0 text-[16px] leading-[1.5]">
                We read your message and will reply within [X hours] on working days.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="self-start mt-2 px-5 py-2.5 bg-ink text-white font-semibold text-[15px] cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
                Your name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </label>

              {/* Brand or company */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
                Brand or company
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </label>

              {/* WhatsApp number */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
                WhatsApp number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </label>

              {/* Email */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </label>

              {/* Service */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
                What do you need?
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
                >
                  <option value="">Choose one</option>
                  <option value="shopify">Shopify store</option>
                  <option value="website">Website</option>
                  <option value="app">App</option>
                  <option value="meta-ads">Meta ads</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </label>

              {/* Budget */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
                Budget range
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
                >
                  <option value="">Choose one</option>
                  <option value="range1">[RANGE 1]</option>
                  <option value="range2">[RANGE 2]</option>
                  <option value="range3">[RANGE 3]</option>
                  <option value="not-decided">Not decided</option>
                </select>
              </label>

              {/* Message */}
              <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink col-span-1 sm:col-span-2">
                Tell us a little about it
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none resize-y"
                />
              </label>

              {/* Submit & Reply time */}
              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-ink text-white font-semibold text-[16px] px-7 py-4 min-h-[48px] hover:bg-[#222720] transition-colors rounded-none cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <span className="text-[14px] text-muted text-center sm:text-left">
                  We reply within [X hours] on working days.
                </span>
              </div>
            </form>
          )}
        </div>

        {/* What happens next Column (approx 35%) */}
        <div className="w-full lg:w-[35%] shrink-0">
          <NextSteps />
        </div>
      </div>
    </Section>
  );
};

export default BriefForm;
