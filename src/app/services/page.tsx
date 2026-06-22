import ServiceHubPage from "@/components/layout/ServiceHubPage";
import { servicesHub } from "@/content/service-hubs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Digital Growth Services for Indian Businesses", description: "Explore AdsPeek’s website, SEO, paid advertising, and automation services for startups, ecommerce brands, local businesses, and growing companies.", path: "/services" });
export default function ServicesPage() { return <ServiceHubPage {...servicesHub} />; }
