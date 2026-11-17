'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { useEmail } from '../hooks/useEmail';
import { Icon } from './Icon';

interface Option {
  icon: string;
  color: string;
  label: string;
  hint: string;
  href: string;
  external: boolean;
}

/**
 * "Contact me" disclosure: lets a visitor pick the channel they prefer right from the hero.
 * Closes on Escape, outside click, focus leaving the menu, or choosing an option.
 */
export function ContactMenu({ t }: { t: Dictionary }) {
  const { menu } = t.hero;
  const email = useEmail();
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

  const options: Option[] = [
    { icon: 'gmail', color: '#EA4335', label: menu.email, hint: email ?? '', href: email ? `mailto:${email}` : '#contact', external: false },
    { icon: 'whatsapp', color: '#25D366', label: 'WhatsApp', hint: menu.whatsapp, href: SITE.whatsapp, external: true },
    { icon: 'calendly', color: '#006BFF', label: 'Calendly', hint: menu.call, href: SITE.calendly, external: true },
    { icon: 'linkedin', color: '#0A66C2', label: 'LinkedIn', hint: menu.linkedin, href: SITE.linkedin, external: true },
  ];

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
        className="btn btn-primary cursor-pointer gap-2"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {t.hero.email}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={menu.title}
          className="absolute left-0 top-full z-30 mt-2 w-[min(23rem,calc(100vw-2*var(--gutter)))] rounded-xl border border-rule bg-paper p-1.5 shadow-lg"
        >
          <p className="px-3 pb-1 pt-2 text-xs text-muted">{menu.title}</p>
          <ul>
            {options.map((option) => (
              <li key={option.label}>
                <a
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 no-underline hover:bg-paper-2"
                >
                  <Icon id={option.icon} size={24} color={option.color} />
                  <span className="min-w-0">
                    <span className="block font-medium leading-tight">{option.label}</span>
                    <span className="block truncate text-sm text-muted">{option.hint}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
