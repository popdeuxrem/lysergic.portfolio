import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Lysergic</p>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Deterministic infrastructure. Auditable automation. Production by design.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted">
          <Link href="mailto:your-email@domain.com">Email</Link>
          <Link href="https://github.com/your-handle">GitHub</Link>
          <Link href="https://x.com/your-handle">X</Link>
        </div>
      </div>
    </footer>
  );
}
