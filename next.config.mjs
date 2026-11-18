import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';

/** Safe for every route, old and new. */
const baseHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

/**
 * Strict policy for the redesign only (/new). The old site loads third-party assets
 * and stays untouched until it is retired. Next.js needs 'unsafe-inline' for its
 * bootstrap scripts unless nonces are used (which would force dynamic rendering).
 */
const newSiteCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  webpack(config, { isServer }) {
    config.resolve.alias['@'] = path.resolve('src');

    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    return config;
  },

  async headers() {
    const csp = [{ key: 'Content-Security-Policy', value: newSiteCsp }];
    return [
      { source: '/:path*', headers: baseHeaders },
      { source: '/new', headers: csp },
      { source: '/new/:path*', headers: csp },
      // The new résumé PDFs stay out of search results until NEW_SITE_INDEXABLE=1 (see src/redesign/config.ts).
      ...(process.env.NEW_SITE_INDEXABLE === '1'
        ? []
        : [{ source: '/cv/lucas-oliveira-cv-:lang(en|pt|es|ja).pdf', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]),
    ];
  },
};

export default nextConfig;
