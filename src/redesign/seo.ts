import type { Metadata } from 'next';
import { SITE, SITE_URL } from './config';
import { dictionaries } from './content';
import { HTML_LANG, LOCALES, type Locale } from './content/locales';

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', pt: 'pt_BR', es: 'es_ES', ja: 'ja_JP' };
const JOB_TITLE: Record<Locale, string> = {
  en: 'Software engineer',
  pt: 'Engenheiro de software',
  es: 'Ingeniero de software',
  ja: 'ソフトウェアエンジニア',
};

interface PageOptions {
  /** Languages in which this page exists; defaults to all of them. Blog posts exist only where translated. */
  languages?: readonly Locale[];
  article?: { publishedTime: string };
  rss?: string;
  /** Absolute URL of the original, when the content was first published on another site. */
  canonical?: string;
}

export function pageMetadata(lang: Locale, subpath: string, title: string, description: string, options: PageOptions = {}): Metadata {
  const url = `/${lang}${subpath}`;
  const image = { url: `/og/og-${lang}.png`, width: 1200, height: 630, alt: `${SITE.name} — ${JOB_TITLE[lang]}` };
  const languages = options.languages ?? LOCALES;
  const alternates = Object.fromEntries(languages.map((l) => [HTML_LANG[l], `/${l}${subpath}`]));
  if (languages.includes('en')) alternates['x-default'] = `/en${subpath}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: options.canonical ?? url,
      // A page whose original lives elsewhere does not advertise its own language versions.
      ...(options.canonical ? {} : { languages: alternates }),
      ...(options.rss ? { types: { 'application/rss+xml': options.rss } } : {}),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: options.article ? 'article' : 'website',
      siteName: SITE.name,
      title,
      description,
      url,
      locale: OG_LOCALE[lang],
      images: [image],
      ...(options.article ? { publishedTime: options.article.publishedTime, authors: [SITE.name] } : {
        alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      }),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

/** Structured data for the home page: who this is, where to verify it. No e-mail or phone. */
export function personJsonLd(lang: Locale) {
  const t = dictionaries[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: `${SITE_URL}/${lang}`,
    jobTitle: JOB_TITLE[lang],
    description: t.meta.description,
    image: `${SITE_URL}/img/new/me.jpg`,
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
    sameAs: [SITE.linkedin, SITE.github],
    knowsLanguage: ['pt-BR', 'en', 'es', 'ja'],
    knowsAbout: ['Python', 'Django', 'FastAPI', 'REST APIs', 'AWS', 'PostgreSQL', 'LLM integration'],
  };
}

export function blogPostingJsonLd(lang: Locale, post: { slug: string; title: string; description: string; date: string; tags: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: HTML_LANG[lang],
    keywords: post.tags.join(', '),
    url: `${SITE_URL}/${lang}/blog/${post.slug}`,
    image: `${SITE_URL}/og/og-${lang}.png`,
    author: { '@type': 'Person', name: SITE.name, url: `${SITE_URL}/${lang}` },
  };
}
