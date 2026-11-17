'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
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

/** Follows the OS until the visitor picks a theme explicitly. */
export function useTheme(): [Theme, () => void] {
  const system = useSyncExternalStore(subscribeToSystem, readSystem, () => 'light' as Theme);
  const [chosen, setChosen] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = readStore(KEY);
    if (saved === 'light' || saved === 'dark') setChosen(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (chosen) root.dataset.theme = chosen;
    else delete root.dataset.theme;
  }, [chosen]);

  const theme = chosen ?? system;
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    writeStore(KEY, next);
    setChosen(next);
  }, [theme]);

  return [theme, toggle];
}
