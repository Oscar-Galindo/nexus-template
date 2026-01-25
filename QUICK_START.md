# Quick Start Guide

Get your Nexus Starter project up and running in 5 minutes! 🚀

## Option 1: Interactive Setup Script (Recommended)

The fastest way to get started:

```bash
# 1. Clone the repository
git clone <your-repo-url> my-project
cd my-project

# 2. Run the setup script
./setup.sh
```

The script will ask you a few questions and automatically:
- ✅ Generate your `.env` file with the right configuration
- ✅ Install dependencies (optional)
- ✅ Show you next steps

**Example interaction:**

```
🚀 NEXUS STARTER - PROJECT SETUP

📝 SITE CONFIGURATION
Site name: Grace Community Church
Domain: gracechurch.com

🏢 SITE TYPE
1) Business
2) Church
Select [1-2]: 2

📦 CMS PROVIDER
1) Contentful
2) Sanity
3) Markdown
Select [1-3]: 3

📬 FORM PROVIDER
1) GoHighLevel
2) Simple
Select [1-2]: 2

🌍 INTERNATIONALIZATION
Enable multi-language? (y/N): n

✅ .env file created!
Run npm install? (Y/n): y

✅ Dependencies installed!
🎉 SETUP COMPLETE!
```

## Option 2: Manual Setup

If you prefer manual configuration:

```bash
# 1. Clone and install
git clone <your-repo-url> my-project
cd my-project
npm install

# 2. Create .env file from example
cp .env.example .env

# 3. Edit .env with your settings
nano .env
```

## Minimal Configuration (5 variables)

To get started quickly with local markdown content and email forms:

```env
SITE_NAME="My Site"
SITE_URL=http://localhost:4321
NEXUS_MODE=internal
CMS_PROVIDER=markdown
FORM_PROVIDER=simple
RESEND_API_KEY=re_your_key_here
NOTIFY_EMAIL=your@email.com
FROM_EMAIL=onboarding@resend.dev
```

## Start Development

```bash
npm run dev
```

Open http://localhost:4321 in your browser.

## Test Your Setup

Visit these pages to verify everything works:

1. **Forms**: http://localhost:4321/forms-demo
   - Test contact form submission
   - Check your email for notification

2. **i18n** (if enabled): http://localhost:4321/i18n-demo
   - Test language switcher
   - Verify translations

## Add Content

### Using Markdown (CMS_PROVIDER=markdown)

1. Add blog posts to `src/content/blog/`
2. Add pages to `src/content/pages/`
3. Edit `src/content/settings.json` for site info

Example blog post (`src/content/blog/my-first-post.md`):

```markdown
---
title: "My First Post"
excerpt: "Welcome to my blog"
publishedAt: 2025-01-25
author: "John Doe"
---

This is my first blog post!
```

### Using Contentful or Sanity

1. Get API keys from your CMS provider
2. Add to `.env` file
3. Create content in CMS dashboard
4. Content automatically appears on your site

## Next Steps

1. **Customize**
   - Update colors in `astro.config.mjs`
   - Add your logo to `public/`
   - Modify components in `src/components/`

2. **Add Pages**
   - Create `.astro` files in `src/pages/`
   - Use the CMS to add dynamic content

3. **Deploy**
   - See [README.md](./README.md#deployment) for deployment instructions
   - Vercel, Netlify, and Cloudflare Pages all work great

## Common Issues

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Forms not working
- Check `FORM_PROVIDER` in `.env`
- Verify API keys are correct
- Look at browser console for errors

### Port already in use
```bash
# Change port in .env
PORT=3000
```

## Get Help

- 📚 Full docs: [README.md](./README.md)
- 📋 Detailed setup: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
- ⚙️ Environment vars: [ENV_CONFIG.md](./ENV_CONFIG.md)
- 📝 Forms guide: [src/lib/forms/USAGE.md](./src/lib/forms/USAGE.md)
- 🌍 i18n guide: [src/i18n/README.md](./src/i18n/README.md)

## Support

Need help? Check the documentation files above or review example configurations in [ENV_CONFIG.md](./ENV_CONFIG.md).

---

**That's it!** You're ready to build. 🎉

Start creating pages, adding content, and customizing your site!
