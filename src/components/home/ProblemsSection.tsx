"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, AlertCircle, BrainCircuit, ShoppingCart,
  EyeOff, Copy, Scale, Lock, ChevronLeft, ChevronRight,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const problems = [
  {
    number: "01",
    icon: AlertCircle,
    title: "Agency promised everything.",
    accent: "Delivered nothing.",
    body: "You were sold guaranteed rankings, viral campaigns, and 10x ROAS. Six months and several lakhs later — nothing moved. Not even the needle.",
    tag: "Broken Promises",
    stat: "73%",
    statLabel: "of businesses regret hiring the wrong marketing partner",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Nobody understood your business.",
    accent: "Generic pitches, zero context.",
    body: "Every agency sent the same deck. Nobody asked about your margins, your customers, your seasonality, or how you actually make money.",
    tag: "No Understanding",
    stat: "68%",
    statLabel: "report agencies never understood their core business model",
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "Expensive services you never needed.",
    accent: "Paying for what didn't fit.",
    body: "You paid for SEO when you needed sales. You ran ads when your product wasn't ready. You bought a package when you needed a strategy.",
    tag: "Wrong Services",
    stat: "61%",
    statLabel: "of businesses overspend on services they never actually needed",
  },
  {
    number: "04",
    icon: EyeOff,
    title: "Zero transparency.",
    accent: "A black box of reports.",
    body: "Monthly PDFs full of vanity metrics. No access to your own ad accounts. No idea where your money actually went or what it bought.",
    tag: "No Transparency",
    stat: "79%",
    statLabel: "never had full access to their own ad accounts",
  },
  {
    number: "05",
    icon: Copy,
    title: "Generic strategies.",
    accent: "The same plan for 40 other clients.",
    body: "Cookie-cutter campaigns with no understanding of your industry, competitive landscape, customer psychology, or growth stage.",
    tag: "Copied Playbooks",
    stat: "82%",
    statLabel: "received a strategy identical to another client's",
  },
  {
    number: "06",
    icon: Scale,
    title: "Impossible to compare agencies.",
    accent: "Three proposals. Three formats. No clarity.",
    body: "Different structures, different pricing, different promises. No standardized way to evaluate who's actually better for your specific business.",
    tag: "No Benchmark",
    stat: "91%",
    statLabel: "found it impossible to objectively compare agencies",
  },
  {
    number: "07",
    icon: Lock,
    title: "Long contracts and hidden costs.",
    accent: "Locked in before you knew better.",
    body: "12-month retainers. Setup fees. Mandatory tooling. By the time you realized it wasn't working, the exit penalty made it worse to leave.",
    tag: "Locked In",
    stat: "67%",
    statLabel: "were locked into contracts before realizing the poor fit",
  },
];

export default function ProblemsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const showProblem = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex || (activeIndex === problems.length - 1 && nextIndex === 0) ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const step = (amount: number) => {
    setDirection(amount);
    setActiveIndex((current) => (current + amount + problems.length) % problems.length);
  };

  const activeProblem = problems[activeIndex];
  const ActiveIcon = activeProblem.icon;

  return (
    <>
      <section
        id="how-we-help"
        className="relative overflow-hidden bg-white py-16 lg:py-28"
      >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

              {/* Left: sticky panel */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase mb-4"
                >
                  The Problem
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="text-[28px] lg:text-4xl xl:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.1] mb-5"
                >
                  Most Businesses Don&apos;t Need{" "}
                  <span className="text-[var(--muted)]">More Marketing.</span>
                  <br />
                  They Need{" "}
                  <span className="relative">
                    The Right Marketing.
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden>
                      <path d="M0 6 Q75 1 150 5 Q225 9 300 4" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="text-[var(--muted)] leading-relaxed mb-8 max-w-md"
                >
                  Before you sign another retainer, you need clarity — on what your business actually needs and the confidence to choose a partner who can deliver it.
                </motion.p>

                {/* Progress controls */}
                <div className="mb-8 flex items-center gap-2" aria-label="Problem carousel navigation">
                  {problems.map((problem, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => showProblem(i)}
                      className="flex min-h-11 items-center px-0.5"
                      aria-label={`Show problem ${i + 1}: ${problem.tag}`}
                      aria-current={i === activeIndex ? "true" : undefined}
                    >
                      <span
                      className="block h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: i === activeIndex ? 28 : 10,
                        background: i === activeIndex ? "var(--accent)" : i < activeIndex ? "rgba(37,99,235,0.25)" : "var(--border)",
                      }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="group hidden lg:inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--foreground)] text-white rounded-xl text-sm font-bold hover:bg-[var(--foreground)]/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Tell Us Your Exact Problem
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Right: automatic, toggleable horizontal carousel */}
                <div
                className="relative min-h-[430px] sm:min-h-[390px] lg:min-h-[480px] flex items-center"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.article
                      key={activeProblem.number}
                      custom={direction}
                      initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? 36 : -36 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -36 : 36 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full"
                    >
                      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm lg:shadow-2xl lg:shadow-black/8">
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                              <ActiveIcon size={20} className="text-[var(--accent)]" />
                            </div>
                            <span className="text-4xl sm:text-5xl font-black text-[var(--border)] leading-none select-none">{activeProblem.number}</span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
                            {activeProblem.tag}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-1 leading-snug">{activeProblem.title}</h3>
                        <p className="text-[var(--accent)] font-bold text-sm mb-4">{activeProblem.accent}</p>
                        <p className="text-[var(--muted)] leading-relaxed text-sm mb-6">{activeProblem.body}</p>

                        {/* Stat */}
                        <div className="flex items-baseline gap-3 pt-5 border-t border-[var(--border)]">
                          <span className="text-3xl font-black text-[var(--foreground)]">{activeProblem.stat}</span>
                          <span className="text-xs text-[var(--muted)] leading-snug max-w-[240px]">{activeProblem.statLabel}</span>
                        </div>
                      </div>
                    </motion.article>
                </AnimatePresence>

                <div className="absolute -bottom-1 right-0 flex gap-2 sm:bottom-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm transition hover:border-blue-200 hover:text-[var(--accent)] active:scale-95"
                    aria-label="Previous problem"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--foreground)] text-white shadow-sm transition hover:bg-[var(--foreground)]/90 active:scale-95"
                    aria-label="Next problem"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                </div>

                {/* On mobile the CTA follows the card and its controls. */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-5 py-3 text-xs font-bold text-white transition active:scale-[0.98] lg:hidden"
                >
                  Tell Us Your Exact Problem
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
