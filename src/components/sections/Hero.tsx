"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Globe, Smartphone, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const stats = [
  { value: "180+", label: "Clients Served" },
  { value: "4.2x", label: "Avg. ROAS" },
  { value: "₹50Cr+", label: "Ad Spend Managed" },
  { value: "98%", label: "Retention Rate" },
];

const serviceIcons = [
  { icon: TrendingUp, label: "Performance Marketing" },
  { icon: Globe, label: "Web Development" },
  { icon: Smartphone, label: "App Development" },
  { icon: Search, label: "SEO & Content" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="accent" className="mb-6">
              India&apos;s Growth-Focused Digital Agency
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We Don&apos;t Just Run Ads.
            <br />
            <span className="text-[var(--accent)]">We Drive Real Growth.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AdsPeek helps ambitious businesses scale through performance marketing,
            beautiful digital products, and strategies built on data — not guesswork.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button href="/contact" size="lg">
              Book a Free Strategy Call
              <ArrowRight size={16} />
            </Button>
            <Button href="/case-studies" variant="outline" size="lg">
              See Our Work
            </Button>
          </motion.div>

          {/* Service pills */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {serviceIcons.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--muted)]"
              >
                <Icon size={14} className="text-[var(--accent)]" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 text-center">
              <div className="text-3xl font-bold text-[var(--foreground)]">{s.value}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
