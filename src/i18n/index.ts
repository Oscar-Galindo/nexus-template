import { defaultLocale, isValidLocale, type Locale } from './locales';
import en from './translations/en.json';
import es from './translations/es.json';
import ko from './translations/ko.json';

const translations: Record<Locale, typeof en> = { en, es, ko };

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K
      : never
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof en>;

export function t(
  locale: Locale, 
  key: TranslationKey, 
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations[defaultLocale];
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) break;
  }
  
  // Fallback to English
  if (value === undefined) {
    value = translations[defaultLocale];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
  }
  
  // Return key if translation not found
  if (typeof value !== 'string') return key;
  
  // Replace params like {year}, {siteName}
  if (params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => 
      String(params[paramKey] ?? `{${paramKey}}`)
    );
  }
  
  return value;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return isValidLocale(maybeLocale) ? maybeLocale : defaultLocale;
}

export function getPathWithLocale(path: string, locale: Locale): string {
  // Remove existing locale prefix if present
  const cleanPath = path.replace(/^\/(en|es|ko)/, '') || '/';
  
  // Don't add prefix for default locale
  if (locale === defaultLocale) return cleanPath;
  
  return `/${locale}${cleanPath}`;
}

export function removeLocaleFromPath(path: string): string {
  return path.replace(/^\/(en|es|ko)/, '') || '/';
}

// Re-export everything
export * from './locales';
