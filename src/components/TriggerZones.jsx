import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useGameStore } from '../store'

const ZONES = [
  { pos: [-25, 0, -25], label: 'about', radius: 8 },
  { pos: [ 25, 0, -25], label: 'projects', radius: 8 },
  { pos: [-25, 0,  25], label: 'skills', radius: 8 },
  { pos: [ 25, 0,  25], label: 'contact', radius: 8 },
]

export function TriggerZones() {
  const activePanel = useGameStore(s => s.activePanel)
  const setActivePanel = useGameStore(s => s.setActivePanel)
  const carPosition = useGameStore(s => s.carPosition)

  useFrame(() => {
    for (const zone of ZONES) {
      const dx = carPosition.x - zone.pos[0]
      const dz = carPosition.z - zone.pos[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < zone.radius && activePanel !== zone.label) {
        setActivePanel(zone.label)
        return
      }
    }
  })

  return (
    <>
      {ZONES.map((zone, i) => (
        <RigidBody key={i} type="fixed" position={[zone.pos[0], 0, zone.pos[2]]} colliders={false}>
          <mesh visible={false}>
            <cylinderGeometry args={[zone.radius, zone.radius, 1, 32]} />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}
