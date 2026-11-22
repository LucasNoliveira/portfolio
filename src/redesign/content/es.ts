import type { Dictionary } from './types';

export const es: Dictionary = {
  meta: { title: 'Lucas Oliveira — Ingeniero de software', description: 'Ingeniero de software en São Paulo que crea productos con IA usando Python, Django, FastAPI, React y AWS.' },
  ui: { skip: 'Ir al contenido', theme: 'Cambiar el tema de color', language: 'Idioma', top: 'Volver arriba', current: 'Actual', problem: 'Problema', approach: 'Qué hice', result: 'Resultado', source: 'Ver código fuente' },
  nav: { work: 'Experiencia', cases: 'Casos de estudio', services: 'Servicios', skills: 'Stack', about: 'Sobre mí', contact: 'Contacto', blog: 'Blog' },
  hero: {
    role: 'Ingeniero de software que crea productos con IA.',
    lead: 'Ingeniero de software que convierte ideas en productos que la gente realmente usa y mejora los que ya existen. He entregado en startups, en grandes consultoras y en equipos de una sola persona. Hoy construyo productos de IA en una startup en etapa inicial.',
    location: 'São Paulo, Brasil (UTC−3)',
    place: 'São Paulo, Brasil · UTC−3 · Remoto',
    email: 'Contáctame',
    menu: { title: '¿Cómo prefieres contactarme?', email: 'Correo', whatsapp: 'Mensaje rápido por WhatsApp', call: 'Reserva una llamada de 30 minutos', linkedin: 'Envía un mensaje por LinkedIn' },
    resume: 'Currículum',
    stackTitle: 'Lo que uso todos los días',
    stack: ['python', 'django', 'react', 'aws', 'docker', 'postgresql', 'llm'],
    card: { role: 'Ingeniero de software', location: 'São Paulo, Brasil', timezone: 'UTC-3', workMode: 'remoto' },
  },
  work: {
    title: 'Dónde he trabajado',
    intro: 'Una startup, una consultora global y algunos proyectos como contratista.',
    jobs: [
      {
        companyId: 'vocal', company: 'Vocal Silence', role: 'Ingeniero backend semi senior',
        period: 'Feb 2026 – actualidad', current: true,
        highlights: [
          'Lidero la arquitectura backend de aplicaciones de IA construidas con Python y Django.',
          'Diseñé APIs para socios protegidas con JWT y firma HMAC de las solicitudes.',
          'Escribí desde cero la suite de pruebas del backend y añadí revisión de código con LLM en los pull requests.',
          'Opero cargas de trabajo en AWS (ECS, Lambda, RDS, S3, SES, CloudWatch) y hago mentoría a un ingeniero junior.',
        ],
        stack: ['python', 'django', 'aws', 'docker', 'pytest', 'llm'],
      },
      {
        companyId: 'accenture', company: 'Accenture', role: 'Ingeniero de software',
        period: 'Ene 2025 – Ene 2026',
        highlights: [
          'Entregué proyectos para Fundação Renova/Samarco, TIM y Easy HR: Cloud Functions, webhooks GraphQL, RPA y automatización.',
          'Evaluado como Top Performance en todos los ciclos de revisión.',
        ],
        stack: ['python', 'gcp', 'graphql', 'angular', 'podman'],
      },
      {
        companyId: 'independent', company: 'Autónomo', role: 'Ingeniero de software contratista',
        period: 'Oct 2023 – Ene 2025 · 1 año y 4 meses',
        summary: 'Proyectos de backend y full-stack para 3 clientes.',
        highlights: [],
        stack: [],
        engagements: [
          {
            companyId: 'vitta', company: 'Vitta Group Franchising', kind: 'Contrato (PJ)',
            highlights: [
            'Desarrollé y mantuve servicios backend en Python (Django) y Node.js, con APIs RESTful para sistemas internos y de cara al cliente.',
            'Diseñé y administré bases de datos PostgreSQL y construí integraciones de RD Station CRM con plataformas de telemarketing.',
            'Lideré un sistema de punto de venta con Django, React y PostgreSQL, desplegado en Nginx y un VPS Linux.',
          ],
            stack: ['django', 'react', 'postgresql', 'nginx'],
          },
          {
            companyId: 'indra', company: 'Indra Energia', kind: 'Contrato (PJ)',
            highlights: [
            'Desarrollé servicios backend para sistemas de trading de energía y retail.',
            'Optimicé servicios FastAPI con patrones asíncronos y caché, reduciendo el tiempo de respuesta cerca de un 30%.',
            'Migré servicios heredados a Docker: cerca de un 40% menos problemas de entorno y un 20% menos incidentes tras los despliegues.',
          ],
            stack: ['python', 'fastapi', 'docker'],
          },
          {
            companyId: 'mont', company: 'Mont Capital Asset', kind: 'Por proyecto (CLT)',
            highlights: [
            'Diseñé un asistente de soporte con IA usando las APIs de OpenAI, que aumentó la eficiencia del soporte entre un 30% y un 40%.',
            'Integré proveedores de datos financieros mediante SOAP y REST e implementé funciones en tiempo real con WebSockets.',
            'Desplegué soluciones en AWS (EC2, S3, RDS) con Docker y entregué más de 10 funcionalidades backend en un equipo ágil.',
          ],
            stack: ['python', 'llm', 'websockets', 'aws'],
          },
        ],
      },
      {
        companyId: 'riobranco', company: 'Colégio Rio Branco', role: 'Analista de TI / desarrollador de automatización', kind: 'Prácticas',
        period: 'Mar 2022 – Oct 2023',
        highlights: [
          'Escribí scripts en Python y PowerShell para automatizar la instalación, configuración y gestión de equipos, reduciendo la preparación de más de una hora a 15 minutos o menos.',
          'Di soporte a usuarios y a la operación diaria de TI: mantenimiento de sistemas, correo, impresoras, redes y bases de datos MySQL en Linux, Windows y macOS.',
        ],
        stack: ['python', 'git'],
      },
    ],
  },
  cases: {
    title: 'Casos de estudio',
    intro: '4 problemas, lo que hice y qué cambió.',
    items: [
      {
        companyId: 'indra', company: 'Indra Energia', title: 'APIs más rápidas sin reescribir todo',
        result: { value: '−30%', label: 'tiempo de respuesta de la API' },
        problem: 'Las respuestas lentas y los entornos frágiles frenaban los lanzamientos.',
        approach: 'Moví las rutas críticas a FastAPI asíncrono, añadí caché y estandaricé todos los entornos con Docker. Los problemas de configuración bajaron un 40% y los incidentes tras despliegues, un 20%.',
        stack: ['fastapi', 'python', 'docker'],
      },
      {
        companyId: 'mont', company: 'Mont Capital Asset', title: 'Un asistente de IA para el equipo de soporte',
        result: { value: '+30–40%', label: 'eficiencia del soporte' },
        problem: 'Soporte dedicaba horas a preguntas financieras repetitivas.',
        approach: 'Construí un asistente con OpenAI sobre los datos financieros (SOAP/REST, WebSockets) y reduje un 30% el tiempo de despliegue en AWS.',
        stack: ['llm', 'websockets', 'aws'],
      },
      {
        companyId: 'vocal', company: 'Vocal Silence', title: 'APIs en las que los socios pueden confiar',
        result: { value: '−50%', label: 'tamaño de la imagen Docker' },
        problem: 'Los socios necesitaban acceso seguro y el código no tenía red de seguridad.',
        approach: 'Firmé cada solicitud con JWT y HMAC, escribí las pruebas desde cero, añadí revisión de PRs con LLM y adelgacé las imágenes desplegadas en AWS.',
        stack: ['django', 'jwt', 'pytest', 'aws'],
      },
      {
        companyId: 'vitta', company: 'Vitta Group', title: 'Un punto de venta construido desde cero',
        result: { value: '0 → 1', label: 'en producción' },
        problem: 'El negocio necesitaba un punto de venta a medida que también se comunicara con su CRM.',
        approach: 'Lideré el diseño y la entrega con Django, React y PostgreSQL, conecté RD Station y lo publiqué en Nginx.',
        stack: ['django', 'react', 'postgresql', 'nginx'],
      },
    ],
  },
  blog: {
    title: 'Blog',
    intro: 'Notas sobre ingeniería de software: Python, Django, APIs y nube.',
    empty: 'Los primeros artículos están en camino.',
    minRead: '{n} min de lectura',
    back: 'Todos los artículos',
    englishOnly: 'Los artículos están escritos en inglés.',
    alsoIn: 'También disponible en {language}',
    feed: 'Feed RSS',
    latest: 'Últimos textos',
    latestIntro: 'Artículos técnicos sobre ingeniería de software.',
    all: 'Todos los artículos',
  },
  recommendations: {
    title: 'Lo que dicen sus compañeros',
    intro: 'Recomendaciones de LinkedIn, traducidas del portugués.',
    viewAll: 'Leerlas todas en LinkedIn',
    items: [
      { name: 'Odival Neto', headline: 'Senior Software Engineer · Python, Swift, APIs, Cloud', relation: 'Mismo equipo · ene. 2026', quote: 'Tuve el honor de trabajar con Lucas en el mismo equipo de desarrollo de software, en proyectos de alta complejidad, y demostró buenos conocimientos técnicos en diversas soluciones.' },
      { name: 'André Garcia Carmona', headline: 'Python, SQL, ETL, AWS, GCP · Ciencia de Datos', relation: 'Mismo equipo · jun. 2025', quote: 'Tuve el placer de trabajar con Lucas Oliveira en varios proyectos de desarrollo de software y puedo afirmar que es un profesional excepcional. Lucas tiene un profundo conocimiento técnico y siempre busca soluciones eficientes e innovadoras para los desafíos que surgen. Además de sus habilidades técnicas, se destaca por su espíritu colaborativo y su capacidad de trabajar en equipo.' },
      { name: 'Agamenon Sousa Pereira', headline: 'MBA en Gestión y Economía de la Energía', relation: 'Indra Energia, equipos distintos · jun. 2025', quote: 'Tuve el honor de trabajar con Lucas en Indra Energia, donde desarrollábamos software mediante proyectos integrados. Lucas es comprometido con sus responsabilidades y muy integrador. Sin duda aporta valor a cualquier equipo en el que participe.' },
      { name: 'Caique Rocha', headline: 'Software Engineer · Python, JavaScript, APIs, IA', relation: 'Mismo equipo en Colégio Rio Branco · jun. 2025', quote: 'Tuve el placer de trabajar con Lucas en nuestro equipo de TI del Colégio Rio Branco, donde fue analista de TI. Durante el tiempo que trabajamos juntos, demostró un profundo conocimiento técnico y mucho compromiso con la calidad y la eficiencia de sus entregas.' },
    ],
  },
  services: {
    title: 'Qué puedo construir',
    intro: 'Lo que el proyecto necesite, desde la API hasta la interfaz.',
    items: [
      { title: 'APIs y backend', description: 'APIs seguras en las que equipos y socios pueden confiar, con autenticación, integraciones y pruebas desde el inicio.', stack: ['python', 'django', 'fastapi', 'graphql', 'jwt', 'postgresql'] },
      { title: 'Nube y despliegue', description: 'Servicios en contenedores sobre AWS o GCP, con entornos consistentes desde el portátil hasta producción.', stack: ['aws', 'gcp', 'docker', 'nginx'] },
      { title: 'Funciones con IA', description: 'Asistentes y flujos de trabajo con LLM construidos sobre tus propios datos y sistemas.', stack: ['llm', 'python'] },
      { title: 'Automatización', description: 'Scripts, webhooks e integraciones que quitan de encima el trabajo repetitivo.', stack: ['python', 'graphql', 'git'] },
      {
        title: 'Plataformas completas, de punta a punta',
        description: 'Cuando conviene que una sola persona se encargue de todo el producto: frontend en React, backend, base de datos, despliegue e integraciones. Lideré un sistema de punto de venta desde el primer commit hasta producción.',
        stack: ['react', 'django', 'postgresql', 'docker', 'nginx'],
        featured: true,
      },
    ],
  },
  skills: {
    title: 'Stack',
    groups: [
      { name: 'Backend', items: ['python', 'django', 'fastapi', 'graphql', 'postgresql', 'websockets'] },
      { name: 'Nube e infraestructura', items: ['aws', 'gcp', 'docker', 'podman', 'nginx'] },
      { name: 'IA y calidad', items: ['llm', 'pytest', 'jwt', 'git'] },
      { name: 'Frontend', items: ['react', 'angular'] },
    ],
  },
  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Me gusta convertir ideas de producto sueltas en servicios que se mantienen en pie. Mi foco es Python, infraestructura en la nube y funciones basadas en modelos de lenguaje.',
      'Me importan el diseño limpio, las pruebas, la seguridad y la observabilidad, y explicar los trade-offs con claridad a compañeros y stakeholders.',
    ],
    github: { heatmap: 'contribuciones en el último año', heatmapDay: '{count} contribuciones el {date}', title: 'En GitHub', repos: 'Repositorios públicos', stars: 'Estrellas', languages: 'Más usados', lastPush: 'Último push', profile: 'Ver perfil' },
    languagesTitle: 'Idiomas',
    languages: [
      { flag: 'br', name: 'Portugués', level: 'Nativo', score: 5 },
      { flag: 'us', name: 'Inglés', level: 'Avanzado · B2/C1', score: 4 },
      { flag: 'jp', name: 'Japonés', level: 'Intermedio · N3', score: 3 },
      { flag: 'es', name: 'Español', level: 'Básico', score: 1 },
    ],
    facts: [
      { term: 'Formación', value: 'Licenciatura en Ciencias de la Computación, Estácio' },
    ],
  },
  contact: {
    title: 'Hablemos',
    intro: 'Cuéntame sobre el producto, el equipo o el problema. Suelo responder en un día.',
    whatsapp: 'Escríbeme por WhatsApp',
    call: 'Reserva una llamada de 30 minutos',
    resume: 'Currículum',
  },
  cv: { role: 'Ingeniero backend que crea productos con IA.', lead: 'Llevo 4 años llevando productos de la idea a producción: APIs seguras, infraestructura en la nube y funciones con LLM en las que los equipos pueden confiar. Vivo en São Paulo y trabajo en remoto con equipos internacionales.', back: 'Volver al sitio', download: 'Descargar PDF', print: 'Imprimir', summary: 'Resumen', experience: 'Experiencia', skills: 'Habilidades', education: 'Formación', languages: 'Idiomas' },
};
