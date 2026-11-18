import type { Locale } from '../content/locales';
import type { Dictionary } from '../content/types';
import { LanguageMenu } from './LanguageMenu';
import { ThemeToggle } from './ThemeToggle';

const SECTIONS = ['work', 'cases', 'services', 'skills', 'about', 'contact'] as const;

interface HeaderProps {
  t: Dictionary;
  locale: Locale;
  /** Show the Blog link (only when there are published posts). */
  hasBlog?: boolean;
  /** Prefix for the section links when the header is used outside the home page. */
  homePath?: string;
  /** Where each language switches to, when it is not the home page. */
  languageHrefs?: Partial<Record<Locale, string>>;
}

export function Header({ t, locale, hasBlog = false, homePath = '', languageHrefs }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-[color-mix(in_oklab,var(--paper)_90%,transparent)] backdrop-blur-md">
      <div className="wrap flex h-[60px] items-center gap-2">
        <a href={`${homePath}#top`} className="mr-auto font-code text-sm font-medium no-underline">Lucas Oliveira</a>
        <nav aria-label="Primary" className="mr-4 hidden gap-5 md:flex">
          {SECTIONS.map((id) => (
            <a key={id} href={`${homePath}#${id}`} className="text-sm text-muted no-underline hover:text-ink">
              {t.nav[id]}
            </a>
          ))}
          {hasBlog && (
            <a href={`/new/${locale}/blog`} className="text-sm text-muted no-underline hover:text-ink">
              {t.nav.blog}
            </a>
          )}
        </nav>
        <LanguageMenu locale={locale} label={t.ui.language} hrefs={languageHrefs} />
        <ThemeToggle label={t.ui.theme} />
      </div>
    </header>
  );
}
