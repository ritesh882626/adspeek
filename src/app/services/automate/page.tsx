import ServiceHubPage from "@/components/layout/ServiceHubPage";
import { automateHub } from "@/content/service-hubs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Automate: AI and Workflow Automation Services", description: "Reduce repetitive work and improve lead handling with practical workflow, AI-assisted, and WhatsApp automation built around existing processes.", path: "/services/automate" });
export default function AutomateServicesPage() { return <ServiceHubPage {...automateHub} />; }
