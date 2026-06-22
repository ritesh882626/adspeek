import { LucideIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: ServiceFeature[];
  deliverables: string[];
  processSteps: { title: string; description: string }[];
  faq: { q: string; a: string }[];
}

export default function ServicePageLayout({
  eyebrow,
  title,
  description,
  icon: Icon,
  features,
  deliverables,
  processSteps,
  faq,
}: ServicePageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-24 bg-white border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                <Icon size={24} className="text-[var(--accent)]" />
              </div>
              <Badge variant="accent">{eyebrow}</Badge>
            </div>
            <h1 className="text-[32px] sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-5 sm:mb-6">
              {title}
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex gap-3">
              <Button href="/contact" size="lg">
                Get a Free Audit
                <ArrowRight size={16} />
              </Button>
              <Button href="/case-studies" variant="outline" size="lg">
                See Results
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-[var(--surface)]">
        <Container>
          <SectionHeader
            eyebrow="What's Included"
            title="Everything You Need to Grow"
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="py-16 lg:py-24 bg-white">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="Deliverables"
                title="What You Get, Exactly"
                description="No vague promises. Here's the complete list of what we deliver when you work with us."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliverables.map((d) => (
                <div key={d} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <CheckCircle2 size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--foreground)]">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-[var(--foreground)]">
        <Container>
          <SectionHeader
            eyebrow="Our Process"
            title="How We'll Work Together"
            className="mb-14 [&_h2]:text-white [&_p]:text-white/60 [&_span]:text-blue-400 [&_span]:bg-blue-950"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="text-3xl font-bold text-white/10 font-mono mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <Container size="md">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            className="mb-12"
          />
          <div className="space-y-4">
            {faq.map((item) => (
              <div
                key={item.q}
                className="border border-[var(--border)] rounded-xl p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-3">{item.q}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
