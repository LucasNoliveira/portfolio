import localFont from 'next/font/local';

/** Geist Sans and Geist Mono (SIL OFL), self-hosted variable fonts. */
export const geistSans = localFont({
  src: './fonts/geist-sans.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-sans',
});

export const geistMono = localFont({
  src: './fonts/geist-mono.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-mono',
});
