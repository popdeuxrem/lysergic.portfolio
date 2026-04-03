import { principles } from '@/content/site';

export function PrinciplesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {principles.map((principle, index) => (
        <div key={principle} className="panel p-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent2">0{index + 1}</p>
          <p className="mt-4 text-sm leading-7 text-muted">{principle}</p>
        </div>
      ))}
    </div>
  );
}
