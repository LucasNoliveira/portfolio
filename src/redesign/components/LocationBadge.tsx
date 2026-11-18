/** Where the person is and when they overlap with the visitor's day. Deliberately says nothing about availability. */
export function LocationBadge({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-rule py-1.5 pl-3 pr-4 text-sm font-medium">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
      {children}
    </p>
  );
}
