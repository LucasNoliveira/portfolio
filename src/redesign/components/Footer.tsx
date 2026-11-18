import type { Dictionary } from '../content/types';
import { SITE } from '../config';

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="mt-auto border-t border-rule py-6 font-code text-xs text-muted">
      <div className="wrap flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} Lucas Oliveira</span>
        <span className="flex gap-4">
          <a href={SITE.repo} target="_blank" rel="noopener noreferrer" className="underline">{t.ui.source}</a>
          <a href="#top" className="underline">{t.ui.top}</a>
        </span>
      </div>
    </footer>
  );
}
