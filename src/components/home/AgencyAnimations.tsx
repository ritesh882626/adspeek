"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, BarChart3, FileSearch, Gauge, Phone, Rocket, Trophy, UsersRound, WalletCards } from "lucide-react";

function CountUp({ target, format }: { target: number; format: (value: number) => string }) {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const duration = 1400;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, target]);

  return <>{format(value)}</>;
}

const dashboardStats = [
  { label: "Ad Spend", target: 48.75, format: (value: number) => `₹${value.toFixed(2)}L` },
  { label: "ROAS", target: 4.8, format: (value: number) => `${value.toFixed(1)}x` },
  { label: "Conversions", target: 12540, format: (value: number) => Math.round(value).toLocaleString("en-IN") },
  { label: "Revenue", target: 2.34, format: (value: number) => `₹${value.toFixed(2)}Cr` },
];

export function AnimatedGrowthDashboard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/8 sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-black text-[var(--foreground)]">Growth Overview</h2>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-bold text-[var(--muted)]"
        >
          Last 30 Days
        </motion.span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 3, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl border border-slate-200 p-3"
          >
            <p className="text-[9px] font-bold uppercase tracking-wide text-[var(--muted)]">{stat.label}</p>
            <p className="mt-1 text-sm font-black text-[var(--foreground)]"><CountUp target={stat.target} format={stat.format} /></p>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_110px] gap-3 sm:grid-cols-[1fr_150px]">
        <div className="rounded-xl border border-slate-200 p-3">
          <p className="mb-3 text-[10px] font-bold text-[var(--muted)]">Performance Over Time</p>
          <svg viewBox="0 0 420 160" className="h-32 w-full" role="img" aria-label="Rising performance chart">
            <defs>
              <linearGradient id="animated-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 70, 110, 150].map((y) => <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="#e2e8f0" strokeWidth="1" />)}
            <path d="M8 142 L60 92 L112 120 L164 62 L216 88 L268 28 L320 67 L372 20 L412 42 L412 158 L8 158 Z" fill="url(#animated-chart-fill)" />
            <motion.path
              d="M8 142 L60 92 L112 120 L164 62 L216 88 L268 28 L320 67 L372 20 L412 42"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, repeat: reduceMotion ? 0 : Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-3 text-center">
          <div className="relative h-16 w-16">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="25" fill="none" stroke="#dbeafe" strokeWidth="8" />
              <motion.circle
                cx="32"
                cy="32"
                r="25"
                fill="none"
                stroke="#2563eb"
                strokeWidth="8"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 0.72 }}
                transition={{ duration: 1.5, delay: 0.25, repeat: reduceMotion ? 0 : Infinity, repeatDelay: 1.8, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black">72%</span>
          </div>
          <p className="mt-3 text-[10px] font-bold text-[var(--foreground)]">ROI Positive Campaigns</p>
        </div>
      </div>
    </motion.div>
  );
}

const growthSignals = [
  { label: "Ad Spend Managed", target: 12, format: (value: number) => `₹${value.toFixed(1)}Cr+`, change: "+18.4%", icon: WalletCards, bars: [42, 55, 48, 66, 72, 88] },
  { label: "Businesses Scaled", target: 200, format: (value: number) => `${Math.round(value)}+`, change: "+24 this quarter", icon: UsersRound, bars: [34, 43, 51, 59, 72, 82] },
  { label: "Average ROAS", target: 4.8, format: (value: number) => `${value.toFixed(1)}x`, change: "+0.7x", icon: Gauge, bars: [38, 51, 46, 64, 73, 91] },
  { label: "Average CAC Reduction", target: 38, format: (value: number) => `${Math.round(value)}%`, change: "-12.6% MoM", icon: ArrowDownRight, bars: [88, 76, 71, 60, 51, 39] },
];

