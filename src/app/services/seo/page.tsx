import CoreServicePage from "@/components/layout/CoreServicePage";
import { seoService } from "@/content/core-services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "SEO Services for Sustainable Search Growth", description: "Improve technical search foundations, content coverage, and organic discovery with transparent SEO services built around relevant business demand.", path: "/services/seo" });
export default function SeoServicesPage() { return <CoreServicePage {...seoService} />; }
