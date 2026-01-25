import type { FormClient, FormSubmission, FormResponse } from '../types';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const NOTIFY_EMAIL = import.meta.env.NOTIFY_EMAIL;
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'forms@resend.dev';

export const simpleFormClient: FormClient = {
  async submit(data: FormSubmission): Promise<FormResponse> {
    if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
      console.error('Missing RESEND_API_KEY or NOTIFY_EMAIL');
      return {
        success: false,
        message: 'Form configuration error. Please contact us directly.',
      };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: getSubject(data),
          html: formatEmailHtml(data),
          reply_to: data.email,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Resend API error:', error);
        return {
          success: false,
          message: 'Failed to send form. Please try again.',
        };
      }

      return {
        success: true,
        message: 'Thank you! We\'ll be in touch soon.',
      };
    } catch (error) {
      console.error('Simple form submission error:', error);
      return {
        success: false,
        message: 'Failed to submit form. Please try again.',
      };
    }
  },
};

function getSubject(data: FormSubmission): string {
  const typeLabels: Record<string, string> = {
    contact: 'New Contact Form Submission',
    quote: 'New Quote Request',
    prayer: 'New Prayer Request',
    newsletter: 'New Newsletter Signup',
  };
  return `${typeLabels[data.type] || 'New Form Submission'} from ${data.firstName} ${data.lastName}`;
}

function formatEmailHtml(data: FormSubmission): string {
  const rows: string[] = [];
  
  // Common fields
  rows.push(`<tr><td><strong>Name:</strong></td><td>${data.firstName} ${data.lastName}</td></tr>`);
  rows.push(`<tr><td><strong>Email:</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>`);
  if (data.phone) rows.push(`<tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>`);
  rows.push(`<tr><td><strong>Form Type:</strong></td><td>${data.type}</td></tr>`);
  
  // Business fields
  if (data.businessName) rows.push(`<tr><td><strong>Business:</strong></td><td>${data.businessName}</td></tr>`);
  if (data.websiteUrl) rows.push(`<tr><td><strong>Website:</strong></td><td>${data.websiteUrl}</td></tr>`);
  if (data.service) rows.push(`<tr><td><strong>Service:</strong></td><td>${data.service}</td></tr>`);
  if (data.budget) rows.push(`<tr><td><strong>Budget:</strong></td><td>${data.budget}</td></tr>`);
  if (data.timeline) rows.push(`<tr><td><strong>Timeline:</strong></td><td>${data.timeline}</td></tr>`);
  
  // Church fields
  if (data.prayerRequest) rows.push(`<tr><td><strong>Prayer Request:</strong></td><td>${data.prayerRequest}</td></tr>`);
  if (data.isPrivate) rows.push(`<tr><td><strong>Private:</strong></td><td>Yes</td></tr>`);
  if (data.needsPastoralCare) rows.push(`<tr><td><strong>Needs Pastoral Care:</strong></td><td>Yes</td></tr>`);
  
  // Message
  if (data.message) rows.push(`<tr><td><strong>Message:</strong></td><td>${data.message}</td></tr>`);
  
  // UTM params
  if (data.utmParams && Object.keys(data.utmParams).length > 0) {
    const utmStr = Object.entries(data.utmParams)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    if (utmStr) rows.push(`<tr><td><strong>UTM:</strong></td><td>${utmStr}</td></tr>`);
  }
  
  if (data.pageUrl) rows.push(`<tr><td><strong>Page:</strong></td><td>${data.pageUrl}</td></tr>`);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        table { border-collapse: collapse; width: 100%; max-width: 600px; }
        td { padding: 10px; border-bottom: 1px solid #eee; }
        td:first-child { width: 140px; color: #666; }
        h2 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
      </style>
    </head>
    <body>
      <h2>${getSubject(data)}</h2>
      <table>${rows.join('')}</table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">
        Sent from your website contact form
      </p>
    </body>
    </html>
  `;
}
