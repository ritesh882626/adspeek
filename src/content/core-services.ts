import { BarChart3, Search, PanelsTopLeft } from "lucide-react";
import type { CoreServicePageProps } from "@/components/layout/CoreServicePage";

const sharedDifferentiators = [
  { title: "Requirements before recommendations", description: "We examine the business task, user journey, constraints, and existing systems before proposing a scope." },
  { title: "Execution stays connected", description: "Strategy, implementation, and measurement are treated as one operating loop rather than separate presentations." },
  { title: "Clear ownership and limitations", description: "Deliverables, client inputs, dependencies, and factors outside our control are made visible from the start." },
];

const sharedEngagements = [
  { title: "Starter", description: "A focused diagnostic or defined implementation for one clear priority.", meta: "Best for a contained problem with a known decision owner." },
  { title: "Growth", description: "Ongoing delivery and optimisation around a primary growth workstream.", meta: "Best for teams ready to implement, review, and improve continuously." },
  { title: "Scale", description: "Coordinated support across connected workstreams and stakeholders.", meta: "Best when multiple dependencies must move together." },
];

export const websiteDevelopment: CoreServicePageProps = {
  path: "/services/website-development",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Build", href: "/services/build" }, { label: "Website Development" }],
  eyebrow: "Website Development",
  title: "Website development that turns business requirements into a usable digital experience",
  description: "Plan, design, and develop a responsive business website with clear journeys, maintainable content, and search-ready technical foundations.",
  answer: "AdsPeek develops business websites around a specific job: explaining an offer, generating enquiries, supporting sales conversations, or publishing useful content. Scope can cover discovery, architecture, UX/UI, content structure, development, integrations, analytics, testing, launch, and handover.",
  icon: PanelsTopLeft,
  problemsTitle: "When the website is creating friction instead of confidence",
  problems: [
    { title: "The offer is difficult to understand", description: "Visitors cannot quickly identify who the business helps, what it provides, or why the next step is relevant." },
    { title: "The journey loses intent", description: "Mobile usability, page structure, or unclear calls to action make enquiries and evaluation harder than necessary." },
    { title: "The site is hard to operate", description: "Content updates, campaign launches, integrations, or measurement depend on fragile workarounds." },
  ],
  componentsTitle: "A website system planned from structure to handover",
  components: [
    { title: "Discovery and requirements", description: "Align the site’s business task, users, constraints, functionality, and success signals.", meta: "requirements brief" },
    { title: "Information architecture", description: "Organise pages and user paths so people and search systems can find the right information.", meta: "sitemap and journey map" },
    { title: "UX and interface design", description: "Design responsive layouts and reusable patterns around priority actions and content.", meta: "approved responsive layouts" },
    { title: "Content structure", description: "Define page hierarchy, message requirements, and component guidance before build decisions harden.", meta: "page-level content framework" },
    { title: "Development and integrations", description: "Implement the approved system with maintainability, performance, and required connections in mind.", meta: "tested website implementation" },
    { title: "QA, launch, and handover", description: "Test agreed browsers and viewports, resolve launch issues, and document day-to-day operation.", meta: "QA record and handover guide" },
  ],
  idealFor: ["A business replacing a dated, unclear, or difficult-to-manage website.", "A startup establishing a credible company presence and enquiry journey.", "A B2B, manufacturing, local, or professional-service team explaining a complex offer.", "A marketing team that needs maintainable pages for campaigns and useful content."],
  notFor: ["The primary need is an ecommerce store, standalone landing page, or application rather than a business website.", "The project is judged only by copying another site rather than user and business requirements.", "Content, approvals, access, or a decision owner will not be available.", "The website is expected to guarantee rankings, leads, or commercial adoption."],
  process: [
    { title: "Discover", description: "Clarify users, objectives, content, functionality, constraints, and current performance.", deliverable: "Requirements and scope brief", input: "Business context, access, and decision owners" },
    { title: "Structure", description: "Map information, page roles, journeys, and the content needed to support decisions.", deliverable: "Sitemap, journeys, and page plan", input: "Subject-matter input and content review" },
    { title: "Design and build", description: "Create responsive interfaces, implement approved components, and connect agreed systems.", deliverable: "Reviewable website implementation", input: "Timely feedback, assets, and integration access" },
    { title: "Test and launch", description: "Complete QA, address launch dependencies, configure measurement, and hand over the system.", deliverable: "Launched site and documentation", input: "Final approvals and operational owner" },
  ],
  engagements: sharedEngagements,
  differentiators: sharedDifferentiators,
  platforms: ["Next.js", "React", "WordPress", "Webflow", "GA4", "Google Search Console"],
  faq: [
    { q: "What does a website development service include?", a: "A scoped project can include requirements, sitemap, UX/UI, content structure, development, integrations, analytics, testing, launch, and handover. The final mix depends on what the website must do." },
    { q: "Which website platform should we use?", a: "The choice depends on editing needs, functionality, integrations, internal skills, performance requirements, and long-term maintenance. We recommend a platform after those factors are clear." },
    { q: "Will the website be mobile responsive?", a: "Responsive behaviour is designed and tested across agreed viewport ranges as a core project requirement." },
    { q: "Is SEO included in website development?", a: "Technical search foundations can be included. Ongoing research, content production, authority development, and optimisation belong to a separate SEO engagement." },
    { q: "Can AdsPeek redesign an existing website?", a: "Yes. We first review the current content, analytics, technology, and migration risks to decide what should be retained, improved, or rebuilt." },
    { q: "How much does a business website cost?", a: "Cost depends on page types, content, design depth, functionality, integrations, migration, timeline, and support. A custom scope and quote follow discovery." },
    { q: "How long does website development take?", a: "The schedule depends on scope, feedback cycles, content readiness, integrations, and technical complexity. It is agreed after requirements are defined." },
  ],
  related: [
    { title: "Build services", description: "Compare websites with other digital product and experience requirements.", href: "/services/build" },
    { title: "SEO", description: "Improve how useful pages are discovered, understood, and evaluated through organic search.", href: "/services/seo" },
    { title: "Performance marketing", description: "Connect paid acquisition with clear landing journeys and reliable measurement.", href: "/services/performance-marketing" },
  ],
};

