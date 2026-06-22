"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Tab = "problem" | "solution" | "result";

const caseStudies = [
  {
    id: 1,
    company: "DentaCare Clinics",
    industry: "Healthcare",
    location: "Gurugram, Haryana",
    imageSrc: "/case-studies/dentacare.png",
    accentColor: "#2563eb",
    before: { label: "Cost Per Lead", value: "₹1,800" },
    after: { label: "Cost Per Lead", value: "₹380" },
    metric: "4.8x ROAS",
    metricLabel: "Return on Ad Spend",
    tabs: {
      problem: {
        heading: "Spending ₹3L/month with nothing to show for it.",
        body: "DentaCare was running Google and Meta ads through a local agency for 8 months. Their CPL was ₹1,800+ and the ads team couldn't explain why. Appointment bookings were flat despite growing spend.",
      },
      solution: {
        heading: "Deep audit. Strategy reset. Creative rebuild.",
        body: "We ran a full audit revealing misaligned targeting, zero creative testing, and zero landing page optimization. We recommended a specialist dental marketing agency, helped negotiate a performance-based engagement, and supervised the first 90 days.",
      },
      result: {
        heading: "CPL dropped from ₹1,800 to ₹380 in 60 days.",
        body: "Monthly appointment bookings increased by 3.2x. The client recovered their 8 months of wasted spend in under 2 quarters. They now run a system — not hope for results.",
      },
    },
  },
  {
    id: 2,
    company: "PropEdge Realty",
    industry: "Real Estate",
    location: "Mumbai, Maharashtra",
    imageSrc: "/case-studies/propedge.png",
    accentColor: "#059669",
    before: { label: "Monthly Organic Leads", value: "12" },
    after: { label: "Monthly Organic Leads", value: "340+" },
    metric: "320%",
    metricLabel: "Organic Traffic Growth",
    tabs: {
      problem: {
        heading: "Zero online visibility in a crowded market.",
        body: "PropEdge had a website no one visited. They were paying ₹80K/month for ads but had no organic presence, no content strategy, and had been burned by two SEO agencies who promised rankings but delivered nothing.",
      },
      solution: {
        heading: "Stopped the bleeding. Built the right foundation.",
        body: "We identified that their market required local SEO + content authority, not generic backlinks. Matched them with an agency that specialised in real estate content, supervised the strategy alignment, and set clear 90-day milestones.",
      },
      result: {
        heading: "From 12 to 340+ organic leads per month.",
        body: "Within 9 months, PropEdge had 340+ monthly organic leads. Their ad dependency dropped by 60%. They now have an asset — not an expense.",
      },
    },
  },
  {
    id: 3,
    company: "LearnFast Academy",
    industry: "Education",
    location: "Bengaluru, Karnataka",
    imageSrc: "/case-studies/learnfast.png",
    accentColor: "#7c3aed",
    before: { label: "Trial Conversion Rate", value: "4%" },
    after: { label: "Trial Conversion Rate", value: "21%" },
    metric: "5.2x",
    metricLabel: "Free Trial Conversions",
    tabs: {
      problem: {
        heading: "Great product. Terrible funnel.",
        body: "LearnFast was spending ₹2L/month on Meta ads with a 4% free-trial-to-paid conversion. They assumed the problem was the ads. It wasn't — it was the onboarding experience after the ad click.",
      },
      solution: {
        heading: "Diagnosed the real problem. Fixed the right thing.",
        body: "Our consultants identified the issue was post-click — a confusing onboarding flow and zero email nurture. We recommended a CRO + automation specialist, not a media buyer. Completely changed the engagement scope.",
      },
      result: {
        heading: "Free trial to paid conversion jumped from 4% to 21%.",
        body: "With the same ad spend, monthly revenue from new users grew 4.1x. LearnFast's founder said: 'Nobody told us the problem was our website — not our ads. That one insight saved us lakhs per month.'",
      },
    },
  },
  {
    id: 4,
    company: "SteelForm Industries",
    industry: "Manufacturing",
    location: "Pune, Maharashtra",
    imageSrc: "/case-studies/steelform.png",
    accentColor: "#ea580c",
    before: { label: "Qualified B2B Leads/month", value: "3" },
    after: { label: "Qualified B2B Leads/month", value: "47" },
    metric: "15x",
    metricLabel: "Lead Volume Growth",
    tabs: {
      problem: {
        heading: "A traditional manufacturer with no digital playbook.",
        body: "SteelForm had relied entirely on trade shows and referrals for 22 years. Post-COVID, both dried up. They hired a digital agency that ran Instagram ads for a B2B steel manufacturer — completely wrong channel.",
      },
      solution: {
        heading: "Right channel. Right message. Right partner.",
        body: "We stopped all social ads immediately and designed a LinkedIn + IndiaMART + Google industrial intent strategy. Connected them with a B2B industrial marketing specialist — a category most agencies don't even serve.",
      },
      result: {
        heading: "From 3 to 47 qualified B2B leads per month.",
        body: "In 6 months, SteelForm's pipeline was fuller than it had been in years. Two ₹50L+ contracts came directly from LinkedIn outreach. They now have a repeatable digital lead engine for the first time.",
      },
    },
  },
];

