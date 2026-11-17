'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
/** Where the vertical line starts and the viewport "reading line" sits (fraction of viewport height). */
const LINE_OFFSET = 24;
const READING_LINE = 0.6;

/**
 * Timeline behavior for a list of entries:
 *  - each entry fades and slides up once when it scrolls into view (staggered when several appear together);
 *  - a line fills as the visitor scrolls (CSS variable `--progress`, no React re-renders).
 * Without JavaScript or with reduced motion everything is simply visible and the line is full.
 */
export function Timeline({ children, className = '' }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => { item.dataset.visible = 'true'; });
      return;
    }

    // Entries already on screen stay visible: no flash on load.
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < innerHeight * 0.85) item.dataset.visible = 'true';
    });
    list.dataset.animate = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, order) => {
            const target = entry.target as HTMLElement;
            target.style.setProperty('--delay', `${order * 90}ms`);
            target.dataset.visible = 'true';
            observer.unobserve(target);
          });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );
    items.filter((item) => !item.dataset.visible).forEach((item) => observer.observe(item));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const { top, height } = list.getBoundingClientRect();
      const length = Math.max(height - LINE_OFFSET, 1);
      const filled = clamp(innerHeight * READING_LINE - (top + LINE_OFFSET), 0, length);
      list.style.setProperty('--progress', (filled / length).toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };

    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    updateProgress();

    return () => {
      observer.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <ol ref={listRef} className={`timeline ${className}`}>{children}</ol>;
}
