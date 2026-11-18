'use client';

import { useEmail } from '../hooks/useEmail';

/** The address is assembled after mount so it never sits in the HTML for scrapers. */
export function CvEmail({ fallback }: { fallback?: string }) {
  const email = useEmail();
  return email ? <a href={`mailto:${email}`}>{email}</a> : <span>{fallback}</span>;
}
