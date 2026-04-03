import * as THREE from 'three'

export default class Car {
  constructor() {
    this.mesh = new THREE.Group()

    const bodyGeo = new THREE.BoxGeometry(2.2, 0.8, 4.5)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xcc44ff,
      emissive: 0x440066,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2
    })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    body.position.y = 0.5
    body.castShadow = true
    this.mesh.add(body)

    const cabinGeo = new THREE.BoxGeometry(1.8, 0.7, 2.2)
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x221133,
      metalness: 0.5,
      roughness: 0.3
    })
    const cabin = new THREE.Mesh(cabinGeo, cabinMat)
    cabin.position.set(0, 1.2, -0.3)
    this.mesh.add(cabin)

    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.35, 16)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
    const wheelPositions = [[-1.2, 0.4, 1.5], [1.2, 0.4, 1.5], [-1.2, 0.4, -1.5], [1.2, 0.4, -1.5]]
    this.wheels = wheelPositions.map(([x, y, z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat)
      w.rotation.z = Math.PI / 2
      w.position.set(x, y, z)
      w.castShadow = true
      this.mesh.add(w)
      return w
    })

    const headlightGeo = new THREE.SphereGeometry(0.15, 8, 8)
    const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 3 })
    ;[[-0.7, 0.6, 2.2], [0.7, 0.6, 2.2]].forEach(([x, y, z]) => {
      const hl = new THREE.Mesh(headlightGeo, headlightMat)
      hl.position.set(x, y, z)
      this.mesh.add(hl)
    })

    this.mesh.position.set(0, 0, 0)
    window.experience.scene.add(this.mesh)

    console.log('[Car] mesh added to scene at origin')
  }

  update(physicalVehicle) {
    if (!physicalVehicle?.ready) return

    const pos = physicalVehicle.getPosition()
    const rot = physicalVehicle.getRotation()

    this.mesh.position.set(pos.x, pos.y, pos.z)
    this.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)

    const speed = physicalVehicle.speed || 0
    this.wheels.forEach(w => { w.rotation.x += speed * 0.05 })
  }
}
