import { GENERATED_ICONS } from './icons.generated';
import type { IconShape, TechId } from './types';

/** Hand-drawn neutral glyphs for things that have no brand logo (stroke based, 24px grid). */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.7', strokeLinecap: 'round', strokeLinejoin: 'round' };
const CUSTOM_ICONS: Record<string, IconShape> = {
  llm: { viewBox: '0 0 24 24', shapes: [
    { tag: 'path', attrs: { d: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', ...stroke } },
    { tag: 'path', attrs: { d: 'M19 16v4M17 18h4', ...stroke } },
  ] },
  websockets: { viewBox: '0 0 24 24', shapes: [
    { tag: 'path', attrs: { d: 'M4 8h13l-3-3M20 16H7l3 3', ...stroke } },
  ] },
  resume: { viewBox: '0 0 24 24', shapes: [
    { tag: 'path', attrs: { d: 'M7 3h7l5 5v13H7z', ...stroke } },
    { tag: 'path', attrs: { d: 'M14 3v5h5M10 13h6M10 17h6', ...stroke } },
  ] },
  jwt: { viewBox: '0 0 24 24', shapes: [
    { tag: 'rect', attrs: { x: '5', y: '10', width: '14', height: '10', rx: '2', ...stroke } },
    { tag: 'path', attrs: { d: 'M8 10V7a4 4 0 018 0v3', ...stroke } },
  ] },
};

export const ICONS: Record<string, IconShape> = { ...GENERATED_ICONS, ...CUSTOM_ICONS };

export interface Tech {
  label: string;
  /** CSS color for the logo. Brands that are near-black adapt to the theme through a token. */
  color: string;
}

export const TECH: Record<TechId, Tech> = {
  python: { label: 'Python', color: '#3776AB' },
  django: { label: 'Django', color: 'var(--c-django)' },
  fastapi: { label: 'FastAPI', color: '#009688' },
  postgresql: { label: 'PostgreSQL', color: '#4F86B8' },
  graphql: { label: 'GraphQL', color: '#E10098' },
  aws: { label: 'AWS', color: '#FF9900' },
  docker: { label: 'Docker', color: '#2496ED' },
  react: { label: 'React', color: '#2CB6D8' },
  angular: { label: 'Angular', color: '#DD0031' },
  git: { label: 'Git', color: '#F05032' },
  nginx: { label: 'Nginx', color: '#009639' },
  gcp: { label: 'Google Cloud', color: '#4285F4' },
  podman: { label: 'Podman', color: '#892CA0' },
  pytest: { label: 'Pytest', color: '#0A9EDC' },
  llm: { label: 'OpenAI / LLMs', color: 'var(--accent)' },
  websockets: { label: 'WebSockets', color: 'var(--accent)' },
  jwt: { label: 'JWT + HMAC', color: 'var(--accent)' },
};
