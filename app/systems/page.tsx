import { Metadata } from 'next';
import { Section } from '@/components/section';
import { SystemCard } from '@/components/system-card';
import { systems } from '@/content/systems';

export const metadata: Metadata = {
  title: 'Selected Systems',
  description: 'Systems portfolio covering automation, orchestration, reliability, and platform architecture.',
};

export default function SystemsPage() {
  return (
    <Section
      label="Selected Systems"
      title="A project index built around systems, constraints, and outcomes"
      description="Each entry is structured as a case-study surface with enough technical context to demonstrate production thinking without turning the portfolio into documentation overload."
    >
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {systems.map((entry) => (
          <SystemCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Section>
  );
}
