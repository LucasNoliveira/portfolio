'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { readStore, writeStore } from './storage';

export type Theme = 'light' | 'dark';
const KEY = 'theme';
const QUERY = '(prefers-color-scheme: dark)';

function subscribeToSystem(onChange: () => void) {
  const query = matchMedia(QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
const readSystem = (): Theme => (matchMedia(QUERY).matches ? 'dark' : 'light');

/** The visitor's explicit choice. Kept in memory too, so the toggle still works when storage is blocked. */
let override: Theme | null = null;
const listeners = new Set<() => void>();

function subscribeToChoice(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) onChange();
  };
  addEventListener('storage', onStorage);
  return () => {
    listeners.delete(onChange);
    removeEventListener('storage', onStorage);
  };
}
const readChoice = (): Theme | null => {
  if (override) return override;
  const saved = readStore(KEY);
  return saved === 'light' || saved === 'dark' ? saved : null;
};

/**
 * Swaps the theme with a circle that grows from the toggle button, using the View Transitions API.
 * Browsers without it, visitors who prefer reduced motion and weak devices (data-perf, set in the layout) get the instant swap.
 */
function revealTheme(apply: () => void, origin?: HTMLElement | null) {
  const root = document.documentElement;
  const weakDevice = root.dataset.perf !== undefined;
  if (!origin || weakDevice || !('startViewTransition' in document) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply();
    return;
  }
  const box = origin.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const transition = document.startViewTransition(() => flushSync(apply));
  transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {});
}

/** Follows the OS until the visitor picks a theme explicitly. */
export function useTheme(): [Theme, (origin?: HTMLElement | null) => void] {
  const system = useSyncExternalStore(subscribeToSystem, readSystem, () => 'light' as Theme);
  const chosen = useSyncExternalStore(subscribeToChoice, readChoice, () => null);

  useEffect(() => {
    const root = document.documentElement;
    if (chosen) root.dataset.theme = chosen;
    else delete root.dataset.theme;
  }, [chosen]);

  const theme = chosen ?? system;
  const toggle = useCallback((origin?: HTMLElement | null) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      override = next;
      writeStore(KEY, next);
      document.documentElement.dataset.theme = next;
      listeners.forEach((listener) => listener());
    };
    revealTheme(apply, origin);
  }, [theme]);

  return [theme, toggle];
}
