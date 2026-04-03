import * as THREE from 'three'

export default class Camera {
  constructor() {
    const e = window.experience
    this.sizes = e.sizes
    this.scene = e.scene

    this.instance = new THREE.PerspectiveCamera(
      60,
      this.sizes.width / this.sizes.height,
      0.1,
      500
    )

    this.instance.position.set(0, 15, 30)
    this.instance.lookAt(0, 0, 0)
    this.scene.add(this.instance)

    this.target = new THREE.Vector3(0, 0, 0)

    console.log('[Camera] initialized at', this.instance.position)
  }

  resize() {
    this.instance.aspect = window.experience.sizes.width / window.experience.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    const world = window.experience?.world
    if (!world?.physicalVehicle?.ready) return

    const pos = world.physicalVehicle.getPosition()
    const rot = world.physicalVehicle.getRotation()

    this.target.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), 0.1)

    const angle = Math.atan2(rot.x, rot.w) * 2
    const offsetX = Math.sin(angle) * -20
    const offsetZ = Math.cos(angle) * -20

    this.instance.position.lerp(
      new THREE.Vector3(
        this.target.x + offsetX,
        this.target.y + 12,
        this.target.z + offsetZ
      ),
      0.05
    )

    this.instance.lookAt(this.target)
  }
}
