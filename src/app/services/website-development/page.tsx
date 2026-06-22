import CoreServicePage from "@/components/layout/CoreServicePage";
import { websiteDevelopment } from "@/content/core-services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Website Development Services in India", description: "AdsPeek plans, designs, and develops responsive business websites with clear journeys, maintainable content, and search-ready technical foundations.", path: "/services/website-development" });
export default function WebsiteDevelopmentPage() { return <CoreServicePage {...websiteDevelopment} />; }
