export const CATEGORIES = {
  CI_CD_AUTOMATION: 'CI/CD Automation + Repo Governance',
  API_ORCHESTRATION: 'API Orchestration + Deployment Automation',
  NETWORK_ROUTING: 'Network Routing + Privacy Infrastructure',
  FULL_STACK: 'Full-Stack Application System',
  AUTOMATION: 'Automation + Communication Systems',
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const STATUS = {
  PRODUCTION: 'production',
  ACTIVE: 'active',
  ITERATING: 'iterating',
  DEVELOPMENT: 'development',
} as const;

export type SystemStatus = typeof STATUS[keyof typeof STATUS];

export type ScreenshotEntry = {
  src: string;
  alt: string;
  caption?: string;
};

export type ArtifactCategory = 'Workflow run logs' | 'Policy diff previews' | 'Bootstrap execution summary' | 'Deployment dashboard snapshots' | 'Validation output' | 'Before vs after process comparison' | 'Rule-set diff' | 'Node health panel' | 'Routing verification checklist' | 'Route map' | 'Component hierarchy' | 'Architecture diagram' | 'Rendered email preview' | 'Send log' | 'Template diff';

export type SystemEntry = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  outcome: string;
  stack: string[];
  status: SystemStatus;
  year: string;
  problem: string;
  constraints: string[];
  architecture: string[];
  execution: string[];
  reliabilityControls: string[];
  outcomes: string[];
  artifacts: ArtifactCategory[];
  diagramPath: string;
  screenshots: ScreenshotEntry[];
};

