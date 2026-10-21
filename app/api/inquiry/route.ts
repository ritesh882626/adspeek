import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const leadEntry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      type: data.type || 'consultation',
      name: data.name || '',
      city: data.city || '',
      country: data.country || '',
      email: data.email || '',
      phone: data.phone || '',
      brandOrCompany: data.brandOrCompany || data.storeOrBrand || '',
      productsCount: data.productsCount || '',
      timeline: data.timeline || '',
      budget: data.budget || '',
      detectedCurrency: data.detectedCurrency || 'INR',
      service: data.service || 'Custom Shopify Store Development',
      portfolioWorkViewed: data.portfolioWorkViewed || '',
      sourceUrl: data.sourceUrl || '',
    };

    // 1. Persist to local JSON file
    try {
      const contentDir = path.join(process.cwd(), 'content');
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }
      const leadsFile = path.join(contentDir, 'leads.json');
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          const content = fs.readFileSync(leadsFile, 'utf-8');
          leads = JSON.parse(content);
        } catch {
          leads = [];
        }
      }
      leads.unshift(leadEntry);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('Error saving lead locally:', fsErr);
    }

    // 2. Forward to Google Sheet Webhook if configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadEntry,
            sheetId: '1e8qC8wubtJIaVK60T4Fg6s__eBFFAOF6A8SLlImvL9A',
          }),
        });
      } catch (webhookErr) {
        console.error('Error forwarding to Google Sheet Webhook:', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      leadId: leadEntry.id,
    });
  } catch (error) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leadsFile = path.join(process.cwd(), 'content', 'leads.json');
    if (fs.existsSync(leadsFile)) {
      const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
      return NextResponse.json({
        total: leads.length,
        googleSheet: 'https://docs.google.com/spreadsheets/d/1e8qC8wubtJIaVK60T4Fg6s__eBFFAOF6A8SLlImvL9A/edit?usp=sharing',
        leads,
      });
    }
    return NextResponse.json({ total: 0, leads: [] });
  } catch (err) {
    return NextResponse.json({ total: 0, error: 'Could not fetch leads' });
  }
}
