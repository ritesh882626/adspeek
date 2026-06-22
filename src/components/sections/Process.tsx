"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "We dig into your current state — analytics, ad accounts, website, competitors. No fluff, just honest assessment of where you are and where the gaps are.",
  },
  {
    number: "02",
    title: "Strategy & Roadmap",
    description:
      "We build a 90-day growth plan with clear KPIs, channel priorities, and budget allocation. You know exactly what we're doing and why before we touch a single setting.",
  },
  {
    number: "03",
    title: "Execute & Test",
    description:
      "Campaigns go live. We test creatives, audiences, landing pages, and offers in rapid cycles. Every decision is backed by data, not gut feel.",
  },
  {
    number: "04",
    title: "Scale & Report",
    description:
      "What works gets scaled. We send you clear weekly reports with plain-English insights — not vanity metrics. You always know your real ROI.",
  },
];

export default function Process() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--foreground)]">
      <Container>
        <SectionHeader
          eyebrow="How We Work"
          title="A Process Built for Results"
          description="Four phases, zero ambiguity. Here's exactly how we turn your budget into growth."
          className="mb-16 [&_h2]:text-white [&_p]:text-white/60 [&_span]:text-blue-400 [&_span]:bg-blue-950"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-white/10 z-0" style={{ width: "calc(100% - 3rem)", left: "3rem" }} />
              )}

              <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                <div className="text-4xl font-bold text-white/10 mb-4 font-mono">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