function CaseStudyCard({ study }: { study: typeof caseStudies[0] }) {
  const [activeTab, setActiveTab] = useState<Tab>("problem");

  return (
    <div className="h-[90vh] max-h-[680px] md:h-auto md:max-h-none bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm md:shadow-2xl md:shadow-black/12 w-full max-w-5xl mx-auto border border-[var(--border)]">
      <div className="grid h-full grid-cols-1 grid-rows-[38%_62%] md:h-auto md:grid-rows-none md:grid-cols-[420px_1fr]">

        {/* Left: full-bleed image with overlay */}
        <div className="relative h-full min-h-0 md:min-h-[500px] overflow-hidden">
          <Image
            src={study.imageSrc}
            alt={study.company}
            fill
            className="object-cover object-center"
            sizes="(max-width: 767px) 85vw, 420px"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          {/* Content on top of image */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
            {/* Industry tag */}
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-white border border-white/20 bg-white/10 backdrop-blur-sm"
              >
                {study.industry}
              </span>
            </div>

            {/* Company + metrics */}
            <div>
              <p className="text-white/60 text-xs font-semibold mb-1">{study.location}</p>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-5">{study.company}</h3>

              {/* Before / After */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-5">
                <div className="flex max-h-[10vh] min-h-0 flex-col justify-center overflow-hidden bg-white/10 backdrop-blur-sm rounded-xl md:max-h-none md:rounded-2xl px-3 py-2 md:p-4 border border-white/10">
                  <p className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest mb-0.5 md:mb-1">Before</p>
                  <p className="text-sm md:text-xl leading-tight font-black text-white/60">{study.before.value}</p>
                  <p className="text-[9px] md:text-[10px] leading-tight text-white/40 mt-0.5">{study.before.label}</p>
                </div>
                <div className="flex max-h-[10vh] min-h-0 flex-col justify-center overflow-hidden bg-white/20 backdrop-blur-sm rounded-xl md:max-h-none md:rounded-2xl px-3 py-2 md:p-4 border border-white/25 ring-1 ring-white/20">
                  <p className="text-[8px] md:text-[9px] font-black text-white/70 uppercase tracking-widest mb-0.5 md:mb-1">After</p>
                  <p className="text-sm md:text-xl leading-tight font-black text-white">{study.after.value}</p>
                  <p className="text-[9px] md:text-[10px] leading-tight text-white/60 mt-0.5">{study.after.label}</p>
                </div>
              </div>

              {/* Big metric */}
              <div className="flex min-w-0 items-center gap-2 md:gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-emerald-400/20 md:h-8 md:w-8 md:rounded-lg">
                  <TrendingUp size={13} className="text-emerald-400 md:h-4 md:w-4" />
                </div>
                <div className="flex min-w-0 items-center gap-1.5 md:gap-0">
                  <span className="flex-shrink-0 text-base font-black leading-none text-white md:text-2xl">{study.metric}</span>
                  <span className="min-w-0 text-[9px] leading-tight text-white/50 md:ml-2 md:text-xs">{study.metricLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: tabs */}
        <div className="min-h-0 overflow-hidden p-5 md:p-10 flex flex-col justify-between md:min-h-[500px] md:overflow-visible">
          {/* Tab bar */}
          <div>
            <div className="flex gap-1 mb-4 md:mb-8 bg-[var(--surface)] rounded-xl md:rounded-2xl p-1">
              {(["problem", "solution", "result"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-h-11 py-2 rounded-lg md:rounded-xl text-xs font-bold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white text-[var(--foreground)] shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <h4 className="font-black text-[var(--foreground)] text-base md:text-lg leading-snug mb-3 md:mb-4">
                  {study.tabs[activeTab].heading}
                </h4>
                <p className="text-[13px] md:text-sm text-[var(--muted)] leading-relaxed">
                  {study.tabs[activeTab].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="hidden md:block mt-8 pt-6 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[var(--muted)] font-black tracking-widest uppercase mb-0.5">Industry</p>
                <span className="text-sm font-black text-[var(--foreground)]">{study.industry}</span>
              </div>
              <button className="group flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:gap-2.5 transition-all duration-200">
                Full Case Study
                <ArrowUpRight size={13} className="group-hover:rotate-12 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(Math.floor(v * caseStudies.length), caseStudies.length - 1);
    setActiveIndex(i);
  });

  return (
    <>
    {/* Mobile: compact native swipe cards with no scroll-triggered animation. */}
    <section className="bg-[var(--surface)] py-16 overflow-hidden md:hidden">
      <div className="px-6">
        <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase block mb-3">
          Case Studies
        </span>
        <h2 className="text-[28px] leading-[1.1] font-black tracking-tight text-[var(--foreground)]">
          Real Businesses. Real Results.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          What happens when businesses get the right advice before hiring.
        </p>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-6 pb-4 scrollbar-hide mobile-momentum-scroll">
        {caseStudies.map((study) => (
          <div key={`mobile-${study.id}`} className="w-[85vw] flex-shrink-0 snap-center">
            <CaseStudyCard study={study} />
          </div>
        ))}
      </div>
    </section>

    <section
      ref={containerRef}
      className="relative hidden md:block bg-[var(--surface)]"
      style={{ height: `${caseStudies.length * 120 + 20}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-14 pb-5 text-center max-w-7xl mx-auto px-6 w-full flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase block mb-2">
              Case Studies
            </span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[var(--foreground)] mb-2">
              Real Businesses. Real Results.
            </h2>
            <p className="text-sm text-[var(--muted)]">
              What happens when businesses get the right advice before hiring.
            </p>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {caseStudies.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-600"
                  style={{
                    width: i === activeIndex ? 32 : 8,
                    background: i === activeIndex ? caseStudies[activeIndex].accentColor : "var(--border)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stacked cards */}
        <div className="relative flex-1 flex items-center justify-center px-6 pb-6">
          {caseStudies.map((study, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            return (
              <motion.div
                key={study.id}
                className="absolute inset-x-6 flex justify-center"
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : isPast ? -80 : 100,
                  scale: isActive ? 1 : isPast ? 0.93 : 1.03,
                  zIndex: isActive ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <CaseStudyCard study={study} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
