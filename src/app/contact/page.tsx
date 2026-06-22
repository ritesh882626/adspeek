"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const services = [
  "Performance Marketing",
  "Web Development",
  "App Development",
  "SEO & Content",
  "Full Growth Package",
  "Not sure — let's talk",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-20 bg-white border-b border-[var(--border)]">
        <Container>
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-5">
              Let&apos;s Talk Growth
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              Fill in the form and we&apos;ll be in touch within one business day. Or just call us — we like talking to founders.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact form + info */}
      <section className="py-20 bg-[var(--surface)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-[var(--border)] p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={28} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                    Message Received!
                  </h2>
                  <p className="text-[var(--muted)]">
                    We&apos;ll review your details and get back to you within one business day. Looking forward to speaking with you.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-[var(--border)] p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="rahul@company.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Pvt. Ltd."
                        className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                      Service you&apos;re interested in
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                      Tell us about your project <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="What are your goals? What are you struggling with? The more detail, the better our response."
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full justify-center">
                    Send Message
                    <Send size={16} />
                  </Button>

                  <p className="text-xs text-center text-[var(--muted)]">
                    We respond within 1 business day. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h2 className="font-bold text-[var(--foreground)] mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "hello@adspeek.in",
                      href: "mailto:hello@adspeek.in",
                    },
                    {
                      icon: Phone,
                      label: "Phone / WhatsApp",
                      value: "+91 98765 43210",
                      href: "tel:+919876543210",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Mumbai, Maharashtra, India",
                      href: undefined,
                    },
                    {
                      icon: Clock,
                      label: "Working Hours",
                      value: "Mon–Fri, 10am–7pm IST",
                      href: undefined,
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="h-9 w-9 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[var(--accent)]" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--muted)] mb-0.5">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-[var(--foreground)]">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--accent)] rounded-2xl p-7 text-white">
                <h3 className="font-bold mb-2">Free 30-Min Strategy Call</h3>
                <p className="text-sm text-white/80 mb-5">
                  Not ready to fill a form? Book a call directly and let&apos;s talk about your goals with no pressure.
                </p>
                <Button
                  href="/contact"
                  className="bg-white text-[var(--accent)] hover:bg-blue-50 w-full justify-center"
                  size="sm"
                >
                  Book a Call
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
