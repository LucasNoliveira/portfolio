import { TECH } from '../tech/catalog';
import type { TechId } from '../tech/types';
import { TechIcon } from './Icon';

interface TechListProps {
  items: TechId[];
  size?: number;
  className?: string;
}

/** Package-badge style chips: logo + monospace name. */
export function TechList({ items, size = 16, className = '' }: TechListProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((id) => (
        <li key={id} className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-paper-2 px-2 py-1 font-code text-[.78rem]">
          <TechIcon id={id} size={size} />
          <span>{TECH[id].label}</span>
        </li>
      ))}
    </ul>
  );
}
