# Setup Checklist

Follow this checklist to set up your Nexus Starter project.

## ✅ Pre-Setup

- [ ] Node.js 18+ installed
- [ ] npm or pnpm installed
- [ ] Git configured
- [ ] Code editor ready (VS Code recommended)

## 📦 Step 1: Initial Setup

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env` file: `cp .env.example .env`
- [ ] Verify `.env` is in `.gitignore`

## 🎯 Step 2: Choose Your Stack

### CMS Provider (choose one)

- [ ] **Contentful** - Go to Step 3a
- [ ] **Sanity** - Go to Step 3b
- [ ] **Markdown** - Go to Step 3c

### Form Provider (choose one)

- [ ] **GoHighLevel** - Go to Step 4a
- [ ] **Resend Email** - Go to Step 4b

### Site Type (choose one)

- [ ] **Business** - Services, portfolio, quotes
- [ ] **Church** - Sermons, events, prayer requests

## 🗄️ Step 3a: Contentful Setup

- [ ] Create account at [contentful.com](https://contentful.com)
- [ ] Create new space
- [ ] Go to Settings → API Keys
- [ ] Copy Space ID to `CONTENTFUL_SPACE_ID`
- [ ] Copy Content Delivery API token to `CONTENTFUL_ACCESS_TOKEN`
- [ ] Copy same token to `PUBLIC_CONTENTFUL_ACCESS_TOKEN`
- [ ] Set `CMS_PROVIDER=contentful` in `.env`
- [ ] Create content models (page, blogPost, event, etc.)
- [ ] Add sample content

**Content Models Needed:**
- Page (title, slug, sections)
- Blog Post (title, slug, excerpt, content, featuredImage, publishedAt)
- Event (title, slug, description, startDate, location, image)
- Team Member (name, slug, role, bio, image)
- Service (title, slug, description, icon, featured)
- Testimonial (quote, author, role, company, image)
- Site Settings (siteName, logo, socialLinks, contactInfo)

## 🎨 Step 3b: Sanity Setup

- [ ] Create account at [sanity.io](https://sanity.io)
- [ ] Run `npm create sanity@latest` in separate folder
- [ ] Copy Project ID to `SANITY_PROJECT_ID` in `.env`
- [ ] Set `SANITY_DATASET=production`
- [ ] Set `CMS_PROVIDER=sanity` in `.env`
- [ ] Create schemas matching content types
- [ ] Add sample content via Sanity Studio

## 📄 Step 3c: Markdown Setup

- [ ] Set `CMS_PROVIDER=markdown` in `.env`
- [ ] Review `src/content/` folder structure
- [ ] Add markdown files to `src/content/blog/`, `pages/`, etc.
- [ ] Edit `src/content/settings.json` with your site info
- [ ] Add images to `public/images/`

**No API keys needed!** ✨

## 📝 Step 4a: GoHighLevel Setup

- [ ] Have GHL account (agency or location level)
- [ ] Go to Settings → API Keys
- [ ] Click "Add API Key"
- [ ] Select scopes:
  - [ ] contacts.readonly
  - [ ] contacts.write
  - [ ] opportunities.write
  - [ ] calendars.readonly
  - [ ] forms.write
- [ ] Copy API Key to `GHL_API_KEY`
- [ ] Copy Location ID to `GHL_LOCATION_ID`
- [ ] Find Pipeline ID (optional) → `GHL_PIPELINE_ID`
- [ ] Set `FORM_PROVIDER=ghl` in `.env`
- [ ] Create workflows (optional) and copy IDs:
  - [ ] Contact form workflow → `GHL_WORKFLOW_CONTACT`
  - [ ] Quote form workflow → `GHL_WORKFLOW_QUOTE`
  - [ ] Prayer form workflow → `GHL_WORKFLOW_PRAYER`

## 📧 Step 4b: Resend Email Setup

- [ ] Create account at [resend.com](https://resend.com)
- [ ] Go to API Keys
- [ ] Create new API key
- [ ] Copy key to `RESEND_API_KEY` (starts with `re_`)
- [ ] Add your email to `NOTIFY_EMAIL`
- [ ] For production:
  - [ ] Add your domain in Resend dashboard
  - [ ] Add DNS records (MX, TXT, DKIM)
  - [ ] Wait for verification
  - [ ] Set `FROM_EMAIL=forms@yourdomain.com`
- [ ] For development:
  - [ ] Use `FROM_EMAIL=onboarding@resend.dev`
- [ ] Set `FORM_PROVIDER=simple` in `.env`

## 🖼️ Step 5: Cloudinary Setup

- [ ] Create account at [cloudinary.com](https://cloudinary.com)
- [ ] Go to Dashboard
- [ ] Copy Cloud Name (top-left) to `PUBLIC_CLOUDINARY_CLOUD_NAME`
- [ ] Copy same value to `CLOUDINARY_CLOUD_NAME`

## 🌍 Step 6: i18n Setup (Optional)

Skip if you only need English:

- [ ] Set `I18N_ENABLED=true` in `.env`
- [ ] Set `I18N_DEFAULT_LOCALE=en`
- [ ] Add locales to `I18N_LOCALES` (e.g., `en,es,ko`)
- [ ] Review translations in `src/i18n/translations/`
- [ ] Add/edit translations as needed
- [ ] Test at `/i18n-demo`

## ⚙️ Step 7: Site Configuration

- [ ] Set `SITE_NAME` in `.env`
- [ ] Set `SITE_URL` (production URL)
- [ ] Set `SITE_DOMAIN`
- [ ] Set `SITE_TYPE` (business or church)
- [ ] Set `NEXUS_MODE=internal` (for your own client work)

## 🧪 Step 8: Testing

- [ ] Run `npm run dev`
- [ ] Visit http://localhost:4321
- [ ] Test forms at `/forms-demo`
  - [ ] Contact form works
  - [ ] Quote form works (if business)
  - [ ] Prayer form works (if church)
  - [ ] Check GHL dashboard or email inbox for submissions
- [ ] Test i18n at `/i18n-demo` (if enabled)
  - [ ] Language switcher works
  - [ ] All translations display correctly
- [ ] Test CMS integration
  - [ ] Blog posts load
  - [ ] Pages render
  - [ ] Images display

## 🎨 Step 9: Customization

- [ ] Update site colors in `astro.config.mjs` / UnoCSS config
- [ ] Add your logo to `public/`
- [ ] Customize components in `src/components/`
- [ ] Add your pages in `src/pages/`
- [ ] Update translations in `src/i18n/translations/`
- [ ] Add custom CSS if needed

## 📊 Step 10: Analytics (Optional)

- [ ] Google Analytics:
  - [ ] Create GA4 property
  - [ ] Copy Measurement ID to `GA_MEASUREMENT_ID`
- [ ] Google Tag Manager:
  - [ ] Create GTM container
  - [ ] Copy Container ID to `GTM_CONTAINER_ID`
- [ ] Facebook Pixel:
  - [ ] Get Pixel ID
  - [ ] Add to `FB_PIXEL_ID`

## 🚢 Step 11: Deployment

### Vercel

- [ ] Create Vercel account
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel` in project folder
- [ ] Add environment variables:
  ```bash
  vercel env add CONTENTFUL_SPACE_ID
  vercel env add GHL_API_KEY
  # ... add all from .env
  ```
