"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FileText, Lightbulb, Map, Users, TrendingUp, MessageCircle, X, Send, ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Tell Us About Your Business",
    description: "Share your goals, challenges, budget, and where you are right now. No forms — a real conversation that helps us understand what you're actually trying to build.",
    detail: "Takes about 2 minutes. No commitment required.",
    color: "#2563eb",
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Get Personalized Solutions From Experts",
    description: "Our senior consultants analyze your inputs and identify the exact growth levers your business needs to pull — based on your industry, stage, and budget.",
    detail: "Reviewed by a human expert, not an algorithm.",
    color: "#7c3aed",
    bg: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-600",
  },
  {
    number: "03",
    icon: Map,
    title: "Receive Your Growth Roadmap",
    description: "A clear, prioritized plan — not a generic deck. Specific channels, timelines, and expected outcomes built around your business model and growth stage.",
    detail: "Delivered within 24 hours of your consultation.",
    color: "#059669",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
  },
  {
    number: "04",
    icon: Users,
    title: "Get Matched With The Right Agency",
    description: "Based on your roadmap, we match you with pre-vetted agencies that specialize in exactly what you need — so you're never guessing who to trust.",
    detail: "3 shortlisted agencies with transparent comparison.",
    color: "#ea580c",
    bg: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-600",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Start Growing With Confidence",
    description: "You start with clarity. The right partner. The right strategy. No guesswork, no wasted budget — just a focused path to measurable growth.",
    detail: "Ongoing support available through every milestone.",
    color: "#e11d48",
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-600",
  },
];

// ── Chat Widget (full expanded) ────────────────────────────────────────────────
const initMessages = [
  { from: "bot", text: "Hi 👋 Tell us about your business. We'll help you figure out the right next step." },
  { from: "bot", text: "What industry are you in, and what's your biggest growth challenge right now?" },
];

function ChatWidget({ onClose, onStartForm }: { onClose: () => void; onStartForm: () => void }) {
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessages] = useState(initMessages);
  const [replied, setReplied] = useState(false);

  const sendMessage = () => {
    if (!userMsg.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setUserMsg("");
    if (!replied) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Thanks! To give you the most accurate advice, let me ask a few quick questions." },
          { from: "bot", text: "It takes about 2 minutes and our experts will review your answers personally." },
        ]);
        setReplied(true);
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.94 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-24 right-6 sm:right-8 w-[320px] bg-white rounded-2xl border border-[var(--border)] shadow-2xl shadow-black/15 overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--foreground)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <MessageCircle size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Growth Advisor</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-white/60">Online now</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-3 max-h-[240px] overflow-y-auto scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.from === "bot"
                    ? "bg-[var(--surface)] text-[var(--foreground)] rounded-tl-sm"
                    : "bg-[var(--accent)] text-white rounded-tr-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {replied && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onStartForm}
            className="w-full py-2.5 bg-[var(--accent)] text-white rounded-xl text-xs font-bold hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center gap-1.5"
          >
            Start 2-Min Questionnaire <ArrowRight size={12} />
          </motion.button>
        )}
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
          <input
            type="text"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2.5 text-base sm:text-xs bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
          />
          <button
            onClick={sendMessage}
            className="p-2.5 text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors rounded-lg m-0.5"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Floating Chat FAB (always visible) ────────────────────────────────────────
