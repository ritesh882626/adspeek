import { Metadata } from "next";
import { Search } from "lucide-react";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "SEO & Content",
  description:
    "Organic growth that compounds. We build topical authority, earn quality backlinks, and create content that ranks and converts — for the long term.",
};

export default function SeoContentPage() {
  return (
    <ServicePageLayout
      eyebrow="SEO & Content"
      title="Rank Higher. Stay There. Convert More."
      description="SEO is a long game — and the businesses that win it build authority, not just links. We combine technical SEO, strategic content, and earned backlinks to drive traffic that compounds month over month."
      icon={Search}
      features={[
        {
          title: "Technical SEO Audit",
          description:
            "Full crawl of your site to identify and fix issues with speed, indexing, structured data, and Core Web Vitals.",
        },
        {
          title: "Keyword Research",
          description:
            "Intent-based keyword mapping that identifies what your customers actually search before they buy.",
        },
        {
          title: "Content Strategy",
          description:
            "A content calendar built around topical clusters that establish authority in your niche and capture demand at every stage.",
        },
        {
          title: "Content Writing",
          description:
            "Long-form articles, landing pages, and comparison content written by humans who know your industry — not generic AI content.",
        },
        {
          title: "Link Building",
          description:
            "White-hat link acquisition through guest posts, digital PR, and partner relationships. Quality over quantity.",
        },
        {
          title: "Local SEO",
          description:
            "Google Business Profile optimization, local citations, and review strategy for businesses with local footprint.",
        },
      ]}
      deliverables={[
        "Technical SEO audit report",
        "Keyword research document",
        "Content strategy & calendar",
        "4 articles/month",
        "On-page optimization",
        "Monthly backlink report",
        "Rank tracking dashboard",
        "GA4 & GSC setup",
        "Competitor gap analysis",
        "Monthly performance review",
      ]}
      processSteps={[
        {
          title: "Audit & Research",
          description:
            "Full technical audit, keyword research, and competitor analysis to map the landscape and find the gaps.",
        },
        {
          title: "Fix & Optimize",
          description:
            "Technical issues fixed, on-page elements optimized, and site architecture improved for crawlability.",
        },
        {
          title: "Publish & Build",
          description:
            "Content goes live, link building campaigns launch. We track rankings weekly and iterate on what works.",
        },
        {
          title: "Report & Scale",
          description:
            "Monthly review of rankings, traffic, and conversions. We double down on topics gaining traction.",
        },
      ]}
      faq={[
        {
          q: "How long does SEO take to work?",
          a: "Technical fixes and on-page improvements can show results in 4–8 weeks. Significant organic traffic growth typically takes 4–6 months. SEO is a long-term investment with compounding returns.",
        },
        {
          q: "Do you guarantee rankings?",
          a: "No ethical SEO agency does — search algorithms change and no one can guarantee specific positions. We do guarantee transparent reporting and a clear strategy with measurable progress.",
        },
        {
          q: "How many articles do you write per month?",
          a: "Our standard package includes 4 long-form articles per month (1,500–3,000 words each). We can scale this up based on your goals and budget.",
        },
        {
          q: "Do you use AI to write content?",
          a: "We use AI for research and outlining but all final content is written and edited by human writers who understand your industry. We don't publish generic AI-generated filler content.",
        },
      ]}
    />
  );
}
