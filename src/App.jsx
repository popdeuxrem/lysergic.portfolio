import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { PerspectiveCamera, Html } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useGameStore } from './store'

function Loader() {
  return (
    <Html center>
      <div style={{
        background: 'rgba(5, 5, 16, 0.98)',
        border: '2px solid #ff00ff',
        borderRadius: 8,
        padding: '32px 48px',
        fontFamily: 'monospace',
        color: '#ff00ff',
        textAlign: 'center',
        minWidth: 320
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 12 }}>
          LOADING_3D_ASSETS...
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          If this persists, check console for errors
        </div>
      </div>
    </Html>
  )
}

function DefaultLights() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2} 
        castShadow
      />
      <pointLight position={[0, 10, 0]} intensity={1} color="#ffffff" />
    </>
  )
}

export default function App() {
  const setReady = useGameStore(s => s.setReady)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    console.log('[App] Mounting...')
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
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
        >
          <PerspectiveCamera 
            makeDefault 
            position={[15, 15, 15]} 
            fov={50} 
            near={0.1} 
            far={1000}
            onUpdate={c => c.lookAt(0, 0, 0)}
          />
          
          {/* Default lights - ALWAYS visible, not in Suspense */}
          <DefaultLights />
          
          <Suspense fallback={<Loader />}>
            <Physics 
              gravity={[0, -9.81, 0]} 
              timeStep="vary"
              paused={false}
            >
              <Experience started={started} />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
      <Overlay started={started} onStart={() => setStarted(true)} />
    </ErrorBoundary>
  )
}
