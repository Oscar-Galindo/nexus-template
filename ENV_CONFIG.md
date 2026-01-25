# Environment Configuration Guide

Copy the content below to create your `.env` file in the project root.

## Quick Start

```bash
# Copy this content to .env file
cp ENV_CONFIG.md .env
# Edit .env and fill in your values
```

## .env File Content

```env
# ==============================================================================
# NEXUS STARTER - ENVIRONMENT CONFIGURATION
# ==============================================================================
# Copy this file to .env and fill in your values
# Never commit .env to git!
# ==============================================================================

# ==============================================================================
# SITE CONFIGURATION (Required)
# ==============================================================================
SITE_NAME="Your Site Name"
SITE_URL=https://yourdomain.com
SITE_DOMAIN=yourdomain.com
SITE_TYPE=business                      # 'business' or 'church'

# ==============================================================================
# MODE & PROVIDERS
# ==============================================================================
NEXUS_MODE=internal                     # 'internal' (skip license) or 'licensed'
CMS_PROVIDER=contentful                 # 'contentful', 'sanity', or 'markdown'
FORM_PROVIDER=ghl                       # 'ghl' or 'simple'

# ==============================================================================
# INTERNATIONALIZATION (Optional)
# ==============================================================================
I18N_ENABLED=false                      # 'true' or 'false'
I18N_DEFAULT_LOCALE=en                  # Default locale
I18N_LOCALES=en                         # Comma-separated: en,es,ko

# ==============================================================================
# CONTENTFUL CMS (Required if CMS_PROVIDER=contentful)
# ==============================================================================
# Get these from: app.contentful.com → Settings → API Keys
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
PUBLIC_CONTENTFUL_ACCESS_TOKEN=         # Same as above, exposed to client
CONTENTFUL_PREVIEW_TOKEN=               # For draft content preview
CONTENTFUL_MANAGEMENT_TOKEN=            # For setup scripts only - DELETE in production!
CONTENTFUL_ENVIRONMENT=master

# ==============================================================================
# SANITY CMS (Required if CMS_PROVIDER=sanity)
# ==============================================================================
# Get these from: sanity.io/manage → Your Project → API
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_TOKEN=                           # Optional, only for private datasets

# ==============================================================================
# CLOUDINARY (Required)
# ==============================================================================
# Get from: cloudinary.com/console (top-left of dashboard)
PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_NAME=                  # Same as above

# ==============================================================================
# GOHIGHLEVEL CRM (Required if FORM_PROVIDER=ghl)
# ==============================================================================
# Get API Key: app.gohighlevel.com → Settings → API Keys → Add API Key
# Required scopes: contacts.readonly, contacts.write, opportunities.write,
#                  calendars.readonly, forms.write, locations.readonly
GHL_API_KEY=
GHL_LOCATION_ID=
GHL_PIPELINE_ID=                        # Optional: Pipeline for opportunities

# Optional: Workflow IDs to trigger on form submission
GHL_WORKFLOW_CONTACT=
GHL_WORKFLOW_QUOTE=
GHL_WORKFLOW_PRAYER=
GHL_WORKFLOW_NEWSLETTER=

# ==============================================================================
# SIMPLE EMAIL FORMS (Required if FORM_PROVIDER=simple)
# ==============================================================================
# Get from: resend.com/api-keys
RESEND_API_KEY=
NOTIFY_EMAIL=your@email.com             # Where to send form submissions
FROM_EMAIL=forms@yourdomain.com         # Sender address (must verify domain)

# ==============================================================================
# ANALYTICS (Optional)
# ==============================================================================
GA_MEASUREMENT_ID=                      # Google Analytics 4 (G-XXXXXXXXXX)
GTM_CONTAINER_ID=                       # Google Tag Manager (GTM-XXXXXXX)
FB_PIXEL_ID=                            # Facebook Pixel ID

# ==============================================================================
# CHURCH-SPECIFIC (Optional, only if SITE_TYPE=church)
# ==============================================================================
CHURCH_ONLINE_ID=                       # Church Online Platform
TITHELY_CHURCH_ID=                      # Tithely donations

# ==============================================================================
# LICENSE SYSTEM (Production only, if NEXUS_MODE=licensed)
# ==============================================================================
NEXUS_LICENSE_KEY=                      # Format: XXXX-XXXX-XXXX-XXXX
NEXUS_AGENCY_ID=
NEXUS_SECRET=

# ==============================================================================
# WORDPRESS MIGRATION (Optional, for migration scripts)
# ==============================================================================
WORDPRESS_URL=                          # https://youroldwordpresssite.com

# ==============================================================================
# DEVELOPMENT
# ==============================================================================
NODE_ENV=development
PORT=4321
```

