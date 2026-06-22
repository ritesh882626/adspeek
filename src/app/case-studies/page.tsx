import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Globe, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from real clients. See how AdsPeek has helped businesses grow through performance marketing, web development, and SEO.",
};

const caseStudies = [
  {
    slug: "dental-clinic-lead-generation",
    client: "DentaSmile Clinic",
    industry: "Healthcare",
    service: "Performance Marketing",
    icon: TrendingUp,
    tagColor: "bg-blue-50 text-blue-700",
    metric: "4.8x",
    metricLabel: "Return on Ad Spend",
    summary:
      "A dental clinic struggling with expensive, low-quality leads from generic Google Ads. We rebuilt their Meta strategy and cut cost per appointment from ₹1,200 to ₹280 while tripling appointment volume.",
    tags: ["Meta Ads", "Lead Generation", "Healthcare"],
  },
  {
    slug: "engineering-company-website",
    client: "BuildPro Engineering",
    industry: "B2B / Construction",
    service: "Web Development + SEO",
    icon: Globe,
    tagColor: "bg-green-50 text-green-700",
    metric: "320%",
    metricLabel: "More Organic Traffic",
    summary:
      "An engineering firm with an outdated website losing prospects to more polished competitors. We redesigned the site and built a content strategy that made them the authority in their niche.",
    tags: ["Next.js", "Technical SEO", "Content Strategy"],
  },
  {
    slug: "ecommerce-brand-roas",
    client: "StyleVault",
    industry: "E-commerce / Fashion",
    service: "Performance Marketing",
    icon: TrendingUp,
    tagColor: "bg-purple-50 text-purple-700",
    metric: "6.1x",
    metricLabel: "ROAS on Meta Ads",
    summary:
      "An online fashion brand burning budget on broad audiences and generic creatives. We rebuilt their funnel, introduced UGC creative testing, and turned their Meta account into a consistent revenue machine.",
    tags: ["Meta Ads", "E-commerce", "Creative Strategy"],
  },
  {
    slug: "saas-seo-growth",
    client: "TaskFlow SaaS",
    industry: "Software / SaaS",
    service: "SEO & Content",
    icon: Search,
    tagColor: "bg-teal-50 text-teal-700",
    metric: "180%",
    metricLabel: "Increase in Trial Signups",
    summary:
      "A B2B SaaS product invisible in search. We built a content moat around high-intent keywords and earned editorial backlinks that pushed them to page 1 for their core terms within 5 months.",
    tags: ["Technical SEO", "Link Building", "SaaS"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-20 bg-white border-b border-[var(--border)]">
        <Container>
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">Case Studies</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-5">
              Real Work. Real Results.
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              We don&apos;t believe in hypotheticals. Here&apos;s a selection of work we&apos;ve done and the outcomes we drove for our clients.
            </p>
          </div>
        </Container>
      </section>

      {/* Case studies grid */}
      <section className="py-20 bg-[var(--surface)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((cs) => {
              const Icon = cs.icon;
              return (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group block bg-white rounded-2xl border border-[var(--border)] p-8 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${cs.tagColor}`}>
                        <Icon size={12} />
                        {cs.service}
                      </span>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-[var(--border)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  <div className="mb-5">
                    <div className="text-4xl font-bold text-[var(--foreground)] mb-1">{cs.metric}</div>
                    <div className="text-sm text-[var(--muted)]">{cs.metricLabel}</div>
                  </div>

                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">{cs.client}</h2>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{cs.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-5 border-t border-[var(--border)] text-xs text-[var(--muted)]">
                    {cs.industry}
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mini stats */}
      <section className="py-16 bg-white border-y border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "180+", label: "Clients across India" },
              { value: "4.2x", label: "Average ROAS" },
              { value: "₹50Cr+", label: "Ad spend managed" },
              { value: "98%", label: "Client retention" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[var(--foreground)]">{s.value}</div>
                <div className="text-sm text-[var(--muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Want Results Like These?"
        description="Book a free strategy call and we'll show you exactly what we'd do for your business."
      />
    </>
  );
}
