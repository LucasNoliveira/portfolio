import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { dictionaries } from '@/redesign/content';
import { HTML_LANG, isLocale, LOCALES } from '@/redesign/content/locales';
import { geistMono, geistSans } from '@/redesign/fonts';
import '@/redesign/styles/globals.css';

interface LayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: Pick<LayoutProps, 'params'>): Metadata {
  const { meta } = dictionaries[isLocale(params.lang) ? params.lang : 'en'];
  // Work in progress: keep the new version out of search results until it replaces the old one.
  return { title: meta.title, description: meta.description, robots: { index: false, follow: false } };
}

export default function NewSiteLayout({ children, params }: LayoutProps) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  return (
    <html lang={HTML_LANG[lang]} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh font-dev text-base`}>
        <a href="#main" className="absolute -left-[999px] top-2 z-50 rounded-md bg-brand px-4 py-2 text-on-brand focus:left-2">
          {dictionaries[lang].ui.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
