/** Highlights that the candidate is open to work. The dot pulses unless the visitor prefers reduced motion. */
export function AvailabilityBadge({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_oklab,var(--ok)_35%,transparent)] bg-[color-mix(in_oklab,var(--ok)_10%,transparent)] py-1.5 pl-3 pr-4 text-sm font-medium">
      <span aria-hidden="true" className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2.5 rounded-full bg-ok" />
      </span>
      {children}
    </p>
  );
}
