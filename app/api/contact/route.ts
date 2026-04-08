import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .max(20)
    .regex(/^[\d\s()+-]{7,20}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Service selection is required'),
  message: z.string().max(2000).optional().default(''),
});

// Rate limiting placeholder: implement with Upstash Redis or similar in production
// const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1h") });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'South Charlotte Plumbing <noreply@southcharlotteplumbing.com>',
      to: 'hello@southcharlotteplumbing.com',
      replyTo: data.email,
      subject: `New Lead: ${data.service} — ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B2E4A; border-bottom: 2px solid #C8963E; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #1B2E4A; width: 140px;">Name:</td>
              <td style="padding: 10px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #1B2E4A;">Phone:</td>
              <td style="padding: 10px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #1B2E4A;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #1B2E4A;">Service:</td>
              <td style="padding: 10px 0;">${escapeHtml(data.service)}</td>
            </tr>
            ${
              data.message
                ? `<tr>
              <td style="padding: 10px 0; font-weight: bold; color: #1B2E4A; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0;">${escapeHtml(data.message)}</td>
            </tr>`
                : ''
            }
          </table>
          <p style="margin-top: 24px; color: #999; font-size: 12px;">
            Submitted via southcharlotteplumbing.com contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
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
