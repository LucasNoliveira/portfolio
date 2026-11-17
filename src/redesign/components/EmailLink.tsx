'use client';

import type { ReactNode } from 'react';
import { useEmail } from '../hooks/useEmail';

interface EmailLinkProps {
  className?: string;
  children: ReactNode;
}

/** Links to the contact section until the address is assembled client-side, then to mailto:. */
export function EmailLink({ className, children }: EmailLinkProps) {
  const email = useEmail();
  return <a className={className} href={email ? `mailto:${email}` : '#contact'}>{children}</a>;
}
