# Internationalization (i18n) System

A type-safe internationalization system for multi-language support with automatic fallbacks.

## Features

- ✅ Type-safe translation keys with autocomplete
- ✅ Automatic fallback to English if translation missing
- ✅ Parameter interpolation for dynamic values
- ✅ URL-based locale detection
- ✅ CMS locale mapping for Contentful/Sanity
- ✅ Three languages included: English, Spanish, Korean

## Configuration

Enable i18n in your `.env` file:

```env
I18N_ENABLED=true
I18N_DEFAULT_LOCALE=en
I18N_LOCALES=en,es,ko
```

## Supported Locales

| Code | Language | Flag | CMS Code |
|------|----------|------|----------|
| `en` | English  | 🇺🇸  | en-US    |
| `es` | Español  | 🇲🇽  | es-MX    |
| `ko` | 한국어    | 🇰🇷  | ko-KR    |

## Usage in Astro Components

### Basic Translation

```astro
---
import { t, getLocaleFromUrl } from '@/i18n';

const locale = getLocaleFromUrl(Astro.url);
---

<nav>
  <a href="/">{t(locale, 'nav.home')}</a>
  <a href="/about">{t(locale, 'nav.about')}</a>
  <a href="/contact">{t(locale, 'nav.contact')}</a>
</nav>
```

### With Parameters

```astro
---
import { t, getLocaleFromUrl } from '@/i18n';

const locale = getLocaleFromUrl(Astro.url);
const currentYear = new Date().getFullYear();
const siteName = 'My Church';
---

<footer>
  <p>{t(locale, 'footer.copyright', { year: currentYear, siteName })}</p>
</footer>
```

### Complete Example

```astro
---
// src/pages/[locale]/index.astro
import { t, getLocaleFromUrl, locales } from '@/i18n';

export function getStaticPaths() {
  return locales.map(locale => ({ params: { locale } }));
}

const locale = getLocaleFromUrl(Astro.url);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <title>{t(locale, 'nav.home')} - My Site</title>
  </head>
  <body>
    <header>
      <nav>
        <a href={`/${locale}`}>{t(locale, 'nav.home')}</a>
        <a href={`/${locale}/about`}>{t(locale, 'nav.about')}</a>
        <a href={`/${locale}/blog`}>{t(locale, 'nav.blog')}</a>
      </nav>
    </header>

    <main>
      <h1>{t(locale, 'common.loading')}</h1>
    </main>
  </body>
</html>
```

## Usage in React Components

```tsx
import { t } from '@/i18n';
import type { Locale } from '@/i18n';

interface Props {
  locale: Locale;
}

export default function ContactForm({ locale }: Props) {
  return (
    <form>
      <label>{t(locale, 'forms.firstName')}</label>
      <input type="text" required />

      <label>{t(locale, 'forms.email')}</label>
      <input type="email" required />

      <button type="submit">
        {t(locale, 'forms.submit')}
      </button>
    </form>
  );
}
```

## Available Translation Keys

### Navigation (`nav.*`)
- `nav.home` - Home
- `nav.about` - About
- `nav.services` - Services
- `nav.sermons` - Sermons (church)
- `nav.events` - Events
- `nav.blog` - Blog
- `nav.contact` - Contact
- `nav.give` - Give (church)
- `nav.prayerRequest` - Prayer Request (church)

### Forms (`forms.*`)
- `forms.firstName` - First Name
- `forms.lastName` - Last Name
- `forms.email` - Email
- `forms.phone` - Phone
- `forms.message` - Message
- `forms.businessName` - Business Name
- `forms.website` - Website
- `forms.service` - Service
- `forms.budget` - Budget
- `forms.timeline` - Timeline
- `forms.prayerRequest` - Prayer Request
- `forms.keepPrivate` - Keep Private
- `forms.needsPastoralCare` - Pastoral Care
- `forms.submit` - Submit
- `forms.sending` - Sending...
- `forms.success` - Success message
- `forms.error` - Error message
- `forms.required` - Required field
- `forms.invalidEmail` - Invalid email

### Common (`common.*`)
- `common.readMore` - Read More
- `common.learnMore` - Learn More
- `common.viewAll` - View All
- `common.watchNow` - Watch Now
- `common.listenNow` - Listen Now
- `common.backTo` - Back to
- `common.share` - Share
- `common.loading` - Loading...
- `common.noResults` - No results found

### Blog (`blog.*`)
- `blog.recentPosts` - Recent Posts
- `blog.allPosts` - All Posts
- `blog.categories` - Categories
- `blog.tags` - Tags
- `blog.postedOn` - Posted on
- `blog.by` - by

### Events (`events.*`)
- `events.upcomingEvents` - Upcoming Events
- `events.pastEvents` - Past Events
- `events.allEvents` - All Events
- `events.when` - When
- `events.where` - Where
- `events.register` - Register

### Footer (`footer.*`)
- `footer.copyright` - Copyright (with params)
- `footer.privacyPolicy` - Privacy Policy
- `footer.termsOfService` - Terms of Service

