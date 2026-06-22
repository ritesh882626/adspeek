"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const principles = [
  {
    number: "01",
    title: "Diagnosis before prescription.",
    body: "A doctor who prescribes without diagnosing is dangerous. So is a marketer who pitches before understanding. We diagnose first — always.",
  },
  {
    number: "02",
    title: "The right partner over the loudest pitch.",
    body: "The best agency for your business may not be the most famous one. We care about fit — your stage, budget, industry, and goals.",
  },
  {
    number: "03",
    title: "Clarity is the product.",
    body: "We don't sell retainers. We don't earn commissions. Our only product is clarity — and clarity is worth more than any service we could sell you.",
  },
];

const testimonials = [
  {
    quote: "They told me I didn't need to run ads yet. That my website couldn't convert. That was the most valuable advice I've ever received from a 'marketing' conversation.",
    name: "Rahul Mehta",
    role: "Founder, BuildNest",
    initial: "RM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "I was about to sign a ₹3L/month contract with an agency. One consultation changed my mind — and saved me money while finding me a much better fit.",
    name: "Sneha Kapoor",
    role: "Co-Founder, StyleLoop",
    initial: "SK",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    quote: "The growth plan they gave me was more detailed and honest than anything I'd received from agencies who were actively pitching for our business.",
    name: "Karan Singh",
    role: "Director, PharmaPlus",
    initial: "KS",
    color: "bg-violet-100 text-violet-700",
  },
];

export default function PhilosophySection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Philosophy */}
      <section className="py-16 lg:py-28 bg-white border-b border-[var(--border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase block mb-4">Our Philosophy</span>
              <h2 className="text-[32px] lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.08] mb-6">
                We&apos;re Not Here To Sell You Marketing Plans.
              </h2>
              <p className="text-xl text-[var(--muted)] font-medium mb-8 leading-relaxed">
                We&apos;re here to help you find{" "}
                <span className="text-[var(--foreground)] font-black">the right solution.</span>
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-10 max-w-md">
                The Indian market is full of agencies that will take your money and run campaigns.
                What&apos;s rare is someone who will sit with you, understand your business, and tell you
                the honest truth — even if the honest truth is &quot;you&apos;re not ready for paid ads yet.&quot;
                <br /><br />
                That&apos;s what we do. And that&apos;s why businesses trust us before they trust any agency.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--foreground)] text-white rounded-xl text-sm font-bold hover:bg-[var(--foreground)]/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
              >
                Consult Us Now
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Right: principles */}
            <div className="space-y-5">
              {principles.map((p, i) => (
                <motion.div
                  key={p.number}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent-light)]/30 transition-all group"
                >
                  <span className="text-3xl font-black text-[var(--border)] group-hover:text-[var(--accent)]/20 transition-colors leading-none flex-shrink-0">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="font-black text-[var(--foreground)] mb-2">{p.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase block mb-3">What Clients Say</span>
            <h2 className="text-3xl font-black text-[var(--foreground)]">The Conversation That Changed Things</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-[var(--border)] p-7 relative"
              >
                <Quote size={20} className="text-[var(--accent)]/30 mb-4" />
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-6 font-medium">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-black flex-shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[var(--foreground)]">{t.name}</p>
                    <p className="text-xs text-[var(--muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="py-20 bg-[var(--foreground)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08] mb-5">
              Ready for Clarity Over Confusion?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Get your free personalized growth plan. No sales call, no pitch — just honest advice from a senior consultant who understands your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[var(--foreground)] rounded-xl text-sm font-bold hover:bg-[var(--surface)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Free Growth Plan
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
              >
                Talk to a Consultant
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
