import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGameStore } from '../store'

export function CameraRig() {
  const camera = useThree(state => state.camera)
  const carPosition = useGameStore(s => s.carPosition)

  useFrame(() => {
    const target = new THREE.Vector3(carPosition.x, carPosition.y + 1.5, carPosition.z)
    const offset = new THREE.Vector3(0, 10, 18)
    const desiredPos = target.clone().add(offset)
    camera.position.lerp(desiredPos, 0.05)
    camera.lookAt(target)
  })

  return null
}
