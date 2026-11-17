import type { TechId } from '../tech/types';

export type CompanyId = 'vocal' | 'accenture' | 'indra' | 'mont' | 'vitta';

export interface Job {
  companyId: CompanyId;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: TechId[];
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
export interface LanguageSkill {
  name: string;
  level: string;
  score: 1 | 2 | 3 | 4 | 5;
}

export interface Dictionary {
  meta: { title: string; description: string };
  ui: { skip: string; theme: string; language: string; switchTo: string; top: string; current: string; problem: string; approach: string; result: string; source: string };
  nav: { work: string; cases: string; skills: string; about: string; contact: string };
  hero: {
    role: string; lead: string; location: string; availability: string;
    email: string; resume: string;
    menu: { title: string; email: string; whatsapp: string; call: string; linkedin: string }; stackTitle: string; stack: TechId[];
    card: { role: string; location: string; timezone: string; openTo: string };
  };
  work: { title: string; intro: string; jobs: Job[] };
  cases: { title: string; intro: string; items: CaseStudy[] };
  skills: { title: string; groups: { name: string; items: TechId[] }[] };
  about: {
    title: string; paragraphs: string[]; facts: { term: string; value: string }[];
    languagesTitle: string; languages: LanguageSkill[];
  };
  contact: { title: string; intro: string; whatsapp: string; call: string };
}
