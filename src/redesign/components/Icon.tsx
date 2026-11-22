import { createElement } from 'react';
import { ICONS, TECH } from '../tech/catalog';
import type { TechId } from '../tech/types';

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Renders a logo from the shared sprite (see IconSprite). Every glyph's path data is in the page once,
 * so the HTML stays small however many times a logo appears. No innerHTML, no external requests.
 */
export function Icon({ id, size = 24, color, className }: IconProps) {
  if (!ICONS[id]) return null;
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ color, fill: color ?? 'currentColor' }}
    >
      <use href={`#i-${id}`} />
    </svg>
  );
}

/** The one place the vetted SVG shapes are written out. Render it once, near the top of the body. */
export function IconSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      {Object.entries(ICONS).map(([id, icon]) => (
        <symbol key={id} id={`i-${id}`} viewBox={icon.viewBox}>
          {icon.shapes.map((shape, i) => createElement(shape.tag, { key: i, ...shape.attrs }))}
        </symbol>
      ))}
    </svg>
  );
}

export function TechIcon({ id, size, className }: { id: TechId; size?: number; className?: string }) {
  return <Icon id={id} size={size} color={TECH[id].color} className={className} />;
}
