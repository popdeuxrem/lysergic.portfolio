import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useGameStore } from '../store'

const keysDown = {}

if (typeof window !== 'undefined') {
  const keyMap = {
    KeyW: 'forward', ArrowUp: 'forward',
    KeyS: 'backward', ArrowDown: 'backward',
    KeyA: 'left', ArrowLeft: 'left',
    KeyD: 'right', ArrowRight: 'right',
    ControlLeft: 'brake', KeyB: 'brake',
    ShiftLeft: 'boost',
  }
  window.addEventListener('keydown', e => { if (keyMap[e.code]) keysDown[keyMap[e.code]] = true })
  window.addEventListener('keyup', e => { if (keyMap[e.code]) keysDown[keyMap[e.code]] = false })
}

export function Vehicle() {
  const chassisRef = useRef()
  const { rapier, world } = useRapier()
  const setCarPosition = useGameStore(s => s.setCarPosition)
  const setSpeed = useGameStore(s => s.setSpeed)
  const [vehicle, setVehicle] = useState(null)

  useEffect(() => {
    if (!chassisRef.current || !world) return

    try {
      const chassis = chassisRef.current.raw()
      const controller = world.createVehicleController(chassis)

      const wheelPositions = [
        { x: -1.2, y: -0.4, z: 1.5 },
        { x:  1.2, y: -0.4, z: 1.5 },
        { x: -1.2, y: -0.4, z: -1.5 },
        { x:  1.2, y: -0.4, z: -1.5 },
      ]

      wheelPositions.forEach(pos => {
        controller.addWheel(
          { x: pos.x, y: pos.y, z: pos.z },
          { x: 0, y: -1, z: 0 },
          { x: 0, y: 0, z: 1 },
          0.4,
          0.35
        )
      })

      controller.setWheelSuspensionStiffness(0, 15)
      controller.setWheelMaxSuspensionTravel(0, 0.3)
      setVehicle(controller)
      console.log('[Vehicle] Physics initialized ✓')
    } catch (e) {
      console.warn('[Vehicle] Physics failed:', e)
    }
  }, [world])

  useFrame(() => {
    if (!chassisRef.current) return
    const chassis = chassisRef.current.raw()
    if (!chassis) return

    const pos = chassis.translation()
    const vel = chassis.linvel()
    setCarPosition({ x: pos.x, y: pos.y, z: pos.z })
    setSpeed(Math.sqrt(vel.x ** 2 + vel.y ** 2 + vel.z ** 2))

    if (!vehicle) return

    const engineForce = keysDown.forward ? 800 : keysDown.backward ? -400 : 0
    const steerAngle = keysDown.left ? 0.5 : keysDown.right ? -0.5 : 0
    const brakeForce = keysDown.brake ? 200 : 0

    vehicle.setWheelSteering(0, steerAngle)
    vehicle.setWheelSteering(1, steerAngle)
    vehicle.setWheelEngineForce(2, engineForce)
    vehicle.setWheelEngineForce(3, engineForce)

    for (let i = 0; i < 4; i++) vehicle.setWheelBrake(i, brakeForce)

    vehicle.updateVehicle(1 / 60)
  })

  return (
    <RigidBody
      ref={chassisRef}
      type="dynamic"
      colliders="cuboid"
      mass={800}
      position={[0, 2, 0]}
      linearDamping={0.5}
      angularDamping={0.8}
    >
      <group>
        {/* Main body - bright pink with emissive glow */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 0.8, 4.5]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff" 
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
        
        {/* Cabin */}
        <mesh castShadow position={[0, 0.7, -0.3]}>
          <boxGeometry args={[1.8, 0.7, 2.2]} />
          <meshStandardMaterial 
            color="#220044" 
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Wheels - visible cylinders */}
        {[[-1.2, -0.4, 1.5], [1.2, -0.4, 1.5], [-1.2, -0.4, -1.5], [1.2, -0.4, -1.5]].map((pos, i) => (
          <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.35, 16]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        ))}

        {/* Headlights - white glowing */}
        <mesh position={[-0.7, 0.2, 2.3]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} toneMapped={false} />
        </mesh>
        <mesh position={[0.7, 0.2, 2.3]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Taillights - red glowing */}
        <mesh position={[-0.7, 0.2, -2.3]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <mesh position={[0.7, 0.2, -2.3]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
        </mesh>

        {/* Car lights */}
        <pointLight position={[-0.7, 0.3, 2.5]} color="#ffffff" intensity={8} distance={20} />
        <pointLight position={[0.7, 0.3, 2.5]} color="#ffffff" intensity={8} distance={20} />
        <pointLight position={[-0.7, 0.3, -2.5]} color="#ff0000" intensity={4} distance={10} />
        <pointLight position={[0.7, 0.3, -2.5]} color="#ff0000" intensity={4} distance={10} />
      </group>
    </RigidBody>
  )
}
