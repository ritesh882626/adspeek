import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileSearch,
  MessageCircle,
  Phone,
  Quote,
  Rocket,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

const experts = [
  { name: "Rohit Mehra", role: "Co-founder", credential: "Ex-Zomato | Performance Marketing Lead", image: "/consultants/arjun.png" },
  { name: "Aditi Sharma", role: "Co-founder", credential: "Ex-PwC | Digital Strategy", image: "/consultants/priya.png" },
  { name: "Karan Arora", role: "Head of Growth", credential: "Ex-KPMG | Growth Analytics", image: "/consultants/vikram.png" },
  { name: "Nikhil Bansal", role: "Creative Lead", credential: "Ex-Flipkart | Brand & Creative", image: "/consultants/rohan.png" },
];

const process = [
  { title: "Discovery Call", body: "We understand your business, goals, and challenges.", icon: Phone },
  { title: "Strategy & Audit", body: "We audit, research and build a data-led growth strategy.", icon: FileSearch },
  { title: "Execution", body: "We launch high-impact campaigns with precision.", icon: Rocket },
  { title: "Optimise & Scale", body: "We test, learn, and optimise to maximise performance.", icon: BarChart3 },
  { title: "You Grow", body: "You get predictable growth and we keep scaling it.", icon: Trophy },
];

const signals = [
  { value: "₹12Cr+", label: "Ad Spend Managed" },
  { value: "200+", label: "Businesses Scaled" },
  { value: "4.8x", label: "Average ROAS" },
  { value: "38%", label: "Average CAC Reduction" },
];

const quickResults = ["3x ROAS in 45 Days", "6x Revenue in 60 Days", "70% CAC Reduction", "2.5x Revenue in 30 Days", "4x ROAS in 60 Days"];

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

const platforms = ["Meta Ads", "Google Ads", "Razorpay", "Shopify", "WhatsApp Business", "Webflow"];

const testimonials = [
  { quote: "AdsPeek transformed our ad performance. We saw 3x ROAS in just 45 days!", name: "Ankit Bhatia", role: "Founder, Urban Monkey", initials: "AB" },
  { quote: "Their strategy, execution and communication are top-notch. Highly recommend.", name: "Neha Kapoor", role: "Co-founder, NourishYou", initials: "NK" },
  { quote: "Professional team with deep expertise. Our CAC dropped by 40%.", name: "Rohan Malhotra", role: "Founder, ClassPrep", initials: "RM" },
];

function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mb-8 text-left md:mb-12 md:text-center">
      {eyebrow && <p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">{eyebrow}</p>}
      <h2 className="text-[28px] font-black leading-[1.12] tracking-tight text-[var(--foreground)] md:text-4xl">{title}</h2>
      {body && <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{body}</p>}
    </div>
  );
}

function GrowthDashboard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/8 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-black text-[var(--foreground)]">Growth Overview</h2>
        <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-bold text-[var(--muted)]">Last 30 Days</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[['Ad Spend', '₹48,75,000'], ['ROAS', '4.8x'], ['Conversions', '12,540'], ['Revenue', '₹2.34Cr']].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 p-3">
            <p className="text-[9px] font-bold uppercase tracking-wide text-[var(--muted)]">{label}</p>
            <p className="mt-1 text-sm font-black text-[var(--foreground)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[1fr_110px] gap-3 sm:grid-cols-[1fr_150px]">
        <div className="rounded-xl border border-slate-200 p-3">
          <p className="mb-3 text-[10px] font-bold text-[var(--muted)]">Performance Over Time</p>
          <svg viewBox="0 0 420 160" className="h-32 w-full" role="img" aria-label="Rising performance chart">
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 70, 110, 150].map((y) => <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="#e2e8f0" strokeWidth="1" />)}
            <path d="M8 142 L60 92 L112 120 L164 62 L216 88 L268 28 L320 67 L372 20 L412 42 L412 158 L8 158 Z" fill="url(#chart-fill)" />
            <path d="M8 142 L60 92 L112 120 L164 62 L216 88 L268 28 L320 67 L372 20 L412 42" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-[8px] border-blue-100 border-t-blue-600 text-base font-black">72%</div>
          <p className="mt-3 text-[10px] font-bold text-[var(--foreground)]">ROI Positive Campaigns</p>
        </div>
      </div>
    </div>
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
          <GrowthDashboard />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading title="Built by People Who've Done It at Scale" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((expert) => (
              <article key={expert.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block lg:p-5">
                <Image src={expert.image} alt={expert.name} width={96} height={96} className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top lg:h-20 lg:w-20" />
                <div className="min-w-0 lg:mt-4">
                  <h3 className="font-black text-[var(--foreground)]">{expert.name}</h3>
                  <p className="text-xs text-[var(--muted)]">{expert.role}</p>
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-[var(--foreground)]">{expert.credential}</p>
                </div>
              </article>
            ))}
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
          <SectionHeading eyebrow="Our Process" title="How We Turn Your Goals Into Results" />
          <div className="relative grid gap-4 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-5 hidden border-t border-dashed border-slate-300 md:block" />
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:block md:border-0 md:p-3 md:text-center md:shadow-none">
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-600 md:mx-auto">{index + 1}</div>
                  <div>
                    <Icon size={34} className="mb-3 mt-1 text-[var(--foreground)] md:mx-auto md:mt-5" strokeWidth={1.5} />
                    <h3 className="text-sm font-black text-[var(--foreground)]">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{step.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="Growth Signals" title="What Growth Looks Like With AdsPeek" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {signals.map((signal) => (
              <div key={signal.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <p className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">{signal.value}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{signal.label}</p>
              </div>
            ))}
          </div>
          <p className="mb-5 mt-10 text-center text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">Results Our Clients Love</p>
          <div className="flex snap-x gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible">
            {quickResults.map((result) => (
              <div key={result} className="w-[68vw] flex-shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-4 lg:w-auto">
                <div className="mb-3 flex h-20 items-center justify-center rounded-lg bg-slate-100"><TrendingUp size={24} className="text-[var(--accent)]" /></div>
                <p className="text-center text-xs font-bold text-[var(--foreground)]">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="Case Studies" title="From Zero to Results — Real Stories" />
          <div className="grid gap-5 md:grid-cols-3">
            {caseStudies.map((study) => (
              <article key={study.tag} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <Image src={study.image} alt={study.tag} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <span className="rounded-md border border-slate-300 px-2 py-1 text-[9px] font-black uppercase tracking-wide">{study.tag}</span>
                  <p className="mt-4 text-xs leading-relaxed"><strong>Challenge:</strong> {study.challenge}</p>
                  <p className="mt-2 text-xs leading-relaxed"><strong>Solution:</strong> {study.solution}</p>
                  <h3 className="mt-5 text-xl font-black text-[var(--foreground)]">{study.result}</h3>
                  <Link href="/case-studies" className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-black text-[var(--foreground)]">Read Full Case Study <ArrowRight size={13} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-sm font-bold text-[var(--foreground)]">Want results like these? Let&apos;s talk.</p>
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--foreground)] px-5 text-xs font-black text-white">Get a Free Growth Audit</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[var(--surface)] py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="Trusted Platforms" title="We Work With the Tools That Drive Results" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {platforms.map((platform) => <div key={platform} className="flex min-h-16 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-center text-sm font-black shadow-sm">{platform}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="Testimonials" title="What Clients Say" />
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
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Final CTA</p>
            <h2 className="mt-3 text-[30px] font-black leading-[1.1] tracking-tight text-[var(--foreground)] md:text-4xl">Ready to See What&apos;s Possible for Your Business?</h2>
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
