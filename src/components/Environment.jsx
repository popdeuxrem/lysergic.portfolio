import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const ZONES = [
  { pos: [-25, 0, -25], color: '#cc44ff', emissive: '#880066', label: 'about' },
  { pos: [ 25, 0, -25], color: '#44ccff', emissive: '#006688', label: 'projects' },
  { pos: [-25, 0,  25], color: '#ff44aa', emissive: '#880044', label: 'skills' },
  { pos: [ 25, 0,  25], color: '#44ffaa', emissive: '#006644', label: 'contact' },
]

function ZoneMarker({ pos, color, emissive }) {
  const ringRef = useRef()
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.5
    }
  })

  return (
    <group position={pos}>
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 10, 8]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={ringRef} position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.15, 8, 32]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

export function Environment() {
  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 0.012]} />

      <ambientLight intensity={0.3} />
      <hemisphereLight args={['#8866cc', '#221133', 1.2]} />
      <directionalLight
        position={[30, 50, 20]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={300}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-20, 20, -20]} intensity={1} color="#9966ff" />

      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color="#110a22" roughness={0.9} />
        </mesh>
      </RigidBody>

      <gridHelper args={[300, 60, '#6633aa', '#331155']} position={[0, 0.01, 0]} />

      {ZONES.map((zone, i) => (
        <ZoneMarker key={i} pos={zone.pos} color={zone.color} emissive={zone.emissive} />
      ))}

      <pointLight position={[-25, 6, -25]} color="#cc44ff" intensity={6} distance={50} />
      <pointLight position={[25, 6, -25]} color="#44ccff" intensity={6} distance={50} />
      <pointLight position={[-25, 6, 25]} color="#ff44aa" intensity={6} distance={50} />
      <pointLight position={[25, 6, 25]} color="#44ffaa" intensity={6} distance={50} />
    </>
  )
}
