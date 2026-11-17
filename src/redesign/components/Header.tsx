import type { Locale } from '../content/locales';
import type { Dictionary } from '../content/types';
import { LanguageMenu } from './LanguageMenu';
import { ThemeToggle } from './ThemeToggle';

const SECTIONS = ['work', 'cases', 'services', 'skills', 'about', 'contact'] as const;

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
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
        <LanguageMenu locale={locale} label={t.ui.language} />
        <ThemeToggle label={t.ui.theme} />
      </div>
    </header>
  );
}
