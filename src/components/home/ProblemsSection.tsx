"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ArrowRight, AlertCircle, BrainCircuit, ShoppingCart,
  EyeOff, Copy, Scale, Lock,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(Math.floor(v * problems.length), problems.length - 1);
    setActiveIndex(i);
  });

  return (
    <>
      <section
        id="how-we-help"
        ref={containerRef}
        className="relative bg-white"
        style={{ height: `${problems.length * 110 + 20}vh` }}
      >
        <div className="problems-scroll-inner sticky top-0 h-screen flex items-center">
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

                {/* Progress dots */}
                <div className="flex items-center gap-2 mb-8">
                  {problems.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: i === activeIndex ? 28 : 10,
                        background: i === activeIndex ? "var(--accent)" : i < activeIndex ? "rgba(37,99,235,0.25)" : "var(--border)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--foreground)] text-white rounded-xl text-sm font-bold hover:bg-[var(--foreground)]/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Tell Us Your Exact Problem
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Right: animated cards */}
              <div className="relative h-[480px] hidden lg:flex items-center">
                {problems.map((p, i) => {
                  const Icon = p.icon;
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <motion.div
                      key={p.number}
                      className="absolute inset-x-0"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : isPast ? -64 : 80,
                        scale: isActive ? 1 : isPast ? 0.94 : 1.02,
                        zIndex: isActive ? 10 : 0,
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-2xl shadow-black/8">
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                              <Icon size={20} className="text-[var(--accent)]" />
                            </div>
                            <span className="text-5xl font-black text-[var(--border)] leading-none select-none">{p.number}</span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
                            {p.tag}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-[var(--foreground)] mb-1 leading-snug">{p.title}</h3>
                        <p className="text-[var(--accent)] font-bold text-sm mb-4">{p.accent}</p>
                        <p className="text-[var(--muted)] leading-relaxed text-sm mb-6">{p.body}</p>

                        {/* Stat */}
                        <div className="flex items-baseline gap-3 pt-5 border-t border-[var(--border)]">
                          <span className="text-3xl font-black text-[var(--foreground)]">{p.stat}</span>
                          <span className="text-xs text-[var(--muted)] leading-snug max-w-[240px]">{p.statLabel}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile: stacked */}
              <div className="lg:hidden space-y-4">
                {problems.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.number} className="bg-white border border-[var(--border)] rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                            <Icon size={16} className="text-[var(--accent)]" />
                          </div>
                          <span className="text-3xl font-black text-[var(--border)]">{p.number}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">{p.tag}</span>
                      </div>
                      <h3 className="font-black text-[var(--foreground)] mb-0.5">{p.title}</h3>
                      <p className="text-[var(--accent)] text-sm font-bold mb-3">{p.accent}</p>
                      <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">{p.body}</p>
                      <div className="flex items-baseline gap-2 pt-4 border-t border-[var(--border)]">
                        <span className="text-2xl font-black text-[var(--foreground)]">{p.stat}</span>
                        <span className="text-xs text-[var(--muted)]">{p.statLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
