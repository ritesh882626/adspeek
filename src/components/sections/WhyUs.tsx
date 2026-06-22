"use client";

import { motion } from "framer-motion";
import { CheckCircle2, BarChart2, Users, Zap, HeadphonesIcon, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    icon: Target,
    title: "Results-Only Mindset",
    description:
      "We're measured on your business outcomes — not hours billed or reports sent. If you don't grow, we don't grow.",
  },
  {
    icon: BarChart2,
    title: "Radical Transparency",
    description:
      "You get real-time access to ad accounts and dashboards. No hiding behind jargon. Just honest numbers and clear explanations.",
  },
  {
    icon: Zap,
    title: "Speed to Market",
    description:
      "Our processes are lean and fast. Campaigns launch in days, not weeks. We move at startup speed without sacrificing quality.",
  },
  {
    icon: Users,
    title: "Senior Team, Always",
    description:
      "Your account is never handed to a junior. The people who sell you the work are the people who do the work.",
  },
  {
    icon: CheckCircle2,
    title: "Full-Funnel Thinking",
    description:
      "We don't stop at clicks. We optimize landing pages, lead quality, and CRM follow-ups to make sure the entire funnel converts.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Point of Contact",
    description:
      "One person who knows your business inside-out. No ticket queues, no passing you between teams.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="Why AdsPeek"
              title="An Agency That Thinks Like a Founder"
              description="We've worked with 180+ businesses across industries. The ones that grow fastest share one thing: a partner who treats their budget like their own."
            />

            <div className="mt-8 space-y-1">
              {["No long-term lock-in contracts", "Dedicated account manager", "Weekly reporting with real insights", "Access to your accounts 24/7"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2">
                  <CheckCircle2 size={16} className="text-[var(--accent)] flex-shrink-0" />
                  <span className="text-sm text-[var(--muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <div className="h-8 w-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1.5">{r.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{r.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
