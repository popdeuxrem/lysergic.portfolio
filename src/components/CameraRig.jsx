import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGameStore } from '../store'

export function CameraRig() {
  const camera = useThree(state => state.camera)
  const carPosition = useGameStore(s => s.carPosition)
  const initialized = useRef(false)
  const target = useRef(new THREE.Vector3())
  const desiredPos = useRef(new THREE.Vector3())

  useFrame(() => {
    if (!initialized.current) {
      camera.position.set(0, 12, 20)
      camera.lookAt(0, 0, 0)
      initialized.current = true
      return
    }

    const cp = carPosition
    if (!cp || (cp.x === 0 && cp.y === 0 && cp.z === 0)) return

    target.current.set(cp.x, cp.y + 1.5, cp.z)
    desiredPos.current.set(cp.x, cp.y + 11.5, cp.z + 18)

    camera.position.lerp(desiredPos.current, 0.05)
    camera.lookAt(target.current)
  })

  return null
}
