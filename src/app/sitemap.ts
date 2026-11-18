import type { MetadataRoute } from 'next';
import { NEW_SITE_INDEXABLE, SITE_URL } from '@/redesign/config';
import { HTML_LANG, LOCALES } from '@/redesign/content/locales';

/** Lists the redesign (every language, home and résumé) once it is allowed to be indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!NEW_SITE_INDEXABLE) return [];
  return ['', '/cv'].flatMap((subpath) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/new/${lang}${subpath}`,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `${SITE_URL}/new/${l}${subpath}`])),
      },
    })),
  );
}
