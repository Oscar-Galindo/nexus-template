export const locales = ['en', 'es', 'ko'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ko: '한국어',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇲🇽',
  ko: '🇰🇷',
};

// Map our locale codes to CMS locale codes
export const cmsLocaleMap: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-MX',   // or 'es-ES' depending on your Contentful setup
  ko: 'ko-KR',
};

export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
