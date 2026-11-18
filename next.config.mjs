const isDev = process.env.NODE_ENV !== 'production';

/** Security headers for every route. */
const baseHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  {
    // Next.js needs 'unsafe-inline' for its bootstrap scripts unless nonces are used (which would force dynamic rendering).
    key: 'Content-Security-Policy',
    value: [
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
    ].join('; '),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [{ source: '/:path*', headers: baseHeaders }];
  },

  /** The site used to live under /new: keep those links working. */
  async redirects() {
    return [
      { source: '/new', destination: '/', permanent: true },
      { source: '/new/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
