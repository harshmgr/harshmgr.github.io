// ╔══════════════════════════════════════════════════════════════════╗
// ║  PORTFOLIO CONTENT — edit this file only, no component changes.  ║
// ║                                                                    ║
// ║  1. PERSONAL INFO   — name, links, contact                        ║
// ║  2. HERO            — headline, rotating titles, stat counters    ║
// ║  3. ABOUT           — dashboard cards + certifications            ║
// ║  4. SKILLS          — constellation nodes + connections           ║
// ║  5. PROJECTS        — featured project cards                      ║
// ║  6. EXPERIENCE      — timeline entries                            ║
// ║  7. ARCHITECTURE    — system diagrams                             ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── 1. PERSONAL INFO ───────────────────────────────────────────────
export const profile = {
  name: 'Harsh',
  fullName: 'Harsh Kumar',
  title: 'Software Engineer',
  location: 'Pune, India',
  email: 'kumarharsh8549@gmail.com',
  phone: '+91-700-489-9150',
  github: 'harshmgr',        // github.com/harshmgr
  linkedin: 'harshmgr',      // linkedin.com/in/harshmgr
  resumeUrl: '#',

  // ─── 2. HERO ──────────────────────────────────────────────────────
  tagline:
    '.NET Developer with 4+ years designing scalable REST APIs and microservices on C#, .NET 8, Azure and AWS — modernizing legacy systems and shipping high-throughput platforms across banking, finance and gaming.',
  specialties: [
    'Backend Engineering',
    '.NET Development',
    'Cloud — Azure & AWS',
    'Microservices',
    'CI/CD Automation',
    'Device Integration',
  ],
  stats: [
    { label: 'Years of Experience', value: 4, suffix: '+' },
    { label: 'TPS in Production APIs', value: 500, suffix: '+' },
    { label: 'Unit Test Coverage', value: 95, suffix: '%' },
    { label: 'Deployment Time Cut', value: 70, suffix: '%' },
  ],
}

export const bootLines = [
  '> Initializing Developer Profile...',
  '> Loading Experience...',
  '> Connecting to GitHub...',
  '> Building Architecture Graph...',
  '> Ready.',
]

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

// ─── 3. ABOUT ───────────────────────────────────────────────────────
export const aboutCards = [
  {
    icon: '⚙️',
    title: 'APIs & Microservices',
    body: 'High-throughput REST APIs and microservices on .NET 8 sustaining 500+ TPS in production, built on Clean Architecture and SOLID.',
    metric: 'ASP.NET Core · REST · Clean Architecture',
  },
  {
    icon: '☁️',
    title: 'Cloud — Azure & AWS',
    body: 'App Services, Functions, Key Vault, Service Bus on Azure; EC2, ECS, S3, Lambda, CodePipeline on AWS. Certified Cloud Practitioner.',
    metric: 'Azure · AWS · Serverless',
  },
  {
    icon: '🔄',
    title: 'Legacy Modernization',
    body: 'Migrated .NET Framework 4.5 applications to .NET 8 — refactoring to dependency injection, interfaces and event-driven architecture.',
    metric: '.NET 4.5 → .NET 8 · Event-Driven',
  },
  {
    icon: '🔌',
    title: 'Device Integration',
    body: 'Real-time EGM device communication for gaming platforms — protocol workflows, message handling and root-cause analysis in production.',
    metric: 'Serial Comm · Real-time Messaging',
  },
  {
    icon: '🔐',
    title: 'Security & Auth',
    body: 'JWT-based authentication behind API Gateways, ECDSA key generation for licensing, and encrypted synthetic data tooling.',
    metric: 'JWT · OAuth2 · ECDSA',
  },
  {
    icon: '🚀',
    title: 'CI/CD & Quality',
    body: 'Pipelines with AWS CodePipeline, Jenkins, Docker and GitHub Actions — 70% faster deployments with 95%+ unit test coverage.',
    metric: 'Jenkins · Docker · NUnit · 95%+',
  },
]

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'AWS', year: 2025 },
  { name: 'API Security Architect', issuer: 'API Academy', year: 2025 },
  { name: 'API Designer', issuer: 'API Academy', year: 2024 },
  { name: 'Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', year: 2022 },
  { name: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', year: 2022 },
]

