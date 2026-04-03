import Link from 'next/link';
import { hero } from '@/content/site';
import { TopologyField } from '@/components/topology-field';

export function Hero() {
  return (
    <section className="container-shell relative py-16 md:py-24 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="section-label">{hero.label}</p>
          <h1 className="display-title mt-5 max-w-4xl">{hero.name}</h1>
          <p className="mt-3 text-xl text-accent md:text-2xl">{hero.title}</p>
          <p className="mt-8 max-w-3xl text-base leading-8 text-muted md:text-lg">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-text px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-text transition hover:border-accent/40 hover:bg-white/5"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="panel relative overflow-hidden p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F87171]" />
            <span className="h-3 w-3 rounded-full bg-[#FBBF24]" />
            <span className="h-3 w-3 rounded-full bg-[#34D399]" />
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-background/60">
            <TopologyField />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-background/80 p-4 font-mono text-xs text-muted backdrop-blur">
              <div>[deploy.trigger] source=github event=push status=accepted</div>
              <div>[pipeline.validate] schema=content result=pass duration=142ms</div>
              <div>[release.publish] target=vercel state=healthy rollback=available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
