import type { ReactNode } from 'react';
import type { FlagCode } from '../content/types';

/** Simplified round flags drawn as SVG, so they look the same on every OS (emoji flags do not render on Windows). */
const FLAGS: Record<FlagCode, ReactNode> = {
  br: (
    <>
      <rect width="24" height="24" fill="#009C3B" />
      <path d="M12 4.5 21 12l-9 7.5L3 12z" fill="#FFDF00" />
      <circle cx="12" cy="12" r="4.2" fill="#002776" />
    </>
  ),
  us: (
    <>
      <rect width="24" height="24" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => <rect key={i} y={i * 24 / 13} width="24" height={24 / 13} fill="#B22234" />)}
      <rect width="11" height={7 * 24 / 13} fill="#3C3B6E" />
    </>
  ),
  jp: (
    <>
      <rect width="24" height="24" fill="#fff" />
      <circle cx="12" cy="12" r="5" fill="#BC002D" />
    </>
  ),
  es: (
    <>
      <rect width="24" height="24" fill="#AA151B" />
      <rect y="6" width="24" height="12" fill="#F1BF00" />
    </>
  ),
};

export function Flag({ code, size = 24 }: { code: FlagCode; size?: number }) {
  return (
    <span aria-hidden="true" className="inline-flex flex-none overflow-hidden rounded-full ring-1 ring-rule" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size}>{FLAGS[code]}</svg>
    </span>
  );
}
