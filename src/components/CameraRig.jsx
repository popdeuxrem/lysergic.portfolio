import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGameStore } from '../store'

export function CameraRig() {
  const camera = useThree(state => state.camera)
  const carPosition = useGameStore(s => s.carPosition)
  const frameCount = useRef(0)
  const target = useRef(new THREE.Vector3())
  const desiredPos = useRef(new THREE.Vector3())

  useFrame(() => {
    frameCount.current++
    
    // Start at fixed position for first 60 frames (1 second)
    if (frameCount.current < 60) {
      camera.position.set(15, 15, 15)
      camera.lookAt(0, 0, 0)
      return
    }

    const cp = carPosition
    if (!cp) return

    // If car hasn't moved from origin, stay at initial view
    if (cp.x === 0 && cp.y === 0 && cp.z === 0) {
      camera.position.set(15, 15, 15)
      camera.lookAt(0, 0, 0)
      return
    }

    // Follow car with offset
    target.current.set(cp.x, cp.y + 2, cp.z)
    desiredPos.current.set(cp.x + 12, cp.y + 12, cp.z + 18)

    camera.position.lerp(desiredPos.current, 0.02)
    camera.lookAt(target.current)
  })

  return null
}