function ChatFAB({
  chatOpen,
  onOpen,
  onClose,
  onStartForm,
}: {
  chatOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onStartForm: () => void;
}) {
  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {chatOpen && <ChatWidget onClose={onClose} onStartForm={onStartForm} />}
      </AnimatePresence>

      {/* FAB button — always present */}
      <motion.button
        onClick={() => (chatOpen ? onClose() : onOpen())}
        className="fixed bottom-[88px] right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-full bg-[var(--foreground)] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Chat with Growth Advisor"
      >
        {/* Pulse ring — only when closed */}
        {!chatOpen && (
          <span className="absolute inset-0 rounded-full bg-[var(--foreground)] animate-ping opacity-30 pointer-events-none" />
        )}
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={20} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [inSection, setInSection] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(Math.floor(v * steps.length), steps.length - 1);
    setActiveStep(i);

    // Determine if we're inside the scrolling zone of this section
    const nowInSection = v > 0.02 && v < 0.98;

    if (nowInSection && !inSection) {
      // Entered the section — open chat after short delay
      setInSection(true);
      if (!openTimerRef.current) {
        openTimerRef.current = setTimeout(() => {
          setChatOpen(true);
          openTimerRef.current = null;
        }, 600);
      }
    } else if (!nowInSection && inSection) {
      // Left the section — collapse chat
      setInSection(false);
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      setChatOpen(false);
    }
  });

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  const activeStepData = steps[activeStep];
  const Icon = activeStepData.icon;

  return (
    <>
      {/* Mobile: immediate native carousel; no sticky scroll or entrance triggers. */}
      <section className="bg-white py-16 lg:hidden overflow-hidden">
        <div className="px-6">
          <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
            How It Works
          </span>
          <h2 className="max-w-sm text-left text-[28px] font-black leading-[1.1] tracking-tight text-[var(--foreground)]">
            A Clear Path From Confusion To Growth
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Swipe through the five steps behind every AdsPeek recommendation.
          </p>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-6 pb-4 scrollbar-hide mobile-momentum-scroll">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <article
                key={`mobile-${step.number}`}
                className="w-[85vw] flex-shrink-0 snap-center rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-4xl font-black leading-none" style={{ color: `${step.color}22` }}>
                    {step.number}
                  </span>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${step.bg} ${step.border}`}>
                    <StepIcon size={20} className={step.text} />
                  </div>
                </div>
                <h3 className="text-xl font-black leading-snug text-[var(--foreground)]">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
                <div className={`mt-6 flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${step.bg} ${step.text} ${step.border}`}>
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: step.color }} />
                  {step.detail}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Desktop retains the chapter-style scroll experience. */}
      <section
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen bg-white flex flex-col overflow-hidden">
          {/* Section label */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
            <span className="text-[10px] font-black text-[var(--accent)] tracking-[0.22em] uppercase">
              How It Works
            </span>
          </div>

          {/* Step counter pills */}
          <div className="absolute top-8 right-10 hidden lg:flex items-center gap-2 z-10">
            {steps.map((s, i) => (
              <div
                key={s.number}
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: i === activeStep ? 32 : 10,
                  background: i <= activeStep ? activeStepData.color : "var(--border)",
                  opacity: i <= activeStep ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {/* Main content — full viewport chapter */}
          <div className="flex-1 flex items-center justify-center px-6 sm:px-10">
            <div className="w-full max-w-5xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Left: text content */}
                  <div>
                    {/* Step number watermark + icon */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 mb-8"
                    >
                      <span
                        className="text-[48px] lg:text-[80px] font-black leading-none select-none"
                        style={{ color: `${activeStepData.color}18` }}
                      >
                        {activeStepData.number}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeStepData.bg} border ${activeStepData.border}`}
                      >
                        <Icon size={20} className={activeStepData.text} />
                      </div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[28px] lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.06] mb-5"
                    >
                      {activeStepData.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="text-lg text-[var(--muted)] leading-relaxed mb-6 max-w-md"
                    >
                      {activeStepData.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.45, delay: 0.32 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${activeStepData.bg} ${activeStepData.text} border ${activeStepData.border}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: activeStepData.color }} />
                      {activeStepData.detail}
                    </motion.div>
                  </div>

                  {/* Right: timeline tracker */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:block"
                  >
                    <div className="space-y-2">
                      {steps.map((s, i) => {
                        const SIcon = s.icon;
                        const isDone = i < activeStep;
                        const isCurrent = i === activeStep;
                        return (
                          <div
                            key={s.number}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                              isCurrent
                                ? "bg-white border-2 shadow-lg"
                                : isDone
                                ? "bg-[var(--surface)] border border-[var(--border)] opacity-60"
                                : "border border-transparent opacity-30"
                            }`}
                            style={isCurrent ? { borderColor: s.color } : undefined}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isCurrent ? s.bg : "bg-[var(--surface)]"
                              }`}
                            >
                              <SIcon
                                size={17}
                                className={isCurrent ? s.text : "text-[var(--muted)]"}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-black truncate transition-colors duration-300 ${isCurrent ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
                                {s.title}
                              </p>
                              <p className="text-[10px] text-[var(--muted)] font-semibold">Step {s.number}</p>
                            </div>
                            {isDone && (
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="h-1 bg-[var(--border)] w-full">
            <motion.div
              className="h-full rounded-full"
              style={{ background: activeStepData.color }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </section>

      {/* Floating chat FAB — always visible, auto-expands in section */}
      <ChatFAB
        chatOpen={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
        onStartForm={() => { setChatOpen(false); setModalOpen(true); }}
      />

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
