import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Grid, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const ZONES = [
  { pos: [-25, 0, -25], color: '#ff00ff', emissive: '#ff00ff', label: 'about' },
  { pos: [ 25, 0, -25], color: '#00ffff', emissive: '#00ffff', label: 'projects' },
  { pos: [-25, 0,  25], color: '#33ff00', emissive: '#33ff00', label: 'cryptovault' },
  { pos: [ 25, 0,  25], color: '#ff6600', emissive: '#ff6600', label: 'repo' },
  { pos: [  0, 0, -40], color: '#ffff00', emissive: '#ffff00', label: 'proxy' },
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
        <cylinderGeometry args={[0.5, 0.5, 10, 8]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.2, 8, 32]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </group>
  )
}

function ProceduralFloor() {
  return (
    <>
      <color attach="background" args={['#0b0f14']} />
      <fog attach="fog" args={['#0b0f14', 0.015]} />

      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.1, 0]}>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>

      <Grid
        position={[0, 0.01, 0]}
        args={[500, 500]}
        cellSize={2}
        cellThickness={1}
        cellColor="#ff00ff"
        sectionSize={10}
        sectionThickness={1.5}
        sectionColor="#00ffff"
        fadeDistance={100}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />

      {ZONES.map((zone, i) => (
        <ZoneMarker key={i} pos={zone.pos} color={zone.color} emissive={zone.emissive} />
      ))}

      <pointLight position={[-25, 8, -25]} color="#ff00ff" intensity={15} distance={60} castShadow />
      <pointLight position={[25, 8, -25]} color="#00ffff" intensity={15} distance={60} castShadow />
      <pointLight position={[-25, 8, 25]} color="#33ff00" intensity={15} distance={60} castShadow />
      <pointLight position={[25, 8, 25]} color="#ff6600" intensity={15} distance={60} castShadow />
      <pointLight position={[0, 8, -40]} color="#ffff00" intensity={15} distance={60} castShadow />

      <hemisphereLight args={['#0b0f14', '#0b0f14', 0.5]} />
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

function EnvironmentModel() {
  const { scene } = useThree()
  const gltf = useGLTF('/models/environment.glb', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  })

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [gltf])

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={gltf.scene} />
    </RigidBody>
  )
}

export function Environment() {
  return (
    <>
      <ProceduralFloor />
      <EnvironmentModel />
    </>
  )
}