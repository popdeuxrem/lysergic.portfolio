import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.vercel.app'),
  title: {
    default: 'Lysergic — Systems & Automation Architect',
    template: '%s — Lysergic',
  },
  description:
    'Deterministic, observable, production-grade systems for automation, orchestration, and reliability engineering.',
  keywords: ['automation', 'infrastructure', 'reliability', 'CI/CD', 'orchestration', 'systems engineering'],
  authors: [{ name: 'Lysergic' }],
  openGraph: {
    title: 'Lysergic — Systems & Automation Architect',
    description:
      'Deterministic, observable, production-grade systems for automation, orchestration, and reliability engineering.',
    type: 'website',
    url: 'https://example.vercel.app',
    siteName: 'Lysergic',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Lysergic Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lysergic — Systems & Automation Architect',
    description:
      'Deterministic, observable, production-grade systems for automation, orchestration, and reliability engineering.',
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:text-text"
        >
          Skip to main content
        </a>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid grid-lines opacity-40" />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
