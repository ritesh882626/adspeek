"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Smartphone, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    description:
      "Data-driven paid campaigns on Meta, Google, and YouTube. We obsess over ROAS, not impressions. Every rupee is tracked, tested, and optimized.",
    href: "/services/performance-marketing",
    highlights: ["Meta & Google Ads", "Conversion Optimization", "A/B Testing", "Analytics Setup"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Fast, conversion-focused websites that make a strong first impression and turn visitors into leads. Built on modern stacks with performance baked in.",
    href: "/services/web-development",
    highlights: ["Next.js / React", "Landing Pages", "E-commerce", "CMS Integration"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Mobile and web apps built to scale. From MVPs to complex platforms, we deliver products your users will love — on time and within budget.",
    href: "/services/app-development",
    highlights: ["iOS & Android", "React Native", "Web Apps", "API Integration"],
  },
  {
    icon: Search,
    title: "SEO & Content",
    description:
      "Organic growth that compounds over time. We build topical authority, earn quality backlinks, and create content that ranks and converts.",
    href: "/services/seo-content",
    highlights: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--surface)]">
      <Container>
        <SectionHeader
          eyebrow="What We Do"
          title="Full-Stack Growth, End to End"
          description="From the first ad click to the final conversion, we cover every lever of digital growth."
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block bg-white rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                      <Icon size={22} className="text-[var(--accent)]" />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-[var(--border)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-150"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
