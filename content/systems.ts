export type SystemStatus =
  | 'production'
  | 'active'
  | 'iterating'
  | 'development';

export type SystemCategory =
  | 'ci_cd'
  | 'deployment'
  | 'networking'
  | 'fullstack'
  | 'communications';

export type SystemScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type SystemEntry = {
  slug: string;
  title: string;
  category: SystemCategory;
  categoryLabel: string;

  summary: string;
  cardOutcome: string;

  stack: string[];
  status: SystemStatus;
  year: number;

  problem: string;
  constraints: string[];

  architecture: string[];
  execution: string[];

  reliabilityControls: string[];
  outcomes: string[];

  artifacts: string[];

  diagramPath: string;
  screenshots: SystemScreenshot[];
};

export const systems: SystemEntry[] = [
  {
    slug: 'repository-lifecycle-orchestrator',
    title: 'Repository Lifecycle Orchestrator',
    category: 'ci_cd',
    categoryLabel: 'CI/CD Automation + Repository Governance',
    summary:
      'Deterministic automation layer for repository bootstrap, maintenance, and policy enforcement across multiple codebases.',
    cardOutcome:
      'Removed repetitive repository maintenance and enforced a consistent operational baseline.',
    stack: ['GitHub Actions', 'Bash', 'Makefile', 'Node.js'],
    status: 'production',
    year: 2026,

    problem:
      'Repository setup and governance were inconsistent across projects, increasing operator time and introducing configuration drift.',
    constraints: [
      'Compatibility across heterogeneous repository structures',
      'No hardcoded secrets in workflows',
      'Safe re-execution for bootstrap and policy sync',
    ],

    architecture: [
      'Reusable GitHub Actions workflows bound to lifecycle events',
      'Repository-local config for controlled divergence',
      'Deterministic policy enforcement stages',
    ],
    execution: [
      'Implemented idempotent bootstrap scripts for labels, rules, and CI baselines',
      'Encoded governance checks into reusable workflow modules',
      'Added structured summaries for pipeline visibility',
    ],

    reliabilityControls: [
      'Dry-run mode for policy diffing',
      'Strict bash execution (set -euo pipefail)',
      'Step-level failure visibility',
      'Versioned workflows for rollback',
    ],
    outcomes: [
      'Reduced onboarding variance across repositories',
      'Lowered recurring governance overhead',
      'Improved traceability of repository changes',
    ],

    artifacts: [
      'Workflow run logs',
      'Policy diff previews',
      'Bootstrap execution summaries',
    ],

    diagramPath:
      '/system-assets/repository-lifecycle-orchestrator/architecture.svg',
    screenshots: [
      {
        src: '/system-assets/repository-lifecycle-orchestrator/architecture.svg',
        alt: 'Repository lifecycle orchestration architecture',
        caption:
          'Lifecycle automation pipeline showing bootstrap, enforcement, and validation stages',
      },
    ],
  },

  {
    slug: 'deterministic-publishing-pipeline',
    title: 'Deterministic Publishing Pipeline',
    category: 'deployment',
    categoryLabel: 'API Orchestration + Deployment Automation',
    summary:
      'Event-driven publishing pipeline that compresses multi-step workflows into a single validated trigger.',
    cardOutcome:
      'Reduced a multi-step publishing process to a single auditable execution path.',
    stack: ['Next.js', 'GitHub Actions', 'Vercel', 'Scriptable'],
    status: 'production',
    year: 2026,

    problem:
      'Publishing required manual coordination across content, deployment, and validation layers, leading to inconsistency and errors.',
    constraints: [
      'Minimal reliance on paid infrastructure',
      'Externally inspectable state',
      'Compatibility with mobile-triggered workflows',
    ],

    architecture: [
      'Event-triggered pipeline entry',
      'Pre-deploy validation gate',
      'Vercel deployment execution',
      'Post-deploy verification output',
    ],
    execution: [
      'Collapsed manual steps into a single orchestrated pipeline',
      'Standardized state via JSON configuration',
      'Integrated notifications and deployment reporting',
    ],

    reliabilityControls: [
      'Retry with bounded backoff',
      'Pre-deploy validation checks',
      'Immutable build artifacts per commit',
      'Rollback via deployment history',
    ],
    outcomes: [
      'Reduced operator touchpoints',
      'Shortened release time and reduced operator touchpoints',
      'Improved deployment observability',
    ],

    artifacts: [
      'Deployment dashboards',
      'Validation outputs',
      'Process comparison snapshots',
    ],

    diagramPath:
      '/system-assets/deterministic-publishing-pipeline/architecture.svg',
    screenshots: [
      {
        src: '/system-assets/deterministic-publishing-pipeline/architecture.svg',
        alt: 'Deterministic publishing pipeline architecture',
        caption:
          'Trigger → validation → deployment → verification flow',
      },
    ],
  },

  {
    slug: 'adaptive-proxy-routing-layer',
    title: 'Adaptive Proxy Routing Layer',
    category: 'networking',
    categoryLabel: 'Network Routing + Privacy Infrastructure',
    summary:
      'Policy-driven routing layer for traffic segmentation, geo-routing, and controlled egress behavior.',
    cardOutcome:
      'Established explicit control over routing logic and traffic classification.',
    stack: ['Shadowrocket', 'Loon', 'SOCKS5', 'Custom Rule Engine'],
    status: 'iterating',
    year: 2026,

    problem:
      'Default client routing lacked sufficient control over segmentation, routing policy, and privacy posture.',
    constraints: [
      'Platform-specific client limitations',
      'Readable and reversible rule definitions',
      'Minimized configuration drift across devices',
    ],

    architecture: [
      'Policy-based rule groups',
      'Proxy pool abstraction',
      'Fallback routing paths',
    ],
    execution: [
      'Defined traffic classes mapped to explicit routing policies',
      'Built reusable rule blocks with validation passes',
      'Structured configs for diffing and rollback',
    ],

    reliabilityControls: [
      'Fallback routing logic',
      'Node selection with health awareness',
      'Versioned config rollback',
      'Post-change verification via test domains',
    ],
    outcomes: [
      'Improved routing control and segmentation',
      'Reduced manual tuning overhead',
      'Increased auditability of routing changes',
    ],

    artifacts: [
      'Rule-set diffs',
      'Node health panels',
      'Routing verification logs',
    ],

    diagramPath:
      '/system-assets/adaptive-proxy-routing-layer/architecture.svg',
    screenshots: [
      {
        src: '/system-assets/adaptive-proxy-routing-layer/architecture.svg',
        alt: 'Adaptive proxy routing architecture',
        caption:
          'Policy groups, proxy pools, and fallback routing structure',
      },
    ],
  },

  {
    slug: 'cryptovault-platform-architecture',
    title: 'CryptoVault Platform Architecture',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Application System',
    summary:
      'Composable application architecture separating UI, data, and orchestration layers for scalable feature delivery.',
    cardOutcome:
      'Established a modular baseline for frontend and backend evolution.',
    stack: ['Next.js App Router', 'API Layer', 'Animation Systems'],
    status: 'development',
    year: 2026,

    problem:
      'Tightly coupled UI and backend logic limited scalability and maintainability.',
    constraints: [
      'Maintain strong visual identity without coupling',
      'Clear separation between UI and service layers',
      'Future deployment flexibility',
    ],

    architecture: [
      'Route-segmented structure',
      'Shared interface layer',
      'Isolated high-motion components',
    ],
    execution: [
      'Defined route groups and shared primitives',
      'Decoupled animation from data flow',
      'Prepared progressive feature rollout paths',
    ],

    reliabilityControls: [
      'Typed internal interfaces',
      'Static rendering where applicable',
      'Defensive loading states',
      'Preview deployment validation',
    ],
    outcomes: [
      'Reduced future refactor risk',
      'Improved composability',
      'Strengthened production baseline',
    ],

    artifacts: [
      'Route maps',
      'Component hierarchy diagrams',
      'Architecture specifications',
    ],

    diagramPath:
      '/system-assets/cryptovault-platform-architecture/architecture.svg',
    screenshots: [
      {
        src: '/system-assets/cryptovault-platform-architecture/architecture.svg',
        alt: 'CryptoVault architecture diagram',
        caption:
          'Route segmentation and interface boundary definition',
      },
    ],
  },

  {
    slug: 'automated-campaign-delivery-engine',
    title: 'Automated Campaign Delivery Engine',
    category: 'communications',
    categoryLabel: 'Automation + Communication Systems',
    summary:
      'Repeatable outbound campaign system with deterministic message assembly and delivery control.',
    cardOutcome:
      'Converted manual campaign workflows into a structured delivery pipeline.',
    stack: ['Node.js', 'Mailgun API', 'CID Assets'],
    status: 'production',
    year: 2026,

    problem:
      'Campaign assembly and delivery required repetitive manual steps, reducing consistency and scalability.',
    constraints: [
      'No secret exposure in templates',
      'Deterministic asset embedding',
      'Support for test and dry-run execution',
    ],

    architecture: [
      'Template rendering stage',
      'Asset embedding pipeline',
      'API-based delivery with response capture',
    ],
    execution: [
      'Built deterministic message assembly pipeline',
      'Integrated Mailgun API with validated requests',
      'Added test mode and structured reporting',
    ],

    reliabilityControls: [
      'Dry-run execution path',
      'Structured API logging',
      'Input validation before send',
      'Template version rollback',
    ],
    outcomes: [
      'Reduced campaign variance',
      'Lowered operator overhead',
      'Improved repeatability of delivery',
    ],

    artifacts: [
      'Rendered previews',
      'Send logs',
      'Template diffs',
    ],

    diagramPath:
      '/system-assets/automated-campaign-delivery-engine/architecture.svg',
    screenshots: [
      {
        src: '/system-assets/automated-campaign-delivery-engine/architecture.svg',
        alt: 'Campaign delivery engine architecture',
        caption:
          'Template → asset embedding → delivery → reporting pipeline',
      },
    ],
  },
];

export function getSystemBySlug(slug: string): SystemEntry | undefined {
  return systems.find((entry) => entry.slug === slug);
}

export function getSystemsByStatus(status: SystemStatus): SystemEntry[] {
  return systems.filter((entry) => entry.status === status);
}
