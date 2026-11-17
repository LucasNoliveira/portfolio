'use client';

import { useEffect, useState } from 'react';
import { SITE } from '../config';

/** The address is assembled after mount, so it never appears verbatim in the server HTML. */
export function useEmail(): string | null {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => setEmail(SITE.emailParts.join('@')), []);
  return email;
}
