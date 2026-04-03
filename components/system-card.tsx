import Link from 'next/link';
import { SystemEntry } from '@/content/systems';

export function SystemCard({ entry }: { entry: SystemEntry }) {
  return (
    <article className="panel flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent2">{entry.category}</p>
          <h3 className="mt-3 text-xl font-semibold text-text">{entry.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">{entry.year}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{entry.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {entry.stack.map((item) => (
          <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 border-t border-white/5 pt-5 text-sm text-muted">{entry.outcome}</div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-accent">{entry.status}</span>
        <Link href={`/systems/${entry.slug}`} className="text-sm text-text transition hover:text-accent">
          Inspect system â
        </Link>
      </div>
    </article>
  );
}
