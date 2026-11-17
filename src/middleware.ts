import { NextResponse, type NextRequest } from 'next/server';
import { negotiateLocale } from '@/redesign/content/negotiate';

/**
 * `/new` shows the redesign in the visitor's language without changing the URL:
 * it is rewritten to the statically generated `/new/en` or `/new/pt`.
 */
export function middleware(request: NextRequest) {
  const locale = negotiateLocale(request.headers.get('accept-language'));
  const target = request.nextUrl.clone();
  target.pathname = `/new/${locale}`;
  const response = NextResponse.rewrite(target);
  response.headers.set('Vary', 'Accept-Language');
  return response;
}

export const config = { matcher: ['/new'] };
