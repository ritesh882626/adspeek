import { Metadata } from "next";
import { Globe } from "lucide-react";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Fast, conversion-focused websites built on modern stacks. From landing pages to full e-commerce platforms, we build websites that look great and perform even better.",
};

export default function WebDevelopmentPage() {
  return (
    <ServicePageLayout
      eyebrow="Web Development"
      title="Websites Built to Convert, Not Just Impress"
      description="We design and build fast, responsive, conversion-focused websites using Next.js, React, and modern CMS platforms. Your website is your best salesperson — we make sure it earns its keep."
      icon={Globe}
      features={[
        {
          title: "Landing Pages",
          description:
            "High-converting landing pages designed for specific campaigns. CRO best practices baked in from the start.",
        },
        {
          title: "Corporate & Portfolio Sites",
          description:
            "Professional websites that build trust and communicate your value proposition clearly to visitors.",
        },
        {
          title: "E-commerce Stores",
          description:
            "Shopify, WooCommerce, or custom-built stores optimized for product discovery and checkout conversion.",
        },
        {
          title: "CMS Integration",
          description:
            "We integrate headless CMSs (Sanity, Contentful, Strapi) so your team can update content without a developer.",
        },
        {
          title: "Performance Optimization",
          description:
            "Core Web Vitals tuned to green. Fast load times, optimized images, and clean code that Google loves.",
        },
        {
          title: "SEO Foundation",
          description:
            "Technical SEO implemented during the build — semantic HTML, meta tags, schema markup, and sitemap.",
        },
      ]}
      deliverables={[
        "UI/UX design (Figma)",
        "Responsive front-end build",
        "CMS setup & training",
        "Contact form integration",
        "Analytics & pixel setup",
        "Performance audit report",
        "3 months of support",
        "SEO technical setup",
        "Browser compatibility testing",
        "Deployment & hosting setup",
      ]}
      processSteps={[
        {
          title: "Discovery",
          description:
            "We learn your goals, audience, and brand. Then we audit your existing site and competitors for opportunities.",
        },
        {
          title: "Design",
          description:
            "Wireframes and high-fidelity Figma designs. You review and approve before a single line of code is written.",
        },
        {
          title: "Build",
          description:
            "We develop the site in a staging environment. You see progress in real-time and can request changes.",
        },
        {
          title: "Launch",
          description:
            "Full QA, performance testing, and launch. We handle DNS, deployment, and post-launch monitoring.",
        },
      ]}
      faq={[
        {
          q: "How long does a website project take?",
          a: "A landing page takes 1–2 weeks. A full corporate site takes 4–6 weeks. E-commerce projects typically take 6–10 weeks depending on complexity.",
        },
        {
          q: "What tech stack do you use?",
          a: "We primarily build with Next.js, React, and Tailwind CSS. For e-commerce, we use Shopify or WooCommerce. We choose the right tool for your project's needs.",
        },
        {
          q: "Can I update the content myself?",
          a: "Yes — we set up a CMS so your team can manage blogs, pages, and products without touching code.",
        },
        {
          q: "Do you offer ongoing maintenance?",
          a: "Yes. All projects include 3 months of support post-launch. We also offer monthly maintenance retainers for updates, security patches, and improvements.",
        },
      ]}
    />
  );
}
