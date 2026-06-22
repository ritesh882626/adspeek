import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleCheck,
  CircleX,
  LucideIcon,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Breadcrumbs, { BreadcrumbItem } from "@/components/search/Breadcrumbs";
import JsonLd from "@/components/search/JsonLd";

export interface DetailCard {
  title: string;
  description: string;
  meta?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  deliverable: string;
  input: string;
}

export interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

export interface CoreServicePageProps {
  path: string;
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description: string;
  answer: string;
  icon: LucideIcon;
  problemsTitle: string;
  problems: DetailCard[];
  componentsTitle: string;
  components: DetailCard[];
  idealFor: string[];
  notFor: string[];
  process: ProcessStep[];
  engagements: DetailCard[];
  differentiators: DetailCard[];
  platforms?: string[];
  faq: { q: string; a: string }[];
  related: RelatedPage[];
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl mb-10 lg:mb-14">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)] mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)]">{title}</h2>
      {copy && <p className="mt-4 text-[var(--muted)] leading-relaxed">{copy}</p>}
    </div>
  );
}

export default function CoreServicePage(props: CoreServicePageProps) {
  const Icon = props.icon;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: props.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://adspeek.in${item.href}` : `https://adspeek.in${props.path}`,
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: props.title,
    description: props.description,
    provider: { "@type": "Organization", name: "AdsPeek", url: "https://adspeek.in" },
    url: `https://adspeek.in${props.path}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-white py-14 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
        <Container className="relative">
          <Breadcrumbs items={props.breadcrumbs} />
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <Badge variant="accent">{props.eyebrow}</Badge>
              </div>
              <h1 className="max-w-4xl text-[34px] font-bold leading-[1.08] tracking-[-0.035em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                {props.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{props.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">Discuss your goals <ArrowRight size={16} /></Button>
                <Button href="#what-is-included" variant="outline" size="lg">Explore the scope</Button>
              </div>
            </div>
            <aside className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">In brief</p>
              <p className="text-lg font-medium leading-relaxed text-[var(--foreground)]">{props.answer}</p>
              <p className="mt-5 border-t border-blue-200 pt-5 text-sm leading-relaxed text-[var(--muted)]">
                Scope, responsibilities, and measurement are agreed before delivery begins.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--surface)] py-16 lg:py-24">
        <Container>
          <SectionIntro eyebrow="The challenge" title={props.problemsTitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {props.problems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="what-is-included" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <Container>
          <SectionIntro eyebrow="What is included" title={props.componentsTitle} copy="Each workstream has a practical purpose and a clear output—not a bundle of disconnected activity." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {props.components.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-6 transition-shadow hover:shadow-lg">
                <CircleCheck size={20} className="text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                {item.meta && <p className="mt-4 border-t border-[var(--border)] pt-4 text-xs font-semibold text-[var(--foreground)]">Deliverable: {item.meta}</p>}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--foreground)] py-16 text-white lg:py-24">
        <Container>
          <SectionIntro eyebrow="Fit" title="Designed for the right operating context" copy="A clear fit check protects both the quality of the work and your team’s time." />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">This is a fit if</h3>
              <ul className="mt-5 space-y-4">
                {props.idealFor.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70"><Check size={18} className="mt-0.5 shrink-0 text-blue-400" />{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">This may not be a fit if</h3>
              <ul className="mt-5 space-y-4">
                {props.notFor.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70"><CircleX size={18} className="mt-0.5 shrink-0 text-white/40" />{item}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionIntro eyebrow="How we work" title="A visible process from decisions to delivery" />
          <ol className="grid gap-5 lg:grid-cols-4">
            {props.process.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-[var(--border)] p-6">
                <span className="font-mono text-sm font-bold text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
                <dl className="mt-5 space-y-3 border-t border-[var(--border)] pt-5 text-xs">
                  <div><dt className="font-bold uppercase tracking-wide text-[var(--muted)]">Output</dt><dd className="mt-1 text-[var(--foreground)]">{step.deliverable}</dd></div>
                  <div><dt className="font-bold uppercase tracking-wide text-[var(--muted)]">We need from you</dt><dd className="mt-1 text-[var(--foreground)]">{step.input}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-[var(--surface)] py-16 lg:py-24">
        <Container>
          <SectionIntro eyebrow="Engagements" title="Choose the level of support your stage requires" copy="Final scope depends on priorities, existing assets, dependencies, and delivery pace. We confirm it after discovery." />
          <div className="grid gap-5 md:grid-cols-3">
            {props.engagements.map((item, index) => (
              <article key={item.title} className={`rounded-2xl border bg-white p-6 ${index === 1 ? "border-blue-300 shadow-lg" : "border-[var(--border)]"}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent)]">{index === 0 ? "Focused" : index === 1 ? "Ongoing" : "Integrated"}</p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                {item.meta && <p className="mt-5 text-sm font-medium">{item.meta}</p>}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionIntro eyebrow="Why AdsPeek" title="Work structured around business decisions" />
          <div className="grid gap-5 md:grid-cols-3">
            {props.differentiators.map((item) => <article key={item.title} className="rounded-2xl border border-[var(--border)] p-6"><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p></article>)}
          </div>
          {props.platforms?.length ? (
            <div className="mt-12 border-t border-[var(--border)] pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Platforms and systems we can work with</p>
              <div className="mt-4 flex flex-wrap gap-2">{props.platforms.map((platform) => <span key={platform} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium">{platform}</span>)}</div>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-[var(--surface)] py-16 lg:py-24">
        <Container size="md">
          <SectionIntro eyebrow="FAQ" title="Questions teams ask before starting" />
          <div className="space-y-3">
            {props.faq.map((item) => <details key={item.q} className="group rounded-xl border border-[var(--border)] bg-white p-5 open:shadow-sm"><summary className="cursor-pointer list-none pr-8 font-semibold marker:hidden">{item.q}</summary><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p></details>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionIntro eyebrow="Continue exploring" title="Related services and capabilities" />
          <div className="grid gap-5 md:grid-cols-3">
            {props.related.map((item) => <Link key={item.href} href={item.href} className="group rounded-2xl border border-[var(--border)] p-6 hover:border-blue-300 hover:shadow-lg"><h3 className="font-semibold group-hover:text-[var(--accent)]">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">Explore <ArrowRight size={15} /></span></Link>)}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--foreground)] py-16 text-white lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-400">Next step</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Turn the next growth constraint into a clear plan.</h2><p className="mt-4 text-white/60">Tell us what you are trying to improve. We will use the first conversation to assess fit, priorities, and the most useful next step.</p></div>
            <Button href="/contact" size="lg" className="shrink-0">Start a conversation <ArrowRight size={16} /></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
