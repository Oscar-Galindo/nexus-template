# Form Components

Ready-to-use React form components that work with the form abstraction layer. These components automatically use the configured form provider (GHL or Simple).

## Available Components

### 1. ContactForm.tsx
General contact form for business or church sites.

**Fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Message (optional)

**Usage in Astro:**
```astro
---
// src/pages/contact.astro
import ContactForm from '@/components/forms/ContactForm';
---

<html>
  <head>
    <title>Contact Us</title>
  </head>
  <body>
    <h1>Get In Touch</h1>
    <ContactForm client:load />
  </body>
</html>
```

### 2. QuoteForm.tsx
Business quote request form with service and budget options.

**Fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (required)
- Business Name (optional)
- Service (dropdown)
- Budget (dropdown)
- Message (optional)

**Usage in Astro:**
```astro
---
import QuoteForm from '@/components/forms/QuoteForm';
---

<html>
  <body>
    <h1>Request a Quote</h1>
    <QuoteForm client:load />
  </body>
</html>
```

### 3. PrayerRequestForm.tsx
Church prayer request form with privacy options.

**Fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Prayer Request (required)
- Keep Private (checkbox)
- Request Pastoral Care (checkbox)

**Usage in Astro:**
```astro
---
import PrayerRequestForm from '@/components/forms/PrayerRequestForm';
---

<html>
  <body>
    <h1>Prayer Requests</h1>
    <PrayerRequestForm client:load />
  </body>
</html>
```

## Features

### ✅ Provider Agnostic
All forms automatically use the configured provider:
- `FORM_PROVIDER=ghl` → Submits to GoHighLevel
- `FORM_PROVIDER=simple` → Sends email via Resend

### ✅ Built-in Validation
- Client-side HTML5 validation
- Server-side validation via API endpoint
- Email format validation
- Required field checking

### ✅ User Feedback
- Loading states during submission
- Success/error messages
- Field-level error display
- Form reset on success

### ✅ Modern UX
- Tailwind CSS styling (or UnoCSS equivalent)
- Disabled state during submission
- Accessible form labels
- Mobile-responsive design

### ✅ Tracking Ready
- Automatic source tracking
- Page URL capture
- Ready for UTM parameters

## API Endpoint

All forms submit to `/api/submit-form` which:
1. Validates the submission data
2. Routes to the configured provider (GHL or Simple)
3. Returns a standardized response

### Backward Compatibility
The old endpoint `/api/ghl/submit-form` still works and forwards requests to the new endpoint.

## Customization

### Styling
Forms use Tailwind/UnoCSS classes. Customize by editing the className attributes:

```tsx
// Change button style
<button
  type="submit"
  className="w-full bg-purple-600 text-white py-3 rounded-full"
>
  Submit
</button>
```

### Fields
Add or remove fields by modifying the component:

```tsx
// Add a new field
<div>
  <label htmlFor="company" className="block text-sm font-medium mb-1">
    Company Name
  </label>
  <input
    type="text"
    id="company"
    name="company"
    className="w-full px-4 py-2 border rounded-lg"
  />
</div>

// Include in submission
const submission: FormSubmission = {
  // ... existing fields
  businessName: formData.get('company') as string,
};
```

### Success Handling
Customize what happens after successful submission:

```tsx
if (result.success) {
  e.currentTarget.reset();
  
  // Add custom behavior
  window.location.href = '/thank-you';
  // or
  showConfetti();
  // or
  trackConversion('form_submission');
}
```

## Advanced: UTM Tracking

Add UTM parameter tracking to any form:

```tsx
// Capture UTM params from URL
const urlParams = new URLSearchParams(
  typeof window !== 'undefined' ? window.location.search : ''
);

const submission: FormSubmission = {
  // ... other fields
  utmParams: {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  },
};
```

## Advanced: React Hook Form

For complex forms with advanced validation, use React Hook Form + Zod:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message too short'),
});

type FormData = z.infer<typeof schema>;

export default function AdvancedContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, type: 'contact' }),
    });
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      {/* ... other fields */}
    </form>
  );
}
```

## Testing

### Test with Mock Data

```tsx
const testSubmission: FormSubmission = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  type: 'contact',
  message: 'This is a test submission',
};

const response = await fetch('/api/submit-form', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testSubmission),
});

const result = await response.json();
console.log('Test result:', result);
```

### Check Provider Integration

1. **GHL Testing:**
   - Check GHL dashboard for new contact
   - Verify tags are applied
   - Check workflows are triggered

2. **Simple (Email) Testing:**
   - Check inbox for email notification
   - Verify all fields are included
   - Test reply-to functionality

## Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check environment variables are set
4. Test API endpoint directly with Postman/curl

### No Response from Provider
1. Verify provider credentials (API keys)
2. Check provider dashboard for errors
3. Review server logs
4. Test provider connection separately

### Styling Issues
1. Ensure Tailwind/UnoCSS is configured
2. Check for class name conflicts
3. Add custom CSS if needed

## Migration from Old GHL Forms

If you have existing forms using `/api/ghl/submit-form`:

1. **Option 1: Update endpoint path (recommended)**
   ```diff
   - fetch('/api/ghl/submit-form', ...)
   + fetch('/api/submit-form', ...)
   ```

2. **Option 2: Use redirect (no code changes)**
   The old endpoint still works and forwards to the new one.

3. **Update imports if needed**
   ```diff
   - import type { FormData } from '@/lib/api/ghl';
   + import type { FormSubmission } from '@/lib/forms';
   ```
