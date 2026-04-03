'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SystemEntry } from '@/content/systems';

const statusConfig: Record<string, { label: string; color: string }> = {
  production: { label: 'Production', color: 'bg-green-500' },
  active: { label: 'Active', color: 'bg-cyan-400' },
  iterating: { label: 'Iterating', color: 'bg-yellow-400' },
  development: { label: 'Development', color: 'bg-orange-400' },
};

export function SystemCard({ entry }: { entry: SystemEntry }) {
  const status = statusConfig[entry.status] ?? { label: entry.status, color: 'bg-muted' };

  return (
    <Link href={`/systems/${entry.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="group relative panel flex h-full flex-col p-6 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent2/5 blur-xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent2">{entry.categoryLabel}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-text">{entry.title}</h3>
            </div>
            <span className="font-mono text-xs text-muted">{entry.year}</span>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted line-clamp-2">{entry.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.stack.slice(0, 3).map((item) => (
              <span key={item} className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/5 text-muted">
                {item}
              </span>
            ))}
            {entry.stack.length > 3 && (
              <span className="font-mono text-[10px] px-2 py-0.5 text-muted">+{entry.stack.length - 3}</span>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-xs text-muted leading-5 line-clamp-2">{entry.cardOutcome}</p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{status.label}</span>
            </div>
            <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
              → Inspect system
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
