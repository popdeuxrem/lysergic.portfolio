import { useState, useEffect, useRef } from 'react'
import { useGameStore } from '../store'

const PANEL_DATA = {
  about: {
    title: 'About Me',
    content: `I'm Yaw, a full-stack creative developer building at the intersection of immersive web experiences and production-grade engineering. Currently building Magnetiq Neo-Bank — a full-stack banking platform on Laravel + React.`,
  },
  projects: {
    title: 'Projects',
    content: 'Magnetiq Neo-Bank — Laravel 11 · Inertia.js · React · TypeScript · PostgreSQL\n\nLysergic Portfolio — Three.js · Rapier Physics · Vite · Vercel',
  },
  skills: {
    title: 'Skills',
    skills: ['Laravel', 'React', 'TypeScript', 'Three.js', 'PostgreSQL', 'Inertia.js', 'Tailwind', 'Vite', 'Docker', 'Vercel', 'Rapier Physics', 'WebGL/WebGPU'],
  },
  contact: {
    title: 'Contact',
    content: 'Available for freelance, collaboration, and full-time opportunities.',
    link: 'github.com/popdeuxrem',
    url: 'https://github.com/popdeuxrem',
  },
}

export function Overlay({ started, onStart }) {
  const activePanel = useGameStore(s => s.activePanel)
  const setActivePanel = useGameStore(s => s.setActivePanel)
  const speed = useGameStore(s => s.speed)
  const [showIntro, setShowIntro] = useState(true)
  
  const [debugLogs, setDebugLogs] = useState([])
  const logRef = useRef([])

  useEffect(() => {
    if (started) {
      setTimeout(() => setShowIntro(false), 800)
    }
  }, [started])

  useEffect(() => {
    const originalError = console.error
    const originalWarn = console.warn
    
    console.error = (...args) => {
      logRef.current = [...logRef.current.slice(-2), args.map(a => String(a).slice(0, 100)).join(' ')]
      setDebugLogs([...logRef.current])
      originalError.apply(console, args)
    }
    
    console.warn = (...args) => {
      logRef.current = [...logRef.current.slice(-2), '[WARN] ' + args.map(a => String(a).slice(0, 100)).join(' ')]
      setDebugLogs([...logRef.current])
      originalWarn.apply(console, args)
    }

    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  if (showIntro) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#050510', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '5rem', color: '#cc88ff', margin: 0 }}>Lysergic</h1>
        <p style={{ color: '#b0a0d0', margin: '8px 0 40px', fontSize: '1.1rem' }}>Creative Developer · Full-Stack · 3D Web</p>
        <button onClick={onStart} style={{ background: 'linear-gradient(135deg, #6644aa, #cc44ff)', border: 'none', color: 'white', borderRadius: 12, padding: '14px 40px', fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '0.05em' }}>Enter World</button>
      </div>
    )
  }

  return (
    <>
      {debugLogs.length > 0 && (
        <div style={{ position: 'fixed', top: 60, left: 12, background: 'rgba(255,0,0,0.9)', color: '#fff', fontFamily: 'monospace', fontSize: '0.65rem', padding: '8px', borderRadius: 4, zIndex: 9999, maxWidth: '90vw' }}>
          {debugLogs.map((log, i) => (
            <div key={i} style={{ marginBottom: 2 }}>{log}</div>
          ))}
        </div>
      )}

      {activePanel && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(10, 5, 30, 0.92)', border: '1px solid rgba(102, 68, 170, 0.5)', borderRadius: 16, padding: 32, minWidth: 340, maxWidth: 520, color: '#e0d0ff', backdropFilter: 'blur(20px)', zIndex: 100 }}>
          <button onClick={() => setActivePanel(null)} style={{ position: 'absolute', top: 12, right: 16, cursor: 'pointer', color: '#6644aa', fontSize: '1.5rem', background: 'none', border: 'none' }}>✕</button>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.5rem', color: '#cc88ff', marginBottom: 16 }}>{PANEL_DATA[activePanel]?.title}</h2>
          {PANEL_DATA[activePanel]?.skills ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: '0.9rem' }}>
              {PANEL_DATA[activePanel].skills.map(s => (
                <div key={s} style={{ background: 'rgba(102,68,170,0.2)', borderRadius: 6, padding: '6px 10px', color: '#cc88ff' }}>{s}</div>
              ))}
            </div>
          ) : (
            <p style={{ lineHeight: 1.7, color: '#b0a0d0', whiteSpace: 'pre-line' }}>{PANEL_DATA[activePanel]?.content}</p>
          )}
          {PANEL_DATA[activePanel]?.url && (
            <a href={PANEL_DATA[activePanel].url} target="_blank" rel="noreferrer" style={{ color: '#cc88ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>↗ {PANEL_DATA[activePanel].link}</a>
          )}
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 10 }}>
        {Object.keys(PANEL_DATA).map(key => (
          <button key={key} onClick={() => setActivePanel(activePanel === key ? null : key)} style={{ background: 'rgba(10, 5, 30, 0.8)', border: '1px solid rgba(102, 68, 170, 0.6)', color: '#cc88ff', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', backdropFilter: 'blur(10px)' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</button>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 80, right: 24, fontFamily: 'serif', fontSize: '2rem', color: '#cc88ff', textShadow: '0 0 10px rgba(204, 136, 255, 0.5)', zIndex: 10 }}>
        {Math.round(speed * 3.6)} <span style={{ fontSize: '1rem' }}>km/h</span>
      </div>

      <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(200, 170, 255, 0.6)', fontSize: '0.8rem', zIndex: 10 }}>WASD / Arrows to drive · Drive into a glowing pillar to explore</div>
    </>
  )
}
