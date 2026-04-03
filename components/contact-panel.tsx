import { contact } from '@/content/site';

export function ContactPanel() {
  return (
    <div className="panel grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="section-label">Contact</p>
        <h3 className="mt-4 text-3xl font-semibold">Initiate engagement</h3>
        <p className="mt-5 text-sm leading-7 text-muted">
          I design and deploy automation systems, orchestration pipelines, and reliability-focused
          infrastructure for operators and teams that need systems to run with minimal supervision.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ['Email', contact.email],
          ['GitHub', contact.github],
          ['X', contact.x],
          ['LinkedIn', contact.linkedin],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-background/40 p-5">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{label}</div>
            <div className="mt-3 text-sm text-muted">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
