# Advanced Features Guide

Optional features you can add to client projects when needed. **Don't add these to the base template** - only implement for clients who specifically need them.

---

## 🤖 AI-Powered Workflow Creation (Claude + GHL)

**When to use**: Client needs automated workflow generation or complex automation setup

**Cost**: ~$0.003-0.015 per workflow generation (Claude API)

### Setup

1. **Install dependencies**:
```bash
npm install @anthropic-ai/sdk
```

2. **Add environment variables**:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
ENABLE_AI_WORKFLOWS=true
```

3. **Create AI agent** (`src/lib/ai/claude-ghl-agent.ts`):
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

interface WorkflowRequest {
  description: string;
  locationId: string;
}

export async function createWorkflowWithAI(request: WorkflowRequest) {
  const systemPrompt = `You are a GoHighLevel workflow automation expert. 
  Create workflow configurations based on user descriptions.
  
  Available GHL actions:
  - Send Email
  - Send SMS  
  - Wait (delay in days/hours)
  - Add Tag
  - Remove Tag
  - Create Opportunity
  - Update Contact Field
  - Trigger Webhook
  - If/Then Conditions
  
  Output valid JSON:
  {
    "name": "Workflow Name",
    "trigger": { 
      "type": "tag_added|form_submitted|opportunity_created",
      "config": {}
    },
    "actions": [
      {
        "type": "send_email",
        "config": {
          "templateId": "...",
          "subject": "...",
          "delay": "0"
        }
      }
    ]
  }`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Create a GHL workflow: ${request.description}`,
      },
    ],
  });

  const workflowConfig = JSON.parse(response.content[0].text);
  
  // Create workflow in GHL
  const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/workflows', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locationId: request.locationId,
      ...workflowConfig,
    }),
  });

  return ghlResponse.json();
}
```

4. **Create API endpoint** (`src/pages/api/ai/create-workflow.ts`):
```typescript
import type { APIRoute } from 'astro';
import { createWorkflowWithAI } from '@/lib/ai/claude-ghl-agent';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { description, locationId } = await request.json();
    
    const workflow = await createWorkflowWithAI({
      description,
      locationId,
    });

    return new Response(JSON.stringify(workflow), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
};
```

5. **Usage example**:
```typescript
const response = await fetch('/api/ai/create-workflow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'Create a 5-day welcome series with emails on day 1, 3, and 5',
    locationId: 'abc123',
  }),
});

const workflow = await response.json();
console.log('Created workflow:', workflow.id);
```

### Use Cases
- Automated email sequences
- Lead nurturing campaigns
- Event follow-up workflows
- Onboarding automations
- Re-engagement campaigns

---

## 🔐 Advanced Authentication

**When to use**: Client needs user accounts, protected routes, or member areas

### Option A: Auth.js (Recommended)

```bash
npm install next-auth@beta @auth/core
```

### Option B: Clerk

```bash
npm install @clerk/astro
```

### Option C: Supabase Auth

```bash
npm install @supabase/supabase-js
```

---

## 💳 Payment Processing

### Stripe Integration

**When to use**: E-commerce, subscriptions, one-time payments

```bash
npm install stripe @stripe/stripe-js
```

**Setup** (`src/lib/payments/stripe.ts`):
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(items: any[]) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: `${import.meta.env.SITE_URL}/success`,
    cancel_url: `${import.meta.env.SITE_URL}/cancel`,
  });
  
  return session;
}
```

### Tithely (Church Giving)

**When to use**: Church sites needing donation processing

```html
<!-- Embed Tithely giving widget -->
<script src="https://tithe.ly/widget/v3/give.js?3"></script>
<div id="tithely-give-widget" data-church-id="${TITHELY_CHURCH_ID}"></div>
```

---

## 📊 Advanced Analytics

### Mixpanel Event Tracking

```bash
npm install mixpanel-browser
```

```typescript
// src/lib/analytics/mixpanel.ts
import mixpanel from 'mixpanel-browser';

mixpanel.init(import.meta.env.MIXPANEL_TOKEN);

export function trackEvent(event: string, properties?: any) {
  mixpanel.track(event, properties);
}
```

### PostHog

```bash
npm install posthog-js
```

---

## 📧 Advanced Email Features

### Bulk Email with SendGrid

```bash
npm install @sendgrid/mail
```

### Transactional Emails with Postmark

```bash
npm install postmark
```

