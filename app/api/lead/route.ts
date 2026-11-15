import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_CATEGORIES = ['skincare', 'fashion', 'wellness', 'home', 'pets', 'other'];
const ALLOWED_CHANNELS = ['marketplace', 'social', 'website', 'none'];
const ALLOWED_ORDERS = ['0-20', '20-100', '100-500', '500+'];
const ALLOWED_BUDGETS = ['under20', '25-50', '50plus', 'unsure'];

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown> = {};

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json({ ok: false, error: 'Invalid JSON payload' }, { status: 400 });
      }
    }

    // 1. Honeypot check for bots
    if (body.company && String(body.company).trim().length > 0) {
      return NextResponse.json({ ok: true, dropped: true });
    }

    // 2. Validate fields
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const category = typeof body.category === 'string' ? body.category.trim() : '';
    const channel = typeof body.channel === 'string' ? body.channel.trim() : '';
    const orders = typeof body.orders === 'string' ? body.orders.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const storeLink = typeof body.storeLink === 'string' ? body.storeLink.trim() : '';
    const quality = typeof body.quality === 'string' ? body.quality.trim() : 'Cold';
    const leadId = typeof body.leadId === 'string' ? body.leadId.trim() : '';

    if (name.length < 2 || name.length > 500) {
      return NextResponse.json({ ok: false, error: 'Name must be at least 2 characters' }, { status: 400 });
    }

    // Phone must strictly be +91 followed by 10 digits starting with 6-9
    if (!/^\+91[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: 'Valid 10-digit Indian WhatsApp number is required' }, { status: 400 });
    }

    if (!category || (!ALLOWED_CATEGORIES.includes(category) && category.length > 500)) {
      return NextResponse.json({ ok: false, error: 'Invalid category' }, { status: 400 });
    }

    if (!channel || (!ALLOWED_CHANNELS.includes(channel) && channel.length > 500)) {
      return NextResponse.json({ ok: false, error: 'Invalid channel' }, { status: 400 });
    }

    if (!orders || (!ALLOWED_ORDERS.includes(orders) && orders.length > 500)) {
      return NextResponse.json({ ok: false, error: 'Invalid orders tier' }, { status: 400 });
    }

    if (!budget || (!ALLOWED_BUDGETS.includes(budget) && budget.length > 500)) {
      return NextResponse.json({ ok: false, error: 'Invalid budget tier' }, { status: 400 });
    }

    // 3. Prepare payload for Google Sheet Webhook
    const webhookUrl = process.env.LEAD_SHEET_WEBHOOK_URL;
    const secret = process.env.LEAD_SHEET_SECRET;

    if (webhookUrl) {
      const sheetPayload = {
        secret,
        leadId,
        name,
        phone,
        storeLink: storeLink.slice(0, 500),
        category,
        channel,
        orders,
        budget,
        quality,
        utm_source: typeof body.utm_source === 'string' ? body.utm_source.slice(0, 500) : '',
        utm_medium: typeof body.utm_medium === 'string' ? body.utm_medium.slice(0, 500) : '',
        utm_campaign: typeof body.utm_campaign === 'string' ? body.utm_campaign.slice(0, 500) : '',
        utm_content: typeof body.utm_content === 'string' ? body.utm_content.slice(0, 500) : '',
        utm_term: typeof body.utm_term === 'string' ? body.utm_term.slice(0, 500) : '',
        fbclid: typeof body.fbclid === 'string' ? body.fbclid.slice(0, 500) : '',
        variant: typeof body.variant === 'string' ? body.variant.slice(0, 500) : 'default',
        pageUrl: typeof body.pageUrl === 'string' ? body.pageUrl.slice(0, 500) : '',
        device: typeof body.device === 'string' ? body.device.slice(0, 200) : '',
      };

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(sheetPayload),
          redirect: 'follow',
        });
      } catch (err) {
        console.error('Failed to forward lead to Google Sheets webhook:', err);
        // We still return ok: true so the client can proceed to WhatsApp
      }
    }

    return NextResponse.json({ ok: true, leadId });
  } catch (error) {
    console.error('API /api/lead error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
