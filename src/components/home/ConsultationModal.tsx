"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, Check, Building2, Globe, Camera, Briefcase,
  Users, ShoppingBag, IndianRupee, Clock, User, Phone, Mail,
  CheckCircle2, ChevronLeft,
} from "lucide-react";

type FormData = {
  businessStage: string;
  hasWebsite: string;
  socialMedia: string[];
  budget: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
};

const INITIAL: FormData = {
  businessStage: "",
  hasWebsite: "",
  socialMedia: [],
  budget: "",
  timeline: "",
  name: "",
  phone: "",
  email: "",
};

const SOCIAL_OPTIONS = [
  { id: "Instagram", label: "Instagram", icon: Camera },
  { id: "LinkedIn", label: "LinkedIn", icon: Briefcase },
  { id: "Facebook", label: "Facebook", icon: Users },
  { id: "IndiaMART", label: "IndiaMART", icon: ShoppingBag },
];

const TIMELINE_OPTIONS = [
  { id: "Immediately", label: "Immediately", sub: "Ready to start now" },
  { id: "Within 5 Days", label: "Within 5 Days", sub: "Almost ready" },
  { id: "Within 10 Days", label: "Within 10 Days", sub: "Just exploring" },
  { id: "Figuring Out", label: "Figuring Out", sub: "Need more clarity" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<FormData>(INITIAL);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(0);
        setSubmitted(false);
        setData(INITIAL);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const totalSteps = 8;
  const progress = ((step + 1) / totalSteps) * 100;

  const canAdvance = useCallback(() => {
    if (step === 0) return data.businessStage !== "";
    if (step === 1) return data.hasWebsite !== "";
    if (step === 2) return true;
    if (step === 3) return data.budget !== "";
    if (step === 4) return data.timeline !== "";
    if (step === 5) return data.name.trim() !== "";
    if (step === 6) return data.phone.trim().length >= 10;
    if (step === 7) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    return false;
  }, [step, data]);

  const handleNext = useCallback(async () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setSubmitting(true);
      try {
        await fetch("/api/consultation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), source: "homepage_modal" }),
        });
      } catch (_) {}
      setSubmitting(false);
      setSubmitted(true);
    }
  }, [step, data]);

  const toggleSocial = (id: string) => {
    setData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.includes(id)
        ? prev.socialMedia.filter((s) => s !== id)
        : [...prev.socialMedia, id],
    }));
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepWrapper title="What stage is your business at?" subtitle="This helps us give you the most relevant recommendation.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "New Business", label: "New Business", sub: "Pre-revenue or just launched", icon: Building2 },
                { id: "Existing Business", label: "Existing Business", sub: "Already generating revenue", icon: CheckCircle2 },
              ].map(({ id, label, sub, icon: Icon }) => (
                <OptionCard
                  key={id}
                  selected={data.businessStage === id}
                  onClick={() => setData((p) => ({ ...p, businessStage: id }))}
                  icon={<Icon size={22} />}
                  label={label}
                  sub={sub}
                />
              ))}
            </div>
          </StepWrapper>
        );

      case 1:
        return (
          <StepWrapper title="Do you have a website?" subtitle="We'll tailor our advice based on your digital presence.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "Yes", label: "Yes, I have a website", sub: "Live and accessible", icon: Globe },
                { id: "No", label: "No website yet", sub: "Planning to build one", icon: X },
              ].map(({ id, label, sub, icon: Icon }) => (
                <OptionCard
                  key={id}
                  selected={data.hasWebsite === id}
                  onClick={() => setData((p) => ({ ...p, hasWebsite: id }))}
                  icon={<Icon size={22} />}
                  label={label}
                  sub={sub}
                />
              ))}
            </div>
          </StepWrapper>
        );

      case 2:
        return (
          <StepWrapper title="Which platforms are you active on?" subtitle="Select all that apply — even if you're just getting started.">
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_OPTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => toggleSocial(id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    data.socialMedia.includes(id)
                      ? "border-[var(--accent)] bg-[var(--accent-light)]"
                      : "border-[var(--border)] hover:border-[var(--accent)]/40"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${data.socialMedia.includes(id) ? "bg-[var(--accent)] text-white" : "bg-[var(--surface)] text-[var(--muted)]"}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`font-semibold text-sm ${data.socialMedia.includes(id) ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>{label}</span>
                  {data.socialMedia.includes(id) && <Check size={14} className="ml-auto text-[var(--accent)]" />}
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Skip if you&apos;re not on any platform yet — that&apos;s fine.</p>
          </StepWrapper>
        );

      case 3:
        return (
          <StepWrapper title="What's your monthly marketing budget?" subtitle="This helps us recommend strategies that fit your investment level.">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-[var(--muted)]">
                <IndianRupee size={18} />
              </div>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={data.budget}
                onChange={(e) => setData((p) => ({ ...p, budget: e.target.value }))}
                className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-lg font-medium transition-colors"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {["10,000", "25,000", "50,000", "1,00,000", "2,00,000+"].map((v) => (
                <button
                  key={v}
                  onClick={() => setData((p) => ({ ...p, budget: v.replace(/,/g, "") }))}
                  className="px-3 py-1.5 text-xs rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  ₹{v}
                </button>
              ))}
            </div>
          </StepWrapper>
        );

      case 4:
        return (
          <StepWrapper title="When are you planning to start?" subtitle="We'll prioritize our response based on your timeline.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIMELINE_OPTIONS.map(({ id, label, sub }) => (
                <OptionCard
                  key={id}
                  selected={data.timeline === id}
                  onClick={() => setData((p) => ({ ...p, timeline: id }))}
                  icon={<Clock size={20} />}
                  label={label}
                  sub={sub}
                />
              ))}
            </div>
          </StepWrapper>
        );

      case 5:
        return (
          <StepWrapper title="What should we call you?" subtitle="We'll use this to personalize your growth plan.">
            <input
              type="text"
              placeholder="Your full name"
              value={data.name}
              onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && canAdvance() && handleNext()}
              className="w-full px-4 py-4 rounded-xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-lg font-medium transition-colors"
              autoFocus
            />
            <div className="flex items-center gap-2 mt-3">
              <User size={14} className="text-[var(--muted)]" />
              <p className="text-xs text-[var(--muted)]">We&apos;ll address you by this name in all communications.</p>
            </div>
          </StepWrapper>
        );

      case 6:
        return (
          <StepWrapper title={`Hi ${data.name.split(" ")[0]}! What's your phone number?`} subtitle="Our consultants will reach out on WhatsApp or call — whichever you prefer.">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm font-medium">+91</div>
              <input
                type="tel"
                placeholder="98765 43210"
                value={data.phone}
                onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && canAdvance() && handleNext()}
                className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-lg font-medium transition-colors"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Phone size={14} className="text-[var(--muted)]" />
              <p className="text-xs text-[var(--muted)]">We never share your number. No spam, ever.</p>
            </div>
          </StepWrapper>
        );

      case 7:
        return (
          <StepWrapper title="Last step — your email address" subtitle="We'll send your personalized growth plan and next steps here.">
            <input
              type="email"
              placeholder="you@company.com"
              value={data.email}
              onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && canAdvance() && handleNext()}
              className="w-full px-4 py-4 rounded-xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-lg font-medium transition-colors"
              autoFocus
            />
            <div className="flex items-center gap-2 mt-3">
              <Mail size={14} className="text-[var(--muted)]" />
              <p className="text-xs text-[var(--muted)]">Your growth plan will be ready within 24 hours.</p>
            </div>
          </StepWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={36} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                    You&apos;re all set, {data.name.split(" ")[0]}!
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed mb-8">
                    Our consultants are reviewing your inputs. Expect a personalized growth plan in your inbox within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-[var(--foreground)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--foreground)]/90 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      {step > 0 && (
                        <button onClick={() => setStep((s) => s - 1)} className="p-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors text-[var(--muted)]">
                          <ChevronLeft size={18} />
                        </button>
                      )}
                      <span className="text-xs font-semibold text-[var(--muted)]">
                        Step {step + 1} of {totalSteps}
                      </span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors text-[var(--muted)]">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-[var(--surface)]">
                    <motion.div
                      className="h-full bg-[var(--accent)] rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>

                  {/* Step content */}
                  <div className="px-6 py-8 min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        {renderStep()}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={handleNext}
                      disabled={!canAdvance() || submitting}
                      className="w-full py-3.5 bg-[var(--foreground)] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--foreground)]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                          Submitting...
                        </span>
                      ) : step === totalSteps - 1 ? (
                        <>Get My Free Growth Plan <Check size={16} /></>
                      ) : (
                        <>Continue <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-1.5 leading-snug">{title}</h2>
      <p className="text-sm text-[var(--muted)] mb-6">{subtitle}</p>
      {children}
    </div>
  );
}

function OptionCard({ selected, onClick, icon, label, sub }: { selected: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
        selected ? "border-[var(--accent)] bg-[var(--accent-light)]" : "border-[var(--border)] hover:border-[var(--accent)]/40"
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${selected ? "bg-[var(--accent)] text-white" : "bg-[var(--surface)] text-[var(--muted)]"}`}>
        {icon}
      </div>
      <div>
        <p className={`font-semibold text-sm ${selected ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>{label}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5">{sub}</p>
      </div>
      {selected && (
        <div className="ml-auto w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
          <Check size={11} className="text-white" />
        </div>
      )}
    </button>
  );
}
