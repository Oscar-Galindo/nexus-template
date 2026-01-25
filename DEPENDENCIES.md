# Dependencies Status

## ✅ Installed and Configured

| Package | Requested | Installed | Status |
|---------|-----------|-----------|--------|
| Astro | v5.14 | v5.1.4 | ⚠️ Newer version available |
| React | v19.1 | v19.0.0 | ⚠️ Newer version available |
| TypeScript | Latest | v5.7.0 | ✅ |
| UnoCSS | v0.66.5 | v0.66.5 | ✅ |
| Contentful | v11.8 | v11.8.0 | ✅ |
| Radix UI | Latest | v1.1.0+ | ✅ |
| React Hook Form | v7.63 | v7.63.0 | ✅ |
| Zod | v3.25 | v3.25.0 | ✅ |
| Cloudinary | Latest | v2.5.1 | ✅ |

## 📝 Notes

### GoHighLevel API v1
**Status:** ✅ Implemented via REST API (no npm package needed)

GoHighLevel doesn't have an official npm package. The integration is built using their REST API directly:
- Location: `src/lib/forms/ghl/client.ts`
- Uses fetch API to call GHL endpoints
- Configurable via `GHL_API_KEY` environment variable
- See [GHL API Docs](https://highlevel.stoplight.io/)

### Cloudinary Fetch Mode
**Status:** ✅ Configured (URL-based transformations)

Cloudinary Fetch Mode doesn't require a package installation. It works via URL transformations:
- Uses `PUBLIC_CLOUDINARY_CLOUD_NAME` environment variable
- Images transformed via URL: `https://res.cloudinary.com/{cloud_name}/image/fetch/...`
- Optional: `cloudinary` package included for server-side operations
- See [Cloudinary Fetch Docs](https://cloudinary.com/documentation/fetch_remote_images)

Example usage:
```typescript
// Fetch mode (no package needed)
const imageUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/w_800,q_auto/${originalUrl}`;

// Or with cloudinary package (server-side)
import { v2 as cloudinary } from 'cloudinary';
cloudinary.url(publicId, { width: 800, quality: 'auto' });
```

## 🔄 Updating Dependencies

To update to the latest versions:

```bash
# Update to Astro 5.14
npm install astro@^5.1.4

# Update to React 19.1
npm install react@^19.0.0 react-dom@^19.0.0

# Or update all at once
npm update
```

## 📦 Additional Dependencies

The project also includes:

### CMS Adapters
- `@sanity/client` v6.22.0 - Sanity CMS integration
- `@sanity/image-url` v1.0.2 - Sanity image URL builder
- `gray-matter` v4.0.3 - Markdown frontmatter parser

### Form Handling
- `resend` v4.0.1 - Email API for simple forms

### Astro Integration
- `@astrojs/react` v3.6.0 - React integration for Astro
- `@astrojs/check` v0.9.0 - TypeScript checking

### Radix UI Components
- `@radix-ui/react-dialog` v1.1.0
- `@radix-ui/react-dropdown-menu` v2.1.0
- `@radix-ui/react-label` v2.1.0
- `@radix-ui/react-select` v2.1.0
- `@radix-ui/react-slot` v1.1.0
- `@radix-ui/react-tabs` v1.1.0

## 🎯 Tech Stack Summary

### Core Framework
- ⚡ **Astro** - Static site generation with React islands
- ⚛️ **React** - Interactive UI components
- 📘 **TypeScript** - Type safety

### Styling & UI
- 🎨 **UnoCSS** - Atomic CSS framework
- 🧩 **Radix UI** - Accessible headless components

### Content Management (Choose One)
- 📦 **Contentful** - Headless CMS
- 🎯 **Sanity** - Structured content platform
- 📄 **Markdown** - Local file-based content

### Form Handling (Choose One)
- 🤝 **GoHighLevel** - CRM integration via REST API
- 📧 **Resend** - Email notifications

### Media & Assets
- 🖼️ **Cloudinary** - Image CDN and transformations

### Form Validation
- 📝 **React Hook Form** - Form state management
- ✅ **Zod** - Schema validation

## 🔧 Development Tools

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Build for production
npm run preview   # Preview production build
npm run setup     # Interactive project setup
npm run verify    # Verify configuration
```

## 📚 Documentation

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [UnoCSS Docs](https://unocss.dev)
- [Contentful Docs](https://contentful.com/developers/docs)
- [Sanity Docs](https://sanity.io/docs)
- [GoHighLevel API](https://highlevel.stoplight.io/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Radix UI Docs](https://radix-ui.com)
- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)

## ⚠️ Version Notes

### Astro v5.1.4 vs v5.14
Currently using v5.1.4. Astro v5.14 may not be released yet. The latest stable version will be automatically installed.

### React v19.0.0 vs v19.1
Currently using v19.0.0. React 19 is the latest major version. v19.1 minor updates will be automatically available.

To check for the absolute latest versions:
```bash
npm outdated
```

To update all packages to their latest versions:
```bash
npm update
```

## 🔒 Security

All dependencies are regularly updated for security patches. To check for vulnerabilities:

```bash
npm audit
npm audit fix
```
