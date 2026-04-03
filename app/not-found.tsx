import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-shell py-24">
      <div className="panel p-10 text-center">
        <p className="section-label">404</p>
        <h1 className="mt-4 text-4xl font-semibold">System surface not found</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">
          The requested route does not exist in this build. Return to the homepage or inspect the systems index.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/" className="rounded-full bg-text px-6 py-3 text-sm font-medium text-background">
            Home
          </Link>
          <Link href="/systems" className="rounded-full border border-white/10 px-6 py-3 text-sm text-text">
            Systems
          </Link>
        </div>
      </div>
    </div>
  );
}
