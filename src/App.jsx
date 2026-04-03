import { Canvas } from '@react-three/fiber'
import { Physics, RapierRigidBody } from '@react-three/rapier'
import { PerspectiveCamera, Html } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useGameStore } from './store'

function Loader() {
  return (
    <Html center>
      <div style={{
        background: 'rgba(5, 5, 16, 0.98)',
        border: '2px solid #ff0000',
        borderRadius: 8,
        padding: '32px 48px',
        fontFamily: 'monospace',
        color: '#ff0000',
        textAlign: 'center',
        minWidth: 320
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 12 }}>
          3D_LOADING_ERROR: CHECK_ASSET_PATHS
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          If you see this, Suspense is failing
        </div>
      </div>
    </Html>
  )
}

function DefaultLights() {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={3} 
        castShadow
      />
      <pointLight position={[0, 10, 0]} intensity={2} color="#ffffff" />
    </>
  )
}

// ATOMIC RENDER TEST - glowing green sphere proves Canvas works
function AtomicTest() {
  const meshRef = useRef()
  
  return (
    <group>
      <mesh ref={meshRef} position={[0, 2, -10]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      {/* Additional test: bright grid on ground */}
      <gridHelper args={[100, 20, '#ff00ff', '#440044']} position={[0, 0.1, 0]} />
    </group>
  )
}

// OptionalPhysics - wraps Physics so scene renders even if Rapier fails
function OptionalPhysics({ children }) {
  const [physicsReady, setPhysicsReady] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Give physics 5 seconds to initialize
    const timer = setTimeout(() => {
      if (!physicsReady) {
        console.warn('[Physics] Timeout waiting for Rapier - rendering without physics')
        setPhysicsReady(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (error) {
    console.warn('[Physics] Rapier failed:', error)
    return <>{children}</>
  }

  try {
    return (
      <Physics 
        gravity={[0, -9.81, 0]} 
        timeStep="vary"
        onFirstContact={() => console.log('[Physics] First contact')}
      >
        {children}
      </Physics>
    )
  } catch (e) {
    console.warn('[Physics] Failed to initialize:', e)
    return <>{children}</>
  }
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
            failIfMajorPerformanceCaveat: false,
            toneMapping: 0, // THREE.NoToneMapping
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
          
          {/* Default lights - ALWAYS visible */}
          <DefaultLights />
          
          {/* Atomic Render Test - proves Canvas works */}
          <AtomicTest />
          
          {/* Physics wrapped in Suspense with error handling */}
          <Suspense fallback={<Loader />}>
            <OptionalPhysics>
              <Experience started={started} />
            </OptionalPhysics>
          </Suspense>
        </Canvas>
      </div>
      <Overlay started={started} onStart={() => setStarted(true)} />
    </ErrorBoundary>
  )
}
