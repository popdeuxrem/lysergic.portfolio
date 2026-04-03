import { capabilities } from '@/content/site';

export function CapabilityStrip() {
  return (
    <div className="container-shell py-6">
      <div className="panel grid gap-0 overflow-hidden md:grid-cols-3 lg:grid-cols-6">
        {capabilities.map((capability) => (
          <div
            key={capability}
            className="border-b border-white/5 px-5 py-5 text-center text-sm text-muted last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            {capability}
          </div>
        ))}
      </div>
    </div>
  );
}
