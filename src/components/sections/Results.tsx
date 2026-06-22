"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const caseStudies = [
  {
    client: "DentaSmile Clinic",
    industry: "Healthcare",
    tag: "Performance Marketing",
    metric: "4.8x",
    metricLabel: "Return on Ad Spend",
    result: "Scaled from ₹50K to ₹3L/month ad spend in 90 days while maintaining 4.8x ROAS. Booked 120+ qualified appointments per month.",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-600",
  },
  {
    client: "BuildPro Engineering",
    industry: "B2B / Construction",
    tag: "Web Development + SEO",
    metric: "320%",
    metricLabel: "Increase in Organic Traffic",
    result: "Rebuilt their website from scratch and implemented a content strategy that tripled organic leads in 6 months. Domain authority went from 12 to 31.",
    color: "bg-green-50 border-green-100",
    accent: "text-green-600",
  },
  {
    client: "StyleVault",
    industry: "E-commerce / Fashion",
    tag: "Performance Marketing",
    metric: "6.1x",
    metricLabel: "ROAS on Meta Ads",
    result: "Transformed an underperforming Meta account into a consistent revenue machine. Revenue grew 240% in 4 months with tighter budgets.",
    color: "bg-purple-50 border-purple-100",
    accent: "text-purple-600",
  },
];

export default function Results() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeader
          eyebrow="Client Results"
          title="Numbers That Actually Matter"
          description="We let results do the talking. Here are a few examples of what we've delivered for our clients."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.client}
              className={`rounded-2xl border p-8 ${cs.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-medium text-[var(--muted)] bg-white px-3 py-1 rounded-full border border-[var(--border)]">
                  {cs.tag}
                </span>
              </div>

              <div className={`text-5xl font-bold mb-1 ${cs.accent}`}>{cs.metric}</div>
              <div className="text-sm font-medium text-[var(--muted)] mb-5">{cs.metricLabel}</div>

              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">{cs.result}</p>

              <div className="border-t border-current/10 pt-4">
                <div className="font-semibold text-[var(--foreground)] text-sm">{cs.client}</div>
                <div className="text-xs text-[var(--muted)]">{cs.industry}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
