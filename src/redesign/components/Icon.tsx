import { createElement } from 'react';
import { ICONS, TECH } from '../tech/catalog';
import type { TechId } from '../tech/types';

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

/** Renders vetted SVG shapes as React elements: no innerHTML, no external requests. */
export function Icon({ id, size = 24, color, className }: IconProps) {
  const icon = ICONS[id];
  if (!icon) return null;
  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ color, fill: color ?? 'currentColor' }}
    >
      {icon.shapes.map((shape, i) => createElement(shape.tag, { key: i, ...shape.attrs }))}
    </svg>
  );
}

export function TechIcon({ id, size, className }: { id: TechId; size?: number; className?: string }) {
  return <Icon id={id} size={size} color={TECH[id].color} className={className} />;
}
