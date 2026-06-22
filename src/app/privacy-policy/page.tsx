import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <Container size="md">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--muted)] mb-10">Last updated: June 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-[var(--muted)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including name, email address, phone number, and company information when you fill out our contact form or book a strategy call. We also collect usage data through analytics tools including Google Analytics 4.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide our services, send you updates relevant to our engagement, and improve our website and service offering. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">3. Cookies</h2>
            <p>
              Our website uses cookies to understand how visitors interact with our content. You can disable cookies through your browser settings, though this may affect some functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">5. Contact</h2>
            <p>
              For any privacy-related questions, email us at{" "}
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
