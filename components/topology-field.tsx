'use client';

import { motion } from 'framer-motion';

const nodes = [
  { x: '16%', y: '22%' },
  { x: '32%', y: '48%' },
  { x: '44%', y: '18%' },
  { x: '58%', y: '62%' },
  { x: '72%', y: '28%' },
  { x: '82%', y: '52%' },
];

const lines = [
  ['16%', '22%', '32%', '48%'],
  ['32%', '48%', '58%', '62%'],
  ['44%', '18%', '72%', '28%'],
  ['58%', '62%', '82%', '52%'],
  ['32%', '48%', '44%', '18%'],
  ['58%', '62%', '72%', '28%'],
];

export function TopologyField() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(137,167,255,0.18),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(95,242,214,0.1),transparent_30%)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line, idx) => (
          <motion.line
            key={idx}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            stroke="rgba(137,167,255,0.28)"
            strokeWidth="0.35"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 4 + idx, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
      {nodes.map((node, idx) => (
        <motion.div
          key={idx}
          className="absolute h-3 w-3 rounded-full border border-white/30 bg-accent shadow-[0_0_24px_rgba(137,167,255,0.55)]"
          style={{ left: node.x, top: node.y }}
          initial={{ scale: 0.9, opacity: 0.65 }}
          animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] opacity-70" />
    </div>
  );
}
