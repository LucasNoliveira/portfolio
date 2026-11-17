import { DEFAULT_LOCALE, isLocale, type Locale } from './locales';

/**
 * Picks the best supported locale from an Accept-Language header.
 * Pure and dependency-free so it can run in the Edge middleware.
 */
export function negotiateLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { primary: tag.toLowerCase().split('-')[0], q: q ? Number.parseFloat(q.slice(2)) : 1 };
    })
    .filter(({ q }) => Number.isFinite(q) && q > 0)
    .sort((a, b) => b.q - a.q);

  return ranked.map(({ primary }) => primary).find(isLocale) ?? DEFAULT_LOCALE;
}
