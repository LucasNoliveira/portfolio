import type { TechId } from '../tech/types';

export type CompanyId = 'vocal' | 'accenture' | 'indra' | 'mont' | 'vitta' | 'riobranco' | 'independent';

/** One client inside a grouped entry (for example, several project-based contracts under one self-employed role). */
export interface Engagement {
  companyId: CompanyId;
  company: string;
  /** Employment type shown as a small tag, e.g. "Contract (PJ)". */
  kind: string;
  highlights: string[];
  stack: TechId[];
}

export interface Job {
  companyId: CompanyId;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  /** Small tag next to the role, e.g. "Internship". */
  kind?: string;
  /** One line introducing a grouped entry. */
  summary?: string;
  highlights: string[];
  stack: TechId[];
  engagements?: Engagement[];
}

export interface ServiceItem {
  title: string;
  description: string;
  stack: TechId[];
  /** Shown wide and highlighted: the "I can take it end to end" offer. */
  featured?: boolean;
}

export interface CaseStudy {
  companyId: CompanyId;
  company: string;
  title: string;
  result: { value: string; label: string };
  problem: string;
  approach: string;
  stack: TechId[];
}

/** `score` is 1 (basic) to 5 (native). */
export type FlagCode = 'br' | 'us' | 'jp' | 'es';

export interface LanguageSkill {
  flag: FlagCode;
  name: string;
  level: string;
  score: 1 | 2 | 3 | 4 | 5;
}

export interface Dictionary {
  meta: { title: string; description: string };
  ui: { skip: string; theme: string; language: string; top: string; current: string; problem: string; approach: string; result: string; source: string };
  nav: { work: string; cases: string; services: string; skills: string; about: string; contact: string };
  hero: {
    role: string; lead: string; location: string; availability: string;
    email: string; resume: string;
    menu: { title: string; email: string; whatsapp: string; call: string; linkedin: string }; stackTitle: string; stack: TechId[];
    card: { role: string; location: string; timezone: string; openTo: string };
  };
  work: { title: string; intro: string; jobs: Job[] };
  cases: { title: string; intro: string; items: CaseStudy[] };
  services: { title: string; intro: string; items: ServiceItem[] };
  skills: { title: string; groups: { name: string; items: TechId[] }[] };
  about: {
    title: string; paragraphs: string[]; facts: { term: string; value: string }[];
    languagesTitle: string; languages: LanguageSkill[];
    github: { heatmap: string; heatmapDay: string; title: string; repos: string; stars: string; languages: string; lastPush: string; profile: string };
  };
  contact: { title: string; intro: string; whatsapp: string; call: string };
}
