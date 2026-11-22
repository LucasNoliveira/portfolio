import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: { title: 'Lucas Oliveira — Software engineer', description: 'Software engineer in São Paulo building AI-powered products with Python, Django, FastAPI, React and AWS.' },
  ui: { skip: 'Skip to content', theme: 'Toggle color theme', language: 'Language', top: 'Back to top', current: 'Current', problem: 'Problem', approach: 'What I did', result: 'Result', source: 'View source' },
  nav: { work: 'Work', cases: 'Case studies', services: 'Services', skills: 'Stack', about: 'About', contact: 'Contact', blog: 'Blog' },
  hero: {
    role: 'Software engineer building AI-powered products.',
    lead: 'Software engineer who turns ideas into products people actually use, and makes existing ones better. I’ve shipped in startups, in large consultancies and in teams of one. Currently building AI products at an early-stage startup.',
    location: 'São Paulo, Brazil (UTC−3)',
    place: 'São Paulo, Brazil · UTC−3 · Remote',
    email: 'Contact me',
    menu: { title: 'How would you like to reach me?', email: 'Email', whatsapp: 'Quick message on WhatsApp', call: 'Book a 30-minute intro call', linkedin: 'Send a message on LinkedIn' },
    resume: 'Resume',
    stackTitle: 'What I reach for every day',
    stack: ['python', 'django', 'react', 'aws', 'docker', 'postgresql', 'llm'],
    card: { role: 'Software engineer', location: 'São Paulo, Brazil', timezone: 'UTC-3', workMode: 'remote' },
  },
  work: {
    title: 'Where I’ve worked',
    intro: 'A startup, an enterprise consultancy and a few contract engagements.',
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
        companyId: 'independent', company: 'Self-employed', role: 'Contract software engineer',
        period: 'Oct 2023 – Jan 2025 · 1 yr 4 mos',
        summary: 'Project-based backend and full-stack engagements for 3 clients.',
        highlights: [],
        stack: [],
        engagements: [
          {
            companyId: 'vitta', company: 'Vitta Group Franchising', kind: 'Contract (PJ)',
            highlights: [
            'Built and maintained backend services in Python (Django) and Node.js, with RESTful APIs for internal and client-facing systems.',
            'Designed and managed PostgreSQL databases and built RD Station CRM integrations with telemarketing platforms.',
            'Led a point-of-sale system in Django, React and PostgreSQL, deployed on Nginx and a Linux VPS.',
          ],
            stack: ['django', 'react', 'postgresql', 'nginx'],
          },
          {
            companyId: 'indra', company: 'Indra Energia', kind: 'Contract (PJ)',
            highlights: [
            'Developed backend services for energy trading and retail systems.',
            'Optimized FastAPI services with async patterns and caching, cutting response time by about 30%.',
            'Migrated legacy services to Docker: about 40% fewer environment issues and 20% fewer incidents after deploys.',
          ],
            stack: ['python', 'fastapi', 'docker'],
          },
          {
            companyId: 'mont', company: 'Mont Capital Asset', kind: 'Project-based (CLT)',
            highlights: [
            'Designed an AI-powered support assistant on the OpenAI APIs, raising support efficiency by about 30–40%.',
            'Integrated financial data providers over SOAP and REST and built real-time features with WebSockets.',
            'Deployed on AWS (EC2, S3, RDS) with Docker and delivered 10+ backend features in an agile team.',
          ],
            stack: ['python', 'llm', 'websockets', 'aws'],
          },
        ],
      },
      {
        companyId: 'riobranco', company: 'Colégio Rio Branco', role: 'IT analyst / automation developer', kind: 'Internship',
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
    intro: '4 problems, what I did about them, and what changed.',
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
  blog: {
    title: 'Blog',
    intro: 'Notes on software engineering: Python, Django, APIs and cloud.',
    empty: 'The first posts are on their way.',
    minRead: '{n} min read',
    back: 'All posts',
    englishOnly: 'Posts are written in English.',
    alsoIn: 'Also available in {language}',
    feed: 'RSS feed',
    latest: 'Latest writing',
    latestIntro: 'Technical posts on software engineering.',
    all: 'All posts',
  },
  recommendations: {
    title: 'What teammates say',
    intro: 'Recommendations from LinkedIn, translated from Portuguese.',
    viewAll: 'Read them all on LinkedIn',
    items: [
      { name: 'Odival Neto', headline: 'Senior Software Engineer · Python, Swift, APIs, Cloud', relation: 'Same team · Jan 2026', quote: 'I had the honor of working with Lucas on the same software development team, on highly complex projects, and he showed solid technical knowledge across a wide range of solutions.' },
      { name: 'André Garcia Carmona', headline: 'Python, SQL, ETL, AWS, GCP · Data Science', relation: 'Same team · Jun 2025', quote: 'I had the pleasure of working with Lucas Oliveira on several software development projects, and I can say he is an exceptional professional. Lucas has deep technical knowledge and always looks for efficient, innovative solutions to the challenges that come up. Beyond his technical skills, he stands out for his collaborative spirit and his ability to work in a team.' },
      { name: 'Agamenon Sousa Pereira', headline: 'MBA in Energy Management and Economics', relation: 'Indra Energia, different teams · Jun 2025', quote: 'I had the honor of working with Lucas at Indra Energia, where we developed software through integrated projects. Lucas is committed to his responsibilities and highly integrative. He will certainly add value to any team he joins.' },
      { name: 'Caique Rocha', headline: 'Software Engineer · Python, JavaScript, APIs, AI', relation: 'Same team at Colégio Rio Branco · Jun 2025', quote: 'I had the pleasure of working with Lucas on our IT team at Colégio Rio Branco, where he worked as an IT analyst. During our time together he showed deep technical knowledge and a strong commitment to the quality and efficiency of his deliveries.' },
    ],
  },
  services: {
    title: 'What I can build',
    intro: 'Whatever the project needs, from the API to the interface.',
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
      { name: 'Backend', items: ['python', 'django', 'fastapi', 'graphql', 'postgresql', 'mongodb', 'redis', 'websockets'] },
      { name: 'Frontend', items: ['react', 'typescript', 'angular'] },
      { name: 'Cloud and infrastructure', items: ['aws', 'gcp', 'docker', 'podman', 'nginx'] },
      { name: 'Observability', items: ['prometheus', 'grafana'] },
      { name: 'AI and quality', items: ['llm', 'pytest', 'jwt', 'git'] },
    ],
  },
  about: {
    title: 'About',
    paragraphs: [
      'I like turning loose product ideas into services that stay up. My focus is Python, cloud infrastructure and features built on language models.',
      'I care about clean design, tests, security and observability, and about explaining trade-offs plainly to teammates and stakeholders.',
    ],
    github: { heatmap: 'contributions in the last year', heatmapDay: '{count} contributions on {date}', title: 'On GitHub', repos: 'Public repositories', stars: 'Stars', languages: 'Most used', lastPush: 'Last push', profile: 'View profile' },
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
    intro: 'Tell me about the product, the team or the problem. I usually reply within a day.',
    whatsapp: 'Message on WhatsApp',
    call: 'Book a 30-minute intro call',
    resume: 'Resume',
  },
  cv: { role: 'Backend engineer building AI-powered products.', lead: 'I have spent 4 years taking products from idea to production: secure APIs, cloud infrastructure and LLM features that teams can rely on. Based in São Paulo, working remotely with international teams.', back: 'Back to site', download: 'Download PDF', print: 'Print', summary: 'Summary', experience: 'Experience', skills: 'Skills', education: 'Education', languages: 'Languages' },
};
