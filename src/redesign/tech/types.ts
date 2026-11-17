export interface Shape {
  tag: 'path' | 'circle' | 'ellipse' | 'rect' | 'polygon' | 'polyline';
  attrs: Record<string, string>;
}

export interface IconShape {
  viewBox: string;
  shapes: Shape[];
}

export type TechId =
  | 'python' | 'django' | 'fastapi' | 'postgresql' | 'graphql' | 'aws' | 'docker'
  | 'react' | 'angular' | 'git' | 'nginx' | 'gcp' | 'podman' | 'pytest'
  | 'llm' | 'websockets' | 'jwt';

export type ContactIconId = 'gmail' | 'whatsapp' | 'linkedin' | 'github' | 'calendly';
