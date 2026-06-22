"use client";

import { motion } from "framer-motion";
import { X, Check, FileQuestion, FileCheck, EyeOff, Eye, DollarSign, TrendingUp, ThumbsDown, ThumbsUp } from "lucide-react";

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
  return (
    <section className="py-28 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
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

        {/* ── Desktop: 3-column header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:grid grid-cols-[1fr_1fr_1fr] gap-4 mb-3 px-2"
        >
          <div />
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-[var(--border)] text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-3">
              <X size={18} className="text-red-500" />
            </div>
            <h3 className="font-black text-sm text-[var(--foreground)]">Traditional Agency</h3>
            <p className="text-[10px] text-[var(--muted)] mt-0.5">What you&apos;ve experienced</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[var(--accent)] text-center">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <Check size={18} className="text-white" />
            </div>
            <h3 className="font-black text-sm text-white">Our Advisory Model</h3>
            <p className="text-[10px] text-white/70 mt-0.5">What you actually need</p>
          </div>
        </motion.div>

        {/* ── Desktop: 3-column comparison rows ── */}
        <div className="hidden md:block space-y-2">
          {differentiators.map((row, i) => {
            const AgencyIcon = row.agency.icon;
            const AdvisoryIcon = row.advisory.icon;
            return (
              <motion.div
                key={row.topic}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[1fr_1fr_1fr] gap-4 items-center px-2 py-1"
              >
                <div className="text-xs font-bold text-[var(--muted)]">{row.topic}</div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[var(--border)]">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <AgencyIcon size={15} className="text-red-400" />
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-snug">{row.agency.text}</p>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--accent-light)] border border-blue-200">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <AdvisoryIcon size={15} className="text-white" />
                  </div>
                  <p className="text-xs text-[var(--foreground)] font-semibold leading-snug">{row.advisory.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile: stacked topic cards ── */}
        <div className="md:hidden space-y-4">
          {differentiators.map((row, i) => {
            const AgencyIcon = row.agency.icon;
            const AdvisoryIcon = row.advisory.icon;
            return (
              <motion.div
                key={`mobile-${row.topic}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-[var(--border)] overflow-hidden"
              >
                {/* Topic label */}
                <div className="px-4 py-2.5 bg-[var(--surface)] border-b border-[var(--border)]">
                  <p className="text-[11px] font-black text-[var(--muted)] uppercase tracking-[0.12em]">{row.topic}</p>
                </div>
                {/* Agency row */}
                <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-[var(--border)]">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <AgencyIcon size={15} className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-red-400 mb-0.5 uppercase tracking-wide">Traditional Agency</p>
                    <p className="text-sm text-[var(--muted)] leading-snug">{row.agency.text}</p>
                  </div>
                  <X size={14} className="text-red-300 flex-shrink-0" />
                </div>
                {/* Advisory row */}
                <div className="flex items-center gap-3 px-4 py-4 bg-[var(--accent-light)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <AdvisoryIcon size={15} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[var(--accent)] mb-0.5 uppercase tracking-wide">Our Advisory</p>
                    <p className="text-sm text-[var(--foreground)] font-semibold leading-snug">{row.advisory.text}</p>
                  </div>
                  <Check size={14} className="text-[var(--accent)] flex-shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
