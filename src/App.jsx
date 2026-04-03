import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useState, useEffect } from 'react'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { useGameStore } from './store'

export default function App() {
  const setReady = useGameStore(s => s.setReady)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [setReady])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050510' }}>
      <Canvas shadows flat>
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]} timeStep="vary">
            <Experience started={started} />
          </Physics>
        </Suspense>
      </Canvas>
      <Overlay started={started} onStart={() => setStarted(true)} />
    </div>
  )
}
