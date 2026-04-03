import * as THREE from 'three'

export default class Car {
  constructor() {
    const e = window.experience
    this.scene = e.scene

    this.mesh = new THREE.Group()
    this.wheels = []

    const carModel = e.resources.items['carModel']
    if (carModel) {
      const car = carModel.scene
      car.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      car.scale.setScalar(1)
      this.mesh.add(car)
      console.log('[Car] GLB car model loaded ✓')
    } else {
      console.warn('[Car] No GLB model, using box fallback')
      this._buildBoxCar()
    }

    this.mesh.position.set(0, 0.5, 0)
    this.scene.add(this.mesh)
  }

  _buildBoxCar() {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xcc44ff, emissive: 0x440066, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.2
    })
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.8, 4.5), bodyMat)
    body.position.y = 0.5
    body.castShadow = true
    this.mesh.add(body)

    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x221133, metalness: 0.5, roughness: 0.3 })
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 2.2), cabinMat)
    cabin.position.set(0, 1.2, -0.3)
    this.mesh.add(cabin)

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.35, 16)
    ;[[-1.2, 0.4, 1.5], [1.2, 0.4, 1.5], [-1.2, 0.4, -1.5], [1.2, 0.4, -1.5]].forEach(([x,y,z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat)
      w.rotation.z = Math.PI / 2
      w.position.set(x, y, z)
      w.castShadow = true
      this.mesh.add(w)
      this.wheels.push(w)
    })

    const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 3 })
    ;[[-0.7, 0.6, 2.2], [0.7, 0.6, 2.2]].forEach(([x,y,z]) => {
      const hl = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), hlMat)
      hl.position.set(x, y, z)
      this.mesh.add(hl)
    })
  }

  update(physicalVehicle) {
    if (!physicalVehicle?.ready) return
    const pos = physicalVehicle.getPosition()
    const rot = physicalVehicle.getRotation()
    this.mesh.position.set(pos.x, pos.y, pos.z)
    this.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
    const spd = physicalVehicle.speed || 0
    this.wheels.forEach(w => { w.rotation.x += spd * 0.05 })
  }
}
