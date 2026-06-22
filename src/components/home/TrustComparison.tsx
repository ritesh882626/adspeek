"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Check, FileQuestion, FileCheck, EyeOff, Eye, DollarSign, TrendingUp, ThumbsDown, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";

const differentiators = [
  {
    topic: "Understanding Your Business",
    agency: { text: "Generic pitch decks sent to every client", icon: FileQuestion },
    advisory: { text: "Deep-dive consultation before any recommendation", icon: FileCheck },
  },
  {
    topic: "Transparency",
    agency: { text: "Black-box reporting with vanity metrics", icon: EyeOff },
    advisory: { text: "Full data access and honest performance reviews", icon: Eye },
  },
  {
    topic: "Budget Efficiency",
    agency: { text: "Bundled services you may never need", icon: DollarSign },
    advisory: { text: "Invest only in channels proven for your model", icon: TrendingUp },
  },
  {
    topic: "Outcome",
    agency: { text: "Hope the agency delivers", icon: ThumbsDown },
    advisory: { text: "Know exactly what to expect before you start", icon: ThumbsUp },
  },
];

export default function TrustComparison() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const step = (amount: number) => {
    setDirection(amount);
    setActiveIndex((current) => (current + amount + differentiators.length) % differentiators.length);
  };

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % differentiators.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  const active = differentiators[activeIndex];
  const AgencyIcon = active.agency.icon;
  const AdvisoryIcon = active.advisory.icon;

  return (
    <section className="py-16 lg:py-28 bg-[var(--surface)] border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 lg:mb-16"
        >
          <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase block mb-3">Why We&apos;re Different</span>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--foreground)] mb-4 leading-[1.08]">
            We Don&apos;t Sell Marketing
          </h2>
          <p className="text-xl text-[var(--muted)] font-medium">
            We Help You{" "}
            <span className="text-[var(--foreground)] font-black">Buy The Right Marketing Partner</span>
          </p>
        </motion.div>

        {/* One large comparison card, advanced automatically or with controls */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.article
              key={active.topic}
              custom={direction}
              initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? -90 : 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 90 : -90 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-xl shadow-black/5"
            >
              <div className="border-b border-[var(--border)] bg-white px-6 py-5 text-center sm:px-8">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(differentiators.length).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-xl font-black text-[var(--foreground)] sm:text-2xl">{active.topic}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex min-h-[190px] flex-col justify-between border-b border-[var(--border)] p-6 md:border-b-0 md:border-r md:p-9">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                      <AgencyIcon size={19} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-red-400">Traditional Agency</p>
                      <p className="text-xs text-[var(--muted)]">What you&apos;ve experienced</p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-start gap-3">
                    <X size={19} className="mt-0.5 flex-shrink-0 text-red-400" />
                    <p className="text-base font-semibold leading-relaxed text-[var(--muted)] sm:text-lg">{active.agency.text}</p>
                  </div>
                </div>

                <div className="flex min-h-[190px] flex-col justify-between bg-[var(--accent)] p-6 md:p-9">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <AdvisoryIcon size={19} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white">Our Advisory Model</p>
                      <p className="text-xs text-white/65">What you actually need</p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-start gap-3">
                    <Check size={19} className="mt-0.5 flex-shrink-0 text-white" />
                    <p className="text-base font-bold leading-relaxed text-white sm:text-lg">{active.advisory.text}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-label="Comparison carousel navigation">
              {differentiators.map((item, index) => (
                <button
                  key={item.topic}
                  type="button"
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="flex min-h-11 items-center"
                  aria-label={`Show ${item.topic}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-7 bg-[var(--accent)]" : "w-2.5 bg-slate-300"}`} />
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] transition hover:border-blue-200 hover:text-[var(--accent)] active:scale-95"
                aria-label="Previous comparison"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--foreground)] text-white transition hover:bg-[var(--foreground)]/90 active:scale-95"
                aria-label="Next comparison"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
