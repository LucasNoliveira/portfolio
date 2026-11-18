import type { MetadataRoute } from 'next';
import { NEW_SITE_INDEXABLE, SITE_URL } from '@/redesign/config';
import { getAllPosts } from '@/redesign/blog';
import { HTML_LANG, LOCALES } from '@/redesign/content/locales';

/** Lists the redesign (every language, home and résumé) once it is allowed to be indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!NEW_SITE_INDEXABLE) return [];
  const pages = ['', '/cv', '/blog'].flatMap((subpath) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/new/${lang}${subpath}`,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `${SITE_URL}/new/${l}${subpath}`])),
      },
    })),
  );
  // A post is listed in the languages it is written in, with alternates only for those.
  const slugs = Array.from(new Set(getAllPosts().map((post) => post.slug)));
  const posts = slugs.map((slug) => {
    const langs = getAllPosts().filter((post) => post.slug === slug).map((post) => post.lang);
    return langs.map((lang) => ({
      url: `${SITE_URL}/new/${lang}/blog/${slug}`,
      alternates: { languages: Object.fromEntries(langs.map((l) => [HTML_LANG[l], `${SITE_URL}/new/${l}/blog/${slug}`])) },
    }));
  }).flat();
  return [...pages, ...posts];
}
