import Link from 'next/link';
import { contact } from '@/content/site';

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
          <Link href={`mailto:${contact.email}`}>Email</Link>
          <Link href={contact.github}>GitHub</Link>
          <Link href={contact.x}>X</Link>
        </div>
      </div>
    </footer>
  );
}
