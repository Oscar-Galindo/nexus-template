# Nexus Starter Template

A powerful, flexible Astro starter template for building business and church websites with provider-agnostic CMS, forms, and multi-language support.

## 👶 New Here? Start Here!

**Absolute beginner?** Read [START_HERE.md](./START_HERE.md) first - it's written so simply, anyone can follow it!

## 🚀 Features

### Core
- ⚡ **Astro v5.14** - Static site generation with React islands
- 🎨 **UnoCSS** - Atomic CSS framework
- 📝 **TypeScript** - Full type safety
- 🔒 **License System** - Optional licensing for client work

### Content Management (Choose One)
- 📚 **Contentful** - Headless CMS
- 🎯 **Sanity** - Structured content platform
- 📄 **Markdown** - Local file-based content

### Form Handling (Choose One)
- 🤝 **GoHighLevel** - Full CRM integration with workflows
- 📧 **Resend Email** - Simple email notifications

### Additional
- 🌍 **i18n** - Multi-language support (English, Spanish, Korean)
- 🖼️ **Cloudinary** - Image CDN and optimization
- 📱 **React 19** - Modern component library
- 🎭 **Radix UI** - Accessible headless components
- ✅ **React Hook Form + Zod** - Form validation

## 📦 Quick Start

### Option 1: Interactive Setup (Recommended) ⚡

```bash
git clone <your-repo-url> my-project
cd my-project
./setup.sh
```

The setup script will guide you through configuration and automatically create your `.env` file!

See [QUICK_START.md](./QUICK_START.md) for detailed instructions.

### Option 2: Manual Setup

```bash
# 1. Clone and install
git clone <your-repo-url> my-project
cd my-project
npm install

# 2. Configure environment
cp .env.example .env
nano .env
```

See [ENV_CONFIG.md](./ENV_CONFIG.md) for detailed configuration guide or check `.env.example` for all available variables.

### 3. Choose Your Providers

Edit `.env`:

```env
# For Business Site with Contentful + GHL
SITE_TYPE=business
CMS_PROVIDER=contentful
FORM_PROVIDER=ghl

# For Church Site with Markdown + Email
SITE_TYPE=church
CMS_PROVIDER=markdown
FORM_PROVIDER=simple
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- http://localhost:4321 - Your site
- http://localhost:4321/forms-demo - Test forms
- http://localhost:4321/i18n-demo - Test translations

## 📖 Documentation

### Getting Started
- [QUICK_START.md](./QUICK_START.md) - Get running in 5 minutes
- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Step-by-step setup guide

### Configuration
- [ENV_CONFIG.md](./ENV_CONFIG.md) - Environment variables guide
- [FORMS_MIGRATION.md](./FORMS_MIGRATION.md) - Forms system migration guide

### Extending the Template
- [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md) - Optional features for client projects
- [INTEGRATIONS.md](./INTEGRATIONS.md) - Common integration patterns

### System Documentation
- [CMS Abstraction Layer](./src/lib/cms/USAGE.md) - Content management
- [Forms System](./src/lib/forms/USAGE.md) - Form submissions
- [i18n System](./src/i18n/README.md) - Multi-language support
- [Components](./src/components/forms/README.md) - Form components

## 🏗️ Project Structure

```
nexus-template/
├── src/
│   ├── pages/              # Astro pages (routes)
│   │   ├── api/           # API endpoints
│   │   ├── forms-demo.astro
│   │   └── i18n-demo.astro
│   ├── components/        # React/Astro components
│   │   └── forms/        # Form components
│   ├── lib/              # Core libraries
│   │   ├── cms/         # CMS abstraction layer
│   │   ├── forms/       # Forms abstraction layer
│   │   └── config/      # Configuration
│   ├── i18n/            # Internationalization
│   │   └── translations/
│   ├── content/         # Markdown content (if using markdown)
│   └── middleware.ts    # Astro middleware
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── ENV_CONFIG.md        # Environment setup guide
└── README.md            # This file
```

## 🎯 Use Cases

### Business Website
- Services showcase
- Portfolio/case studies
- Blog
- Contact forms → GoHighLevel CRM
- Quote requests with pipeline tracking

### Church Website
- Sermon archive
- Events calendar
- Blog/announcements
- Prayer request forms
- Online giving integration (Tithely)
- Multi-campus support

## 🔄 CMS Provider Switching

Switch CMS providers instantly:

```env
# Use Contentful
CMS_PROVIDER=contentful

