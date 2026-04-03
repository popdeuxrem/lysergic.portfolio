import * as THREE from 'three'

export default class Car {
  constructor() {
    const e = window.experience
    this.scene = e.scene
    this.wheels = []

    this.mesh = new THREE.Group()
    this.scene.add(this.mesh)

    const carModel = e.resources.items['carModel']
    if (carModel) {
      this.carGroup = carModel.scene.clone()

      const box = new THREE.Box3().setFromObject(this.carGroup)
      const size = new THREE.Vector3()
      box.getSize(size)
      const center = new THREE.Vector3()
      box.getCenter(center)

      this.carGroup.position.y = -box.min.y
      this.carGroup.position.x = -center.x
      this.carGroup.position.z = -center.z

      this.carGroup.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          if (child.material?.map) {
            child.material.map.colorSpace = THREE.SRGBColorSpace
          }
        }
      })

      this.mesh.add(this.carGroup)
      console.log('[Car] GLB loaded, bounding box size:', size, 'center:', center)
    } else {
      console.warn('[Car] No GLB, using box fallback')
      this._buildBoxCar()
    }

    this.mesh.position.set(0, 0.3, 0)
  }

  _buildBoxCar() {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xcc44ff, emissive: 0x440066, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.2
    })
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.8, 4.5), bodyMat)
    body.position.y = 0.9
    this.mesh.add(body)

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
    ;[[-1.2, 0.4, 1.5], [1.2, 0.4, 1.5], [-1.2, 0.4, -1.5], [1.2, 0.4, -1.5]].forEach(([x,y,z]) => {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.35, 16),
        wheelMat
      )
      w.rotation.z = Math.PI / 2
      w.position.set(x, y, z)
      this.mesh.add(w)
      this.wheels.push(w)
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