## Helper Functions

### `t(locale, key, params?)`
Get a translation for the given locale and key.

```typescript
t('en', 'nav.home') // "Home"
t('es', 'nav.home') // "Inicio"
t('ko', 'nav.home') // "홈"

// With parameters
t('en', 'footer.copyright', { year: 2024, siteName: 'My Site' })
// "© 2024 My Site. All rights reserved."
```

### `getLocaleFromUrl(url)`
Extract locale from URL pathname.

```typescript
const locale = getLocaleFromUrl(Astro.url);
// URL: /es/about → 'es'
// URL: /about → 'en' (default)
```

### `getPathWithLocale(path, locale)`
Add locale prefix to a path.

```typescript
getPathWithLocale('/about', 'es') // "/es/about"
getPathWithLocale('/about', 'en') // "/about" (no prefix for default)
```

### `removeLocaleFromPath(path)`
Remove locale prefix from a path.

```typescript
removeLocaleFromPath('/es/about') // "/about"
removeLocaleFromPath('/ko/blog')  // "/blog"
```

### `isValidLocale(locale)`
Check if a string is a valid locale.

```typescript
isValidLocale('en') // true
isValidLocale('es') // true
isValidLocale('fr') // false
```

## CMS Integration

When fetching content from CMS, use the `cmsLocaleMap`:

```typescript
import { cmsLocaleMap } from '@/i18n';
import { cms } from '@/lib/cms';

// Map our locale to CMS locale
const cmsLocale = cmsLocaleMap[locale]; // 'en' → 'en-US'

// Fetch localized content
const posts = await cms.getBlogPosts({ locale: cmsLocale });
```

## URL Structure

### With Default Locale (en)
```
/                  → English homepage
/about             → English about page
/blog/post-slug    → English blog post
```

### With Non-Default Locales
```
/es                → Spanish homepage
/es/about          → Spanish about page
/es/blog/post-slug → Spanish blog post

/ko                → Korean homepage
/ko/about          → Korean about page
```

## Adding New Languages

1. **Create translation file:**
   ```bash
   cp src/i18n/translations/en.json src/i18n/translations/fr.json
   # Edit fr.json with French translations
   ```

2. **Update locales.ts:**
   ```typescript
   export const locales = ['en', 'es', 'ko', 'fr'] as const;

   export const localeNames: Record<Locale, string> = {
     en: 'English',
     es: 'Español',
     ko: '한국어',
     fr: 'Français', // Add new
   };

   export const localeFlags: Record<Locale, string> = {
     en: '🇺🇸',
     es: '🇲🇽',
     ko: '🇰🇷',
     fr: '🇫🇷', // Add new
   };

   export const cmsLocaleMap: Record<Locale, string> = {
     en: 'en-US',
     es: 'es-MX',
     ko: 'ko-KR',
     fr: 'fr-FR', // Add new
   };
   ```

3. **Import in index.ts:**
   ```typescript
   import fr from './translations/fr.json';

   const translations: Record<Locale, typeof en> = { 
     en, es, ko, fr 
   };
   ```

4. **Update environment:**
   ```env
   I18N_LOCALES=en,es,ko,fr
   ```

## Type Safety

The system provides full TypeScript autocomplete for translation keys:

```typescript
t(locale, 'nav.home') // ✅ Valid
t(locale, 'nav.invalid') // ❌ Type error
```

Keys are validated at compile time using TypeScript's type system.

## Fallback Strategy

If a translation is missing:

1. Try current locale
2. Fall back to English
3. Return the key itself if not found

Example:
```typescript
// Korean translation missing 'forms.budget'
t('ko', 'forms.budget') 
// → Falls back to English "Budget"
```

## Best Practices

1. **Always use translation keys** - Don't hardcode text
2. **Keep keys organized** - Use namespaces (nav, forms, etc.)
3. **Use parameters for dynamic content** - `{year}`, `{siteName}`
4. **Test all languages** - Ensure translations exist
5. **Consider text length** - Some languages are longer
6. **Use semantic keys** - `forms.submit` not `forms.button1`

## Performance

- ✅ All translations loaded at build time
- ✅ No runtime fetching
- ✅ Type-safe with zero overhead
- ✅ Tree-shakeable (unused translations removed)

## Testing

```typescript
import { t } from '@/i18n';

describe('Translations', () => {
  it('should translate to English', () => {
    expect(t('en', 'nav.home')).toBe('Home');
  });

  it('should translate to Spanish', () => {
    expect(t('es', 'nav.home')).toBe('Inicio');
  });

  it('should fallback to English', () => {
    expect(t('ko', 'forms.budget')).toBe('Budget');
  });

  it('should replace parameters', () => {
    const result = t('en', 'footer.copyright', { 
      year: 2024, 
      siteName: 'Test' 
    });
    expect(result).toContain('2024');
    expect(result).toContain('Test');
  });
});
```
