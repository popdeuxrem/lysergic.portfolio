export type NavigationItem = {
  label: string;
  href: string;
};

export const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Selected Systems', href: '/systems' },
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
  name: 'Lysergic (𖢧ꛅ𖤢ꚽꚳꛈ𖢧ꛕꛅ)',
  title: 'Systems & Automation Architect',
  description:
    'I design deterministic, observable, and production-grade systems that replace fragile manual workflows with reproducible, auditable execution.',
  primaryCta: { label: 'View Selected Systems', href: '/systems' },
  secondaryCta: { label: 'Initiate Engagement', href: '/contact' },
  contactCta: { label: 'Initiate Engagement', href: '/contact' },
};

export const capabilities = [
  'Infrastructure Engineering',
  'Automation Systems',
  'API Orchestration',
  'Observability & Telemetry',
  'Reliability Engineering',
  'Deployment Pipelines',
];

export const principles = [
  'Deterministic execution over probabilistic behavior',
  'Idempotent operations as a baseline constraint',
  'Zero hidden state; all state is explicit and inspectable',
  'Failure is modeled, not ignored',
  'Full observability: logs, metrics, traces, and health probes',
  'Reproducible environments with pinned dependencies',
];

export const metrics = [
  { label: 'Selected systems', value: '5' },
  { label: 'Production / active systems', value: '4' },
  { label: 'In-development systems', value: '1' },
  { label: 'Core capability areas', value: '6' },
];

export const portfolioStatus = {
  label: 'Portfolio Status',
  value: 'Operational',
} as const;
