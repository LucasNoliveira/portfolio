import { NextResponse, type NextRequest } from 'next/server';
import { negotiateLocale } from '@/redesign/content/negotiate';

/**
 * `/` shows the site in the visitor's language without changing the URL:
 * it is rewritten to the statically generated `/en`, `/pt`, `/es` or `/ja`.
 */
export function middleware(request: NextRequest) {
  const locale = negotiateLocale(request.headers.get('accept-language'));
  const target = request.nextUrl.clone();
  target.pathname = `/${locale}`;
  const response = NextResponse.rewrite(target);
  response.headers.set('Vary', 'Accept-Language');
  return response;
}

export const config = { matcher: ['/'] };
