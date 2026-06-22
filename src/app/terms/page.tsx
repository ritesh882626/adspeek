import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <Container size="md">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--muted)] mb-10">Last updated: June 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-[var(--muted)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">1. Services</h2>
            <p>
              AdsPeek provides digital marketing, web development, app development, and SEO services as described in individual client agreements. The scope, deliverables, and pricing of services are defined in a separate Statement of Work (SOW) for each engagement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">2. Payment Terms</h2>
            <p>
              Invoices are issued monthly and are due within 7 days of issuance. Ad spend is billed separately and in advance. Late payments may result in service suspension after 14 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">3. Intellectual Property</h2>
            <p>
              Upon full payment, clients own all deliverables created specifically for their project, including website code, ad creatives, and written content. AdsPeek retains rights to use anonymized work samples for portfolio and case study purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">4. Limitation of Liability</h2>
            <p>
              AdsPeek is not liable for ad platform policy changes, algorithm updates, or external factors outside our control that may affect campaign performance. We commit to best-effort optimization within the platforms we manage.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">5. Termination</h2>
            <p>
              Either party may terminate services with 30 days written notice. All ad accounts and assets remain with the client upon termination.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">6. Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:hello@adspeek.in" className="text-[var(--accent)] hover:underline">
                hello@adspeek.in
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