# Switch to Sanity
CMS_PROVIDER=sanity

# Switch to local Markdown
CMS_PROVIDER=markdown
```

No code changes required! The CMS adapter layer handles everything.

### Usage

```typescript
import { cms } from '@/lib/cms';

// Works with any provider
const posts = await cms.getBlogPosts({ limit: 5 });
const page = await cms.getPage('about');
```

## 📝 Form Provider Switching

Switch form backends instantly:

```env
# Use GoHighLevel CRM
FORM_PROVIDER=ghl

# Switch to Email notifications
FORM_PROVIDER=simple
```

### Usage

```typescript
import { submitForm } from '@/lib/forms';

// Works with any provider
const result = await submitForm({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  type: 'contact',
});
```

## 🌍 Multi-Language Support

Enable i18n in `.env`:

```env
I18N_ENABLED=true
I18N_DEFAULT_LOCALE=en
I18N_LOCALES=en,es,ko
```

Use in components:

```astro
---
import { t, getLocaleFromUrl } from '@/i18n';
const locale = getLocaleFromUrl(Astro.url);
---

<h1>{t(locale, 'nav.home')}</h1>
```

## 🔧 Configuration

### Mode Selection

```env
# Internal mode (your own client work, no license checks)
NEXUS_MODE=internal

# Licensed mode (for licensed deployments)
NEXUS_MODE=licensed
```

### Site Type

```env
# Business site (services, portfolio, quotes)
SITE_TYPE=business

# Church site (sermons, events, prayer requests)
SITE_TYPE=church
```

## 📊 Available Content Types

All CMS providers support these types:

- **Pages** - Static pages (About, Services, etc.)
- **Blog Posts** - Articles and news
- **Events** - Upcoming events and calendar
- **Team Members** - Staff/leadership profiles
- **Services** - Service offerings (business) or ministries (church)
- **Testimonials** - Client/member testimonials
- **Site Settings** - Global configuration

## 📋 Form Types

- **Contact** - General contact form
- **Quote** - Business quote request with budget/service selection
- **Prayer** - Church prayer requests with privacy options
- **Newsletter** - Email subscription signup

## 🎨 Styling

Uses UnoCSS for atomic CSS:

```html
<div class="max-w-4xl mx-auto py-12 px-4">
  <h1 class="text-4xl font-bold text-gray-900">
    Hello World
  </h1>
</div>
```

Compatible with Tailwind CSS syntax.

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add CONTENTFUL_SPACE_ID
vercel env add GHL_API_KEY
# ... add all required vars
```

### Netlify

1. Connect your git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Site Settings

### Other Platforms

Works with any static hosting:
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages
- Your own server (nginx/Apache)

## 🛠️ Development

### Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI
```

### Adding Features

1. **New CMS Provider**
   - Create adapter in `src/lib/cms/your-provider/`
   - Implement `CMSClient` interface
   - Add to switch in `src/lib/cms/index.ts`

2. **New Form Provider**
   - Create adapter in `src/lib/forms/your-provider/`
   - Implement `FormClient` interface
   - Add to switch in `src/lib/forms/index.ts`

3. **New Language**
   - Add translation file in `src/i18n/translations/`
   - Update `src/i18n/locales.ts`
   - Add to `I18N_LOCALES` in `.env`

## 🤝 Support

- Check documentation in respective folders
- Review example configurations in [ENV_CONFIG.md](./ENV_CONFIG.md)
- Test with demo pages (`/forms-demo`, `/i18n-demo`)

## 📝 License

[Your License Here]

## 🙏 Credits

Built with:
- [Astro](https://astro.build)
- [React](https://react.dev)
- [UnoCSS](https://unocss.dev)
- [Radix UI](https://radix-ui.com)
- [Contentful](https://contentful.com) / [Sanity](https://sanity.io)
- [GoHighLevel](https://gohighlevel.com) / [Resend](https://resend.com)
- [Cloudinary](https://cloudinary.com)

---

Made with ❤️ by [Your Name/Company]
