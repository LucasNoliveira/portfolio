'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { LOCALES, LOCALE_NAMES, type Locale } from '../content/locales';

/** Language switcher: a small disclosure listing every language in its own name. */
export function LanguageMenu({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-[38px] cursor-pointer items-center gap-1.5 rounded-full border border-rule bg-transparent px-3.5 font-code text-xs hover:bg-paper-2"
      >
        {LOCALE_NAMES[locale]}
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul id={panelId} className="absolute right-0 top-full z-30 mt-2 min-w-40 rounded-xl border border-rule bg-paper p-1.5 shadow-lg">
          {LOCALES.map((code) => (
            <li key={code}>
              <Link
                href={`/new/${code}`}
                hrefLang={code}
                lang={code}
                aria-current={code === locale ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm no-underline hover:bg-paper-2 ${code === locale ? 'font-semibold' : ''}`}
              >
                {LOCALE_NAMES[code]}
                {code === locale && <span aria-hidden="true" className="text-accent">●</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
