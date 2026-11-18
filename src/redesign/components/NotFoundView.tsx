'use client';

import { usePathname } from 'next/navigation';
import { isLocale } from '../content/locales';
import { NOT_FOUND } from '../content/not-found';

/** The 404 page. The language comes from the first segment of the address, English when it is not a language. */
export function NotFoundView() {
  const pathname = usePathname() ?? '/';
  const first = pathname.split('/')[1] ?? '';
  const lang = isLocale(first) ? first : 'en';
  const copy = NOT_FOUND[lang];
  return (
    <main id="main" className="wrap flex flex-1 flex-col items-start justify-center py-24">
      <p className="rounded-lg border border-rule bg-paper-2 px-3 py-1.5 font-code text-sm text-muted [overflow-wrap:anywhere]">
        <span className="text-accent">GET</span> {pathname} <span className="text-accent">404</span>
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">{copy.title}</h1>
      <p className="mt-4 max-w-[52ch] text-muted">{copy.text}</p>
      <p className="mt-8">
        <a className="btn btn-primary" href={`/${lang}`}>{copy.home}</a>
      </p>
    </main>
  );
}