// ─── 4. SKILLS ──────────────────────────────────────────────────────
// x / y are 0–1 positions on the constellation canvas; size = node weight.
export const skills = [
  { id: 'csharp', label: 'C#', x: 0.50, y: 0.42, size: 30, projects: ['Everything — 4+ years deep'] },
  { id: 'dotnet', label: '.NET 8', x: 0.38, y: 0.28, size: 28, projects: ['Legacy Modernization', 'COPS360'] },
  { id: 'aspnet', label: 'ASP.NET Core', x: 0.62, y: 0.24, size: 24, projects: ['COPS360', 'Dealership Simulator'] },
  { id: 'blazor', label: 'Blazor', x: 0.24, y: 0.42, size: 20, projects: ['Dealership Simulator'] },
  { id: 'efcore', label: 'EF Core', x: 0.30, y: 0.62, size: 18, projects: ['COPS360', 'Canada BAU'] },
  { id: 'azure', label: 'Azure', x: 0.76, y: 0.38, size: 24, projects: ['COPS360', 'Cloud workloads'] },
  { id: 'aws', label: 'AWS', x: 0.88, y: 0.50, size: 22, projects: ['COPS360', 'CI/CD pipelines'] },
  { id: 'sql', label: 'SQL Server', x: 0.66, y: 0.58, size: 20, projects: ['Canada BAU', 'Dealership Simulator'] },
  { id: 'postgres', label: 'PostgreSQL', x: 0.54, y: 0.72, size: 18, projects: ['Data tooling'] },
  { id: 'rest', label: 'REST APIs', x: 0.74, y: 0.16, size: 18, projects: ['COPS360 — 500+ TPS'] },
  { id: 'micro', label: 'Microservices', x: 0.86, y: 0.26, size: 20, projects: ['COPS360', 'Banking platforms'] },
  { id: 'security', label: 'JWT / Security', x: 0.14, y: 0.26, size: 18, projects: ['COPS360', 'License Management'] },
  { id: 'devices', label: 'Device Comm', x: 0.10, y: 0.50, size: 18, projects: ['EGM Connectivity (Arrow)'] },
  { id: 'docker', label: 'Docker', x: 0.62, y: 0.88, size: 16, projects: ['CI/CD pipelines'] },
  { id: 'cicd', label: 'CI/CD', x: 0.42, y: 0.86, size: 18, projects: ['70% faster deployments'] },
  { id: 'testing', label: 'xUnit / NUnit', x: 0.20, y: 0.78, size: 16, projects: ['95%+ coverage'] },
]

export const skillLinks = [
  ['csharp', 'dotnet'], ['csharp', 'aspnet'], ['csharp', 'blazor'], ['csharp', 'efcore'],
  ['dotnet', 'aspnet'], ['dotnet', 'blazor'], ['dotnet', 'security'], ['dotnet', 'devices'],
  ['aspnet', 'rest'], ['aspnet', 'micro'], ['aspnet', 'azure'], ['aspnet', 'sql'],
  ['azure', 'aws'], ['azure', 'micro'], ['aws', 'cicd'], ['azure', 'docker'],
  ['efcore', 'sql'], ['efcore', 'postgres'], ['sql', 'postgres'], ['csharp', 'sql'],
  ['blazor', 'devices'], ['security', 'devices'], ['security', 'rest'], ['micro', 'rest'],
  ['docker', 'cicd'], ['cicd', 'testing'], ['csharp', 'testing'], ['docker', 'postgres'],
]

// ─── 5. PROJECTS ────────────────────────────────────────────────────
export const projects = [
  {
    id: 'cops360',
    title: 'COPS360 — Customer Operations & Product Service',
    summary: 'Secure, high-throughput REST API platform for customer operations with third-party KYC and SAP automation.',
    tags: ['ASP.NET Core', 'JWT', 'API Gateway', 'AWS'],
    accent: '#3b82f6',
    icon: '🏦',
    details: [
      'Secure REST APIs behind an API Gateway with JWT authentication.',
      'Integrated third-party KYC services with automated SAP role and address updates after validation.',
      'Sustained 500+ TPS in production with 95%+ unit test coverage.',
    ],
    arch: 'cops',
  },
  {
    id: 'simulator',
    title: 'SIMULATOR — Dealership Impact Analysis',
    summary: 'Forecasting application analyzing dealership performance in real time, with full multi-language support.',
    tags: ['.NET 7', 'Blazor Server', 'Forecasting', 'Localization'],
    accent: '#06b6d4',
    icon: '📊',
    details: [
      'Built with .NET 7 and Blazor Server for interactive, real-time analysis.',
      'Forecasting engine over dealership performance data with optimized backend services.',
      'Implemented multi-language support for international rollout.',
    ],
    arch: 'simulator',
  },
  {
    id: 'license',
    title: 'License & Data Management Solutions',
    summary: 'Cryptographic licensing standardization and encrypted synthetic-data generation from production datasets.',
    tags: ['C#', 'ECDSA', 'Cryptography', 'Data Security'],
    accent: '#8b5cf6',
    icon: '🔐',
    details: [
      'Tool that generates encrypted synthetic datasets from real data for safe testing.',
      'Led POC efforts to standardize licensing using ECDSA-based key generation.',
      'Security-first design across key storage, rotation and validation.',
    ],
    arch: null,
  },
  {
    id: 'egm',
    title: 'EGM Connectivity & Legacy Modernization',
    summary: 'Modernizing gaming-platform services from .NET Framework 4.5 to .NET 8 with real-time device communication.',
    tags: ['.NET 8', 'Event-Driven', 'Device Communication', 'SOLID'],
    accent: '#3b82f6',
    icon: '🎰',
    details: [
      'Migrated legacy .NET Framework 4.5 applications to .NET 8 — better performance, maintainability, scalability.',
      'Refactored modules with SOLID principles, dependency injection and event-driven architecture.',
      'Resolved production issues in real-time device communication via root-cause analysis; documented end-to-end EGM connectivity workflows.',
    ],
    arch: 'egm',
  },
]

