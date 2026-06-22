"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    quote:
      "AdsPeek turned our Meta campaigns around completely. We went from burning money to a consistent 5x ROAS in under two months. Their reporting is refreshingly transparent.",
    author: "Priya Sharma",
    role: "Founder, StyleVault",
    initials: "PS",
    color: "bg-purple-100 text-purple-700",
  },
  {
    quote:
      "The website they built for us loads in under 2 seconds and our bounce rate dropped by 40%. More importantly, leads have doubled since the redesign.",
    author: "Rohan Mehta",
    role: "Director, BuildPro Engineering",
    initials: "RM",
    color: "bg-green-100 text-green-700",
  },
  {
    quote:
      "I was skeptical about SEO but AdsPeek's content strategy has been a game changer. We're ranking for keywords I thought were impossible and the organic leads are incredible.",
    author: "Dr. Kavita Nair",
    role: "Owner, DentaSmile Clinic",
    initials: "KN",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote:
      "They built our mobile app on time and budget — which honestly never happens. The quality was excellent and they walked us through every decision.",
    author: "Arjun Patel",
    role: "CEO, LogiTrack",
    initials: "AP",
    color: "bg-orange-100 text-orange-700",
  },
  {
    quote:
      "What sets AdsPeek apart is they actually understand our business, not just the tools. It feels like having an in-house team without the overhead.",
    author: "Sneha Iyer",
    role: "CMO, FreshCart",
    initials: "SI",
    color: "bg-pink-100 text-pink-700",
  },
  {
    quote:
      "Our Google Ads cost per lead dropped from ₹800 to ₹180 in 6 weeks. The team was proactive and always had data to back every recommendation.",
    author: "Vikram Joshi",
    role: "Head of Growth, EduLeap",
    initials: "VJ",
    color: "bg-teal-100 text-teal-700",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[var(--surface)]">
      <Container>
        <SectionHeader
          eyebrow="Client Love"
          title="What Our Clients Say"
          description="Don't take our word for it — here's what the people we work with have to say."
          centered
          className="mb-16"
        />

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="break-inside-avoid bg-white rounded-2xl border border-[var(--border)] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">{t.author}</div>
                  <div className="text-xs text-[var(--muted)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
