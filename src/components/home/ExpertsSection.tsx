"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import ConsultationModal from "./ConsultationModal";

const experts = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Growth Consultant",
    prevRole: "Ex-Google · Growth Lead",
    experience: "12+ Yrs",
    industries: ["Healthcare", "SaaS", "Local Business"],
    imageSrc: "/consultants/sarah.png",
    bio: "Scaled 30+ B2B companies from seed to Series A using data-driven growth loops.",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Performance Marketing Advisor",
    prevRole: "Ex-Meta · Ads Strategy",
    experience: "9+ Yrs",
    industries: ["D2C", "E-commerce", "FMCG"],
    imageSrc: "/consultants/arjun.png",
    bio: "₹120Cr+ in managed ad spend across Meta and Google. Creative-first performance strategies.",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "SEO & Content Strategist",
    prevRole: "Ex-HubSpot · SEO Lead",
    experience: "8+ Yrs",
    industries: ["EdTech", "Finance", "Real Estate"],
    imageSrc: "/consultants/priya.png",
    bio: "Taken 25+ websites from zero to 100K+ monthly organic visitors.",
  },
  {
    id: 4,
    name: "Rohan Sharma",
    role: "Brand & Digital Advisor",
    prevRole: "Ex-Ogilvy · Strategy Director",
    experience: "14+ Yrs",
    industries: ["Retail", "Hospitality", "Manufacturing"],
    imageSrc: "/consultants/rohan.png",
    bio: "Repositioned 15+ legacy brands for digital-first markets. Zero fluff, pure positioning.",
  },
  {
    id: 5,
    name: "Kavitha Reddy",
    role: "CRO & Web Growth Expert",
    prevRole: "Ex-Razorpay · Product Growth",
    experience: "7+ Yrs",
    industries: ["FinTech", "SaaS", "Healthcare"],
    imageSrc: "/consultants/kavitha.png",
    bio: "Improved checkout completion rates by 40–80% for 20+ products through systematic testing.",
  },
  {
    id: 6,
    name: "Vikram Joshi",
    role: "App & Mobile Growth Advisor",
    prevRole: "Ex-Zomato · Growth Engineering",
    experience: "10+ Yrs",
    industries: ["FoodTech", "Logistics", "Consumer Apps"],
    imageSrc: "/consultants/vikram.png",
    bio: "Built and scaled mobile growth funnels for Zomato's 50M+ user base.",
  },
  {
    id: 7,
    name: "Neha Gupta",
    role: "B2B Marketing Advisor",
    prevRole: "Ex-Salesforce · Demand Gen",
    experience: "11+ Yrs",
    industries: ["B2B SaaS", "Professional Services", "Manufacturing"],
    imageSrc: "/consultants/neha.png",
    bio: "Built GTM motions from scratch for 18+ B2B companies across India and Southeast Asia.",
  },
];

// Doubled for seamless infinite loop
const marqueeExperts = [...experts, ...experts];

function ExpertCard({ expert }: { expert: typeof experts[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -8 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[200px] h-[320px] sm:w-[210px] sm:h-[340px] rounded-3xl overflow-hidden relative bg-[#f7f7f8] border border-[var(--border)] shadow-sm hover:shadow-2xl hover:shadow-black/12 transition-shadow duration-500 cursor-default"
    >
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <Image
          src={expert.imageSrc}
          alt={expert.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 200px, 210px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      </div>

      {/* Experience chip — top right, z-10 ensures it's above the image */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/25 shadow-sm">
        <span className="text-[10px] font-black text-white tracking-wide">{expert.experience}</span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        {/* Name + LinkedIn badge */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="font-black text-white text-base leading-tight">{expert.name}</h3>
          <BadgeCheck size={16} className="text-blue-400 flex-shrink-0" fill="currentColor" />
        </div>

        {/* Role */}
        <p className="text-[11px] font-semibold text-white/75 mb-1">{expert.role}</p>
        <p className="text-[10px] text-white/50 mb-3">{expert.prevRole}</p>

        {/* Bio */}
        <p className="text-[11px] text-white/70 leading-relaxed mb-3 line-clamp-2">{expert.bio}</p>

        {/* Industries */}
        <div className="flex flex-wrap gap-1">
          {expert.industries.map((ind) => (
            <span
              key={ind}
              className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[9px] font-semibold text-white/70"
            >
              {ind}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExpertsSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-28 bg-[var(--surface)] border-y border-[var(--border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div>
              <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.2em] uppercase block mb-3">Meet the Experts</span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.08] max-w-xl">
                Meet The Experts Behind Every Recommendation
              </h2>
            </div>
            <p className="text-[var(--muted)] max-w-sm leading-relaxed text-sm md:text-base">
              Every recommendation comes from a senior consultant with proven experience in your exact industry — not a junior analyst reading from a template.
            </p>
          </motion.div>
        </div>

        {/* Infinite auto-scroll marquee row */}
        <div className="relative mx-[10%] overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] min-w-10 z-10 bg-gradient-to-r from-[var(--surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] min-w-10 z-10 bg-gradient-to-l from-[var(--surface)] to-transparent" />

          <div
            className="flex gap-5 animate-marquee py-6"
            style={{ width: "max-content", paddingLeft: "1.25rem" }}
          >
            {marqueeExperts.map((expert, i) => (
              <ExpertCard key={`${expert.id}-${i}`} expert={expert} />
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative bg-[var(--foreground)] rounded-2xl p-8 sm:p-10 overflow-hidden"
          >
            <div aria-hidden className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-white mb-2">Need Expert Advice?</h3>
                <p className="text-sm text-white/60 max-w-md leading-relaxed">
                  Talk directly with an experienced consultant before hiring an agency. No pitch, no pressure — just clarity on what your business actually needs.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="group flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[var(--foreground)] rounded-xl text-sm font-bold hover:bg-[var(--surface)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Expert Consultation
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