// ─── 6. EXPERIENCE ──────────────────────────────────────────────────
export const experience = [
  {
    period: 'Sep 2025 — Present',
    role: 'Software Engineer',
    org: 'Arrow International, Inc. · Pune',
    points: [
      'Modernized legacy .NET Framework 4.5 applications to .NET 8, improving performance, maintainability and scalability.',
      'Refactored modules using SOLID principles, dependency injection and event-driven architecture.',
      'Resolved production issues in real-time device communication and message handling through root-cause analysis.',
      'Documented end-to-end EGM connectivity, communication workflows and error handling.',
    ],
  },
  {
    period: 'Jul 2022 — Aug 2025',
    role: 'Software Engineer',
    org: 'DATA ECONOMY · Pune',
    points: [
      'Built high-throughput REST APIs and microservices on .NET Core 8, Azure and AWS — 500+ TPS in production.',
      'Cut deployment time 70% with CI/CD pipelines on AWS CodePipeline, Jenkins and Docker.',
      'Implemented secure authentication with JWT tokens and API Gateway.',
      'Achieved 95%+ unit test coverage with NUnit and NSubstitute.',
    ],
  },
  {
    period: 'Dec 2021 — Jun 2022',
    role: 'Software Engineering Intern',
    org: 'DATA ECONOMY · Pune',
    points: [
      'Hands-on with .NET, Java, SQL and ASP.NET Web Forms.',
      'Wrote and optimized SQL queries and stored procedures; earned client appreciation for timely delivery.',
    ],
  },
  {
    period: 'Aug 2019 — Sep 2022',
    role: 'MCA — Master of Computer Applications',
    org: 'Savitribai Phule Pune University · CGPA 9.4/10',
    points: [
      'Specialized in software engineering, databases and distributed systems.',
    ],
  },
]

// ─── 7. ARCHITECTURE ────────────────────────────────────────────────
// kinds: client | service | db | ai | external  (colors set in component)
export const architectures = {
  cops: {
    title: 'COPS360 Platform',
    nodes: [
      { id: 'client', label: 'Client Apps', x: 60, y: 60, kind: 'client' },
      { id: 'gw', label: 'API Gateway + JWT', x: 250, y: 60, kind: 'service' },
      { id: 'api', label: 'COPS360 APIs', x: 440, y: 60, kind: 'service' },
      { id: 'kyc', label: 'KYC Provider', x: 440, y: 180, kind: 'external' },
      { id: 'sap', label: 'SAP Automation', x: 630, y: 180, kind: 'external' },
      { id: 'db', label: 'SQL Server', x: 630, y: 60, kind: 'db' },
    ],
    flows: [
      ['client', 'gw'], ['gw', 'api'], ['api', 'kyc'], ['kyc', 'sap'],
      ['api', 'db'], ['api', 'sap'],
    ],
  },
  egm: {
    title: 'EGM Device Connectivity',
    nodes: [
      { id: 'egm', label: 'EGM Devices', x: 60, y: 120, kind: 'external' },
      { id: 'comm', label: 'Comm Layer', x: 250, y: 60, kind: 'service' },
      { id: 'msg', label: 'Message Handler', x: 250, y: 180, kind: 'service' },
      { id: 'svc', label: '.NET 8 Services', x: 440, y: 120, kind: 'service' },
      { id: 'bus', label: 'Event Bus', x: 630, y: 60, kind: 'service' },
      { id: 'db', label: 'Game Data Store', x: 630, y: 180, kind: 'db' },
    ],
    flows: [
      ['egm', 'comm'], ['comm', 'msg'], ['msg', 'svc'], ['svc', 'bus'],
      ['svc', 'db'], ['comm', 'svc'],
    ],
  },
  simulator: {
    title: 'Dealership Impact Simulator',
    nodes: [
      { id: 'ui', label: 'Blazor Server UI', x: 60, y: 120, kind: 'client' },
      { id: 'i18n', label: 'Localization', x: 250, y: 60, kind: 'service' },
      { id: 'engine', label: 'Forecast Engine', x: 250, y: 180, kind: 'ai' },
      { id: 'api', label: 'Backend Services', x: 440, y: 120, kind: 'service' },
      { id: 'db', label: 'SQL Database', x: 630, y: 120, kind: 'db' },
    ],
    flows: [
      ['ui', 'i18n'], ['ui', 'engine'], ['engine', 'api'], ['api', 'db'], ['db', 'api'],
    ],
  },
}

// ─── CONTACT TERMINAL ───────────────────────────────────────────────
export const terminalCommands = [
  { cmd: 'connect --linkedin', out: 'Opening profile...', href: () => `https://linkedin.com/in/${profile.linkedin}` },
  { cmd: 'open --github', out: 'Loading repositories...', href: () => `https://github.com/${profile.github}` },
  { cmd: 'send --message', out: 'Ready for collaboration.', href: () => `mailto:${profile.email}` },
  { cmd: 'play --snake', out: 'Launching arcade…', action: 'snake' },
]
