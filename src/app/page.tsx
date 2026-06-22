import { Metadata } from "next";
import AgencyHomepage from "@/components/home/AgencyHomepage";

export const metadata: Metadata = {
  title: "AdsPeek — Performance Marketing That Actually Performs",
  description:
    "AdsPeek drives predictable growth for D2C brands and service businesses through performance marketing, creative strategy, and relentless optimisation.",
  openGraph: {
    title: "AdsPeek — Performance Marketing Agency",
    description: "Performance marketing that turns ad spend into measurable business growth.",
    type: "website",
  },
};

export default function HomePage() {
  return <AgencyHomepage />;
}
