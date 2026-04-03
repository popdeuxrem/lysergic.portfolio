import { metrics } from '@/content/site';

export function MetricStrip() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="panel p-6">
          <div className="text-3xl font-semibold text-text">{metric.value}</div>
          <div className="mt-2 text-sm text-muted">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
