import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: { title: 'Lucas Oliveira — Backend engineer', description: 'Backend engineer in São Paulo building AI-powered products with Python, Django, FastAPI and AWS. Open to remote roles worldwide.' },
  ui: { skip: 'Skip to content', theme: 'Toggle color theme', language: 'Português', switchTo: 'Mudar para português', top: 'Back to top', current: 'Current', problem: 'Problem', approach: 'What I did', result: 'Result', source: 'View source' },
  nav: { work: 'Work', cases: 'Case studies', services: 'Services', skills: 'Stack', about: 'About', contact: 'Contact' },
  hero: {
    role: 'Backend engineer building AI-powered products.',
    lead: 'I have spent four years taking products from idea to production: secure APIs, cloud infrastructure and LLM features that teams can rely on. Based in São Paulo, working remotely with international teams.',
    location: 'São Paulo, Brazil (UTC−3)',
    availability: 'Open to remote roles worldwide',
    email: 'Contact me',
    menu: { title: 'How would you like to reach me?', email: 'Email', whatsapp: 'Quick message on WhatsApp', call: 'Book a 30-minute intro call', linkedin: 'Send a message on LinkedIn' },
    resume: 'Résumé',
    stackTitle: 'What I reach for every day',
    stack: ['python', 'django', 'fastapi', 'aws', 'docker', 'postgresql', 'graphql', 'llm'],
    card: { role: 'Backend engineer', location: 'São Paulo, Brazil', timezone: 'UTC-3', openTo: 'remote roles, worldwide' },
  },
  work: {
    title: 'Where I’ve worked',
    intro: 'A startup, an enterprise consultancy and a few contract engagements, always on the backend side.',
    jobs: [
      {
        companyId: 'vocal', company: 'Vocal Silence', role: 'Mid-level backend engineer',
        period: 'Feb 2026 – now', current: true,
        highlights: [
          'Lead the backend architecture of AI applications built on Python and Django.',
          'Designed partner APIs secured with JWT and HMAC request signing.',
          'Wrote the backend test suite from scratch and added LLM-assisted code review to pull requests.',
          'Run workloads on AWS (ECS, Lambda, RDS, S3, SES, CloudWatch) and mentor a junior engineer.',
        ],
        stack: ['python', 'django', 'aws', 'docker', 'pytest', 'llm'],
      },
      {
        companyId: 'accenture', company: 'Accenture', role: 'Software engineer',
        period: 'Jan 2025 – Jan 2026',
        highlights: [
          'Delivered for Fundação Renova/Samarco, TIM and Easy HR: Cloud Functions, GraphQL webhooks, RPA and automation.',
          'Rated Top Performance in every review cycle.',
        ],
        stack: ['python', 'gcp', 'graphql', 'angular', 'podman'],
      },
      {
        companyId: 'indra', company: 'Indra Energia', role: 'Backend engineer (contract)',
        period: 'Sep 2024 – Jan 2025',
        highlights: [
          'Built async FastAPI services with caching and cut response time by 30%.',
          'Containerized the environments: 40% fewer setup issues and 20% fewer incidents after deploys.',
        ],
        stack: ['python', 'fastapi', 'docker'],
      },
      {
        companyId: 'mont', company: 'Mont Capital Asset', role: 'Backend engineer',
        period: 'Apr – Aug 2024',
        highlights: [
          'Shipped an OpenAI-based support assistant that raised team efficiency by 30–40%.',
          'Integrated financial data over SOAP/REST and WebSockets; deployments on AWS got 30% faster.',
        ],
        stack: ['python', 'llm', 'websockets', 'aws'],
      },
      {
        companyId: 'vitta', company: 'Vitta Group', role: 'Full-stack developer (contract)',
        period: 'Oct 2023 – Dec 2024',
        highlights: ['Led a point-of-sale system from first commit to production, with RD Station CRM integrations, on Nginx and a VPS.'],
        stack: ['django', 'react', 'postgresql', 'nginx'],
      },
      {
        companyId: 'rotary', company: 'Fundação de Rotarianos de São Paulo', role: 'IT analyst / automation developer',
        period: 'Mar 2022 – Oct 2023',
        highlights: [
          'Wrote Python and PowerShell scripts to automate installation, configuration and management of computers, cutting setup from over an hour to 15 minutes or less.',
          'Supported users and day-to-day IT: systems maintenance, email, printers, networks and MySQL databases across Linux, Windows and macOS.',
        ],
        stack: ['python', 'git'],
      },
    ],
  },
  cases: {
    title: 'Case studies',
    intro: 'Four problems, what I did about them, and what changed.',
    items: [
      {
        companyId: 'indra', company: 'Indra Energia', title: 'Faster APIs without a rewrite',
        result: { value: '−30%', label: 'API response time' },
        problem: 'Slow responses and fragile environments were slowing releases down.',
        approach: 'Moved hot paths to async FastAPI, added caching and standardized every environment with Docker. Setup issues dropped 40% and post-deploy incidents 20%.',
        stack: ['fastapi', 'python', 'docker'],
      },
      {
        companyId: 'mont', company: 'Mont Capital Asset', title: 'An AI assistant for the support team',
        result: { value: '+30–40%', label: 'support efficiency' },
        problem: 'Support spent hours on repetitive financial questions.',
        approach: 'Built an OpenAI assistant on top of the financial data (SOAP/REST, WebSockets) and trimmed deploy time by 30% on AWS.',
        stack: ['llm', 'websockets', 'aws'],
      },
      {
        companyId: 'vocal', company: 'Vocal Silence', title: 'APIs partners can trust',
        result: { value: '−50%', label: 'Docker image size' },
        problem: 'Partners needed secure access, and the codebase had no safety net.',
        approach: 'Signed every request with JWT and HMAC, wrote the tests from zero, added LLM-assisted PR review and slimmed the images deployed to AWS.',
        stack: ['django', 'jwt', 'pytest', 'aws'],
      },
      {
        companyId: 'vitta', company: 'Vitta Group', title: 'A point-of-sale built from scratch',
        result: { value: '0 → 1', label: 'in production' },
        problem: 'The business needed a custom POS that also talked to its CRM.',
        approach: 'Led design and delivery across Django, React and PostgreSQL, connected RD Station and shipped it on Nginx.',
        stack: ['django', 'react', 'postgresql', 'nginx'],
      },
    ],
  },
  services: {
    title: 'What I can build',
    intro: 'Backend first. When a project needs more, I can take it end to end.',
    items: [
      { title: 'APIs and backend', description: 'Secure APIs that teams and partners can depend on, with authentication, integrations and tests from the start.', stack: ['python', 'django', 'fastapi', 'graphql', 'jwt', 'postgresql'] },
      { title: 'Cloud and deployment', description: 'Containerized services running on AWS or GCP, with environments that stay consistent from a laptop to production.', stack: ['aws', 'gcp', 'docker', 'nginx'] },
      { title: 'AI features', description: 'LLM-powered assistants and workflows built on top of your own data and systems.', stack: ['llm', 'python'] },
      { title: 'Automation', description: 'Scripts, webhooks and integrations that take repetitive work off people’s plates.', stack: ['python', 'graphql', 'git'] },
      {
        title: 'Complete platforms, end to end',
        description: 'When it makes sense to have one person own the whole product: React frontend, backend, database, deployment and integrations. I led a point-of-sale system from the first commit to production.',
        stack: ['react', 'django', 'postgresql', 'docker', 'nginx'],
        featured: true,
      },
    ],
  },
  skills: {
    title: 'Stack',
    groups: [
      { name: 'Backend', items: ['python', 'django', 'fastapi', 'graphql', 'postgresql', 'websockets'] },
      { name: 'Cloud and infrastructure', items: ['aws', 'gcp', 'docker', 'podman', 'nginx'] },
      { name: 'AI and quality', items: ['llm', 'pytest', 'jwt', 'git'] },
      { name: 'Frontend, when needed', items: ['react', 'angular'] },
    ],
  },
  about: {
    title: 'About',
    paragraphs: [
      'I like turning loose product ideas into services that stay up. My focus is Python, cloud infrastructure and features built on language models.',
      'I care about clean design, tests, security and observability, and about explaining trade-offs plainly to teammates and stakeholders.',
      'I work remotely with international teams and I’m open to relocating for the right role.',
    ],
    languagesTitle: 'Languages',
    languages: [
      { flag: 'br', name: 'Portuguese', level: 'Native', score: 5 },
      { flag: 'us', name: 'English', level: 'Advanced · B2/C1', score: 4 },
      { flag: 'jp', name: 'Japanese', level: 'Intermediate · N3', score: 3 },
      { flag: 'es', name: 'Spanish', level: 'Basic', score: 1 },
    ],
    facts: [
      { term: 'Education', value: 'B.Sc. in Computer Science, Estácio' },
    ],
  },
  contact: {
    title: 'Let’s talk',
    intro: 'I’m open to remote backend and AI-product roles paid in USD, EUR or GBP. I usually reply within a day.',
    whatsapp: 'Message on WhatsApp',
    call: 'Book a 30-minute intro call',
  },
};