export const seoService: CoreServicePageProps = {
  path: "/services/seo",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Grow", href: "/services/grow" }, { label: "SEO" }],
  eyebrow: "SEO",
  title: "SEO services that make your website easier to discover and evaluate",
  description: "Improve technical search foundations, content coverage, and organic discovery with a transparent, intent-led SEO programme.",
  answer: "AdsPeek’s SEO service combines technical diagnosis, search-intent mapping, on-page improvement, content planning, internal linking, and measurement. It is an ongoing process—not a guaranteed ranking package—and prioritises relevant visibility and qualified journeys over traffic without business context.",
  icon: Search,
  problemsTitle: "Organic growth stalls when the site and search intent do not line up",
  problems: [
    { title: "Important pages stay hidden", description: "Crawl, indexation, rendering, or architecture issues prevent useful pages from being reliably discovered." },
    { title: "Content misses the decision", description: "Pages discuss broad topics but do not match the questions, comparisons, and choices customers actually make." },
    { title: "Traffic lacks business context", description: "Reporting focuses on rankings or sessions without showing which journeys and actions are relevant." },
  ],
  componentsTitle: "SEO work organised around diagnosis, implementation, and learning",
  components: [
    { title: "Technical SEO review", description: "Assess crawling, indexation, rendering, performance, structured signals, and site architecture.", meta: "prioritised technical roadmap" },
    { title: "Intent and page mapping", description: "Connect relevant queries and customer decisions to a distinct page purpose.", meta: "intent-to-page map" },
    { title: "On-page optimisation", description: "Improve page hierarchy, titles, descriptions, copy structure, and entity clarity.", meta: "optimised priority pages" },
    { title: "Content planning", description: "Identify coverage gaps and prepare briefs that answer useful demand without creating overlap.", meta: "editorial roadmap and briefs" },
    { title: "Internal-link architecture", description: "Create clearer relationships between hubs, commercial pages, and supporting resources.", meta: "internal-link plan" },
    { title: "Measurement and refresh", description: "Review search visibility, qualified journeys, conversions, and completed work with limitations noted.", meta: "decision-focused reporting" },
  ],
  idealFor: ["A business with established search demand but weak organic discovery.", "A site with technical, migration, or architecture issues.", "A B2B, ecommerce, or service team building decision-stage topic coverage.", "A team able to provide subject-matter review and implement agreed changes."],
  notFor: ["Guaranteed positions, traffic, or a fixed outcome are required.", "The website cannot be changed or implementation support is unavailable.", "The strategy depends on mass content or links without quality review.", "The requirement is mainly map visibility; that needs a local SEO scope."],
  process: [
    { title: "Baseline", description: "Review access, analytics, crawlability, indexation, past changes, and business priorities.", deliverable: "Measurement and access baseline", input: "Site, analytics, and Search Console access" },
    { title: "Diagnose", description: "Analyse technical constraints, demand, competitors, intent coverage, and page overlap.", deliverable: "Prioritised SEO roadmap", input: "Commercial priorities and subject expertise" },
    { title: "Implement", description: "Fix priority issues and improve or create the pages that support relevant journeys.", deliverable: "Completed technical and content work", input: "Developer, editorial, and approval availability" },
    { title: "Review and refresh", description: "Measure changes, inspect new constraints, and reprioritise based on evidence.", deliverable: "Performance review and next actions", input: "Conversion feedback and business changes" },
  ],
  engagements: sharedEngagements,
  differentiators: sharedDifferentiators,
  platforms: ["Google Search Console", "GA4", "Bing Webmaster Tools", "Screaming Frog", "PageSpeed Insights"],
  faq: [
    { q: "What is included in AdsPeek’s SEO service?", a: "Scope can include technical analysis, intent mapping, on-page work, content planning, internal linking, implementation guidance, and performance review." },
    { q: "How long does SEO take?", a: "Timing varies with site condition, competition, crawl and indexation, content capacity, and implementation speed. Outcomes and timelines cannot be guaranteed." },
    { q: "Can AdsPeek guarantee first-page rankings?", a: "No provider controls search-engine results. We can commit to an agreed process, visible deliverables, careful implementation, and transparent measurement." },
    { q: "Does SEO include content writing?", a: "Content briefs, optimisation, and production support can be included according to the scope and subject-matter review requirements." },
    { q: "What is the difference between SEO and local SEO?", a: "SEO covers broader organic discovery across website content. Local SEO focuses more heavily on geographically relevant searches, business information, local landing experiences, and eligible map visibility." },
    { q: "How is SEO success measured?", a: "Measurement can combine crawl and indexation health, relevant query and page visibility, qualified organic journeys, conversions, and completed work—with attribution limits made clear." },
    { q: "How much do SEO services cost?", a: "Scope depends on site size, technical condition, market complexity, content needs, implementation support, and reporting requirements. A custom quote follows discovery." },
  ],
  related: [
    { title: "Grow services", description: "Compare organic search with paid acquisition and coordinated channel planning.", href: "/services/grow" },
    { title: "Website development", description: "Improve the technical and content foundation that search growth depends on.", href: "/services/website-development" },
    { title: "Performance marketing", description: "Use paid acquisition for controlled tests and faster market feedback where suitable.", href: "/services/performance-marketing" },
  ],
};

