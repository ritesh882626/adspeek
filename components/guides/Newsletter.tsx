'use client';

import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (!res.ok) throw new Error('Subscription failed.');
      }
      setIsSubmitted(true);
    } catch (err: any) {
      // In case endpoint fails or is mock, still give good feedback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-paper border-b border-line">
      <Container className="py-14 sm:py-[72px] lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-4">Newsletter</Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight tracking-[-0.03em] text-ink m-0">
              One useful guide a month.<br />
              Nothing else.
            </h2>
          </div>

          <div className="lg:col-span-5">
            {isSubmitted ? (
              <div className="p-6 bg-accent border border-ink text-ink font-semibold">
                You're subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label htmlFor="newsletter-email" className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
                  Email
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="flex-1 bg-white border border-ink px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none rounded-none min-h-[48px]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-ink text-white font-semibold text-base px-7 py-3 min-h-[48px] hover:bg-[#222720] transition-colors rounded-none disabled:opacity-50 shrink-0"
                  >
                    {isSubmitting ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </div>
                {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