export function AnimatedGrowthSignals() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative isolate py-3">
      <motion.div aria-hidden className="pointer-events-none absolute -left-12 top-0 -z-10 h-64 w-64 rounded-full bg-blue-300/35 blur-3xl" animate={reduceMotion ? undefined : { x: [0, 90, 20, 0], y: [0, 35, 100, 0], scale: [1, 1.2, .9, 1] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 -z-10 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" animate={reduceMotion ? undefined : { x: [0, -100, -30, 0], y: [0, -55, -120, 0], scale: [1, .85, 1.15, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible">
        {growthSignals.map((signal, index) => {
          const Icon = signal.icon;
          return (
            <motion.article
              key={signal.label}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="w-[72vw] flex-shrink-0 snap-center rounded-[22px] border border-white/80 bg-slate-950/[0.88] p-5 text-white shadow-xl shadow-blue-950/15 backdrop-blur-2xl sm:w-[44vw] lg:w-auto"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10"><Icon size={17} /></span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] font-black text-emerald-300"><ArrowUpRight size={10} />{signal.change}</span>
              </div>
              <p className="mt-4 text-2xl font-black tracking-tight sm:text-3xl"><CountUp target={signal.target} format={signal.format} /></p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-blue-100/70 sm:text-xs">{signal.label}</p>
              <div className="mt-4 flex h-9 items-end gap-1" aria-hidden>
                {signal.bars.map((height, barIndex) => (
                  <motion.span
                    key={barIndex}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500/45 to-cyan-300"
                    initial={reduceMotion ? false : { height: "8%" }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + barIndex * 0.07, duration: 0.55, ease: "easeOut" }}
                  />
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="relative mt-1 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide lg:grid lg:grid-cols-[1.55fr_0.85fr] lg:overflow-visible">
        <div className="w-[88vw] flex-shrink-0 snap-center rounded-[22px] border border-white/80 bg-slate-950/[0.88] p-5 text-white shadow-xl shadow-blue-950/15 backdrop-blur-2xl sm:w-[70vw] sm:p-6 lg:w-auto">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-sm font-black">Portfolio Performance</p><p className="mt-1 text-[10px] text-blue-100/65">Blended revenue growth across active accounts</p></div>
            <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-black text-emerald-300">+31.8%</span>
          </div>
          <svg viewBox="0 0 620 170" className="mt-5 h-36 w-full" role="img" aria-label="Portfolio performance trending upward">
            <defs><linearGradient id="signal-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38bdf8" stopOpacity=".38"/><stop offset="1" stopColor="#38bdf8" stopOpacity="0"/></linearGradient></defs>
            {[30, 75, 120, 165].map((y) => <line key={y} x1="0" y1={y} x2="620" y2={y} stroke="rgba(255,255,255,.1)" />)}
            <path d="M8 150 L76 122 L144 134 L212 91 L280 104 L348 57 L416 75 L484 34 L552 49 L612 14 L612 170 L8 170 Z" fill="url(#signal-area)" />
            <motion.path d="M8 150 L76 122 L144 134 L212 91 L280 104 L348 57 L416 75 L484 34 L552 49 L612 14" fill="none" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false, amount: 0.55 }} transition={{ duration: 1.7, ease: "easeInOut" }} />
          </svg>
        </div>

        <div className="grid w-[88vw] flex-shrink-0 snap-center grid-cols-[120px_1fr] items-center gap-4 rounded-[22px] border border-white/80 bg-slate-950/[0.88] p-5 text-white shadow-xl shadow-blue-950/15 backdrop-blur-2xl sm:w-[70vw] sm:grid-cols-[150px_1fr] sm:p-6 lg:w-auto">
          <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden><circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12"/><motion.circle cx="60" cy="60" r="48" fill="none" stroke="#22d3ee" strokeWidth="12" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: .78 }} viewport={{ once: false }} transition={{ duration: 1.4, ease: "easeOut" }}/></svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-black">78%</span><span className="text-[8px] uppercase tracking-wider text-blue-100/60">On target</span></div>
          </div>
          <div><p className="text-sm font-black">Campaign Health</p><p className="mt-2 text-xs leading-relaxed text-blue-100/65">39 of 50 campaigns are meeting or beating their efficiency target.</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" initial={{ width: 0 }} whileInView={{ width: "78%" }} viewport={{ once: false }} transition={{ duration: 1.2 }} /></div></div>
        </div>
      </div>
    </div>
  );
}

const processSteps = [
  { title: "Discovery Call", body: "We understand your business, goals, and challenges.", icon: Phone },
  { title: "Strategy & Audit", body: "We audit, research and build a data-led growth strategy.", icon: FileSearch },
  { title: "Execution", body: "We launch high-impact campaigns with precision.", icon: Rocket },
  { title: "Optimise & Scale", body: "We test, learn, and optimise to maximise performance.", icon: BarChart3 },
  { title: "You Grow", body: "You get predictable growth and we keep scaling it.", icon: Trophy },
];

export function AnimatedProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActiveStep((current) => (current + 1) % processSteps.length), 1200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const mobileStep = processSteps[activeStep];
  const MobileIcon = mobileStep.icon;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/45 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-6">
      <motion.div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-200/45 blur-3xl" animate={reduceMotion ? undefined : { x: [0, 170, 360, 620, 900], opacity: [.35, .7, .8, .65, .35] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      <div className="relative hidden md:grid md:grid-cols-5 md:gap-4">
        <div className="absolute left-[10%] right-[10%] top-5 h-1 overflow-visible rounded-full bg-white/80 shadow-inner">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-blue-300 via-blue-600 to-cyan-300 shadow-[0_0_18px_rgba(37,99,235,0.9)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 6, repeat: reduceMotion ? 0 : Infinity, ease: "linear" }}
          />
          <motion.span className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full bg-white ring-4 ring-blue-500/35 shadow-[0_0_24px_8px_rgba(37,99,235,0.65)]" animate={{ left: `${activeStep * 25}%` }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }} />
        </div>
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const active = index === activeStep;
          return (
            <motion.article
              key={step.title}
              animate={{ scale: active ? 1.06 : 1 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`relative rounded-[22px] border p-4 text-center backdrop-blur-xl transition-all duration-300 ${active ? "border-blue-200/80 bg-white/85 shadow-[0_0_34px_rgba(37,99,235,0.28)]" : "border-white/70 bg-white/35 shadow-sm"}`}
            >
              <div className={`relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-black transition-colors ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{index + 1}</div>
              <Icon size={34} className={`mx-auto mb-3 mt-5 transition-colors ${active ? "text-blue-600" : "text-[var(--foreground)]"}`} strokeWidth={1.5} />
              <h3 className="text-sm font-black text-[var(--foreground)]">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{step.body}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="relative overflow-hidden md:hidden">
        <div className="mb-5 flex items-center gap-2">
          {processSteps.map((step, index) => (
            <div key={step.title} className="h-1.5 flex-1 overflow-visible rounded-full bg-white/80 shadow-inner">
              <motion.div className="h-full origin-left rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.8)]" animate={{ scaleX: index <= activeStep ? 1 : 0 }} transition={{ duration: 0.3 }} />
            </div>
          ))}
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.article
            key={mobileStep.title}
            initial={reduceMotion ? false : { opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -90 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[210px] items-center gap-5 rounded-[22px] border border-white/80 bg-white/60 p-6 shadow-[0_18px_45px_rgba(37,99,235,0.16)] backdrop-blur-2xl"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <MobileIcon size={27} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">Step {activeStep + 1} of {processSteps.length}</p>
              <h3 className="mt-2 text-xl font-black text-[var(--foreground)]">{mobileStep.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{mobileStep.body}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