## Configuration by Use Case

### Minimal Setup (Local Development with Markdown)

```env
SITE_NAME="My Site"
SITE_URL=http://localhost:4321
SITE_TYPE=business
NEXUS_MODE=internal
CMS_PROVIDER=markdown
FORM_PROVIDER=simple
RESEND_API_KEY=re_your_key
NOTIFY_EMAIL=you@domain.com
FROM_EMAIL=onboarding@resend.dev
```

### Business Site with Contentful + GHL

```env
SITE_NAME="My Business"
SITE_URL=https://mybusiness.com
SITE_TYPE=business
NEXUS_MODE=internal
CMS_PROVIDER=contentful
FORM_PROVIDER=ghl

# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_token
PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_token
CONTENTFUL_ENVIRONMENT=master

# GoHighLevel
GHL_API_KEY=your_ghl_key
GHL_LOCATION_ID=your_location_id
GHL_PIPELINE_ID=your_pipeline_id

# Cloudinary
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Church Site with Sanity + Simple Forms

```env
SITE_NAME="Grace Community Church"
SITE_URL=https://gracechurch.org
SITE_TYPE=church
NEXUS_MODE=internal
CMS_PROVIDER=sanity
FORM_PROVIDER=simple

# Sanity
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01

# Email Forms
RESEND_API_KEY=re_your_key
NOTIFY_EMAIL=admin@gracechurch.org
FROM_EMAIL=forms@gracechurch.org

# Cloudinary
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Multi-language Site (i18n)

```env
SITE_NAME="International Church"
SITE_URL=https://intlchurch.org
SITE_TYPE=church
I18N_ENABLED=true
I18N_DEFAULT_LOCALE=en
I18N_LOCALES=en,es,ko
CMS_PROVIDER=contentful
FORM_PROVIDER=ghl
# ... other required vars
```

## Getting API Keys

### Contentful
1. Go to [app.contentful.com](https://app.contentful.com)
2. Select your space
3. Settings → API Keys
4. Create new API key or use existing
5. Copy Space ID and Content Delivery API access token

### Sanity
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Click API tab
4. Copy Project ID
5. Create token if using private dataset

### GoHighLevel
1. Go to [app.gohighlevel.com](https://app.gohighlevel.com)
2. Settings → API Keys
3. Click "Add API Key"
4. Select scopes: contacts.readonly, contacts.write, opportunities.write
5. Copy API key
6. Get Location ID from Settings → My Business

### Resend
1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. API Keys → Create API Key
4. Copy the key (starts with `re_`)
5. Verify your domain in Domains section (for production)

### Cloudinary
1. Go to [cloudinary.com/console](https://cloudinary.com/console)
2. Dashboard shows Cloud Name at top-left
3. Copy the Cloud Name (not API key/secret)

## Security Notes

⚠️ **IMPORTANT:**

1. Never commit `.env` to git (it's in `.gitignore`)
2. Use different values for development and production
3. Delete `CONTENTFUL_MANAGEMENT_TOKEN` after setup
4. Rotate API keys regularly
5. Use environment variables in CI/CD (GitHub Secrets, Vercel, etc.)
6. Keep `NEXUS_SECRET` and license keys secure

## Validation

Test your configuration:

```bash
# Check if env vars are loaded
npm run dev

# Visit these URLs to test:
# http://localhost:4321/forms-demo - Test form submission
# http://localhost:4321/i18n-demo - Test translations
```

## Deployment

For production deployments (Vercel, Netlify, etc.):

1. Add all required env vars to hosting platform
2. Set `NODE_ENV=production`
3. Set `NEXUS_MODE=licensed` (if using licensing)
4. Use production API keys
5. Set correct `SITE_URL`

### Vercel Example

```bash
vercel env add CONTENTFUL_SPACE_ID
vercel env add GHL_API_KEY
# ... add all required vars
```

### Netlify Example

1. Site Settings → Environment Variables
2. Add all variables from your `.env`
3. Deploy

## Troubleshooting

### "Missing environment variable"
- Check variable name spelling
- Ensure `.env` file exists in project root
- Restart dev server after adding variables

### Forms not submitting
- Check `FORM_PROVIDER` is set correctly
- Verify GHL_API_KEY or RESEND_API_KEY is valid
- Check browser console for errors

### CMS content not loading
- Verify CMS_PROVIDER matches your setup
- Check API keys are correct
- Ensure Contentful/Sanity space has content

### i18n not working
- Set `I18N_ENABLED=true`
- Check `I18N_LOCALES` includes your locales
- Visit `/i18n-demo` to test

## Need Help?

- Check documentation in `src/lib/*/README.md`
- Review example configurations above
- Test with demo pages (`/forms-demo`, `/i18n-demo`)
