import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useGameStore } from '../store'

export function Vehicle() {
  const chassisRef = useRef()
  const rapier = useRapier()
  const keys = useKeyboardControls()
  const setCarPosition = useGameStore(s => s.setCarPosition)
  const setSpeed = useGameStore(s => s.setSpeed)
  const [vehicle, setVehicle] = useState(null)

  useEffect(() => {
    if (!chassisRef.current || !rapier.world) return

    const chassis = chassisRef.current.raw()
    const controller = rapier.world.createVehicleController(chassis)

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

    return () => {
      try { rapier.world.removeVehicleController(controller) } catch(e) {}
    }
  }, [rapier.world])

  useFrame(() => {
    if (!vehicle) return

    const engineForce = keys.forward ? 800 : keys.backward ? -400 : 0
    const steerAngle = keys.left ? 0.5 : keys.right ? -0.5 : 0
    const brakeForce = keys.brake ? 200 : 0

    vehicle.setWheelSteering(0, steerAngle)
    vehicle.setWheelSteering(1, steerAngle)
    vehicle.setWheelEngineForce(2, engineForce)
    vehicle.setWheelEngineForce(3, engineForce)

    for (let i = 0; i < 4; i++) vehicle.setWheelBrake(i, brakeForce)

    vehicle.updateVehicle(1 / 60)

    const chassis = chassisRef.current.raw()
    const pos = chassis.translation()
    const vel = chassis.linvel()
    setCarPosition({ x: pos.x, y: pos.y, z: pos.z })
    setSpeed(Math.sqrt(vel.x ** 2 + vel.y ** 2 + vel.z ** 2))
  })

  return (
    <RigidBody
      ref={chassisRef}
      type="dynamic"
      colliders="cuboid"
      mass={800}
      position={[0, 1, 0]}
      linearDamping={0.5}
      angularDamping={0.8}
    >
      <group>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 0.8, 4.5]} />
          <meshStandardMaterial color="#cc44ff" emissive="#440066" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[0, 0.7, -0.3]}>
          <boxGeometry args={[1.8, 0.7, 2.2]} />
          <meshStandardMaterial color="#221133" metalness={0.5} roughness={0.3} />
        </mesh>
        <pointLight position={[-0.7, 0.3, 2.3]} color="#ffffff" intensity={5} distance={15} castShadow />
        <pointLight position={[0.7, 0.3, 2.3]} color="#ffffff" intensity={5} distance={15} castShadow />
        <pointLight position={[-0.7, 0.3, -2.3]} color="#ff0000" intensity={3} distance={8} />
        <pointLight position={[0.7, 0.3, -2.3]} color="#ff0000" intensity={3} distance={8} />
      </group>
    </RigidBody>
  )
}
