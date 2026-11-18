'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
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

/** Follows the OS until the visitor picks a theme explicitly. */
export function useTheme(): [Theme, () => void] {
  const system = useSyncExternalStore(subscribeToSystem, readSystem, () => 'light' as Theme);
  const chosen = useSyncExternalStore(subscribeToChoice, readChoice, () => null);

  useEffect(() => {
    const root = document.documentElement;
    if (chosen) root.dataset.theme = chosen;
    else delete root.dataset.theme;
  }, [chosen]);

  const theme = chosen ?? system;
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    override = next;
    writeStore(KEY, next);
    listeners.forEach((listener) => listener());
  }, [theme]);

  return [theme, toggle];
}
