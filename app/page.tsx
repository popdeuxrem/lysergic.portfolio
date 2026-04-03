import { CapabilityStrip } from '@/components/capability-strip';
import { ContactPanel } from '@/components/contact-panel';
import { Hero } from '@/components/hero';
import { MetricStrip } from '@/components/metric-strip';
import { PrinciplesGrid } from '@/components/principles-grid';
import { Section } from '@/components/section';
import { SystemCard } from '@/components/system-card';
import { systems } from '@/content/systems';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />

      <Section
        id="systems"
        label="Selected Systems"
        title="Production artifacts, not portfolio filler"
        description="The portfolio is structured around systems with explicit constraints, execution paths, and reliability controls rather than generic project thumbnails."
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {systems.slice(0, 3).map((entry) => (
            <SystemCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </Section>

      <Section
        label="Operational Philosophy"
        title="If it cannot run twice the same way, it is not production-ready"
        description="Systems should not depend on memory, manual steps, or luck. Each layer is expected to be observable, reversible, and safe to re-run."
      >
        <PrinciplesGrid />
      </Section>

      <Section
        label="System Metrics"
        title="Operational posture at a glance"
        description="These metrics are placeholders backed by the content layer you supplied. Replace them with artifact-backed numbers once you are ready to publish."
      >
        <MetricStrip />
      </Section>

      <Section
        label="Engagement"
        title="Build systems that survive contact with production"
        description="Use this site as a conversion surface, not just a showcase. The contact layer is structured to qualify work rather than invite vague inquiries."
      >
        <ContactPanel />
      </Section>
    </>
  );
}
