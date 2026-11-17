'use client';

import { useEffect, useRef } from 'react';

const DURATION = 900;
const easeOut = (x: number) => 1 - (1 - x) ** 3;

/**
 * Renders the final text (so it is correct without JavaScript), then counts every number in it up from zero
 * the first time it is visible. Signs, symbols and ranges such as "+30–40%" are kept as they are.
 */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parts = value.split(/(\d+)/);
    const numbers = parts.filter((_, i) => i % 2 === 1).map(Number);
    // "0 → 1" style values have nothing meaningful to count.
    if (!el || numbers.every((n) => n <= 1) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const render = (progress: number) => {
      let n = 0;
      el.textContent = parts.map((part, i) => (i % 2 ? String(Math.round(numbers[n++] * progress)) : part)).join('');
    };

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        render(easeOut(t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    render(0);
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); el.textContent = value; };
  }, [value]);

  return <strong ref={ref} className={`tabular-nums ${className}`}>{value}</strong>;
}
