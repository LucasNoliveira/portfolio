'use client';

import { useTheme } from '../hooks/useTheme';

export function ThemeToggle({ label }: { label: string }) {
  const [theme, toggle] = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === 'dark'}
      className="grid h-[38px] min-w-[38px] cursor-pointer place-items-center rounded-full border border-rule hover:bg-paper-2"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {theme === 'dark' ? (
          <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
