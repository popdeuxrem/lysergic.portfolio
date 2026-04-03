import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSystemBySlug, systems } from '@/content/systems';

export function generateStaticParams() {
  return systems.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getSystemBySlug(slug);

  if (!entry) {
    return { title: 'System not found' };
  }

  return {
    title: entry.title,
    description: entry.summary,
  };
}

const statusLabels: Record<string, string> = {
  production: 'Production',
  active: 'Active',
  iterating: 'Iterating',
  development: 'Development',
};

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getSystemBySlug(slug);

  if (!entry) {
    notFound();
  }

  const galleryAssets = [
    { src: entry.diagramPath, alt: `${entry.title} diagram`, caption: 'Architecture diagram' },
    ...entry.screenshots,
  ];

  return (
    <article className="container-shell py-16 md:py-24">
      <div className="panel overflow-hidden">
        <div className="border-b border-white/5 p-8 md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <p className="section-label">{entry.categoryLabel}</p>
            <span className="text-white/20">•</span>
            <span className="text-xs uppercase tracking-[0.2em] text-accent">{statusLabels[entry.status] ?? entry.status}</span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-muted">{entry.year}</span>
          </div>
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{entry.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{entry.summary}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {entry.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="border-b border-white/5 p-8 md:p-10">
          <p className="section-label">Outcome</p>
          <p className="mt-4 text-lg leading-8 text-muted">{entry.cardOutcome}</p>
        </section>

        <section className="border-b border-white/5 p-8 md:p-10">
          <p className="section-label">System Visuals</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryAssets.map((asset, index) => (
              <figure key={`${asset.src}-${index}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/30">
                <div className="relative aspect-[16/10] w-full cursor-pointer">
                  <Image 
                    src={asset.src} 
                    alt={asset.alt} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-muted">
                  {asset.caption ?? asset.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border-b border-white/5 p-8 md:p-10 lg:border-b-0 lg:border-r">
            <div className="space-y-10">
              <Block title="Problem" items={[entry.problem]} />
              <Block title="Execution" items={entry.execution} />
              <Block title="Outcomes" items={entry.outcomes} />
            </div>
          </section>

          <aside className="p-8 md:p-10">
            <div className="space-y-10">
              <Block title="Constraints" items={entry.constraints} />
              <Block title="Architecture" items={entry.architecture} />
              <Block title="Reliability Controls" items={entry.reliabilityControls} />
              <Block title="Artifacts" items={entry.artifacts} />
            </div>
          </aside>
        </div>

        <div className="border-t border-white/5 p-8 md:p-10">
          <Link href="/systems" className="text-sm text-text transition hover:text-accent">
            ← Back to Systems
          </Link>
        </div>
      </div>
    </article>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent2">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-background/30 p-4 text-sm leading-7 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
