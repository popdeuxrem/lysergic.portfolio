export type NavigationItem = {
  label: string;
  href: string;
};

export const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Systems', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export type ContactConfig = {
  email: string;
  github: string;
  x: string;
  linkedin: string;
};

export const contact: ContactConfig = {
  email: 'your-email@domain.com',
  github: 'https://github.com/your-handle',
  x: 'https://x.com/your-handle',
  linkedin: 'https://linkedin.com/in/your-handle',
};

export type Cta = {
  label: string;
  href: string;
};

export type HeroConfig = {
  label: string;
  name: string;
  title: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  contactCta: Cta;
};

export const hero: HeroConfig = {
  label: 'Systems that govern themselves',
  name: 'Lysergic (ð\x96¢§ê\x9b\x85ð\x96¤¢ê\x9a\xb5ê\x9a\xb3ê\x9b\x88ð\x96¢§ê\x9b\x95ê\x9b\x85)',
  title: 'Systems & Automation Architect',
  description:
    'I build deterministic, observable, and production-grade systems that replace fragile manual workflows with auditable automation.',
  primaryCta: { label: 'View Selected Systems', href: '/systems' },
  secondaryCta: { label: 'Initiate Engagement', href: '/contact' },
  contactCta: { label: 'Initiate Engagement', href: '/contact' },
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