- [ ] Deploy: `vercel --prod`
- [ ] Set custom domain (optional)

### Netlify

- [ ] Create Netlify account
- [ ] Connect Git repository
- [ ] Set build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Add environment variables in Site Settings
- [ ] Deploy

### Other

- [ ] Build: `npm run build`
- [ ] Upload `dist/` folder to your hosting
- [ ] Configure server for SPA routing (if needed)

## 🔒 Step 12: Security & Production

- [ ] Verify `.env` is NOT committed to git
- [ ] Use different API keys for production
- [ ] Delete `CONTENTFUL_MANAGEMENT_TOKEN` if present
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS on your domain
- [ ] Set up SSL certificate
- [ ] Configure CORS if needed
- [ ] Test all forms in production
- [ ] Set up monitoring (optional)

## ✅ Step 13: Go Live!

- [ ] Point domain to hosting
- [ ] Update DNS records
- [ ] Test live site thoroughly
- [ ] Submit sitemap to Google Search Console
- [ ] Set up 301 redirects (if migrating)
- [ ] Announce launch! 🎉

## 📝 Post-Launch

- [ ] Monitor form submissions
- [ ] Check analytics daily
- [ ] Add more content
- [ ] Optimize images
- [ ] Improve SEO
- [ ] Gather user feedback
- [ ] Plan feature additions

## 🆘 Troubleshooting

### Dev server won't start
- [ ] Check Node.js version (18+)
- [ ] Run `npm install` again
- [ ] Delete `node_modules/` and reinstall
- [ ] Check for port conflicts (4321)

### Forms not submitting
- [ ] Verify `FORM_PROVIDER` is set
- [ ] Check API keys are correct
- [ ] Look at browser console for errors
- [ ] Test API endpoint directly with Postmark/curl

### CMS content not loading
- [ ] Verify `CMS_PROVIDER` matches your setup
- [ ] Check API credentials
- [ ] Ensure content exists in CMS
- [ ] Check content model structure

### Images not displaying
- [ ] Verify Cloudinary cloud name
- [ ] Check image URLs in CMS
- [ ] Test Cloudinary console
- [ ] Check browser network tab

### i18n not working
- [ ] Verify `I18N_ENABLED=true`
- [ ] Check locale codes in `.env`
- [ ] Ensure translation files exist
- [ ] Visit `/i18n-demo` to test

## 📚 Additional Resources

- [README.md](./README.md) - Project overview
- [ENV_CONFIG.md](./ENV_CONFIG.md) - Environment variables guide
- [FORMS_MIGRATION.md](./FORMS_MIGRATION.md) - Forms system migration
- `src/lib/*/README.md` - System documentation

## 🎓 Learning Resources

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [UnoCSS Docs](https://unocss.dev)
- [Contentful Docs](https://contentful.com/developers/docs)
- [Sanity Docs](https://sanity.io/docs)
- [GHL API Docs](https://highlevel.stoplight.io)
- [Resend Docs](https://resend.com/docs)

---

**Need help?** Check the troubleshooting section above or review the documentation files.

**Ready to go?** Start with Step 1 and work your way down! 🚀
