import Link from 'next/link';
import { navigation, hero } from '@/content/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm uppercase tracking-[0.24em] text-text">
          Lysergic
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={hero.contactCta.href}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-text transition hover:border-accent/40 hover:bg-white/5"
        >
          {hero.contactCta.label}
        </Link>
      </div>
    </header>
  );
}
