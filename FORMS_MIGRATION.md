# Forms Migration Guide

This document explains the migration from GHL-specific forms to the new provider-agnostic form system.

## What Changed

### Old System (GHL-specific)
```
❌ Hardcoded GHL API calls in components
❌ Forms tightly coupled to GoHighLevel
❌ Cannot switch providers without rewriting code
❌ Endpoint: /api/ghl/submit-form
```

### New System (Provider-agnostic)
```
✅ Form abstraction layer
✅ Switch providers via environment variable
✅ Works with GHL or email notifications
✅ Endpoint: /api/submit-form
```

## Architecture Changes

### Before
```
Form Component → /api/ghl/submit-form → GHL API directly
```

### After
```
Form Component → /api/submit-form → Form Adapter → Provider (GHL or Email)
```

## File Changes

### New Files Created

```
src/lib/forms/
├── index.ts                    # Main entry point with provider switching
├── types.ts                    # Shared interfaces
├── ghl/client.ts              # GHL adapter
└── simple/client.ts           # Email adapter

src/pages/api/
├── submit-form.ts             # New unified endpoint
└── ghl/submit-form.ts         # Redirect for backward compatibility

src/components/forms/
├── ContactForm.tsx            # Example contact form
├── QuoteForm.tsx             # Example quote form
├── PrayerRequestForm.tsx     # Example prayer form
└── README.md                  # Documentation
```

## Migration Steps

### Step 1: Update Endpoint URLs

**Old:**
```tsx
fetch('/api/ghl/submit-form', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

**New:**
```tsx
fetch('/api/submit-form', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

### Step 2: Update Type Imports

**Old:**
```tsx
// Custom types or no types
interface FormData {
  firstName: string;
  // ...
}
```

**New:**
```tsx
import type { FormSubmission, FormResponse } from '@/lib/forms';

const submission: FormSubmission = {
  firstName: 'John',
  // ...
};
```

### Step 3: Use Standardized Response

**Old:**
```tsx
const response = await fetch('/api/ghl/submit-form', ...);
const result = await response.json();
// Custom response format
```

**New:**
```tsx
const response = await fetch('/api/submit-form', ...);
const result: FormResponse = await response.json();

if (result.success) {
  console.log('Submitted!', result.contactId);
} else {
  console.error('Error:', result.message, result.errors);
}
```

### Step 4: Configure Provider

Add to `.env`:
```env
# Choose provider
FORM_PROVIDER=ghl  # or 'simple'

# GHL configuration (if using ghl)
GHL_API_KEY=your_key
GHL_LOCATION_ID=your_location_id
GHL_PIPELINE_ID=your_pipeline_id

# Email configuration (if using simple)
RESEND_API_KEY=re_xxxxx
NOTIFY_EMAIL=you@domain.com
FROM_EMAIL=forms@domain.com
```

## Backward Compatibility

The old endpoint still works! It redirects to the new endpoint:

```
/api/ghl/submit-form → /api/submit-form
```

This means:
- ✅ Existing forms keep working
- ✅ No urgent migration needed
- ✅ Migrate at your own pace
- ⚠️ Old endpoint may be removed in future versions

## Benefits of Migration

### 1. Provider Flexibility
Switch from GHL to email (or add new providers) by changing one environment variable:
```env
FORM_PROVIDER=simple  # Instant switch!
```

### 2. Consistent API
All forms use the same interface regardless of provider:
```tsx
// Works with any provider
await submitForm({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  type: 'contact',
});
```

### 3. Type Safety
Full TypeScript support with shared types:
```tsx
import type { FormSubmission, FormResponse } from '@/lib/forms';
```

### 4. Better Testing
Mock the form client for testing:
```tsx
const mockClient: FormClient = {
  async submit(data) {
    return { success: true, message: 'Test' };
  },
};
```

### 5. Easier Maintenance
- Single place to update provider logic
- Shared validation and error handling
- Consistent response format

## Example Migration

### Before (GHL-specific)

```tsx
// CustomGHLForm.tsx
export default function CustomGHLForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/ghl/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        // ... GHL-specific fields
      }),
    });
    
    const result = await response.json();
    // Handle custom response format
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### After (Provider-agnostic)

```tsx
// ContactForm.tsx
import type { FormSubmission, FormResponse } from '@/lib/forms';

export default function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submission: FormSubmission = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      type: 'contact',
    };
    
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    
    const result: FormResponse = await response.json();
    
    if (result.success) {
      // Standardized success handling
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Common Issues During Migration

### Issue 1: Type Errors

**Problem:**
```
Property 'type' is missing in type...
```

**Solution:**
Add the required `type` field:
```tsx
const submission: FormSubmission = {
  // ...
  type: 'contact', // Required!
};
```

### Issue 2: Environment Variables

**Problem:**
```
Form configuration error
```

**Solution:**
Ensure you've set the required env vars for your provider:
```env
# For GHL
FORM_PROVIDER=ghl
GHL_API_KEY=...
GHL_LOCATION_ID=...

# Or for Simple
FORM_PROVIDER=simple
RESEND_API_KEY=...
NOTIFY_EMAIL=...
```

### Issue 3: Response Format Changed

**Problem:**
Old code expecting different response structure.

**Solution:**
Update to use the standardized `FormResponse`:
```tsx
// Old
if (result.contactId) { ... }

// New
if (result.success && result.contactId) { ... }
```

## Testing Your Migration

### 1. Test Form Submission
```bash
curl -X POST http://localhost:4321/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "type": "contact"
  }'
```

### 2. Check Provider Integration
- **GHL:** Check dashboard for new contact
- **Email:** Check inbox for notification

### 3. Test Both Providers
```bash
# Test with GHL
FORM_PROVIDER=ghl npm run dev

# Test with Email
FORM_PROVIDER=simple npm run dev
```

## Rollback Plan

If you need to rollback:

1. **Keep using old endpoint**
   ```tsx
   fetch('/api/ghl/submit-form', ...)
   ```

2. **Use GHL directly**
   ```tsx
   import { GHLClient } from '@/lib/api/ghl';
   const ghl = new GHLClient();
   await ghl.createContact(data);
   ```

3. **Restore old environment variables**
   ```env
   # Remove new vars
   # FORM_PROVIDER=...
   
   # Keep only GHL vars
   GHL_API_KEY=...
   GHL_LOCATION_ID=...
   ```

## Next Steps

1. ✅ Review this migration guide
2. ✅ Test the `/forms-demo` page
3. ✅ Update one form component as a test
4. ✅ Verify provider integration works
5. ✅ Gradually migrate remaining forms
6. ✅ Update documentation
7. ✅ Remove old GHL-specific code (optional)

## Questions?

- Check `src/lib/forms/USAGE.md` for detailed usage examples
- Check `src/components/forms/README.md` for component docs
- Test with the demo page at `/forms-demo`

## Timeline

- **Phase 1 (Now):** New system available, old endpoint still works
- **Phase 2 (Soon):** Deprecation notice on old endpoint
- **Phase 3 (Future):** Remove old endpoint (after full migration)

No rush! Migrate at your own pace. The old endpoint will continue working.
