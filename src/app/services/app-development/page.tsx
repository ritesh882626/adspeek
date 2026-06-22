import { Metadata } from "next";
import { Smartphone } from "lucide-react";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "App Development",
  description:
    "Mobile and web apps built to scale. From MVPs to production-grade platforms, we deliver products your users will love — on time and within budget.",
};

export default function AppDevelopmentPage() {
  return (
    <ServicePageLayout
      eyebrow="App Development"
      title="Apps Your Users Actually Want to Use"
      description="We build mobile and web applications from concept to launch. Whether you need an MVP to validate an idea or a full-scale platform, we deliver clean code, great UX, and reliable performance."
      icon={Smartphone}
      features={[
        {
          title: "iOS & Android Apps",
          description:
            "Native-quality apps built with React Native. One codebase, both platforms. Significantly faster and more cost-effective.",
        },
        {
          title: "Web Applications",
          description:
            "Complex web apps built with React, Next.js, and Node.js. Scalable architecture from day one.",
        },
        {
          title: "MVP Development",
          description:
            "Get to market fast. We help you identify the core features, cut scope intelligently, and launch in 4–8 weeks.",
        },
        {
          title: "API Development",
          description:
            "RESTful and GraphQL APIs built to handle scale. We design for performance, security, and maintainability.",
        },
        {
          title: "UI/UX Design",
          description:
            "User-centric design that makes complex workflows feel simple. We prototype and test before we build.",
        },
        {
          title: "App Store Publishing",
          description:
            "End-to-end App Store and Google Play submission. We handle the listings, screenshots, and review process.",
        },
      ]}
      deliverables={[
        "Product discovery workshop",
        "UI/UX design (Figma)",
        "iOS & Android / Web app",
        "Backend API development",
        "Database architecture",
        "App Store submission",
        "QA & testing suite",
        "Documentation & handoff",
        "3 months of support",
        "Analytics integration",
      ]}
      processSteps={[
        {
          title: "Discovery",
          description:
            "We map your user flows, define the feature set, and create a technical spec before any design or code begins.",
        },
        {
          title: "Design",
          description:
            "Wireframes, user flows, and high-fidelity mockups. We prototype key interactions so you can feel the app before it's built.",
        },
        {
          title: "Development",
          description:
            "Sprint-based development with bi-weekly demos. You see the app being built and can give feedback throughout.",
        },
        {
          title: "Launch",
          description:
            "QA testing, App Store submission, and deployment. We stay close for 90 days post-launch to handle any issues.",
        },
      ]}
      faq={[
        {
          q: "How much does app development cost?",
          a: "An MVP typically ranges from ₹5L–₹15L depending on complexity. Full-featured apps are scoped individually. We provide a detailed estimate after the discovery phase.",
        },
        {
          q: "How long does it take to build an app?",
          a: "MVPs typically take 8–12 weeks. Full-scale apps with multiple user roles and integrations can take 4–6 months.",
        },
        {
          q: "Do you build for both iOS and Android?",
          a: "Yes. We use React Native which gives you near-native performance on both platforms from a single codebase, significantly reducing cost and development time.",
        },
        {
          q: "What happens after launch?",
          a: "All projects include 3 months of post-launch support. We fix bugs, handle crashes, and address user feedback. Extended maintenance plans are available.",
        },
      ]}
    />
  );
}
