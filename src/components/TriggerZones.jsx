import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store'

const ZONES = [
  { pos: [-25, 0, -25], label: 'about', radius: 8 },
  { pos: [ 25, 0, -25], label: 'projects', radius: 8 },
  { pos: [-25, 0,  25], label: 'cryptovault', radius: 8 },
  { pos: [ 25, 0,  25], label: 'repo', radius: 8 },
  { pos: [  0, 0, -40], label: 'proxy', radius: 8 },
]

export function TriggerZones() {
  const activePanel = useGameStore(s => s.activePanel)
  const setActivePanel = useGameStore(s => s.setActivePanel)
  const carPosition = useGameStore(s => s.carPosition)

  useFrame(() => {
    if (!carPosition.x && !carPosition.z) return
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

  return null
}
