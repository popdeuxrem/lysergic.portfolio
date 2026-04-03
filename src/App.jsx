import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Html } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useGameStore } from './store'

function Loader() {
  return (
    <Html center>
      <div style={{
        background: 'rgba(5, 5, 16, 0.95)',
        border: '1px solid rgba(102, 68, 170, 0.5)',
        borderRadius: 12,
        padding: '24px 40px',
        fontFamily: 'monospace',
        color: '#cc88ff',
        textAlign: 'center',
        minWidth: 280
      }}>
        <div style={{ fontSize: '0.75rem', color: '#6644aa', marginBottom: 8, letterSpacing: 2 }}>
          LY$ERGIC
        </div>
        <div style={{ fontSize: '1rem', color: '#cc88ff' }}>
          {'> '}INITIALIZING SYSTEMS<span className="blink">_</span>
        </div>
        <style>{`
          .blink { animation: blink 1s step-end infinite; }
          @keyframes blink { 50% { opacity: 0; } }
        `}</style>
      </div>
    </Html>
  )
}

export default function App() {
  const setReady = useGameStore(s => s.setReady)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [setReady])

  return (
    <ErrorBoundary>
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#050510'
      }}>
        <Canvas
          shadows
          flat
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
          camera={{ position: [0, 12, 20], fov: 35, near: 0.1, far: 500 }}
        >
          <Suspense fallback={<Loader />}>
            <Physics gravity={[0, -9.81, 0]} timeStep="vary">
              <Experience started={started} />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
      <Overlay started={started} onStart={() => setStarted(true)} />
    </ErrorBoundary>
  )
}
