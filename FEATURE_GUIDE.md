# Feature Decision Guide

Quick reference to help you decide what to add to client projects.

---

## 🎯 Template vs Client Projects

### ✅ In Template (Already Done)
- Core CMS abstraction (3 providers)
- Core form handling (2 providers)
- i18n system (3 languages)
- Basic integrations (GHL, Contentful, Sanity, Resend)
- Setup automation
- Developer tools

### 🚀 Add to Client Projects (As Needed)
- AI features (Claude, OpenAI)
- Advanced automation
- Payment processing
- User authentication
- Live chat
- Advanced analytics
- Custom integrations

---

## 📋 Decision Matrix

### When Client Says...

| Client Request | Add This | Cost | Doc Reference |
|---------------|----------|------|---------------|
| "Generate workflows with AI" | Claude + GHL | ~$10-50/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#ai-powered-workflow-creation) |
| "Take payments" | Stripe | 2.9% + 30¢ | [INTEGRATIONS.md](./INTEGRATIONS.md#payments) |
| "Accept donations" (church) | Tithely | Free-2.9% | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#tithely-church-giving) |
| "Need live chat" | Crisp/Intercom | $0-90/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#live-chat) |
| "User accounts" | Auth.js/Clerk | $0-240/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#advanced-authentication) |
| "Book appointments" | Cal.com/Calendly | Free-$12/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#calendar-booking) |
| "Send bulk emails" | SendGrid | $15+/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#advanced-email-features) |
| "Advanced analytics" | Mixpanel | $0-890/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#advanced-analytics) |
| "Video streaming" | Mux | Pay-per-use | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#video-streaming) |
| "Site search" | Algolia | $1-500/mo | [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md#full-text-search) |

---

## 🤔 Common Scenarios

### Scenario 1: Small Business Site
**Needs**: Contact forms, service pages, blog

**Stack**:
- ✅ Template as-is
- ✅ Markdown CMS (free)
- ✅ Simple email forms (Resend free tier)
- ❌ No extra features needed

**Cost**: $0/month (except hosting)

---

### Scenario 2: Growing Business with CRM
**Needs**: Lead capture, automation, follow-ups

**Stack**:
- ✅ Template as-is
- ✅ Contentful CMS (free tier)
- ✅ GoHighLevel forms
- ✅ Basic workflows in GHL

**Cost**: ~$0-15/month (Contentful free, GHL separate)

---

### Scenario 3: Advanced Agency Site
**Needs**: AI workflow generation, payments, advanced tracking

**Add to template**:
- ➕ Claude API integration
- ➕ Stripe payments
- ➕ Mixpanel analytics
- ➕ Live chat

**Cost**: ~$50-150/month

---

### Scenario 4: Church with Online Giving
**Needs**: Sermon videos, events, giving, prayer requests

**Stack**:
- ✅ Template as-is (site_type=church)
- ✅ Sanity CMS (free tier)
- ✅ Simple forms for prayer requests
- ➕ Tithely for giving
- ➕ YouTube embed for sermons

**Cost**: ~$0-50/month (Tithely fees only on transactions)

---

### Scenario 5: E-commerce Store
**Needs**: Products, checkout, inventory, orders

**Add to template**:
- ➕ Stripe Checkout
- ➕ Product database (add to Contentful/Sanity)
- ➕ Order management
- ➕ Email notifications

**Cost**: ~$0 + Stripe fees (2.9% + 30¢)

---

## 💡 Quick Decision Framework

### Ask Yourself:

1. **Is this a core feature everyone needs?**
   - Yes → Should already be in template
   - No → Add to client project

2. **Does it cost money?**
   - Yes → Definitely don't add to template
   - No → Maybe add if commonly needed

3. **Is it business-specific?**
   - Yes → Add to client project
   - No → Consider adding to template

4. **Will it complicate setup?**
   - Yes → Keep separate, add as needed
   - No → Consider adding to template

### Examples:

| Feature | Core? | Costs? | Specific? | Complex? | Decision |
|---------|-------|--------|-----------|----------|----------|
| CMS abstraction | ✅ | ❌ | ❌ | ❌ | ✅ Template |
| Form handling | ✅ | ❌ | ❌ | ❌ | ✅ Template |
| i18n | ⚠️ | ❌ | ❌ | ⚠️ | ✅ Template (optional) |
| AI workflows | ❌ | ✅ | ✅ | ✅ | ❌ Client only |
| Payments | ❌ | ✅ | ✅ | ⚠️ | ❌ Client only |
| Live chat | ❌ | ✅ | ✅ | ❌ | ❌ Client only |
| Auth | ❌ | ⚠️ | ✅ | ✅ | ❌ Client only |

---

## 🎨 Template Philosophy

### ✅ DO Include in Template:
- Universal features (CMS, forms, i18n)
- Free/cheap core functionality
- Provider abstraction layers
- Developer tools
- Documentation

### ❌ DON'T Include in Template:
- Paid API services
- Business-specific features
- Complex authentication
- Payment processing
- Industry-specific tools

---

## 📝 Project Checklist

When starting a new client project:

### 1. **Discovery** (Before Setup)
- [ ] What type of site? (business/church)
- [ ] What content? (blog, events, services, etc.)
- [ ] What forms? (contact, quotes, prayers)
- [ ] Need multiple languages?
- [ ] What's the budget?

### 2. **Core Setup** (Use Template)
- [ ] Run `./setup.sh`
- [ ] Choose CMS provider
- [ ] Choose form provider
- [ ] Configure i18n if needed
- [ ] Add content

### 3. **Advanced Features** (If Needed)
- [ ] Review client requirements
- [ ] Check [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md)
- [ ] Estimate costs
- [ ] Get client approval
- [ ] Implement features
- [ ] Document client-specific code

### 4. **Launch**
- [ ] Test all features
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Hand off to client
- [ ] Document maintenance

---

## 💰 Cost Estimation Template

```
Project: [Client Name]
Type: [Business/Church]

TEMPLATE (Included):
- Base template: $0
- Setup time: ~30 minutes

HOSTING:
- Vercel/Netlify: $0-20/month

CORE SERVICES:
- CMS (Contentful/Sanity): $0-25/month
- Forms (Resend): $0-20/month
- Images (Cloudinary): $0-25/month

OPTIONAL FEATURES:
- [ ] AI Workflows: $10-50/month
- [ ] Payments (Stripe): 2.9% + 30¢ per transaction
- [ ] Live Chat: $0-90/month
- [ ] Advanced Analytics: $0-890/month
- [ ] User Auth: $0-240/month

TOTAL ESTIMATED: $___/month
```

---

## 🚀 Quick Start for Common Projects

### Standard Business Site
```bash
./setup.sh
# Choose: business, contentful, ghl, no i18n
npm run dev
```

### Simple Landing Page
```bash
./setup.sh
# Choose: business, markdown, simple, no i18n
npm run dev
```

### Church Site
```bash
./setup.sh
# Choose: church, sanity, simple, optional i18n
npm run dev
# Then add Tithely widget if needed
```

### Multi-language Corporate
```bash
./setup.sh
# Choose: business, contentful, ghl, yes i18n (en,es,ko)
npm run dev
```

---

## 📚 Documentation Hierarchy

When you need help:

1. **Getting Started** → [QUICK_START.md](./QUICK_START.md)
2. **Environment Setup** → [ENV_CONFIG.md](./ENV_CONFIG.md)
3. **Step-by-step** → [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
4. **Using the System** → Feature-specific docs in `src/lib/*/USAGE.md`
5. **Adding Features** → [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md)
6. **Integrations** → [INTEGRATIONS.md](./INTEGRATIONS.md)
7. **This Guide** → [FEATURE_GUIDE.md](./FEATURE_GUIDE.md)

---

**Remember**: The template is your foundation. Build on it for each client's specific needs!
