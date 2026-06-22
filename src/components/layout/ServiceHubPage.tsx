import Link from "next/link";
import { ArrowRight, Check, LucideIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Breadcrumbs, { BreadcrumbItem } from "@/components/search/Breadcrumbs";
import JsonLd from "@/components/search/JsonLd";
import type { DetailCard, RelatedPage } from "@/components/layout/CoreServicePage";

export interface HubService extends RelatedPage {
  icon: LucideIcon;
  status?: string;
  bullets: string[];
}

export interface ServiceHubPageProps {
  path: string;
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description: string;
  answer: string;
  services: HubService[];
  approach: DetailCard[];
  related: RelatedPage[];
}

export default function ServiceHubPage(props: ServiceHubPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: props.title,
    description: props.description,
    url: `https://adspeek.in${props.path}`,
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-white py-14 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
        <Container className="relative">
          <Breadcrumbs items={props.breadcrumbs} />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <Badge variant="accent">{props.eyebrow}</Badge>
              <h1 className="mt-6 max-w-4xl text-[34px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{props.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{props.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href="/contact" size="lg">Discuss your priorities <ArrowRight size={16} /></Button><Button href="#services" variant="outline" size="lg">View services</Button></div>
            </div>
            <aside className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Direct answer</p><p className="mt-3 text-lg font-medium leading-relaxed">{props.answer}</p></aside>
          </div>
        </Container>
      </section>

      <section id="services" className="scroll-mt-24 bg-[var(--surface)] py-16 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Capabilities</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Choose the constraint you need to solve</h2><p className="mt-4 text-[var(--muted)]">Start with one focused service or combine connected workstreams where the dependency is real.</p></div>
          <div className="grid gap-6 lg:grid-cols-3">
            {props.services.map((service) => {
              const Icon = service.icon;
              return <article key={service.title} className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)]"><Icon size={21} /></span>{service.status && <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">{service.status}</span>}</div><h2 className="mt-6 text-2xl font-semibold">{service.title}</h2><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.description}</p><ul className="mt-6 space-y-3">{service.bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />{bullet}</li>)}</ul><Link href={service.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">Explore {service.title} <ArrowRight size={15} /></Link></article>;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Our approach</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Clarity before activity</h2></div>
          <div className="grid gap-5 md:grid-cols-3">{props.approach.map((item) => <article key={item.title} className="rounded-2xl border border-[var(--border)] p-6"><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-16 lg:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Connected capabilities</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Explore adjacent service areas</h2></div><Button href="/services" variant="outline">View all services</Button></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{props.related.map((item) => <Link key={item.href} href={item.href} className="group rounded-2xl border border-[var(--border)] bg-white p-6 hover:border-blue-300"><h3 className="font-semibold group-hover:text-[var(--accent)]">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">Explore <ArrowRight size={15} /></span></Link>)}</div>
        </Container>
      </section>

      <section className="bg-[var(--foreground)] py-16 text-white lg:py-20"><Container><div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div className="max-w-2xl"><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Not sure which service should come first?</h2><p className="mt-4 text-white/60">We can map the constraint, dependencies, and best starting point in an initial conversation.</p></div><Button href="/contact" size="lg">Talk to AdsPeek <ArrowRight size={16} /></Button></div></Container></section>
    </>
  );
}
