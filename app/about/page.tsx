import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { PrinciplesGrid } from '@/components/principles-grid';

export const metadata: Metadata = {
  title: 'About',
  description: 'Operating profile, standards, toolchain, and engagement model.',
};

const toolchain = [
  ['Automation', 'Bash, Node.js, Scriptable, iOS Shortcuts'],
  ['Infrastructure', 'Docker, VPS, GitHub Actions'],
  ['Frontend', 'Next.js App Router, motion systems'],
  ['Networking', 'Proxy systems, routing configs'],
  ['Data', 'JSON pipelines, lightweight state systems'],
];

const engagement = [
  'System audits',
  'Automation design and deployment',
  'CI/CD pipeline engineering',
  'Internal tooling systems',
  'Infrastructure reliability upgrades',
];

export default function AboutPage() {
  return (
    <>
      <Section
        label="Operating Profile"
        title="Design systems that operate independently, scale predictably, and remain observable under stress"
        description="I design systems that operate predictably under real-world constraints. My work centers on automation, infrastructure, and orchestration layers that are observable, reversible, and built for production from the outset."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel p-8">
            <p className="section-label">Mission</p>
            <p className="mt-5 text-sm leading-8 text-muted">
              Design systems that operate independently, scale predictably, and remain observable under all conditions.
            </p>
          </div>
          <div className="panel p-8">
            <p className="section-label">Engagement Model</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
              {engagement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        label="Engineering Standards"
        title="Production-grade by default"
        description="Standards are part of the product surface. They are not post-hoc cleanup tasks after something has already shipped."
      >
        <PrinciplesGrid />
      </Section>

      <Section
        label="Toolchain"
        title="Systems, infrastructure, and automation stack"
        description="This page is intentionally framed as an operating profile rather than a personal biography. The site should explain how you build, not just who you are."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {toolchain.map(([label, value]) => (
            <div key={label} className="panel p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent2">{label}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
