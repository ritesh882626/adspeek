import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";
import { AnimatedGrowthDashboard, AnimatedGrowthSignals, AnimatedProcess } from "./AgencyAnimations";

const experts = [
  { name: "Rohit Mehra", role: "Performance Marketing Solution Provider", credential: "Ex-Zomato | Performance Marketing Lead", image: "/consultants/arjun.png", companyLogo: "/company-logos/zomato-logo-transparent.png", company: "Zomato" },
  { name: "Aditi Sharma", role: "Digital Strategy Solution Provider", credential: "Ex-PwC | Digital Strategy", image: "/consultants/priya.png", companyLogo: "/company-logos/pwc-logo-transparent.png", company: "PwC" },
  { name: "Karan Arora", role: "Growth Analytics Solution Provider", credential: "Ex-KPMG | Growth Analytics", image: "/consultants/vikram.png", companyLogo: "/company-logos/kpmg-logo-transparent.png", company: "KPMG" },
  { name: "Nikhil Bansal", role: "Creative Strategy Solution Provider", credential: "Ex-Deloitte | Brand & Creative", image: "/consultants/rohan.png", companyLogo: "/company-logos/deloitte-logo-transparent.png", company: "Deloitte" },
];

const customerWork = [
  { image: "/results/results-section-1.jpg", brand: "Fashion Campaign", result: "3x ROAS in 45 Days" },
  { image: "/results/results-section-2.webp", brand: "D2C Apparel", result: "6x Revenue in 60 Days" },
  { image: "/results/results-section-3.jpeg", brand: "Pet Care Creative", result: "70% CAC Reduction" },
  { image: "/results/results-section-4.jpg", brand: "Lifestyle Campaign", result: "2.5x Revenue in 30 Days" },
  { image: "/results/results-section-5.jpeg", brand: "Motorsport Creative", result: "4x ROAS in 60 Days" },
];

const caseStudies = [
  {
    tag: "D2C Fashion Brand",
    challenge: "High CAC and low ROAS",
    solution: "Creative overhaul, audience segmentation, funnel optimisation",
    result: "3x ROAS in 45 Days",
    image: "/case-studies/dentacare.png",
  },
  {
    tag: "Health & Wellness Brand",
    challenge: "Low conversions and weak scaling",
    solution: "Landing page revamp, conversion tracking, scaled campaigns",
    result: "6x Revenue in 60 Days",
    image: "/case-studies/propedge.png",
  },
  {
    tag: "EdTech Startup",
    challenge: "Low trial sign-ups",
    solution: "Offer testing, retargeting, performance creatives",
    result: "2.5x Revenue in 30 Days",
    image: "/case-studies/learnfast.png",
  },
];

const platforms = [
  { name: "Meta Ads", icon: "/icons/meta.png" },
  { name: "Google Ads", icon: "/icons/google.png" },
  { name: "Figma", icon: "/icons/figma.png" },
  { name: "LinkedIn", icon: "/icons/linkedin.png" },
  { name: "Slack", icon: "/icons/slack.png" },
  { name: "PayPal", icon: "/icons/paypal.png" },
  { name: "Google Play", icon: "/icons/playstore.png" },
  { name: "Adobe", icon: "/icons/after-effects.png" },
];

const testimonials = [
  { quote: "AdsPeek transformed our ad performance. We saw 3x ROAS in just 45 days!", name: "Ankit Bhatia", role: "Founder, Urban Monkey", initials: "AB" },
  { quote: "Their strategy, execution and communication are top-notch. Highly recommend.", name: "Neha Kapoor", role: "Co-founder, NourishYou", initials: "NK" },
  { quote: "Professional team with deep expertise. Our CAC dropped by 40%.", name: "Rohan Malhotra", role: "Founder, ClassPrep", initials: "RM" },
];

function SectionHeading({ title, body }: { title: string; body?: string }) {
  return (
    <div className="mb-8 text-left md:mb-12 md:text-center">
      <h2 className="text-[28px] font-black leading-[1.12] tracking-tight text-[var(--foreground)] md:text-4xl">{title}</h2>
      {body && <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{body}</p>}
    </div>
  );
}

