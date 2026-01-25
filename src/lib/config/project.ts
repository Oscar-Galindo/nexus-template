export const projectConfig = {
  siteType: (import.meta.env.SITE_TYPE || 'business') as 'business' | 'church',
  cmsProvider: (import.meta.env.CMS_PROVIDER || 'contentful') as 'contentful' | 'sanity' | 'markdown',
  formProvider: (import.meta.env.FORM_PROVIDER || 'ghl') as 'ghl' | 'simple',
  i18n: {
    enabled: import.meta.env.I18N_ENABLED === 'true',
    defaultLocale: import.meta.env.I18N_DEFAULT_LOCALE || 'en',
    locales: (import.meta.env.I18N_LOCALES || 'en').split(',') as string[],
  },
} as const;

export type SiteType = typeof projectConfig.siteType;
export type CMSProvider = typeof projectConfig.cmsProvider;
export type FormProvider = typeof projectConfig.formProvider;
