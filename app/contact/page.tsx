import type { Metadata } from 'next';
import { ContactPanel } from '@/components/contact-panel';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Engagement details for automation systems, infrastructure, and reliability-focused work.',
};

export default function ContactPage() {
  return (
    <Section
      label="Contact"
      title="Structure the inquiry before the work starts"
      description="The contact layer is designed to qualify the problem space: project type, current system state, bottlenecks, timeline, and budget range."
    >
      <ContactPanel />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Project type', 'automation / infra / full-stack / other'],
          ['Current state', 'brief summary of the current environment or workflow'],
          ['Pain points', 'failure modes, bottlenecks, manual steps, drift'],
          ['Timeline & budget', 'delivery window and acceptable spend range'],
        ].map(([title, body]) => (
          <div key={title} className="panel p-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{title}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
