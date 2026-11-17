import type { Dictionary } from './types';

export const pt: Dictionary = {
  meta: { title: 'Lucas Oliveira — Engenheiro backend', description: 'Engenheiro backend em São Paulo criando produtos com IA em Python, Django, FastAPI e AWS. Aberto a vagas remotas no exterior.' },
  ui: { skip: 'Ir para o conteúdo', theme: 'Alternar tema de cores', language: 'English', switchTo: 'Switch to English', top: 'Voltar ao topo', current: 'Atual', problem: 'Problema', approach: 'O que fiz', result: 'Resultado', source: 'Ver código-fonte' },
  nav: { work: 'Trabalho', cases: 'Cases', skills: 'Stack', about: 'Sobre', contact: 'Contato' },
  hero: {
    role: 'Engenheiro backend criando produtos com IA.',
    lead: 'Há quatro anos levo produtos da ideia à produção: APIs seguras, infraestrutura em nuvem e recursos com LLMs em que o time pode confiar. Moro em São Paulo e trabalho remoto com times internacionais.',
    location: 'São Paulo, Brasil (UTC−3)',
    availability: 'Aberto a vagas remotas no exterior',
    email: 'Me envie um e-mail',
    resume: 'Currículo',
    stackTitle: 'O que uso todos os dias',
    stack: ['python', 'django', 'fastapi', 'aws', 'docker', 'postgresql', 'graphql', 'llm'],
    card: { role: 'Engenheiro backend', location: 'São Paulo, Brasil', timezone: 'UTC-3', openTo: 'vagas remotas no exterior' },
  },
  work: {
    title: 'Onde já trabalhei',
    intro: 'Uma startup, uma consultoria global e alguns projetos como PJ, sempre no backend.',
    jobs: [
      {
        companyId: 'vocal', company: 'Vocal Silence', role: 'Engenheiro backend pleno',
        period: 'Fev 2026 – atual', current: true,
        highlights: [
          'Lidero a arquitetura backend de aplicações de IA em Python e Django.',
          'Projetei APIs para parceiros protegidas com JWT e assinatura HMAC das requisições.',
          'Criei a suíte de testes do backend do zero e incluí code review com LLM nos pull requests.',
          'Opero cargas na AWS (ECS, Lambda, RDS, S3, SES, CloudWatch) e faço mentoria de um engenheiro júnior.',
        ],
        stack: ['python', 'django', 'aws', 'docker', 'pytest', 'llm'],
      },
      {
        companyId: 'accenture', company: 'Accenture', role: 'Engenheiro de software',
        period: 'Jan 2025 – Jan 2026',
        highlights: [
          'Entregas para Fundação Renova/Samarco, TIM e Easy HR: Cloud Functions, webhooks GraphQL, RPA e automações.',
          'Avaliado como Top Performance em todos os ciclos.',
        ],
        stack: ['python', 'gcp', 'graphql', 'angular', 'podman'],
      },
      {
        companyId: 'indra', company: 'Indra Energia', role: 'Engenheiro backend (PJ)',
        period: 'Set 2024 – Jan 2025',
        highlights: [
          'Criei serviços FastAPI assíncronos com cache e reduzi o tempo de resposta em 30%.',
          'Containerizei os ambientes: 40% menos problemas de setup e 20% menos incidentes após deploys.',
        ],
        stack: ['python', 'fastapi', 'docker'],
      },
      {
        companyId: 'mont', company: 'Mont Capital Asset', role: 'Engenheiro backend',
        period: 'Abr – Ago 2024',
        highlights: [
          'Entreguei um assistente de suporte com OpenAI que aumentou a eficiência do time em 30–40%.',
          'Integrei dados financeiros via SOAP/REST e WebSockets; os deploys na AWS ficaram 30% mais rápidos.',
        ],
        stack: ['python', 'llm', 'websockets', 'aws'],
      },
      {
        companyId: 'vitta', company: 'Vitta Group', role: 'Desenvolvedor full-stack (PJ)',
        period: 'Out 2023 – Dez 2024',
        highlights: ['Liderei um sistema de PDV do primeiro commit à produção, com integração ao RD Station CRM, em Nginx e VPS.'],
        stack: ['django', 'react', 'postgresql', 'nginx'],
      },
    ],
  },
  cases: {
    title: 'Cases',
    intro: 'Quatro problemas, o que fiz e o que mudou.',
    items: [
      {
        companyId: 'indra', company: 'Indra Energia', title: 'APIs mais rápidas sem reescrever tudo',
        result: { value: '−30%', label: 'no tempo de resposta' },
        problem: 'Respostas lentas e ambientes frágeis atrasavam as entregas.',
        approach: 'Movi os caminhos críticos para FastAPI assíncrono, adicionei cache e padronizei os ambientes com Docker. Os problemas de setup caíram 40% e os incidentes pós-deploy, 20%.',
        stack: ['fastapi', 'python', 'docker'],
      },
      {
        companyId: 'mont', company: 'Mont Capital Asset', title: 'Um assistente de IA para o suporte',
        result: { value: '+30–40%', label: 'de eficiência no suporte' },
        problem: 'O suporte gastava horas com perguntas financeiras repetitivas.',
        approach: 'Construí um assistente com OpenAI sobre os dados financeiros (SOAP/REST, WebSockets) e reduzi em 30% o tempo de deploy na AWS.',
        stack: ['llm', 'websockets', 'aws'],
      },
      {
        companyId: 'vocal', company: 'Vocal Silence', title: 'APIs em que parceiros confiam',
        result: { value: '−50%', label: 'no tamanho da imagem Docker' },
        problem: 'Parceiros precisavam de acesso seguro e o código não tinha rede de proteção.',
        approach: 'Assinei cada requisição com JWT e HMAC, escrevi os testes do zero, incluí review de PRs com LLM e enxuguei as imagens publicadas na AWS.',
        stack: ['django', 'jwt', 'pytest', 'aws'],
      },
      {
        companyId: 'vitta', company: 'Vitta Group', title: 'Um PDV construído do zero',
        result: { value: '0 → 1', label: 'em produção' },
        problem: 'O negócio precisava de um PDV sob medida que também falasse com o CRM.',
        approach: 'Liderei design e entrega com Django, React e PostgreSQL, conectei o RD Station e publiquei em Nginx.',
        stack: ['django', 'react', 'postgresql', 'nginx'],
      },
    ],
  },
  skills: {
    title: 'Stack',
    groups: [
      { name: 'Backend', items: ['python', 'django', 'fastapi', 'graphql', 'postgresql', 'websockets'] },
      { name: 'Cloud e infraestrutura', items: ['aws', 'gcp', 'docker', 'podman', 'nginx'] },
      { name: 'IA e qualidade', items: ['llm', 'pytest', 'jwt', 'git'] },
      { name: 'Frontend, quando preciso', items: ['react', 'angular'] },
    ],
  },
  about: {
    title: 'Sobre',
    paragraphs: [
      'Gosto de transformar ideias soltas de produto em serviços que ficam no ar. Meu foco é Python, infraestrutura em nuvem e recursos baseados em modelos de linguagem.',
      'Me importo com design limpo, testes, segurança e observabilidade, e com explicar trade-offs de forma simples para colegas e stakeholders.',
      'Trabalho remoto com times internacionais e estou aberto a me mudar pela vaga certa.',
    ],
    languagesTitle: 'Idiomas',
    languages: [
      { name: 'Português', level: 'Nativo', score: 5 },
      { name: 'Inglês', level: 'Avançado · B2/C1', score: 4 },
      { name: 'Japonês', level: 'Intermediário · N3', score: 3 },
      { name: 'Espanhol', level: 'Básico', score: 1 },
    ],
    facts: [
      { term: 'Formação', value: 'Bacharelado em Ciência da Computação, Estácio' },
    ],
  },
  contact: {
    title: 'Vamos conversar',
    intro: 'Estou aberto a vagas remotas de backend e produtos de IA pagas em USD, EUR ou GBP. Costumo responder em até um dia.',
    whatsapp: 'Chamar no WhatsApp',
    call: 'Agendar uma conversa de 30 minutos',
  },
};