export const performanceMarketing: CoreServicePageProps = {
  path: "/services/performance-marketing",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Grow", href: "/services/grow" }, { label: "Performance Marketing" }],
  eyebrow: "Performance Marketing",
  title: "Performance marketing built around measurable customer actions",
  description: "Plan, launch, and optimise paid acquisition with clearer tracking, structured testing, and stronger landing-page alignment.",
  answer: "AdsPeek connects paid media with tracking, creative, landing experiences, and commercial goals. Channel recommendations follow audience demand and platform fit. Paid activity can generate faster market feedback, but spend does not guarantee profitable outcomes; demand, competition, creative, experience, economics, and execution all matter.",
  icon: BarChart3,
  problemsTitle: "Paid activity underperforms when the system around it is unclear",
  problems: [
    { title: "Measurement cannot be trusted", description: "Key actions are missing, duplicated, or reported without enough context to guide spend decisions." },
    { title: "Campaign and journey disconnect", description: "Targeting and creative make one promise while the landing experience creates a different expectation." },
    { title: "Testing lacks a hypothesis", description: "Changes accumulate without a clear question, decision rule, or record of what was learned." },
  ],
  componentsTitle: "Paid acquisition managed as a connected operating system",
  components: [
    { title: "Offer and funnel audit", description: "Review readiness, economics, customer actions, landing journeys, and practical constraints.", meta: "funnel and readiness assessment" },
    { title: "Measurement plan", description: "Define useful conversions, review tracking quality, and document attribution limitations.", meta: "measurement specification" },
    { title: "Channel and campaign strategy", description: "Choose suitable platforms and structure campaigns around demand and buying behaviour.", meta: "channel and campaign plan" },
    { title: "Creative testing framework", description: "Turn audience, offer, and message assumptions into controlled creative tests.", meta: "test backlog and decision rules" },
    { title: "Landing-page alignment", description: "Identify message, usability, and conversion friction between ads and destination pages.", meta: "prioritised landing recommendations" },
    { title: "Optimisation and reporting", description: "Review performance, tests, budget signals, and next actions against agreed customer events.", meta: "decision-focused performance review" },
  ],
  idealFor: ["A business with a validated offer and a trackable conversion path.", "A D2C or ecommerce team able to provide product, margin, and creative context.", "A service business with a defined enquiry and qualification process.", "A team using paid activity for structured acquisition or market learning."],
  notFor: ["The offer, fulfilment, or unit economics are not ready for paid demand.", "Conversion tracking cannot be established or reviewed.", "The landing journey cannot change despite clear friction.", "Guaranteed ROAS, revenue, leads, or volume are required."],
  process: [
    { title: "Establish the baseline", description: "Review commercial context, tracking, accounts, offer, creative, and conversion path.", deliverable: "Account and funnel diagnosis", input: "Account access, economics, and customer context" },
    { title: "Plan the test", description: "Set channel roles, campaign structure, hypotheses, customer events, and decision rules.", deliverable: "Campaign and measurement plan", input: "Approved offer, budget boundaries, and assets" },
    { title: "Build and launch", description: "Configure campaigns, complete QA, and launch in a controlled way.", deliverable: "Live, quality-checked campaigns", input: "Platform permissions and approval turnaround" },
    { title: "Learn and optimise", description: "Assess useful signals, document tests, adjust spend, and recommend journey improvements.", deliverable: "Performance review and next tests", input: "Lead quality, sales, and fulfilment feedback" },
  ],
  engagements: sharedEngagements,
  differentiators: sharedDifferentiators,
  platforms: ["Google Ads", "Meta Ads", "GA4", "Google Tag Manager", "Looker Studio", "Shopify"],
  faq: [
    { q: "What is performance marketing?", a: "It is paid acquisition managed against defined, measurable customer actions, with campaign, creative, landing-page, and tracking decisions reviewed together." },
    { q: "Which advertising platform should we use?", a: "Fit depends on whether customers are actively searching, how the offer is discovered, audience data, creative capacity, buying cycle, and measurement quality." },
    { q: "Does AdsPeek manage both Meta Ads and Google Ads?", a: "Both can be scoped when suitable. Using more channels is not automatically better, so each needs a clear role." },
    { q: "Can AdsPeek guarantee ROAS or leads?", a: "No. Market demand, platform auctions, competitors, and customer behaviour are outside an agency’s control. We do not promise fixed outcomes." },
    { q: "What should be ready before campaigns start?", a: "A clear offer, usable landing path, conversion definition, account access, policy-compliant assets, and an agreed measurement plan." },
    { q: "How are campaigns reported?", a: "Reporting connects platform activity with agreed customer actions, test decisions, and attribution limitations rather than presenting impressions and clicks without context." },
    { q: "How much does management cost?", a: "Pricing depends on channels, account complexity, markets, creative and testing requirements, tracking, landing-page work, reporting, and support. A custom quote follows discovery." },
  ],
  related: [
    { title: "Grow services", description: "Compare paid acquisition with SEO and coordinated growth planning.", href: "/services/grow" },
    { title: "Website development", description: "Strengthen the landing journey and technical foundation behind paid demand.", href: "/services/website-development" },
    { title: "SEO", description: "Build relevant organic discovery through technical, structural, and content improvements.", href: "/services/seo" },
  ],
};
