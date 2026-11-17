import Link from 'next/link';
import type { Locale } from '../content/locales';
import type { Dictionary } from '../content/types';
import { ThemeToggle } from './ThemeToggle';

const SECTIONS = ['work', 'cases', 'skills', 'about', 'contact'] as const;

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const other: Locale = locale === 'pt' ? 'en' : 'pt';
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-[color-mix(in_oklab,var(--paper)_90%,transparent)] backdrop-blur-md">
      <div className="wrap flex h-[60px] items-center gap-2">
        <a href="#top" className="mr-auto font-code text-sm font-medium no-underline">Lucas Oliveira</a>
        <nav aria-label="Primary" className="mr-4 hidden gap-5 md:flex">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className="text-sm text-muted no-underline hover:text-ink">
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <Link
          href={`/new/${other}`}
          hrefLang={other}
          lang={other}
          aria-label={t.ui.switchTo}
          className="grid h-9 place-items-center rounded-md border border-rule px-3 font-code text-xs no-underline hover:bg-paper-2"
        >
          {t.ui.language}
        </Link>
        <ThemeToggle label={t.ui.theme} />
      </div>
    </header>
  );
}
