import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Grid } from '@react-three/drei'

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
      {/* Bright glowing pillar */}
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 10, 8]} />
        <meshStandardMaterial 
          color={color} 
          emissive={emissive} 
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Floating ring */}
      <mesh ref={ringRef} position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.2, 8, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={emissive} 
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export function Environment() {
  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 0.015]} />

      {/* Ground - highly visible */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial 
            color="#1a0a2e" 
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </RigidBody>

      {/* Visible grid - Drei Grid with strong colors */}
      <Grid
        position={[0, 0.01, 0]}
        args={[500, 500]}
        cellSize={2}
        cellThickness={1}
        cellColor="#442266"
        sectionSize={10}
        sectionThickness={1.5}
        sectionColor="#8844cc"
        fadeDistance={100}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />

      {/* Zone markers */}
      {ZONES.map((zone, i) => (
        <ZoneMarker key={i} pos={zone.pos} color={zone.color} emissive={zone.emissive} />
      ))}

      {/* Neon point lights at each zone */}
      <pointLight position={[-25, 8, -25]} color="#cc44ff" intensity={15} distance={60} castShadow />
      <pointLight position={[25, 8, -25]} color="#44ccff" intensity={15} distance={60} castShadow />
      <pointLight position={[-25, 8, 25]} color="#ff44aa" intensity={15} distance={60} castShadow />
      <pointLight position={[25, 8, 25]} color="#44ffaa" intensity={15} distance={60} castShadow />

      {/* Additional scene lights - not as aggressive as before */}
      <hemisphereLight args={['#8866cc', '#221133', 0.5]} />
      <directionalLight
        position={[30, 50, 20]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={200}
      />
    </>
  )
}
