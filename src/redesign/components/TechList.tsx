import { TECH } from '../tech/catalog';
import type { TechId } from '../tech/types';
import { TechIcon } from './Icon';

interface TechListProps {
  items: TechId[];
  size?: number;
  className?: string;
}

export function TechList({ items, size = 20, className = '' }: TechListProps) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {items.map((id) => (
        <li key={id} className="inline-flex items-center gap-2 text-[.93rem] font-medium">
          <TechIcon id={id} size={size} />
          <span>{TECH[id].label}</span>
        </li>
      ))}
    </ul>
  );
}
