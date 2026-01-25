# Forms Abstraction Layer Usage

The forms abstraction layer allows you to switch between different form providers (GoHighLevel, Resend email) without changing your component code.

## Configuration

Set the `FORM_PROVIDER` environment variable in your `.env` file:

```env
# Choose: ghl | simple
FORM_PROVIDER=ghl

# For GHL (if FORM_PROVIDER=ghl)
GHL_API_KEY=your_api_key
GHL_LOCATION_ID=your_location_id
GHL_PIPELINE_ID=your_pipeline_id
GHL_WORKFLOW_CONTACT=workflow_id_for_contact_forms
GHL_WORKFLOW_QUOTE=workflow_id_for_quote_forms
GHL_WORKFLOW_PRAYER=workflow_id_for_prayer_forms

# For Simple (if FORM_PROVIDER=simple)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFY_EMAIL=your-email@yourdomain.com
FROM_EMAIL=forms@yourdomain.com
```

## Usage Methods

### Method 1: Using `submitForm()` (Recommended)

```typescript
import { submitForm } from '@/lib/forms';

const handleSubmit = async (formData) => {
  const response = await submitForm({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    type: 'contact',
    message: formData.message,
  });

  if (response.success) {
    console.log('Form submitted successfully!');
  } else {
    console.error('Error:', response.message);
  }
};
```

### Method 2: Using `getFormClient()`

```typescript
import { getFormClient } from '@/lib/forms';

const client = await getFormClient();
const response = await client.submit(formData);
```

## React Component Example - Contact Form

```tsx
// src/components/ContactForm.tsx
import { useState } from 'react';
import { submitForm } from '@/lib/forms';
import type { FormSubmission, FormResponse } from '@/lib/forms';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<FormResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    
    const submission: FormSubmission = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      type: 'contact',
      message: formData.get('message') as string,
      source: 'website',
      pageUrl: window.location.href,
    };

    const result = await submitForm(submission);
    setResponse(result);
    setLoading(false);

    if (result.success) {
      e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-2">First Name *</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-2">Last Name *</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {response && (
        <div className={`mb-4 p-4 rounded ${response.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {response.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## React Component Example - Quote Request Form

```tsx
// src/components/QuoteForm.tsx
import { useState } from 'react';
import { submitForm, businessFormFields } from '@/lib/forms';
import type { FormSubmission } from '@/lib/forms';

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const submission: FormSubmission = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      type: 'quote',
      businessName: formData.get('businessName') as string,
      service: formData.get('service') as string,
      budget: formData.get('budget') as string,
      timeline: formData.get('timeline') as string,
      message: formData.get('message') as string,
      source: 'quote-form',
      pageUrl: window.location.href,
    };

    const result = await submitForm(submission);
    setLoading(false);

    if (result.success) {
      alert('Thank you! We\'ll send you a quote soon.');
      e.currentTarget.reset();
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render fields based on businessFormFields config */}
      {businessFormFields.map(field => (
        <div key={field.name} className="mb-4">
          <label className="block mb-2">{field.label}</label>
          {field.type === 'select' ? (
            <select name={field.name} required={field.required} className="w-full px-4 py-2 border rounded">
              <option value="">Select...</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea name={field.name} required={field.required} className="w-full px-4 py-2 border rounded" />
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="w-full px-4 py-2 border rounded"
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded">
        {loading ? 'Submitting...' : 'Request Quote'}
      </button>
    </form>
  );
}
```

## Church Example - Prayer Request Form

```tsx
// src/components/PrayerRequestForm.tsx
import { useState } from 'react';
import { submitForm, churchFormFields } from '@/lib/forms';
import type { FormSubmission } from '@/lib/forms';

export default function PrayerRequestForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const submission: FormSubmission = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      type: 'prayer',
      prayerRequest: formData.get('prayerRequest') as string,
      isPrivate: formData.get('isPrivate') === 'on',
      needsPastoralCare: formData.get('needsPastoralCare') === 'on',
      source: 'website',
    };

    const result = await submitForm(submission);
    
    if (result.success) {
      alert('Thank you for sharing your prayer request with us.');
      e.currentTarget.reset();
    } else {
      alert('Error submitting prayer request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {churchFormFields.map(field => (
        <div key={field.name} className="mb-4">
          <label className="block mb-2">{field.label}</label>
          {field.type === 'checkbox' ? (
            <input type="checkbox" name={field.name} />
          ) : field.type === 'textarea' ? (
            <textarea name={field.name} required={field.required} rows={5} className="w-full px-4 py-2 border rounded" />
          ) : (
            <input type={field.type} name={field.name} required={field.required} className="w-full px-4 py-2 border rounded" />
          )}
        </div>
      ))}

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded">
        Submit Prayer Request
      </button>
    </form>
  );
}
```

## Astro API Endpoint Example

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { submitForm } from '@/lib/forms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    const result = await submitForm({
      ...data,
      source: 'api',
      pageUrl: request.headers.get('referer') || '',
    });

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Server error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
```

## Adding UTM Tracking

```typescript
// Capture UTM parameters from URL
const urlParams = new URLSearchParams(window.location.search);

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

## Using with React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitForm } from '@/lib/forms';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactFormWithValidation() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitForm({
      ...data,
      type: 'contact',
    });

    if (result.success) {
      alert('Thank you for your message!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with error handling */}
    </form>
  );
}
```

## Benefits

1. **Provider Agnostic**: Switch between GHL and email by changing one env var
2. **Type Safe**: Full TypeScript support with shared interfaces
3. **Consistent API**: Same code works with any provider
4. **Easy Testing**: Mock the form client for testing
5. **Field Configurations**: Pre-built configs for business and church forms
