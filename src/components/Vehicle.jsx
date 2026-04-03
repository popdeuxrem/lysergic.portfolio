import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { useGameStore } from '../store'

const keysDown = { forward: false, backward: false, left: false, right: false, brake: false }

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', e => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') keysDown.forward = true
    if (e.code === 'KeyS' || e.code === 'ArrowDown') keysDown.backward = true
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') keysDown.left = true
    if (e.code === 'KeyD' || e.code === 'ArrowRight') keysDown.right = true
    if (e.code === 'ControlLeft' || e.code === 'KeyB') keysDown.brake = true
  })
  window.addEventListener('keyup', e => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') keysDown.forward = false
    if (e.code === 'KeyS' || e.code === 'ArrowDown') keysDown.backward = false
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') keysDown.left = false
    if (e.code === 'KeyD' || e.code === 'ArrowRight') keysDown.right = false
    if (e.code === 'ControlLeft' || e.code === 'KeyB') keysDown.brake = false
  })
}

function FallbackCar() {
  return (
    <group>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.8, 4.5]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} toneMapped={false} />
      </mesh>
      <mesh castShadow position={[0, 0.7, -0.3]}>
        <boxGeometry args={[1.8, 0.7, 2.2]} />
        <meshStandardMaterial color="#220044" metalness={0.6} roughness={0.3} />
      </mesh>
      {[[-1.2, -0.4, 1.5], [1.2, -0.4, 1.5], [-1.2, -0.4, -1.5], [1.2, -0.4, -1.5]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.35, 16]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[-0.7, 0.2, 2.3]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh position={[0.7, 0.2, 2.3]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh position={[-0.7, 0.2, -2.3]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[0.7, 0.2, -2.3]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <pointLight position={[-0.7, 0.3, 2.5]} color="#ffffff" intensity={8} distance={20} />
      <pointLight position={[0.7, 0.3, 2.5]} color="#ffffff" intensity={8} distance={20} />
      <pointLight position={[-0.7, 0.3, -2.5]} color="#ff0000" intensity={4} distance={10} />
      <pointLight position={[0.7, 0.3, -2.5]} color="#ff0000" intensity={4} distance={10} />
    </group>
  )
}

function CarModel() {
  const { scene } = useThree()
  const gltf = useGLTF('/models/car.glb', true, true, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)

    const ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath('/basis/')
    ktx2Loader.detectSupport(scene)
    loader.setKTX2Loader(ktx2Loader)
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

  return <primitive object={gltf.scene} scale={1} />
}

export function Vehicle() {
  const groupRef = useRef()
  const setCarPosition = useGameStore(s => s.setCarPosition)
  const setSpeed = useGameStore(s => s.setSpeed)
  const velocity = useRef({ x: 0, y: 0, z: 0 })
  const rotation = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const acceleration = 15
    const maxSpeed = 20
    const turnSpeed = 2
    const friction = 0.98

    if (keysDown.forward) {
      velocity.current.z -= acceleration * delta
    }
    if (keysDown.backward) {
      velocity.current.z += acceleration * delta * 0.5
    }

    const speed = Math.abs(velocity.current.z)
    if (keysDown.left && speed > 0.1) {
      rotation.current += turnSpeed * delta
    }
    if (keysDown.right && speed > 0.1) {
      rotation.current -= turnSpeed * delta
    }

    velocity.current.z *= friction
    const clampedSpeed = Math.max(Math.min(velocity.current.z, maxSpeed), -maxSpeed)
    setSpeed(Math.abs(clampedSpeed))

    groupRef.current.rotation.y = rotation.current
    groupRef.current.position.z += velocity.current.z

    setCarPosition({
      x: groupRef.current.position.x,
      y: groupRef.current.position.y,
      z: groupRef.current.position.z
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <CarModel />
    </group>
  )
}