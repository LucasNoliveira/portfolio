/** localStorage can throw (private mode, blocked cookies): never let it break the page. */
export const readStore = (key: string): string | null => {
  try { return localStorage.getItem(key); } catch { return null; }
};
export const writeStore = (key: string, value: string): void => {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
};
