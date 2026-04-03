import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.vercel.app'),
  title: {
    default: 'Lysergic â Systems & Automation Architect',
    template: '%s â Lysergic',
  },
  description:
    'Deterministic, observable, production-grade systems for automation, orchestration, and reliability engineering.',
  openGraph: {
    title: 'Lysergic â Systems & Automation Architect',
    description:
      'Deterministic, observable, production-grade systems for automation, orchestration, and reliability engineering.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid grid-lines opacity-40" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
