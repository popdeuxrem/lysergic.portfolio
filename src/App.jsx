import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useGameStore } from './store'

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
          
          {/* Experience - renders without Suspense */}
          <Experience started={started} />
        </Canvas>
      </div>
      <Overlay started={started} onStart={() => setStarted(true)} />
    </ErrorBoundary>
  )
}
