export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Systems', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const contact = {
  email: 'your-email@domain.com',
  github: 'https://github.com/your-handle',
  x: 'https://x.com/your-handle',
  linkedin: 'https://linkedin.com/in/your-handle',
};

export type Contact = typeof contact;

export const hero = {
  name: 'Lysergic (ð¢§êð¤¢ê½ê³êð¢§êê)',
  title: 'Systems & Automation Architect',
  description:
    'I build deterministic, observable, and production-grade systems that replace fragile manual workflows with auditable automation.',
  primaryCta: { label: 'View Selected Systems', href: '/systems' },
  secondaryCta: { label: 'Initiate Engagement', href: '/contact' },
};

export const capabilities = [
  'Infrastructure Engineering',
  'Automation Systems',
  'API Orchestration',
  'Observability',
  'Reliability Engineering',
  'Deployment Pipelines',
];

export const principles = [
  'Deterministic execution over probabilistic behavior',
  'Idempotent operations as default',
  'No hidden state',
  'Explicit failure handling',
  'Full observability through logs, metrics, and probes',
  'Reproducible environments',
];

export const metrics = [
  { label: 'Selected systems', value: '5' },
  { label: 'Production / active systems', value: '4' },
  { label: 'In-development systems', value: '1' },
  { label: 'Documented artifact types', value: '15' },
];
