import ServiceHubPage from "@/components/layout/ServiceHubPage";
import { buildHub } from "@/content/service-hubs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Build: Website and Digital Product Services", description: "Plan and build websites, ecommerce experiences, landing pages, web applications, and MVPs around clear business and user requirements.", path: "/services/build" });
export default function BuildServicesPage() { return <ServiceHubPage {...buildHub} />; }