---

## 🔍 Full-Text Search

### Algolia

```bash
npm install algoliasearch
```

### Typesense (Self-hosted alternative)

```bash
npm install typesense
```

---

## 🎥 Video Streaming

### Mux Integration

```bash
npm install @mux/mux-node
```

**Use case**: Sermon archives, course content, training videos

---

## 📱 Push Notifications

### OneSignal

```bash
npm install onesignal-node
```

---

## 🗓️ Calendar Booking

### Cal.com Integration

```html
<!-- Embed Cal.com -->
<Cal
  calLink="your-username/meeting"
  config={{inline: true}}
/>
```

### Calendly Alternative

```html
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/your-link">
</div>
```

---

## 🔄 Webhooks & Automation

### Make.com (Integromat)

Create webhook receiver:

```typescript
// src/pages/api/webhooks/make.ts
export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json();
  
  // Process webhook
  console.log('Received webhook:', payload);
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
```

### Zapier Integration

Same pattern - create webhook endpoints and connect in Zapier

---

## 💬 Live Chat

### Crisp

```html
<script type="text/javascript">
  window.$crisp=[];window.CRISP_WEBSITE_ID="your-website-id";
  (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
</script>
```

### Intercom

```html
<script>
  window.intercomSettings = {
    app_id: "your-app-id"
  };
</script>
```

---

## 🎨 Advanced Components

### React Components Library

```bash
npm install @radix-ui/themes  # Already have Radix primitives
npm install framer-motion     # Animations
npm install react-icons       # Icon library
```

### Chart Libraries

```bash
npm install recharts          # React charts
npm install chart.js react-chartjs-2
```

---

## 🔐 Security Enhancements

### Rate Limiting

```bash
npm install express-rate-limit
```

### Content Security Policy

Add to middleware:
```typescript
response.headers.set(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' 'unsafe-inline'"
);
```

---

## 📦 Database Options (If Needed)

Most clients won't need a database (headless CMS handles content), but for custom applications:

### Prisma + PostgreSQL

```bash
npm install prisma @prisma/client
npm install -D @types/pg
```

### Supabase (Database + Auth + Storage)

```bash
npm install @supabase/supabase-js
```

---

## 🚀 Deployment Enhancements

### Edge Functions

Create API routes that run on edge:

```typescript
// Vercel Edge Functions
export const config = {
  runtime: 'edge',
};
```

### Background Jobs

For long-running tasks:
- Use Vercel Cron Jobs
- Use Cloudflare Workers
- Use AWS Lambda

---

## 📋 Implementation Checklist

When adding advanced features:

- [ ] Document why client needs this feature
- [ ] Add cost estimate (API usage, etc.)
- [ ] Update client's `.env` with new variables
- [ ] Create client-specific documentation
- [ ] Add usage limits/rate limiting if needed
- [ ] Test thoroughly in staging environment
- [ ] Get client approval for ongoing costs

---

## 💰 Cost Considerations

| Feature | Est. Monthly Cost | When to Use |
|---------|------------------|-------------|
| Claude API | $10-50 | AI workflow generation |
| Stripe | 2.9% + 30¢ per transaction | E-commerce |
| SendGrid | $15-90 | Bulk email campaigns |
| Algolia | $1-500 | Site search |
| Auth0 | $0-240 | User authentication |
| Mixpanel | $0-890 | Advanced analytics |

**Always discuss costs with client before implementing paid features.**

---

## 🛠️ Development Tips

1. **Keep features modular** - Each in its own folder
2. **Use feature flags** - Enable/disable via env vars
3. **Document everything** - Future you will thank you
4. **Test in isolation** - Don't break core functionality
5. **Monitor usage** - Track API costs and usage

---

## 📚 Resources

- [Anthropic Claude API](https://docs.anthropic.com/)
- [GHL API Docs](https://highlevel.stoplight.io/)
- [Stripe Docs](https://stripe.com/docs)
- [Auth.js](https://authjs.dev/)
- [Prisma](https://prisma.io/)

---

## ⚠️ Important Notes

- **Don't add these to the base template** - Keep it lean!
- **Add per client** - Only implement what they need
- **Document client-specific code** - Make it maintainable
- **Consider ongoing costs** - Some features have monthly fees
- **Get client approval** - For any feature with API costs

---

**Need help implementing any of these?** Check the specific documentation or create a client-specific implementation plan.
