import { BarChart3, Bot, Code2, PanelsTopLeft, Search, Workflow } from "lucide-react";
import type { ServiceHubPageProps } from "@/components/layout/ServiceHubPage";

const approach = [
  { title: "Diagnose", description: "Identify the constraint closest to the business outcome before choosing channels, platforms, or deliverables." },
  { title: "Prioritise", description: "Sequence the work around dependencies so effort is not spent driving demand into an experience or process that is not ready." },
  { title: "Execute and learn", description: "Ship agreed work, measure useful signals, document limitations, and use evidence to choose the next action." },
];

export const servicesHub: ServiceHubPageProps = {
  path: "/services",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services" }],
  eyebrow: "AdsPeek Services",
  title: "Digital growth services built around the problem you need to solve",
  description: "Connect your website, acquisition, and business workflows through a roadmap shaped by the current constraint—not a pre-set package.",
  answer: "AdsPeek is an execution-focused digital growth agency. Build covers websites and digital products, Grow covers SEO and paid acquisition, and Automate covers lead handling and operational workflows. You can engage one specialist service or combine connected workstreams when the dependency is real.",
  services: [
    { title: "Build", description: "Create a clearer, more useful digital foundation for customers and internal teams.", href: "/services/build", icon: PanelsTopLeft, bullets: ["Business websites", "Landing and ecommerce experiences", "Web applications and MVPs"] },
    { title: "Grow", description: "Improve qualified discovery, acquisition, conversion paths, and channel measurement.", href: "/services/grow", icon: BarChart3, bullets: ["SEO and content systems", "Google and Meta advertising", "Landing and tracking alignment"] },
    { title: "Automate", description: "Reduce delay and repeated manual work across lead handling and operations.", href: "/services/automate", icon: Workflow, bullets: ["Lead routing and follow-up", "WhatsApp and system workflows", "Bounded AI assistance"] },
  ],
  approach,
  related: [
    { title: "Website development", description: "Plan and build a responsive, maintainable business website.", href: "/services/website-development" },
    { title: "SEO", description: "Improve technical search foundations and relevant organic discovery.", href: "/services/seo" },
    { title: "Performance marketing", description: "Connect paid media with tracking, creative, and customer actions.", href: "/services/performance-marketing" },
  ],
};

export const buildHub: ServiceHubPageProps = {
  path: "/services/build",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Build" }],
  eyebrow: "Build Services",
  title: "Build a digital foundation people can understand, trust, and use",
  description: "Plan and create websites and digital products around a defined business task, customer journey, and operational reality.",
  answer: "AdsPeek’s Build services cover websites, ecommerce experiences, landing pages, web applications, and MVPs. Work begins with user needs, conversion paths, content, and technical requirements before visual design or code, helping the finished system support the task it was built to perform.",
  services: [
    { title: "Website Development", description: "Responsive business websites designed around clarity, enquiry journeys, content operations, and technical foundations.", href: "/services/website-development", icon: PanelsTopLeft, bullets: ["Requirements and architecture", "UX/UI and content structure", "Development, QA, and handover"] },
    { title: "Web Applications", description: "Focused digital tools that help users or teams complete more complex tasks.", href: "/contact", icon: Code2, status: "Scope by requirement", bullets: ["Workflow and role mapping", "Interface and system design", "Implementation and testing"] },
    { title: "Conversion Experiences", description: "Landing and commerce journeys aligned with a specific offer, audience, and action.", href: "/contact", icon: BarChart3, status: "Scope by requirement", bullets: ["Landing-page systems", "Commerce journey planning", "Analytics and integrations"] },
  ],
  approach,
  related: [
    { title: "Grow", description: "Connect the foundation to organic and paid discovery.", href: "/services/grow" },
    { title: "Automate", description: "Integrate the experience with practical business workflows.", href: "/services/automate" },
    { title: "All services", description: "Review the complete Build, Grow, and Automate model.", href: "/services" },
  ],
};

export const growHub: ServiceHubPageProps = {
  path: "/services/grow",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Grow" }],
  eyebrow: "Grow Services",
  title: "Create a clearer system for discovery, demand, and conversion",
  description: "Connect SEO and paid acquisition to customer journeys, reliable measurement, and an ongoing programme of useful decisions.",
  answer: "AdsPeek’s Grow services help potential customers discover, evaluate, and respond to an offer through SEO, paid advertising, or a coordinated mix. The work links targeting, message, landing experience, measurement, and optimisation rather than treating traffic as the outcome.",
  services: [
    { title: "SEO", description: "Improve technical search foundations, page intent, content coverage, and qualified organic journeys.", href: "/services/seo", icon: Search, bullets: ["Technical diagnosis", "Intent and page mapping", "Content and internal links"] },
    { title: "Performance Marketing", description: "Plan and optimise paid acquisition around measurable customer actions and structured tests.", href: "/services/performance-marketing", icon: BarChart3, bullets: ["Offer and funnel review", "Campaign and creative testing", "Measurement and optimisation"] },
    { title: "Growth Foundations", description: "Resolve landing, tracking, and channel-readiness gaps before scaling acquisition activity.", href: "/services/website-development", icon: PanelsTopLeft, bullets: ["Landing journey alignment", "Conversion definitions", "Website and analytics readiness"] },
  ],
  approach,
  related: [
    { title: "Build", description: "Improve the website and product foundation behind acquisition.", href: "/services/build" },
    { title: "Automate", description: "Reduce delay in routing, responding to, and following up with demand.", href: "/services/automate" },
    { title: "All services", description: "Review the complete Build, Grow, and Automate model.", href: "/services" },
  ],
};

export const automateHub: ServiceHubPageProps = {
  path: "/services/automate",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Automate" }],
  eyebrow: "Automation Services",
  title: "Automate repetitive work without losing control of the customer journey",
  description: "Map and improve delay-prone processes through practical integrations, messaging workflows, and carefully bounded AI assistance.",
  answer: "AdsPeek’s Automate services connect repetitive business steps such as lead capture, qualification, routing, follow-up, reminders, reporting, and system handoffs. Technology is selected only after the process is understood, with human review preserved wherever judgement, sensitivity, compliance, or trust requires it.",
  services: [
    { title: "Lead Workflows", description: "Move enquiries to the right person and next action with fewer manual handoffs.", href: "/contact", icon: Workflow, status: "Scope by requirement", bullets: ["Capture and qualification", "Routing and notifications", "Follow-up and escalation"] },
    { title: "WhatsApp Automation", description: "Design consent-aware messaging flows with templates, state, and human escalation.", href: "/contact", icon: Bot, status: "Scope by requirement", bullets: ["Enquiry and reminder flows", "Approved templates", "Human handoff rules"] },
    { title: "System Integrations", description: "Synchronise useful data and actions across forms, websites, CRMs, and reporting tools.", href: "/contact", icon: Code2, status: "Scope by requirement", bullets: ["API and access review", "Failure and duplicate handling", "Testing and documentation"] },
  ],
  approach,
  related: [
    { title: "Build", description: "Create the website or application interface where workflows begin.", href: "/services/build" },
    { title: "Performance marketing", description: "Establish the measurement context for paid acquisition and follow-up.", href: "/services/performance-marketing" },
    { title: "All services", description: "Review the complete Build, Grow, and Automate model.", href: "/services" },
  ],
};
