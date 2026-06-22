"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Users } from "lucide-react";
import ToolsMarquee from "./ToolsMarquee";
import ConsultationModal from "./ConsultationModal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const benefits = [
  "Free Growth Roadmap",
  "Expert Consultation",
  "Agency Matching",
  "Industry-Specific Guidance",
  "No Sales Pressure",
];

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden">
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(to_right,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)] opacity-50"
        />

        {/* Blue glow */}
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 pt-12 pb-24 flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span className="text-xs font-semibold text-[var(--accent)] tracking-wide">Business Growth Advisory Platform</span>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div {...fadeUp(0.16)} className="mb-5">
            <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 shadow-sm">
              <Users size={14} className="text-emerald-600" aria-hidden />
              <span className="text-[11px] font-bold tracking-wide text-emerald-700 sm:text-xs">
                Trusted by 200+ New Businesses
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-[40px] sm:text-5xl lg:text-7xl xl:text-[78px] font-black tracking-tight text-[var(--foreground)] leading-[1.06] max-w-4xl"
          >
            Find The Right{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Marketing Partner</span>
              <motion.span
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-1 h-4 bg-blue-100 -z-10 rounded-sm"
              />
            </span>
            {" "}In Minutes, Not Months.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            {...fadeUp(0.35)}
            className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-xl leading-relaxed"
          >
            Expert guidance. Clear roadmap. Better agency decisions.
          </motion.p>

          {/* Benefit badges */}
          <motion.div
            {...fadeUp(0.45)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {benefits.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] shadow-sm"
              >
                <Check size={12} className="text-emerald-500 flex-shrink-0" strokeWidth={3} />
                {b}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.55)} className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[var(--foreground)] text-white rounded-xl text-sm font-bold hover:bg-[var(--foreground)]/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/12 min-h-[52px]"
            >
              Get My Free Growth Plan
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
            <a
              href="#how-we-help"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl text-sm font-bold hover:bg-[var(--surface)] hover:border-[var(--foreground)]/20 transition-all duration-200 min-h-[52px]"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Tools section */}
          <motion.div {...fadeUp(0.65)} className="mt-16 w-full">
            <p className="text-[10px] font-black text-[var(--muted)] tracking-[0.22em] uppercase mb-5">
              Trusted Platforms
            </p>
            <ToolsMarquee />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-[var(--border)] flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--muted)]" />
          </motion.div>
        </motion.div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
