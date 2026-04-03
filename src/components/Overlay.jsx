import { useState, useEffect, useRef } from 'react'
import { useGameStore } from '../store'

const TERMINAL_CONTENT = {
  about: {
    title: 'LYSERGIC',
    lines: [
      '> INITIALIZING SYSTEM INTERFACE...',
      '> LOADING MODULE: IDENTITY',
      '> STATUS: OPERATIONAL',
      '',
      'SYSTEMS & AUTOMATION ARCHITECT',
      'Designs deterministic, observable,',
      'self-healing systems infrastructure',
      '',
      'FOCUS:',
      '- Infrastructure orchestration',
      '- Deployment automation',
      '- CI/CD pipelines',
      '',
      'LOCATION: Lagos, Nigeria',
    ],
  },
  projects: {
    title: 'LYSERGIC.PORTFOLIO',
    lines: [
      '> INITIALIZING MODULE: 3D ENGINE',
      '> LOADING RAPIER PHYSICS...',
      '> LOADING KTX2 TEXTURES...',
      '> STATUS: OPERATIONAL',
      '',
      'INTERACTIVE SYSTEMS INTERFACE',
      'Real-time WebGL simulation of',
      'system execution architecture',
      '',
      'TECHNOLOGY STACK:',
      '- React Three Fiber',
      '- Rapier Physics Engine',
      '- Vite Build System',
      '- KTX2 / Draco Codecs',
    ],
  },
  cryptovault: {
    title: 'CRYPTO VAULT SYSTEM',
    lines: [
      '> INITIALIZING MODULE: FINANCIAL',
      '> LOADING BLOCKCHAIN INTEGRATION...',
      '> STATUS: OPERATIONAL',
      '',
      'MODULAR CRYPTO PLATFORM',
      'UI + API separation with',
      'orchestration layer architecture',
      '',
      'TECHNOLOGY STACK:',
      '- Next.js App Router',
      '- API Layer (REST/GraphQL)',
      '- Animation Systems',
      '- PostgreSQL Database',
    ],
  },
  repo: {
    title: 'REPOSITORY ORCHESTRATOR',
    lines: [
      '> INITIALIZING MODULE: AUTOMATION',
      '> LOADING GITHUB ACTIONS...',
      '> LOADING POLICY ENGINE...',
      '> STATUS: OPERATIONAL',
      '',
      'AUTOMATED LIFECYCLE SYSTEM',
      'Fully deterministic CI/CD',
      'with governance enforcement',
      '',
      'TECHNOLOGY STACK:',
      '- GitHub Actions',
      '- Bash automation',
      '- Node.js CLI tools',
      '- Policy sync engine',
    ],
  },
  proxy: {
    title: 'ADAPTIVE PROXY SYSTEM',
    lines: [
      '> INITIALIZING MODULE: NETWORK',
      '> LOADING ROUTING POLICY...',
      '> LOADING GEO-AWARE NODES...',
      '> STATUS: OPERATIONAL',
      '',
      'POLICY-BASED TRAFFIC ROUTING',
      'Geo-aware proxy selection with',
      'fingerprint resistance',
      '',
      'TECHNOLOGY STACK:',
      '- SOCKS5 Protocol',
      '- Loon configuration',
      '- Shadowrocket rules',
      '- Segmentation engine',
    ],
  },
}

