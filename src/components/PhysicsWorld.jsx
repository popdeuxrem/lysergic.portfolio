import { Physics } from '@react-three/rapier'
import { useRef, useState, useEffect } from 'react'

export function PhysicsWorld({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!ready) {
    return <>{children}</>
  }

  return (
    <Physics 
      gravity={[0, -9.81, 0]} 
      timeStep={1/60}
      colliders={false}
    >
      {children}
    </Physics>
  )
}

export function GroundCollider() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial visible={false} />
    </mesh>
  )
}