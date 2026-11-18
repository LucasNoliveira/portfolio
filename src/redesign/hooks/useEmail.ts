'use client';

import { useSyncExternalStore } from 'react';
import { SITE } from '../config';

const subscribe = () => () => {};
const read = () => SITE.emailParts.join('@');
const readOnServer = () => null;

/** The address is assembled in the browser, so it never appears verbatim in the server HTML. */
export function useEmail(): string | null {
  return useSyncExternalStore(subscribe, read, readOnServer);
}
