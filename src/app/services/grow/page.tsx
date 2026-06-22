import ServiceHubPage from "@/components/layout/ServiceHubPage";
import { growHub } from "@/content/service-hubs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Grow: SEO and Paid Acquisition Services", description: "Connect SEO and paid advertising to clearer customer journeys, measurement, and ongoing optimisation with AdsPeek.", path: "/services/grow" });
export default function GrowServicesPage() { return <ServiceHubPage {...growHub} />; }
