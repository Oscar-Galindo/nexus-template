# Simple Form Adapter (Resend)

A lightweight email-based form handler using the Resend API. Perfect for simple sites that don't need a full CRM system.

## Features

- ✅ Simple email notifications for form submissions
- ✅ Beautiful HTML email formatting
- ✅ Supports all form types (contact, quote, prayer, newsletter)
- ✅ Automatic reply-to header for easy responses
- ✅ UTM parameter tracking
- ✅ Generous free tier (100 emails/day)

## Setup

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use the test domain for development)
3. Get your API key from the dashboard

### 2. Configure Environment Variables

Add to your `.env` file:

```env
FORM_PROVIDER=simple
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFY_EMAIL=your-email@yourdomain.com
FROM_EMAIL=forms@yourdomain.com  # Optional, defaults to forms@resend.dev
```

### 3. Verify Domain (Production Only)

For production use, you need to verify your domain in Resend:

1. Go to Resend Dashboard → Domains
2. Add your domain
3. Add the provided DNS records (MX, TXT, etc.)
4. Wait for verification (usually < 15 minutes)

**Note:** For development/testing, you can use `onboarding@resend.dev` as the FROM_EMAIL.

## Email Format

The adapter sends well-formatted HTML emails with:

- **Subject line**: Dynamic based on form type (e.g., "New Quote Request from John Doe")
- **Reply-to**: Automatically set to submitter's email
- **Styled table**: Clean presentation of all form fields
- **Conditional fields**: Only shows fields that are filled in
- **UTM tracking**: Includes marketing attribution data

## Form Type Examples

### Business Contact Form
```
Subject: New Contact Form Submission from Jane Smith

Name: Jane Smith
Email: jane@company.com
Phone: (555) 123-4567
Form Type: contact
Message: I'd like to discuss your services...
```

### Quote Request
```
Subject: New Quote Request from John Doe

Name: John Doe
Email: john@business.com
Business: Acme Corp
Service: web-design
Budget: $5,000 - $10,000
Message: We need a new company website...
```

### Prayer Request (Church)
```
Subject: New Prayer Request from Sarah Johnson

Name: Sarah Johnson
Email: sarah@email.com
Prayer Request: Please pray for healing...
Private: Yes
Needs Pastoral Care: Yes
```

## Customization

### Custom Email Template

Edit the `formatEmailHtml()` function in `client.ts` to customize:

```typescript
function formatEmailHtml(data: FormSubmission): string {
  // Add your custom styling and layout here
  return `
    <!DOCTYPE html>
    <html>
      <!-- Your custom HTML template -->
    </html>
  `;
}
```

### Custom Subject Lines

Edit the `getSubject()` function to change subject line format:

```typescript
function getSubject(data: FormSubmission): string {
  // Customize subject line logic
  return `[URGENT] New ${data.type} from ${data.firstName}`;
}
```

### Multiple Recipients

To send to multiple email addresses:

```typescript
to: [NOTIFY_EMAIL, 'sales@company.com', 'support@company.com'],
```

## Resend Pricing

- **Free**: 100 emails/day, 3,000/month
- **Pro**: $20/month for 50,000 emails/month
- **Enterprise**: Custom pricing

For most small business sites, the free tier is sufficient.

## Alternatives

If you need more than 100 emails/day, consider:

- **Postmark**: Great deliverability, transactional focus
- **SendGrid**: Higher volume plans available
- **AWS SES**: Very cheap for high volume (but more complex setup)
- **Mailgun**: Good API, competitive pricing

## Troubleshooting

### "Missing RESEND_API_KEY or NOTIFY_EMAIL"

Make sure your `.env` file has:
```env
RESEND_API_KEY=re_xxxxx
NOTIFY_EMAIL=you@domain.com
```

### "Failed to send form"

Check the browser console or server logs for specific error messages. Common issues:

1. Invalid API key
2. Unverified domain (in production)
3. Rate limit exceeded
4. Invalid email format

### Emails not arriving

1. Check spam/junk folder
2. Verify domain is properly configured in Resend dashboard
3. Check Resend dashboard logs for delivery status
4. Make sure FROM_EMAIL uses your verified domain

## Testing

### Development Testing

Use Resend's test domain:

```env
FROM_EMAIL=onboarding@resend.dev
```

### Production Testing

Send a test submission and check:

1. Email arrives promptly (usually < 1 second)
2. Formatting looks correct
3. Reply-to works (reply should go to submitter)
4. All form fields are included

## Best Practices

1. **Always verify your domain** for production use
2. **Monitor your Resend dashboard** for delivery issues
3. **Set up DMARC/SPF/DKIM** for better deliverability
4. **Use reply-to header** for easy responses (already implemented)
5. **Log submissions** server-side as backup