export const systems: SystemEntry[] = [
  {
    slug: 'repository-lifecycle-orchestrator',
    title: 'Repository Lifecycle Orchestrator',
    category: 'CI/CD Automation + Repo Governance',
    summary:
      'Standardized repository bootstrap, maintenance, and policy enforcement across multiple projects through deterministic automation.',
    outcome:
      'Eliminated repetitive repo maintenance tasks and enforced a consistent operational baseline.',
    stack: ['GitHub Actions', 'Bash', 'Makefile', 'Node.js'],
    status: STATUS.PRODUCTION,
    year: '2026',
    problem:
      'Repository setup, maintenance, and policy checks were fragmented across projects, producing inconsistent defaults and unnecessary operator time.',
    constraints: [
      'Had to remain compatible with multiple repository layouts.',
      'No secrets hardcoded into workflows.',
      'Safe re-runs required for repository bootstrap and policy sync.',
    ],
    architecture: [
      'Reusable GitHub Actions workflows for lifecycle events.',
      'Repository-local configuration files for per-project divergence.',
      'Policy checks executed as deterministic pipeline stages.',
    ],
    execution: [
      'Built idempotent setup scripts for labels, branch rules, templates, and CI baselines.',
      'Encoded shared governance checks into reusable actions.',
      'Added structured output summaries for operator visibility.',
    ],
    reliabilityControls: [
      'Dry-run mode for policy diffs.',
      'Strict bash execution flags.',
      'Action-level failure visibility.',
      'Rollback through versioned workflow definitions.',
    ],
    outcomes: [
      'Reduced onboarding variance across repositories.',
      'Lowered maintenance burden for repeat governance tasks.',
      'Improved traceability of repository-level operational changes.',
    ],
    artifacts: ['Workflow run logs', 'Policy diff previews', 'Bootstrap execution summary'],
    diagramPath: '/system-assets/repository-lifecycle-orchestrator/architecture.svg',
    screenshots: [
      { src: '/system-assets/repository-lifecycle-orchestrator/architecture.svg', alt: 'Repository Lifecycle Orchestrator architecture diagram', caption: 'Lifecycle automation flow derived from authored pipeline stages and controls.' }
    ],
  },
  {
    slug: 'deterministic-publishing-pipeline',
    title: 'Deterministic Publishing Pipeline',
    category: 'API Orchestration + Deployment Automation',
    summary:
      'Compressed a multi-step content publishing flow into a single controlled trigger with validation and deploy feedback.',
    outcome: 'Reduced a 12-step publishing path to a single auditable trigger.',
    stack: ['Next.js', 'GitHub Actions', 'Vercel', 'Scriptable'],
    status: STATUS.PRODUCTION,
    year: '2026',
    problem:
      'Publishing required repetitive manual coordination across content, deployment, and validation steps, creating drift and operator error.',
    constraints: [
      'Zero paid infrastructure dependency where possible.',
      'Publishing state had to remain externalized and inspectable.',
      'The system had to work from mobile-adjacent control surfaces as well as Git-based workflows.',
    ],
    architecture: [
      'Event-driven publish trigger.',
      'Validation stage before deploy.',
      'Deploy execution routed through Vercel.',
      'Post-deploy verification recorded as structured output.',
    ],
    execution: [
      'Wrapped manual publish steps into a single orchestrated pipeline.',
      'Normalized content state handling via JSON-based configuration.',
      'Integrated notifications and deployment reporting.',
    ],
    reliabilityControls: [
      'Retry with bounded backoff for transient failures.',
      'Pre-deploy validation gates.',
      'Immutable build output from source commit.',
      'Rollback via Vercel deployment history.',
    ],
    outcomes: [
      'Reduced operator touchpoints across publishing events.',
      'Shortened release time from minutes to seconds in the common path.',
      'Improved deploy visibility and post-publish verification.',
    ],
    artifacts: ['Deployment dashboard snapshots', 'Validation output', 'Before vs after process comparison'],
    diagramPath: '/system-assets/deterministic-publishing-pipeline/architecture.svg',
    screenshots: [
      { src: '/system-assets/deterministic-publishing-pipeline/architecture.svg', alt: 'Deterministic Publishing Pipeline architecture diagram', caption: 'Publish trigger, validation, deployment, and verification path.' }
    ],
  },
  {
    slug: 'adaptive-proxy-routing-layer',
    title: 'Adaptive Proxy Routing Layer',
    category: 'Network Routing + Privacy Infrastructure',
    summary:
      'Built controlled routing behavior for traffic segmentation, geo-routing, and improved fingerprint resistance.',
    outcome: 'Established policy-driven traffic routing with explicit control over egress behavior.',
    stack: ['Shadowrocket', 'Loon', 'SOCKS5', 'Custom Rule Engine'],
    status: STATUS.ITERATING,
    year: '2026',
    problem:
      'Traffic handling required more control over routing decisions, destination segmentation, and privacy posture than default client behavior provided.',
    constraints: [
      'Platform-specific client limitations.',
      'Rules had to remain interpretable and reversible.',
      'Config drift needed to be minimized across devices.',
    ],
    architecture: [
      'Policy rule groups for destination classes.',
      'Proxy pools for route selection.',
      'Fallback paths for degraded nodes or service failure.',
    ],
    execution: [
      'Modeled traffic classes and matched them to explicit policy routes.',
      'Built reusable rule blocks and validation passes.',
      'Structured configuration for easier diffing and rollback.',
    ],
    reliabilityControls: [
      'Fallback routing policies.',
      'Health-aware route selection.',
      'Versioned config rollback.',
      'Test domains for verification after each config change.',
    ],
    outcomes: [
      'Improved control over route behavior and segmentation.',
      'Lowered manual tuning overhead across clients.',
      'Made routing changes more auditable and reversible.',
    ],
    artifacts: ['Rule-set diff', 'Node health panel', 'Routing verification checklist'],
    diagramPath: '/system-assets/adaptive-proxy-routing-layer/architecture.svg',
    screenshots: [
      { src: '/system-assets/adaptive-proxy-routing-layer/architecture.svg', alt: 'Adaptive Proxy Routing Layer architecture diagram', caption: 'Policy groups, proxy pools, fallback routes, and verification path.' }
    ],
  },
  {
    slug: 'cryptovault-platform-architecture',
    title: 'CryptoVault Platform Architecture',
    category: 'Full-Stack Application System',
    summary:
      'Designed a modular application architecture for a crypto-oriented platform with strong UI, API, and orchestration boundaries.',
    outcome: 'Established a composable baseline for frontend presentation, service integration, and future feature growth.',
    stack: ['Next.js App Router', 'API Layer', 'Animation Systems'],
    status: STATUS.DEVELOPMENT,
    year: '2026',
    problem:
      'The platform needed an architecture that could scale feature delivery without collapsing into tightly coupled frontend and backend logic.',
    constraints: [
      'Strong visual identity without sacrificing maintainability.',
      'Boundaries between UI composition and service integration had to remain explicit.',
      'Future deployment paths needed minimal rework.',
    ],
    architecture: [
      'Route-segmented application structure.',
      'Shared interface layer for service communication.',
      'Component isolation for high-motion sections.',
    ],
    execution: [
      'Defined route groups and shared primitives.',
      'Separated visual motion concerns from data concerns.',
      'Prepared the system for progressive feature rollout.',
    ],
    reliabilityControls: [
      'Typed interfaces for internal boundaries.',
      'Static rendering where possible.',
      'Defensive loading and fallback states.',
      'Deploy preview verification.',
    ],
    outcomes: [
      'Reduced future refactor risk.',
      'Improved composability across feature surfaces.',
      'Created a stronger production baseline for subsequent delivery.',
    ],
    artifacts: ['Route map', 'Component hierarchy', 'Architecture diagram'],
    diagramPath: '/system-assets/cryptovault-platform-architecture/architecture.svg',
    screenshots: [
      { src: '/system-assets/cryptovault-platform-architecture/architecture.svg', alt: 'CryptoVault Platform Architecture diagram', caption: 'Route segmentation, interface layer, and component isolation map.' }
    ],
  },
  {
    slug: 'automated-campaign-delivery-engine',
    title: 'Automated Campaign Delivery Engine',
    category: 'Automation + Communication Systems',
    summary:
      'Automated outbound campaign execution with embedded assets, delivery controls, and repeatable send workflows.',
    outcome: 'Turned repetitive campaign assembly into a controlled delivery system.',
    stack: ['Node.js', 'Mailgun API', 'CID Assets'],
    status: STATUS.PRODUCTION,
    year: '2026',
    problem:
      'Campaign preparation involved repeated asset embedding, send logic, and delivery verification work that was too manual for consistent scale.',
    constraints: [
      'No secret exposure in templates or code.',
      'Asset handling needed deterministic packaging.',
      'Testing and dry-runs had to be preserved.',
    ],
    architecture: [
      'Template rendering stage.',
      'Embedded asset packaging.',
      'API delivery stage with structured response capture.',
    ],
    execution: [
      'Built a repeatable message assembly pipeline.',
      'Integrated Mailgun delivery through validated API requests.',
      'Added campaign test mode and send reporting.',
    ],
    reliabilityControls: [
      'Dry-run execution path.',
      'Structured API response logging.',
      'Input validation before send.',
      'Rollback through template versioning.',
    ],
    outcomes: [
      'Reduced assembly variance between campaigns.',
      'Lowered send-time operator overhead.',
      'Improved repeatability of outbound delivery workflows.',
    ],
    artifacts: ['Rendered email preview', 'Send log', 'Template diff'],
    diagramPath: '/system-assets/automated-campaign-delivery-engine/architecture.svg',
    screenshots: [
      { src: '/system-assets/automated-campaign-delivery-engine/architecture.svg', alt: 'Automated Campaign Delivery Engine architecture diagram', caption: 'Template render, asset packaging, delivery, and send reporting path.' }
    ],
  },
];

export function getSystemBySlug(slug: string) {
  return systems.find((entry) => entry.slug === slug);
}
