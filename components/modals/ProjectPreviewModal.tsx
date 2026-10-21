'use client';

import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Check, Layers, Cpu, TrendingUp, Globe, Lock, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import type { PortfolioProject } from '@/components/sections/PortfolioSection';
import { detectUserRegionCurrency } from '@/lib/currency';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject | null;
  onOpenConsultation?: () => void;
}

export function ProjectPreviewModal({
  isOpen,
  onClose,
  project,
  onOpenConsultation,
}: ProjectPreviewModalProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phoneOrEmail: '',
    brandOrCompany: '',
  });
  const [error, setError] = useState('');

  // Check if previously unlocked in this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = sessionStorage.getItem('adspeek_nda_unlocked');
      if (unlocked === 'true') {
        setIsUnlocked(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim() || !formData.phoneOrEmail.trim()) {
      setError('Please provide your name, city, and email or phone to view.');
      return;
    }

    setSubmitting(true);
    setError('');

    const region = detectUserRegionCurrency();

    try {
      await fetch('/api/inquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'nda_portfolio_unlock',
          name: formData.name,
          city: formData.city,
          phone: formData.phoneOrEmail.includes('@') ? '' : formData.phoneOrEmail,
          email: formData.phoneOrEmail.includes('@') ? formData.phoneOrEmail : '',
          brandOrCompany: formData.brandOrCompany,
          portfolioWorkViewed: `${project.title} (${project.category})`,
          detectedCurrency: region.code,
          sourceUrl: window.location.href,
        }),
      });

      sessionStorage.setItem('adspeek_nda_unlocked', 'true');
      setIsUnlocked(true);
    } catch (err) {
      // Even if network fails, unlock so user isn't stuck
      setIsUnlocked(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study Preview`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 z-40 p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer border border-white/20 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* WORK SCREEN (Blurred by 30-40% when locked) */}
        <div
          className={`flex flex-col flex-1 overflow-y-auto transition-all duration-700 ${
            !isUnlocked ? 'filter blur-[10px] opacity-40 pointer-events-none select-none scale-[0.98]' : 'filter-none opacity-100'
          }`}
        >
          {/* Browser Mockup Chrome */}
          <div className="bg-[#11161B] px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-2 sm:ml-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-white/10 max-w-[220px] sm:max-w-md">
                <Globe className="w-3 h-3 text-[#36F4A4] shrink-0" />
                <span className="text-[11px] font-mono text-gray-300 truncate">
                  {project.liveUrl}
                </span>
              </div>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#36F4A4] hover:text-[#C5E1C5] font-mono font-medium transition-colors"
              >
                <span>Open Live Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Hero Section Screenshot Banner */}
          <div className="relative w-full h-56 sm:h-80 md:h-96 overflow-hidden bg-gray-950 shrink-0">
            <img
              src={project.imageUrl}
              alt={`${project.title} Hero Screenshot`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {project.category} &bull; {project.industry}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                  {project.title}
                </h3>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex sm:hidden items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0C5A48] text-white text-xs font-medium border border-[#36F4A4]/30"
                >
                  <span>Visit Store</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 md:p-8 space-y-6">
            <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed">
              {project.description}
            </p>

            {/* Key Outcome Metric Card */}
            <div className="p-4 rounded-xl bg-[#EBF7F2] border border-[#D1EFE3] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0C5A48] text-white flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-mono text-[#0C5A48] uppercase tracking-wider font-semibold">
                  Measurable Impact Achieved
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-900">{project.metrics}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-[#0C5A48]" />
                  Deliverables &amp; Scope
                </h4>
                <ul className="space-y-2">
                  {project.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0C5A48] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-[#0C5A48]" />
                  Architecture &amp; Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0C5A48] animate-pulse" />
                <p className="text-xs text-gray-600">
                  Ready to engineer or scale your storefront with AdsPeek?
                </p>
              </div>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Open Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenConsultation) onOpenConsultation();
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-medium bg-[#0C5A48] text-white hover:bg-[#084537] transition-all cursor-pointer shadow-sm"
                >
                  Discuss Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* NDA ENQUIRY FORM OVERLAY (Shown when locked) */}
        {!isUnlocked && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-[6px]">
            <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200/90 animate-in zoom-in-95 duration-200">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#EBF7F2] text-[#0C5A48] flex items-center justify-center mx-auto mb-3 border border-[#D1EFE3]">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-mono font-medium border border-amber-200 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CLIENT CONFIDENTIALITY / NDA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-gray-950 tracking-tight">
                  Protected Client Case Study
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 font-light leading-relaxed">
                  We have strict Non-Disclosure Agreements (NDAs) with our eCommerce brand partners. Please identify yourself to view the full store architecture, metrics, and live storefront.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleUnlockSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      City &amp; Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, India"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email or WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Email or Phone"
                      value={formData.phoneOrEmail}
                      onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Brand / Store Name <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MyBrand DTC / Looking to launch"
                    value={formData.brandOrCompany}
                    onChange={(e) => setFormData({ ...formData, brandOrCompany: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5A48] focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 py-3 px-6 rounded-xl bg-[#0C5A48] hover:bg-[#084537] text-white text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying &amp; Unlocking...</span>
                    </>
                  ) : (
                    <span>Unlock Case Study &amp; Live Access</span>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-400 font-light mt-2">
                  🔒 Strictly confidential. No spam or unsolicited sales calls.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
