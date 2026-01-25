# Forms Abstraction Layer

A provider-agnostic form submission system that allows you to switch between different form backends without changing your component code.

## Structure

```
src/lib/forms/
├── index.ts              # Main entry point with provider switching
├── types.ts              # Shared TypeScript interfaces
├── ghl/
│   └── client.ts         # GoHighLevel adapter
├── simple/
│   ├── client.ts         # Resend email adapter
│   └── README.md         # Simple provider docs
├── USAGE.md              # Usage examples and guides
└── README.md             # This file
```

## Providers

### 1. GoHighLevel (GHL)
**Best for:** Agencies, businesses with CRM needs, lead tracking

- ✅ Full CRM integration
- ✅ Contact management (prevents duplicates)
- ✅ Sales pipeline and opportunities
- ✅ Workflow automation
- ✅ Tags and custom fields
- ✅ Notes and activity tracking

**Setup:**
```env
FORM_PROVIDER=ghl
GHL_API_KEY=your_api_key
GHL_LOCATION_ID=your_location_id
GHL_PIPELINE_ID=your_pipeline_id
```

### 2. Simple (Resend Email)
**Best for:** Simple sites, MVPs, no CRM needed

- ✅ Email notifications
- ✅ Beautiful HTML formatting
- ✅ Free tier (100 emails/day)
- ✅ Easy setup
- ✅ No CRM complexity

**Setup:**
```env
FORM_PROVIDER=simple
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFY_EMAIL=your-email@yourdomain.com
```

## Quick Start

### 1. Choose Your Provider

Add to `.env`:
```env
FORM_PROVIDER=ghl  # or 'simple'
```

### 2. Configure Provider Settings

See provider-specific setup above.

### 3. Use in Your Components

```typescript
import { submitForm } from '@/lib/forms';

const response = await submitForm({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '555-1234',
  type: 'contact',
  message: 'Hello!',
});

if (response.success) {
  console.log('Form submitted!');
}
```

## Form Types

The system supports four form types:

1. **contact** - General contact forms
2. **quote** - Business quote requests
3. **prayer** - Church prayer requests
4. **newsletter** - Newsletter signups

## Features

### Type Safety
All forms use TypeScript interfaces for type checking:
- `FormSubmission` - Input data structure
- `FormResponse` - Response structure
- `FormClient` - Provider interface

### Field Configurations
Pre-built field configs for different site types:
- `businessFormFields` - For business sites
- `churchFormFields` - For church sites

### Marketing Attribution
Automatic UTM parameter tracking:
```typescript
utmParams: {
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'summer-sale',
}
```

### Provider Switching
Change providers without touching component code:
```env
# Switch from GHL to Simple
FORM_PROVIDER=simple
```

## Common Fields

All forms support these common fields:

**Required:**
- `firstName`
- `lastName`
- `email`
- `type` (contact | quote | prayer | newsletter)

**Optional:**
- `phone`
- `message`
- `source`
- `pageUrl`
- `utmParams`

## Business-Specific Fields

For `type: 'quote'`:
- `businessName`
- `websiteUrl`
- `budget`
- `service`
- `timeline`

## Church-Specific Fields

For `type: 'prayer'`:
- `prayerRequest`
- `isPrivate`
- `needsPastoralCare`
- `requestType`

## Response Structure

```typescript
{
  success: boolean;        // Whether submission succeeded
  message: string;         // User-facing message
  contactId?: string;      // Contact ID from provider (GHL only)
  isExisting?: boolean;    // Whether contact already existed (GHL only)
  errors?: Record<string, string>;  // Field-level errors
}
```

## Architecture

The forms layer uses the **Adapter Pattern**:

1. **Shared Interface** (`FormClient`) - All providers implement this
2. **Provider Adapters** - Each provider wraps its own API
3. **Factory Function** (`getFormClient()`) - Returns the configured provider
4. **Convenience Function** (`submitForm()`) - Direct usage without getting client

This allows you to:
- Switch providers via environment variable
- Write provider-agnostic component code
- Add new providers without breaking existing code
- Test with mock providers

## Adding a New Provider

1. Create `src/lib/forms/your-provider/client.ts`
2. Implement the `FormClient` interface
3. Add case to switch statement in `index.ts`
4. Add environment variables
5. Document in README

Example skeleton:
```typescript
import type { FormClient, FormSubmission, FormResponse } from '../types';

export const yourProviderClient: FormClient = {
  async submit(data: FormSubmission): Promise<FormResponse> {
    // Your implementation here
    return {
      success: true,
      message: 'Submitted successfully',
    };
  },
};
```

## Testing

### Mock Client for Testing

```typescript
const mockFormClient: FormClient = {
  async submit(data: FormSubmission): Promise<FormResponse> {
    return {
      success: true,
      message: 'Test submission',
      contactId: 'test-123',
    };
  },
};
```

### Integration Testing

```typescript
import { submitForm } from '@/lib/forms';

describe('Form Submission', () => {
  it('should submit contact form', async () => {
    const result = await submitForm({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      type: 'contact',
    });

    expect(result.success).toBe(true);
  });
});
```

## Best Practices

1. **Always validate** on both client and server
2. **Sanitize user input** before displaying in emails
3. **Rate limit** form submissions to prevent spam
4. **Log submissions** for debugging and backup
5. **Handle errors gracefully** with user-friendly messages
6. **Test with real data** in development
7. **Monitor submission failures** in production

## Troubleshooting

### "Form configuration error"
Check that required environment variables are set for your provider.

### Forms not submitting
1. Check browser console for errors
2. Verify API keys are correct
3. Check provider dashboard for API status
4. Test with curl/Postman to isolate issue

### Duplicate submissions
Add client-side button disable and loading state to prevent double-clicks.

### Spam submissions
Implement honeypot fields, rate limiting, or CAPTCHA.

## Resources

- [USAGE.md](./USAGE.md) - Detailed usage examples
- [types.ts](./types.ts) - TypeScript interfaces
- [simple/README.md](./simple/README.md) - Resend provider docs
- [GoHighLevel API Docs](https://highlevel.stoplight.io/)
- [Resend API Docs](https://resend.com/docs)

## Support

For issues or questions:
1. Check provider-specific documentation
2. Review USAGE.md for examples
3. Check environment variable configuration
4. Enable debug logging in client code
