import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/redesign/config';
import { getAllPosts } from '@/redesign/blog';
import { HTML_LANG, LOCALES } from '@/redesign/content/locales';

/** Home, résumé and blog in every language, plus each post in the languages it is written in. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/cv', '/blog'].flatMap((subpath) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${subpath}`,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `${SITE_URL}/${l}${subpath}`])),
      },
    })),
  );
  // A post is listed in the languages it is written in, with alternates only for those.
  const slugs = Array.from(new Set(getAllPosts().map((post) => post.slug)));
  const posts = slugs.map((slug) => {
    const langs = getAllPosts().filter((post) => post.slug === slug).map((post) => post.lang);
    return langs.map((lang) => ({
      url: `${SITE_URL}/${lang}/blog/${slug}`,
      alternates: { languages: Object.fromEntries(langs.map((l) => [HTML_LANG[l], `${SITE_URL}/${l}/blog/${slug}`])) },
    }));
  }).flat();
  return [...pages, ...posts];
}
