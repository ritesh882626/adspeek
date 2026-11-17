// app/api/lead/route.ts
// Receives the quiz submit, then in parallel:
//   1) sends the server-side Lead to Meta (Conversions API), same event_id as the browser Lead → Meta keeps one
//   2) saves the lead to the Google Sheet (Apps Script), adding IP + user agent for later Good/Bad events
// Env (server-only, never NEXT_PUBLIC): META_CAPI_TOKEN, LEAD_SHEET_URL
// Env (optional): META_API_VERSION (default v27.0), META_TEST_EVENT_CODE (only while testing)
// Env (public): NEXT_PUBLIC_META_PIXEL_ID

import { createHash } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2230033094610484';
const TOKEN = process.env.META_CAPI_TOKEN || '';
const API_VERSION = process.env.META_API_VERSION || 'v27.0';
const TEST_CODE = process.env.META_TEST_EVENT_CODE || '';
const SHEET_URL = process.env.LEAD_SHEET_URL || '';

type LeadBody = {
  leadId?: string; name?: string; phone?: string; email?: string; storeLink?: string;
  business?: string; product?: string; sales?: string; timeline?: string; quality?: string; variant?: string;
  utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_content?: string; utm_term?: string;
  fbclid?: string; fbp?: string; fbc?: string; pageUrl?: string; device?: string; hp?: string;
};

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const sha = (v: string) => createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

function clientIp(req: Request): string {
  const h = req.headers;
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return h.get('x-real-ip') || h.get('cf-connecting-ip') || '';
}

async function sendLeadToMeta(b: LeadBody, ip: string, ua: string): Promise<boolean> {
  if (!TOKEN) { console.warn('[lead] META_CAPI_TOKEN missing — server Lead not sent'); return false; }
  const phoneDigits = (b.phone || '').replace(/\D/g, '');               // "919876543210"
  const [fn, ...rest] = (b.name || '').trim().split(/\s+/);
  const ln = rest.length ? rest[rest.length - 1] : '';

  const user_data: Record<string, unknown> = {
    ph: [sha(phoneDigits)],
    country: [sha('in')],
    external_id: [sha(phoneDigits)],
    client_user_agent: ua,
  };
  if (b.email) user_data.em = [sha(b.email)];
  if (fn) user_data.fn = [sha(fn)];
  if (ln) user_data.ln = [sha(ln)];
  if (ip) user_data.client_ip_address = ip;
  if (b.fbp) user_data.fbp = b.fbp;
  if (b.fbc) user_data.fbc = b.fbc;

  const body: Record<string, unknown> = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: b.leadId,                       // SAME id as the browser fbq('track','Lead',…,{eventID})
      action_source: 'website',
      event_source_url: b.pageUrl,
      user_data,
      custom_data: {
        content_name: 'lead_quiz', lead_source: 'adspeek_start_form',
        business_type: b.business, product: b.product, monthly_sales: b.sales,
        start: b.timeline, lead_quality: b.quality,
      },
    }],
  };
  if (TEST_CODE) body.test_event_code = TEST_CODE;

  const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) console.error('[lead] Meta CAPI error', res.status, await res.text().catch(() => ''));
  return res.ok;
}

async function saveToSheet(b: LeadBody, ip: string, ua: string): Promise<boolean> {
  if (!SHEET_URL) { console.warn('[lead] LEAD_SHEET_URL missing — lead not saved'); return false; }
  const res = await fetch(SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },   // Apps Script reads e.postData.contents
    body: JSON.stringify({ ...b, ip, userAgent: ua }),
    redirect: 'follow',
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) console.error('[lead] Sheet error', res.status);
  return res.ok;
}

export async function POST(req: Request) {
  let raw: unknown;
  try { raw = await req.json(); } catch { return Response.json({ ok: false, error: 'bad_json' }, { status: 400 }); }
  const r = (raw || {}) as Record<string, unknown>;

  // Bot trap: pretend success, send nothing.
  if (str(r.hp)) return Response.json({ ok: true });

  const b: LeadBody = {
    leadId: str(r.leadId, 80), name: str(r.name, 80).replace(/\s+/g, ' '), phone: str(r.phone, 20),
    email: str(r.email, 120).toLowerCase(), storeLink: str(r.storeLink, 200),
    business: str(r.business, 60), product: str(r.product, 60), sales: str(r.sales, 30), timeline: str(r.timeline, 30),
    quality: str(r.quality, 30), variant: str(r.variant, 40),
    utm_source: str(r.utm_source, 100), utm_medium: str(r.utm_medium, 100), utm_campaign: str(r.utm_campaign, 150),
    utm_content: str(r.utm_content, 150), utm_term: str(r.utm_term, 100), fbclid: str(r.fbclid, 300),
    fbp: str(r.fbp, 200), fbc: str(r.fbc, 400), pageUrl: str(r.pageUrl, 300), device: str(r.device, 200),
  };

  const valid =
    !!b.leadId && (b.name || '').length >= 2 &&
    /^\+91[6-9]\d{9}$/.test(b.phone || '') &&
    (!b.email || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(b.email)) &&
    !!b.business;
  if (!valid) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

  const ip = clientIp(req);
  const ua = (req.headers.get('user-agent') || '').slice(0, 400);

  const [meta, sheet] = await Promise.allSettled([sendLeadToMeta(b, ip, ua), saveToSheet(b, ip, ua)]);
  return Response.json({
    ok: true,
    meta: meta.status === 'fulfilled' && meta.value,
    sheet: sheet.status === 'fulfilled' && sheet.value,
  });
}
