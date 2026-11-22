import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { dictionaries } from '@/redesign/content';
import { HTML_LANG, isLocale, LOCALES } from '@/redesign/content/locales';
import { IconSprite } from '@/redesign/components/Icon';
import { geistMono, geistSans } from '@/redesign/fonts';
import '@/redesign/styles/globals.css';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

/** Weak-device hints. Chromium-only signals (deviceMemory, saveData) fall back to "unknown", which counts as capable. */
const PERF_PROBE = `(function(){var n=navigator,c=n.hardwareConcurrency||8,m=n.deviceMemory||8,s=n.connection&&n.connection.saveData;if(c<=4||m<=4||s)document.documentElement.dataset.perf=(c<=2||m<=2)?'min':'low'})()`;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function NewSiteLayout({ children, params }: LayoutProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : 'en';
  return (
    <html lang={HTML_LANG[lang]} suppressHydrationWarning>
      <head>
        {/* Runs before first paint. Tier "low" skips the theme animation, tier "min" also skips the typing effect. */}
        <script dangerouslySetInnerHTML={{ __html: PERF_PROBE }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col font-dev text-base leading-6`}>
        <a href="#main" className="absolute -left-[999px] top-2 z-50 rounded-md bg-brand px-4 py-2 text-on-brand focus:left-2">
          {dictionaries[lang].ui.skip}
        </a>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