function TypewriterLine({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (!text) return
    const timer = setTimeout(() => {
      for (let i = 0; i <= text.length; i++) {
        setTimeout(() => setDisplayed(text.slice(0, i)), i * 15)
      }
      setTimeout(() => setActive(false), text.length * 15 + 300)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div style={{
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: '0.85rem',
      color: active ? '#33ff00' : text.startsWith('>') ? '#00ffff' : text.startsWith('-') ? '#00ffff' : '#33ff00',
      minHeight: '1.2em',
      textShadow: active ? '0 0 8px #33ff00' : 'none',
    }}>
      {displayed}
      {active && <span style={{ animation: 'blink 0.5s infinite' }}>_</span>}
    </div>
  )
}

export function Overlay({ started, onStart }) {
  const activePanel = useGameStore(s => s.activePanel)
  const setActivePanel = useGameStore(s => s.setActivePanel)
  const speed = useGameStore(s => s.speed)
  const [showIntro, setShowIntro] = useState(true)
  const [typingIndex, setTypingIndex] = useState(0)
  const content = activePanel ? TERMINAL_CONTENT[activePanel] : null

  useEffect(() => {
    if (started) {
      setTimeout(() => setShowIntro(false), 1200)
    }
  }, [started])

  useEffect(() => {
    if (content) {
      setTypingIndex(0)
    }
  }, [activePanel])

  useEffect(() => {
    if (content && typingIndex < content.lines.length) {
      const timer = setTimeout(() => setTypingIndex(typingIndex + 1), 80)
      return () => clearTimeout(timer)
    }
  }, [content, typingIndex])

  if (showIntro) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#0b0f14',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
      }}>
        <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '4rem', color: '#ff00ff', textShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff', marginBottom: 8 }}>LYSERGIC</div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1rem', color: '#00ffff', marginBottom: 48, letterSpacing: '0.3em' }}>SYSTEMS INTERFACE v2.0</div>
        <button onClick={onStart} style={{
          background: 'transparent',
          border: '2px solid #33ff00',
          color: '#33ff00',
          fontFamily: '"JetBrains Mono", monospace',
          padding: '14px 40px',
          fontSize: '1rem',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          boxShadow: '0 0 10px #33ff00',
        }}>INITIALIZE_</button>
      </div>
    )
  }

  return (
    <>
      {activePanel && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(11, 15, 20, 0.95)',
          border: '1px solid #00ffff',
          padding: 32, minWidth: 480, maxWidth: 560,
          color: '#33ff00',
          zIndex: 100,
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 60px rgba(0, 255, 255, 0.05)',
        }}>
          <button onClick={() => setActivePanel(null)} style={{
            position: 'absolute', top: 12, right: 16,
            cursor: 'pointer', color: '#ff00ff', fontSize: '1.5rem',
            background: 'none', border: 'none',
          }}>×</button>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.8rem', color: '#ff00ff', marginBottom: 20, borderBottom: '1px solid #440044', paddingBottom: 12 }}>
            {content?.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {content?.lines.slice(0, typingIndex).map((line, i) => (
              <TypewriterLine key={i} text={line} delay={0} />
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 10 }}>
        {Object.keys(TERMINAL_CONTENT).map(key => (
          <button key={key} onClick={() => setActivePanel(activePanel === key ? null : key)} style={{
            background: 'rgba(11, 15, 20, 0.9)',
            border: `1px solid ${activePanel === key ? '#ff00ff' : '#00ffff'}`,
            color: activePanel === key ? '#ff00ff' : '#00ffff',
            borderRadius: 4, padding: '8px 14px',
            cursor: 'pointer', fontSize: '0.75rem',
            fontFamily: '"JetBrains Mono", monospace',
            boxShadow: activePanel === key ? '0 0 10px #ff00ff' : '0 0 5px #00ffff',
          }}>{key.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 80, right: 24, fontFamily: '"JetBrains Mono", monospace', fontSize: '2rem', color: '#ff00ff', textShadow: '0 0 10px #ff00ff', zIndex: 10 }}>
        {Math.round(speed * 3.6)} <span style={{ fontSize: '1rem', color: '#00ffff' }}>KM/H</span>
      </div>

      <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(0, 255, 255, 0.6)', fontSize: '0.75rem', fontFamily: '"JetBrains Mono", monospace', zIndex: 10 }}>
        WASD / ARROWS — DRIVE INTO NEON PILLAR TO EXPLORE
      </div>
    </>
  )
}