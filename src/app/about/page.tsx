import { Metadata } from "next";
import { Users, Target, Award, Heart } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AdsPeek is a performance-first digital agency helping ambitious Indian businesses grow through paid marketing, web development, and SEO.",
};

const values = [
  {
    icon: Target,
    title: "Results Over Vanity",
    description:
      "We don't celebrate impressions or reach. We celebrate revenue, leads, and ROI. Every campaign we run is measured against real business outcomes.",
  },
  {
    icon: Users,
    title: "Long-Term Partnerships",
    description:
      "We don't churn clients. We grow with them. Our average client has been with us for 2+ years because we treat their business like it's ours.",
  },
  {
    icon: Award,
    title: "Senior Expertise, Always",
    description:
      "No bait and switch. The team that pitches you is the team that runs your account. No hand-offs to juniors, no ticket queues.",
  },
  {
    icon: Heart,
    title: "Radical Transparency",
    description:
      "You own your accounts. You see all the data. We tell you the truth even when it's not what you want to hear — because that's how trust is built.",
  },
];

const team = [
  {
    name: "Arjun Kapoor",
    role: "Founder & Head of Strategy",
    bio: "8 years in performance marketing. Ex-agency lead who went independent to build something better. Has managed over ₹30Cr in ad spend.",
    initials: "AK",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Meera Patel",
    role: "Head of Web & App Development",
    bio: "Full-stack engineer and product designer. Previously led engineering at two Y Combinator-backed startups before joining AdsPeek.",
    initials: "MP",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Siddharth Rao",
    role: "Head of SEO & Content",
    bio: "Organic growth specialist who has taken 20+ websites from zero to 100K+ monthly visitors. Writes SEO strategies that compound.",
    initials: "SR",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Ananya Singh",
    role: "Paid Media Lead",
    bio: "Meta and Google Ads specialist with deep experience in e-commerce, lead gen, and D2C brands. Obsessive about creative testing.",
    initials: "AS",
    color: "bg-orange-100 text-orange-700",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-24 bg-white border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-5">About AdsPeek</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6">
              We Started AdsPeek Because We Were Tired of Agencies That Overpromised and Underdelivered.
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
              Founded in 2020, AdsPeek was built on a simple premise: businesses deserve a digital partner that treats their budget with the same care as their own money.
            </p>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              We&apos;ve grown to a team of 12 across performance marketing, web development, and SEO. We work with 180+ businesses across India — from early-stage startups to established brands doing ₹100Cr+ in revenue.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--surface)] border-b border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "2020", label: "Year Founded" },
              { value: "180+", label: "Clients Served" },
              { value: "12", label: "Team Members" },
              { value: "₹50Cr+", label: "Ad Spend Managed" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[var(--foreground)]">{s.value}</div>
                <div className="text-sm text-[var(--muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Our Values"
            title="What We Actually Believe In"
            description="These aren't wall posters. They're the principles that drive every decision we make."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="flex gap-5 p-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="h-11 w-11 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-2">{v.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 bg-[var(--surface)]">
        <Container>
          <SectionHeader
            eyebrow="The Team"
            title="The People Behind the Work"
            description="A small, senior team. No juniors running your account, no offshore outsourcing."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-[var(--border)] p-6 text-center"
              >
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 ${member.color}`}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-0.5">{member.name}</h3>
                <p className="text-xs text-[var(--accent)] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Work With a Team That Cares"
        description="We take on a limited number of new clients each quarter. Book a call to see if we're a good fit."
      />
    </>
  );
}
