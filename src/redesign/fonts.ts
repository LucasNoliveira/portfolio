import localFont from 'next/font/local';

/** Bricolage Grotesque (SIL OFL), self-hosted variable font with weight and width axes. */
export const bricolage = localFont({
  src: './fonts/bricolage-grotesque-wdth.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-bricolage',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
});
