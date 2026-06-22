import { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Performance Marketing",
  description:
    "Data-driven paid advertising on Meta, Google, and YouTube. We maximize ROAS and lower your cost per acquisition through relentless testing and optimization.",
};

export default function PerformanceMarketingPage() {
  return (
    <ServicePageLayout
      eyebrow="Performance Marketing"
      title="Paid Ads That Pay for Themselves"
      description="We build and manage performance campaigns on Meta, Google, and YouTube that generate measurable revenue — not just clicks and impressions. Every rupee is tracked, tested, and optimized."
      icon={TrendingUp}
      features={[
        {
          title: "Meta Ads (Facebook & Instagram)",
          description:
            "Full-funnel campaigns from awareness to conversion. We handle creative strategy, audience research, and continuous A/B testing.",
        },
        {
          title: "Google Ads",
          description:
            "Search, shopping, display, and YouTube campaigns optimized for conversions. Negative keyword management and bid strategy included.",
        },
        {
          title: "Conversion Rate Optimization",
          description:
            "We don't just drive traffic — we optimize landing pages, copy, and offers to make sure that traffic converts.",
        },
        {
          title: "Creative Strategy",
          description:
            "Ad copy and creative direction that stops the scroll. We work with your existing assets or brief new creative.",
        },
        {
          title: "Audience Research",
          description:
            "Deep-dive into your ideal customer's behavior, interests, and pain points to build audiences that actually convert.",
        },
        {
          title: "Analytics & Attribution",
          description:
            "Pixel setup, conversion tracking, GA4 integration, and custom dashboards so you always know your true ROI.",
        },
      ]}
      deliverables={[
        "Campaign setup & structure",
        "Ad copywriting (5+ variants)",
        "Audience research & targeting",
        "Landing page recommendations",
        "Weekly performance reports",
        "Monthly strategy reviews",
        "Pixel & tracking setup",
        "A/B testing framework",
        "Competitor analysis",
        "Budget allocation strategy",
      ]}
      processSteps={[
        {
          title: "Account Audit",
          description:
            "We review your current accounts, historical data, and competitors to identify quick wins and structural issues.",
        },
        {
          title: "Strategy & Setup",
          description:
            "We build the campaign architecture, write ad copy, define audiences, and configure tracking end-to-end.",
        },
        {
          title: "Launch & Test",
          description:
            "Campaigns go live with a structured testing plan. We run creative and audience experiments in the first 30 days.",
        },
        {
          title: "Optimize & Scale",
          description:
            "Winners get budget. Losers get paused. We scale what works and continuously improve cost per result.",
        },
      ]}
      faq={[
        {
          q: "What budget do I need to get started?",
          a: "We recommend a minimum ad spend of ₹50,000/month to allow for meaningful testing. Our management fee is separate and scales with your spend.",
        },
        {
          q: "How long before I see results?",
          a: "Most clients see meaningful data within the first 2–3 weeks. Significant ROAS improvements typically come in months 2–3 as we optimize based on data.",
        },
        {
          q: "Do you handle creative (videos/images)?",
          a: "We provide creative strategy and copy. For production of videos and images, we can either work with your existing assets or brief your creative team. We also have partner studios if needed.",
        },
        {
          q: "Will I have access to my own ad accounts?",
          a: "Always. You own your accounts. We work inside them as admins. If we ever part ways, everything stays with you.",
        },
      ]}
    />
  );
}
