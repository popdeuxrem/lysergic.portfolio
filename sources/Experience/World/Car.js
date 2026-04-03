import * as THREE from 'three'

export default class Car {
  constructor() {
    const scene = window.experience.scene

    const geo = new THREE.BoxGeometry(2, 1, 4)
    const mat = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a2e, 
      metalness: 0.8, 
      roughness: 0.2 
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.castShadow = true
    scene.add(this.mesh)

    this.wheels = []
    const wheelPositions = [
      [-1, -0.3, 1.5],
      [1, -0.3, 1.5],
      [-1, -0.3, -1.5],
      [1, -0.3, -1.5]
    ]

    wheelPositions.forEach(([x, y, z]) => {
      const wGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16)
      const wMat = new THREE.MeshStandardMaterial({ color: 0x111111 })
      const wheel = new THREE.Mesh(wGeo, wMat)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(x, y, z)
      this.mesh.add(wheel)
      this.wheels.push(wheel)
    })

    const glowGeo = new THREE.BoxGeometry(1.8, 0.2, 0.1)
    const glowMat = new THREE.MeshStandardMaterial({ 
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 2
    })
    this.rearGlow = new THREE.Mesh(glowGeo, glowMat)
    this.rearGlow.position.set(0, 0.1, 2)
    this.mesh.add(this.rearGlow)
  }

  update(physicalVehicle) {
    if (!physicalVehicle.ready) return

    const pos = physicalVehicle.getPosition()
    const rot = physicalVehicle.getRotation()

    this.mesh.position.set(pos.x, pos.y, pos.z)
    this.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)

    const speed = physicalVehicle.getSpeed()
    const intensity = Math.min(speed / 20, 2)
    this.rearGlow.material.emissiveIntensity = 0.5 + intensity
  }
}