function ExpertCard({ expert, mobile = false }: { expert: (typeof experts)[number]; mobile?: boolean }) {
  return (
    <article className={`relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 pr-24 shadow-sm ${mobile ? "w-[82vw] flex-shrink-0 snap-center" : "lg:block lg:p-5 lg:pr-24"}`}>
      <div className="absolute right-3 top-3 h-14 w-20" title={expert.company}>
        <Image src={expert.companyLogo} alt={`${expert.company} logo`} fill sizes="80px" className="object-contain" />
      </div>
      <Image src={expert.image} alt={expert.name} width={96} height={96} className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top lg:h-20 lg:w-20" />
      <div className="min-w-0 lg:mt-4">
        <h3 className="font-black text-[var(--foreground)]">{expert.name}</h3>
        <p className="mt-0.5 text-xs font-semibold text-[var(--accent)]">{expert.role}</p>
        <p className="mt-2 text-xs font-semibold leading-relaxed text-[var(--foreground)]">{expert.credential}</p>
      </div>
    </article>
  );
}

function CaseStudyCard({ study, mobile = false }: { study: (typeof caseStudies)[number]; mobile?: boolean }) {
  return (
    <article className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${mobile ? "w-[84vw] flex-shrink-0 snap-center" : ""}`}>
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
        <Image src={study.image} alt={study.tag} fill sizes={mobile ? "84vw" : "(max-width: 767px) 84vw, 33vw"} className="object-cover object-top" />
      </div>
      <div className="p-5">
        <span className="rounded-md border border-slate-300 px-2 py-1 text-[9px] font-black uppercase tracking-wide">{study.tag}</span>
        <p className="mt-4 text-xs leading-relaxed"><strong>Challenge:</strong> {study.challenge}</p>
        <p className="mt-2 text-xs leading-relaxed"><strong>Solution:</strong> {study.solution}</p>
        <h3 className="mt-5 text-xl font-black text-[var(--foreground)]">{study.result}</h3>
        <Link href="/case-studies" className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-black text-[var(--foreground)]">Read Full Case Study <ArrowRight size={13} /></Link>
      </div>
    </article>
  );
}

export default function AgencyHomepage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-14 lg:py-24">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h1 className="max-w-xl text-[40px] font-black leading-[1.04] tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl lg:text-[62px]">
              Performance Marketing That Actually Performs
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)] lg:text-lg">
              Adspeek drives predictable growth for D2C brands and service businesses through data, creativity, and relentless optimisation.
            </p>
            <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
              <ShieldCheck size={20} className="text-[var(--accent)]" /> Trusted by 200+ New Businesses
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-6 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]">
                Get a Free Growth Audit <ArrowRight size={15} />
              </Link>
              <Link href="#case-studies" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 text-sm font-bold text-[var(--foreground)] transition hover:bg-slate-50">
                See Our Work
              </Link>
            </div>
          </div>
          <AnimatedGrowthDashboard />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="Prominent Solution Providers Who've Done It at Scale" />
          <div aria-label="Solution providers" className="mobile-momentum-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide md:hidden">
            {experts.map((expert) => <ExpertCard key={expert.name} expert={expert} mobile />)}
          </div>
          <div className="hidden grid-cols-2 gap-3 md:grid lg:grid-cols-4">
            {experts.map((expert) => <ExpertCard key={expert.name} expert={expert} />)}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-center sm:px-10 md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <MessageCircle size={42} className="hidden text-[var(--accent)] sm:block" strokeWidth={1.5} />
            <p className="max-w-xl text-lg font-black leading-snug text-[var(--foreground)]">Not sure where to start? Let&apos;s figure it out together — free, no obligation.</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto">
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--foreground)] px-6 text-sm font-bold text-white">Book a Free 30-Min Call</Link>
            <a href="https://wa.me/919310713151" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 text-sm font-bold text-[var(--foreground)]">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="How We Turn Your Goals Into Results" />
          <AnimatedProcess />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="What Growth Looks Like With AdsPeek" body="The numbers that matter, moving in the right direction." />
          <AnimatedGrowthSignals />
          <div className="mb-5 mt-10 text-center">
            <p className="text-lg font-black text-[var(--foreground)]">Customer Results &amp; Creative Work</p>
            <p className="mt-2 text-sm text-[var(--muted)]">A selection of campaigns, creatives, and outcomes delivered for our clients.</p>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible">
            {customerWork.map((work) => (
              <article key={work.image} className="w-[76vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:w-[45vw] lg:w-auto">
                <div className="relative h-56 bg-slate-100 lg:h-48">
                  <Image src={work.image} alt={work.brand} fill sizes="(max-width: 639px) 76vw, (max-width: 1023px) 45vw, 20vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">{work.brand}</p>
                  <p className="mt-2 text-sm font-black text-[var(--foreground)]">{work.result}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="From Zero to Results — Real Stories" />
          <div aria-label="Case studies" className="mobile-momentum-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide md:hidden">
            {caseStudies.map((study) => <CaseStudyCard key={study.tag} study={study} mobile />)}
          </div>
          <div className="hidden gap-5 md:grid md:grid-cols-3">
            {caseStudies.map((study) => <CaseStudyCard key={study.tag} study={study} />)}
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-sm font-bold text-[var(--foreground)]">Want results like these? Let&apos;s talk.</p>
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--foreground)] px-5 text-xs font-black text-white">Get a Free Growth Audit</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[var(--surface)] py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="We Work With the Tools That Drive Results" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-3 text-center shadow-sm">
                <Image src={platform.icon} alt="" width={34} height={34} className="h-8 w-8 object-contain" />
                <span className="text-xs font-black text-[var(--foreground)]">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="What Clients Say" />
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="w-[calc(100vw-48px)] flex-shrink-0 snap-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:w-auto">
                <Quote size={22} className="text-[var(--accent)]" />
                <p className="mt-4 text-sm font-semibold leading-relaxed text-[var(--foreground)]">“{testimonial.quote}”</p>
                <div className="my-4 flex gap-0.5" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" className="text-amber-400" />)}</div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-700">{testimonial.initials}</div>
                  <div><p className="text-sm font-black">{testimonial.name}</p><p className="text-xs text-[var(--muted)]">{testimonial.role}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[var(--surface)] py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <h2 className="text-[30px] font-black leading-[1.1] tracking-tight text-[var(--foreground)] md:text-4xl">Ready to See What&apos;s Possible for Your Business?</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">Most of our clients see results within 30 days of onboarding.</p>
            <div className="mt-7 flex flex-col gap-2 sm:max-w-xs">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--foreground)] px-5 text-sm font-black text-white">Submit Enquiry</Link>
              <a href="https://wa.me/919310713151" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 text-sm font-bold"><MessageCircle size={16} /> Chat on WhatsApp</a>
            </div>
          </div>
          <form action="/contact" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center justify-between text-[10px] font-bold text-[var(--muted)]">
              {['Basic Info', 'Business Details', 'Goals & Budget'].map((label, index) => <div key={label} className="flex flex-col items-center gap-2 text-center"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[var(--foreground)]">{index + 1}</span>{label}</div>)}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" aria-label="Your name" placeholder="Your Name*" className="min-h-12 rounded-lg border border-slate-200 px-4 text-base outline-none focus:border-blue-500" />
              <input name="email" type="email" aria-label="Work email" placeholder="Work Email*" className="min-h-12 rounded-lg border border-slate-200 px-4 text-base outline-none focus:border-blue-500" />
              <input name="phone" type="tel" aria-label="Phone number" placeholder="Phone Number*" className="min-h-12 rounded-lg border border-slate-200 px-4 text-base outline-none focus:border-blue-500" />
              <input name="website" aria-label="Business website" placeholder="Business Website (Optional)" className="min-h-12 rounded-lg border border-slate-200 px-4 text-base outline-none focus:border-blue-500" />
            </div>
            <select name="business" aria-label="Business type" className="mt-3 min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-[var(--muted)] outline-none focus:border-blue-500">
              <option>What best describes your business?</option><option>D2C Brand</option><option>Service Business</option><option>SaaS / Technology</option><option>Other</option>
            </select>
            <button className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-5 text-sm font-black text-white sm:w-auto">Next Step <ArrowRight size={14} /></button>
          </form>
        </div>
      </section>
    </>
  );
}
