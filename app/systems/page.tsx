import { Metadata } from 'next';
import { SystemCard } from '@/components/system-card';
import { systems, getSystemsByStatus } from '@/content/systems';

export const metadata: Metadata = {
  title: 'Selected Systems',
  description: 'Systems portfolio covering automation, orchestration, reliability, and platform architecture.',
};

const statusLabels: Record<string, string> = {
  production: 'Production',
  active: 'Active',
  iterating: 'Iterating',
  development: 'Development',
};

export default function SystemsPage() {
  const productionCount = getSystemsByStatus('production').length;
  const activeCount = getSystemsByStatus('active').length + getSystemsByStatus('iterating').length;
  const devCount = getSystemsByStatus('development').length;

  return (
    <div className="container-shell py-16 md:py-24">
      <div className="mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Selected Systems</h1>
          <p className="text-sm text-muted mt-2">
            {systems.length} Systems • {productionCount} Production • {activeCount} Active • {devCount} In Development
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
          {systems.map((system) => (
            <span key={system.slug} className="flex items-center gap-1.5">
              <span className={`w-1 h-1 rounded-full ${
                system.status === 'production' ? 'bg-green-500' :
                system.status === 'development' ? 'bg-orange-400' :
                'bg-cyan-400'
              }`} />
              {system.title.split(' ')[0]} — {statusLabels[system.status]}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {systems.map((entry) => (
          <SystemCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
