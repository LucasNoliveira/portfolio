'use client';

import { useEffect, useRef, useState } from 'react';
import { useEmail } from '../hooks/useEmail';

type State = 'idle' | 'copied' | 'failed';

/**
 * Copies the e-mail address to the clipboard. The address is only known after mount (see useEmail), so the
 * button is disabled until then. If the browser refuses the copy, the address is shown in the button instead,
 * so it can still be selected by hand.
 */
export function CopyEmailButton({ label, doneLabel }: { label: string; doneLabel: string }) {
  const email = useEmail();
  const [state, setState] = useState<State>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (!email) return;
    let next: State = 'copied';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = 'failed';
    }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), next === 'failed' ? 6000 : 2200);
  }

  const text = state === 'copied' ? doneLabel : state === 'failed' && email ? email : label;
  return (
    <button type="button" onClick={copy} disabled={!email} className="btn btn-sm cursor-pointer select-text disabled:cursor-wait disabled:opacity-60">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {state === 'copied' ? <path d="M5 13l4 4L19 7" /> : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </>
        )}
      </svg>
      <span>{text}</span>
      <span role="status" className="sr-only">{state === 'copied' ? doneLabel : ''}</span>
    </button>
  );
}
