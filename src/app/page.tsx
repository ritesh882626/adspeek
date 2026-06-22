import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProblemsSection from "@/components/home/ProblemsSection";
import ExpertsSection from "@/components/home/ExpertsSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import TrustComparison from "@/components/home/TrustComparison";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import PhilosophySection from "@/components/home/PhilosophySection";

export const metadata: Metadata = {
  title: "AdsPeek — Business Growth Advisory",
  description:
    "Don't hire an agency yet. AdsPeek helps businesses understand exactly what growth lever to pull and which marketing partner to trust — before spending a single rupee.",
  openGraph: {
    title: "AdsPeek — Business Growth Advisory",
    description: "Expert-backed guidance to find the right marketing partner for your business.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <ExpertsSection />
      <RoadmapSection />
      <TrustComparison />
      <CaseStudiesSection />
      <PhilosophySection />
    </>
  );
}
