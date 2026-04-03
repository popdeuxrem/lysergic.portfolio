import { ReactNode } from 'react';

export function Section({
  id,
  label,
  title,
  description,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="container-shell py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="section-label">{label}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {description ? <p className="copy-muted mt-5 max-w-2xl">{description}</p> : null}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
