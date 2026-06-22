import { NextRequest, NextResponse } from "next/server";

// Data structure for a consultation lead
export type ConsultationLead = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  businessStage: string;
  hasWebsite: string;
  socialMedia: string[];
  budget: string;
  timeline: string;
  source: string;
};

// In-memory store (replace with your integration of choice)
// Supported integrations: Google Sheets, Airtable, HubSpot, Zoho, any webhook
const leads: ConsultationLead[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lead: ConsultationLead = {
      timestamp: body.timestamp || new Date().toISOString(),
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      businessStage: body.businessStage || "",
      hasWebsite: body.hasWebsite || "",
      socialMedia: Array.isArray(body.socialMedia) ? body.socialMedia : [],
      budget: body.budget || "",
      timeline: body.timeline || "",
      source: body.source || "homepage",
    };

    // Store locally
    leads.push(lead);

    // ----------------------------------------------------------------
    // INTEGRATION HOOKS — uncomment and configure as needed
    // ----------------------------------------------------------------

    // 1. Google Sheets / Excel (via webhook or Google Apps Script)
    // await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(lead),
    // });

    // 2. Airtable
    // await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Leads`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ fields: lead }),
    // });

    // 3. HubSpot CRM
    // await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     properties: {
    //       firstname: lead.name.split(" ")[0],
    //       lastname: lead.name.split(" ").slice(1).join(" "),
    //       email: lead.email,
    //       phone: lead.phone,
    //     },
    //   }),
    // });

    // 4. Zoho CRM
    // await fetch("https://www.zohoapis.in/crm/v2/Leads", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ data: [{ Last_Name: lead.name, Email: lead.email, Phone: lead.phone }] }),
    // });

    // 5. Generic webhook (Zapier, Make, n8n, etc.)
    // await fetch(process.env.WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(lead),
    // });

    // ----------------------------------------------------------------

    console.log("[Consultation Lead]", JSON.stringify(lead, null, 2));

    return NextResponse.json({ success: true, id: `lead_${Date.now()}` }, { status: 200 });
  } catch (error) {
    console.error("[Consultation API Error]", error);
    return NextResponse.json({ success: false, error: "Failed to process submission" }, { status: 500 });
  }
}

// GET endpoint for admin/export (protect in production with auth middleware)
export async function GET() {
  return NextResponse.json({ total: leads.length, leads }, { status: 200 });
}
