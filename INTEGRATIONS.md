# Integration Patterns

Quick reference for common integrations you'll add to client projects.

---

## 🎯 Quick Integration Templates

### Adding a New API Service

**Pattern**: Create modular service in `src/lib/services/`

```typescript
// src/lib/services/your-service.ts
class YourService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.YOUR_SERVICE_API_KEY;
    this.baseUrl = 'https://api.yourservice.com';
  }

  async callApi(endpoint: string, data?: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: data ? 'POST' : 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const yourService = new YourService();
```

### Adding a Webhook Handler

```typescript
// src/pages/api/webhooks/[service].ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
  const service = params.service;
  
  // Verify webhook signature
  const signature = request.headers.get('x-webhook-signature');
  if (!verifySignature(signature, await request.text())) {
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = await request.json();

  // Handle webhook
  switch (service) {
    case 'stripe':
      await handleStripeWebhook(payload);
      break;
    case 'ghl':
      await handleGHLWebhook(payload);
      break;
    default:
      return new Response('Unknown service', { status: 404 });
  }

  return new Response('OK', { status: 200 });
};
```

---

## 📦 Common Integration Patterns

### 1. Third-Party Widget Embed

**Best for**: Chat widgets, booking calendars, video players

```astro
---
// src/components/ThirdPartyWidget.astro
const widgetId = import.meta.env.PUBLIC_WIDGET_ID;
---

<div id="widget-container"></div>

<script define:vars={{ widgetId }}>
  // Widget initialization code
  (function() {
    const script = document.createElement('script');
    script.src = 'https://widget.example.com/embed.js';
    script.async = true;
    script.onload = () => {
      window.WidgetAPI.init({
        id: widgetId,
        container: '#widget-container'
      });
    };
    document.head.appendChild(script);
  })();
</script>
```

### 2. API Proxy Pattern

**Best for**: Hiding API keys, rate limiting, caching

```typescript
// src/pages/api/proxy/[...path].ts
import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ params, request }) => {
  const path = params.path;
  
  // Forward request to actual API
  const response = await fetch(
    `https://api.thirdparty.com/${path}`,
    {
      method: request.method,
      headers: {
        'Authorization': `Bearer ${import.meta.env.THIRD_PARTY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: request.method !== 'GET' ? await request.text() : undefined,
    }
  );

  // Forward response
  return new Response(await response.text(), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
```

### 3. Feature Flag Pattern

```typescript
// src/lib/features/flags.ts
export const features = {
  aiWorkflows: import.meta.env.ENABLE_AI_WORKFLOWS === 'true',
  payments: import.meta.env.ENABLE_PAYMENTS === 'true',
  chat: import.meta.env.ENABLE_CHAT === 'true',
  analytics: import.meta.env.ENABLE_ANALYTICS === 'true',
};

export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature] ?? false;
}

// Usage in components
import { isFeatureEnabled } from '@/lib/features/flags';

if (isFeatureEnabled('aiWorkflows')) {
  // Load AI features
}
```

---

## 🔗 Popular Integrations by Use Case

### For Business Sites

#### **CRM & Sales**
- ✅ GoHighLevel (already integrated)
- HubSpot
- Salesforce
- Pipedrive

#### **Payments**
- Stripe (recommended)
- PayPal
- Square

#### **Email Marketing**
- Resend (already integrated)
- SendGrid
- Mailchimp
- ConvertKit

#### **Analytics**
- Google Analytics (add via GTM)
- Mixpanel
- PostHog
- Plausible

#### **Live Chat**
- Crisp
- Intercom
- Drift
- Tawk.to (free)

#### **Booking/Scheduling**
- Cal.com (open source)
- Calendly
- Acuity Scheduling

---

### For Church Sites

#### **Giving/Donations**
- Tithely
- Pushpay
- Givelify
- PayPal Giving

#### **Church Management**
- Planning Center
- Church Community Builder
- Breeze ChMS
- FellowshipOne

#### **Live Streaming**
- Church Online Platform
- YouTube Live
- Vimeo Livestream
- Restream

#### **Prayer Requests**
- Built-in (use form system)
- Planning Center Lists
- Custom database

---

## 🛠️ Integration Checklist

When adding a new integration:

- [ ] Check if free tier is available
- [ ] Document monthly costs
- [ ] Add environment variables to `.env`
- [ ] Create service wrapper in `src/lib/services/`
- [ ] Add API endpoint if needed in `src/pages/api/`
- [ ] Update client documentation
- [ ] Add error handling
- [ ] Test in staging
- [ ] Get client approval for costs

---

## 📝 Example: Full Integration (Stripe)

### 1. Install
```bash
npm install stripe @stripe/stripe-js
```

### 2. Environment Variables
```env
STRIPE_SECRET_KEY=sk_test_xxxxx
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
ENABLE_PAYMENTS=true
```

### 3. Create Service
```typescript
// src/lib/services/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: `${import.meta.env.SITE_URL}/success`,
    cancel_url: `${import.meta.env.SITE_URL}/cancel`,
  });
  
  return session;
}
```

### 4. Create API Endpoint
```typescript
// src/pages/api/checkout.ts
import type { APIRoute } from 'astro';
import { createCheckoutSession } from '@/lib/services/stripe';

export const POST: APIRoute = async ({ request }) => {
  const { priceId } = await request.json();
  const session = await createCheckoutSession(priceId);
  
  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### 5. Add Webhook Handler
```typescript
// src/pages/api/webhooks/stripe.ts
import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      import.meta.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful payment
        break;
      case 'payment_intent.succeeded':
        // Handle payment confirmation
        break;
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    return new Response('Webhook error', { status: 400 });
  }
};
```

### 6. Frontend Component
```typescript
// src/components/CheckoutButton.tsx
export default function CheckoutButton({ priceId }) {
  const handleCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <button onClick={handleCheckout}>
      Buy Now
    </button>
  );
}
```

---

## 🎓 Best Practices

### 1. **Always Use Environment Variables**
```typescript
// ❌ Bad
const apiKey = 'hardcoded-key';

// ✅ Good
const apiKey = import.meta.env.SERVICE_API_KEY;
```

### 2. **Error Handling**
```typescript
try {
  const result = await service.call();
  return result;
} catch (error) {
  console.error('Service error:', error);
  // Return graceful fallback
  return { success: false, message: 'Service temporarily unavailable' };
}
```

### 3. **Rate Limiting**
```typescript
// Add to API endpoints
let lastCall = 0;
const RATE_LIMIT = 1000; // 1 second

if (Date.now() - lastCall < RATE_LIMIT) {
  return new Response('Rate limit exceeded', { status: 429 });
}
lastCall = Date.now();
```

### 4. **Caching**
```typescript
const cache = new Map();

async function getCachedData(key: string) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetchData();
  cache.set(key, data);
  return data;
}
```

---

## 📚 Resources

- [Stripe Integration Guide](https://stripe.com/docs/checkout)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
- [Environment Variables](https://docs.astro.build/en/guides/environment-variables/)

---

## 💡 Need Help?

1. Check [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md) for detailed guides
2. Review existing integrations (CMS, Forms)
3. Follow the patterns above
4. Test thoroughly before deploying

**Remember**: Only add what the client needs. Keep projects lean and maintainable!
