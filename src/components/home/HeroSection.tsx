"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [benefitIndex, setBenefitIndex] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const timer = window.setInterval(() => {
      setBenefitIndex((current) => (current + 1) % benefits.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

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

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 pt-8 pb-16 sm:pt-12 sm:pb-24 flex flex-col items-center text-center">

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
            className="text-[36px] sm:text-5xl lg:text-7xl xl:text-[78px] font-black tracking-tight text-[var(--foreground)] leading-[1.06] max-w-4xl"
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
            className="mt-5 text-sm sm:mt-6 sm:text-xl text-[var(--muted)] max-w-xl leading-relaxed"
          >
            Expert guidance. Clear roadmap. Better agency decisions.
          </motion.p>

          {/* Mobile rotating benefit — fixed height prevents layout shift */}
          <motion.div {...fadeUp(0.45)} className="relative mt-6 flex h-11 w-full items-center justify-center sm:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={benefits[benefitIndex]}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] shadow-sm"
              >
                <Check size={12} className="flex-shrink-0 text-emerald-500" strokeWidth={3} />
                {benefits[benefitIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Desktop benefit badges */}
          <motion.div
            {...fadeUp(0.45)}
            className="mt-8 hidden flex-wrap items-center justify-center gap-3 sm:flex"
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
          <motion.div {...fadeUp(0.55)} className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
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
          <motion.div {...fadeUp(0.65)} className="mt-12 sm:mt-16 w-full">
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
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
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
