'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { CredibilityStrip } from '@/components/sections/CredibilityStrip';
import { BrandLogoStrip } from '@/components/sections/BrandLogoStrip';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { MigrationSection } from '@/components/sections/MigrationSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ShopifyPlusSection } from '@/components/sections/ShopifyPlusSection';
import { SpeedPerformanceSection } from '@/components/sections/SpeedPerformanceSection';
import { TechIntegrationsSection } from '@/components/sections/TechIntegrationsSection';
import { CompetitiveEdgeSection } from '@/components/sections/CompetitiveEdgeSection';
import { PortfolioSection, type PortfolioProject } from '@/components/sections/PortfolioSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

import { ConsultationModal } from '@/components/modals/ConsultationModal';
import { ProjectPreviewModal } from '@/components/modals/ProjectPreviewModal';

export default function HomePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('Custom Shopify Store Development');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const handleOpenConsultation = (service = 'Custom Shopify Store Development') => {
    setConsultationService(service);
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#0C5A48] selection:text-white">
      {/* Global Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-1">
        {/* 1. Hero Section with Headline & Live Inquiry Card */}
        <HeroSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 2. Dark Credibility Metrics Bar */}
        <CredibilityStrip />

        {/* 3. Supported DTC Brands Showcase */}
        <BrandLogoStrip />

        {/* 4. Full-Service Shopify Services Section */}
        <ServicesSection onSelectService={(s) => handleOpenConsultation(s)} />

        {/* 5. Benefits Section (Everything Your Store Needs to Win Online) */}
        <BenefitsSection />

        {/* 6. Migration Section with Live Dashboard Mockup */}
        <MigrationSection onOpenConsultation={() => handleOpenConsultation('Store Migration to Shopify')} />

        {/* 7. Development Process Section (Dark) */}
        <ProcessSection />

        {/* 8. Shopify Plus & Enterprise Scale Section */}
        <ShopifyPlusSection onOpenConsultation={() => handleOpenConsultation('Shopify Plus & Enterprise Solutions')} />

        {/* 9. Speed & Core Web Vitals Optimization Section */}
        <SpeedPerformanceSection onOpenConsultation={() => handleOpenConsultation('Speed & Core Web Vitals Optimization')} />

        {/* 10. Technology & Integrations Grid (Dark) */}
        <TechIntegrationsSection />

        {/* 11. Competitive Edge Analytics Section */}
        <CompetitiveEdgeSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 12. Portfolio Showcase with Filter Tabs */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 13. Client Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* 14. Latest Blog & eCommerce Strategy Guides */}
        <BlogSection />

        {/* 15. Final High-Contrast Radiant Dark CTA Section */}
        <FinalCtaSection onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Global Multi-Column Footer */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={consultationService}
      />

      <ProjectPreviewModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    </div>
  );
}
