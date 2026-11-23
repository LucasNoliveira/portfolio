'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface Props {
  label: string;
  previous: string;
  next: string;
  hint: string;
  children: ReactNode;
}

const arrow = 'M9 6l6 6-6 6';

/**
 * Horizontal track of cards: native scroll with snap on touch and keyboard, plus mouse dragging
 * (grab cursor) and previous/next buttons. Nothing here is required to read the cards.
 */
export function CaseCarousel({ label, previous, next, hint, children }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const [dragging, setDragging] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0, thumb: 1 });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({
      start: el.scrollLeft <= 6,
      end: el.scrollLeft >= max - 6,
      progress: max > 0 ? el.scrollLeft / max : 0,
      thumb: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const smooth = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const width = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * width, behavior: smooth() });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !track.current) return;
    drag.current = { active: true, moved: false, startX: event.clientX, startLeft: track.current.scrollLeft };
    // Pressing inside the track means "scroll", not "select": stop a selection from starting at all.
    track.current.style.userSelect = 'none';
    window.getSelection()?.removeAllRanges();
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const el = track.current;
    if (!state.active || !el) return;
    const delta = event.clientX - state.startX;
    if (!state.moved && Math.abs(delta) < 4) return;
    if (!state.moved) {
      state.moved = true;
      setDragging(true);
      el.setPointerCapture(event.pointerId);
    }
    el.scrollLeft = state.startLeft - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    const wasDragging = drag.current.moved;
    drag.current.active = false;
    if (el) el.style.userSelect = '';
    if (!wasDragging || !el) return;
    drag.current.moved = false;
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const button =
    'grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-rule hover:bg-paper-2 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent';

  return (
    <div>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(event) => event.preventDefault()}
        className={`-mx-1 flex gap-4 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory'
        }`}
      >
        {children}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-rule" aria-hidden="true">
          <span
            className="absolute inset-y-0 rounded-full bg-accent"
            style={{ width: `${edge.thumb * 100}%`, left: `${edge.progress * (1 - edge.thumb) * 100}%` }}
          />
        </div>
        <p className="hidden text-sm text-muted sm:block">{hint}</p>
        <div className="flex gap-2">
          <button type="button" className={button} onClick={() => step(-1)} disabled={edge.start} aria-label={previous}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
              <path d={arrow} />
            </svg>
          </button>
          <button type="button" className={button} onClick={() => step(1)} disabled={edge.end} aria-label={next}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={arrow} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
