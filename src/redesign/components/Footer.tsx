import type { Dictionary } from '../content/types';

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="border-t border-rule py-6 text-[.92rem] text-muted">
      <div className="wrap flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} Lucas Oliveira</span>
        <a href="#top" className="underline">{t.ui.top}</a>
      </div>
    </footer>
  );
}
