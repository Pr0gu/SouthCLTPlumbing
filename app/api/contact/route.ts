import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .max(20)
    .regex(/^[\d\s()+-]{7,20}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address').max(254),
  address: z.string().max(300).optional().default(''),
  service: z.string().min(1, 'Service selection is required').max(200),
  urgency: z.string().max(50).optional().default(''),
  message: z.string().max(2000).optional().default(''),
  // Honeypot — bots fill this, humans don't
  website: z.string().max(0).optional(),
  _formLoadedAt: z.number().optional(),
});

// Simple in-memory rate limiter (5 submissions per IP per hour)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimits.get(ip);

  if (!existing || existing.resetAt < now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT) return false;

  existing.count++;
  return true;
}

// Cleanup stale entries every 10 min
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of Array.from(rateLimits.entries())) {
      if (entry.resetAt < now) rateLimits.delete(ip);
    }
  }, 10 * 60 * 1000);
}

export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — silently succeed if bot
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Form timing check — reject if filled in less than 3 seconds (bot)
    if (body._formLoadedAt) {
      const fillTime = Date.now() - body._formLoadedAt;
      if (fillTime < 3000) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }

    const data = contactSchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'South Charlotte Plumbing <noreply@southcharlotteplumbing.com>',
      to: 'hello@southcharlotteplumbing.com',
      replyTo: data.email,
      subject: `New Lead: ${data.service} — ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B2E4A; border-bottom: 2px solid #C8963E; padding-bottom: 12px;">
            New Contact — South Charlotte Plumbing
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; font-weight: bold; width: 140px;">Name:</td><td style="padding: 10px 0;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold;">Phone:</td><td style="padding: 10px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold;">Email:</td><td style="padding: 10px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold;">Service:</td><td style="padding: 10px 0;">${escapeHtml(data.service)}</td></tr>
            ${data.urgency ? `<tr><td style="padding: 10px 0; font-weight: bold;">Urgency:</td><td style="padding: 10px 0;">${escapeHtml(data.urgency)}</td></tr>` : ''}
            ${data.address ? `<tr><td style="padding: 10px 0; font-weight: bold;">Address:</td><td style="padding: 10px 0;">${escapeHtml(data.address)}</td></tr>` : ''}
            ${data.message ? `<tr><td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 10px 0;">${escapeHtml(data.message)}</td></tr>` : ''}
          </table>
          <p style="margin-top: 24px; color: #999; font-size: 12px;">Submitted via southcharlotteplumbing.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
