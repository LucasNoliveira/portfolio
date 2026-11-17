export const LOCALES = ['en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** BCP 47 tag used for <html lang>. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', pt: 'pt-BR' };
