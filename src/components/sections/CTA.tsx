"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export default function CTA({
  title = "Ready to Grow Your Business?",
  description = "Book a free 30-minute strategy call. We'll audit your current marketing, identify the biggest gaps, and outline exactly what we'd do in the first 90 days.",
  primaryLabel = "Book a Free Strategy Call",
  primaryHref = "/contact",
}: CTAProps) {
  return (
    <section className="py-24 bg-[var(--accent)]">
      <Container size="md">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">{title}</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={primaryHref}
              className="bg-white text-[var(--accent)] hover:bg-blue-50 shadow-md"
              size="lg"
            >
              {primaryLabel}
              <ArrowRight size={16} />
            </Button>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              <Phone size={16} />
              +91 98765 43210
            </a>
          </div>

          <p className="mt-6 text-white/60 text-sm">
            No commitment required. Free audit included.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
