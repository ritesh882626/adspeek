import CoreServicePage from "@/components/layout/CoreServicePage";
import { performanceMarketing } from "@/content/core-services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Performance Marketing Services in India", description: "Plan, launch, and optimise measurable paid acquisition across suitable channels with clearer tracking, testing, and landing-page alignment.", path: "/services/performance-marketing" });
export default function PerformanceMarketingPage() { return <CoreServicePage {...performanceMarketing} />; }
