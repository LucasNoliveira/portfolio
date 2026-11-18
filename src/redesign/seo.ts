import type { Metadata } from 'next';
import { NEW_SITE_INDEXABLE, SITE, SITE_URL } from './config';
import { dictionaries } from './content';
import { HTML_LANG, LOCALES, type Locale } from './content/locales';

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', pt: 'pt_BR', es: 'es_ES', ja: 'ja_JP' };
const JOB_TITLE: Record<Locale, string> = {
  en: 'Backend engineer',
  pt: 'Engenheiro de backend',
  es: 'Ingeniero de backend',
  ja: 'バックエンドエンジニア',
};

/** `/new/en`, `/new/en/cv`, ... for each language, plus x-default. */
const languageAlternates = (subpath: string) => ({
  ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/new/${l}${subpath}`])),
  'x-default': `/new/en${subpath}`,
});

export function pageMetadata(lang: Locale, subpath: '' | '/cv', title: string, description: string): Metadata {
  const url = `/new/${lang}${subpath}`;
  const image = { url: `/og/og-${lang}.png`, width: 1200, height: 630, alt: `${SITE.name} — ${JOB_TITLE[lang]}` };
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(subpath) },
    robots: NEW_SITE_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: subpath ? 'article' : 'website',
      siteName: SITE.name,
      title,
      description,
      url,
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [image],
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
    url: `${SITE_URL}/new/${lang}`,
    jobTitle: JOB_TITLE[lang],
    description: t.meta.description,
    image: `${SITE_URL}/img/new/me.jpg`,
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
    sameAs: [SITE.linkedin, SITE.github],
    knowsLanguage: ['pt-BR', 'en', 'es', 'ja'],
    knowsAbout: ['Python', 'Django', 'FastAPI', 'REST APIs', 'AWS', 'PostgreSQL', 'LLM integration'],
  };
}
