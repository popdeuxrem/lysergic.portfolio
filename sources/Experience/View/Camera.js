import * as THREE from 'three'

export default class Camera {
  constructor() {
    const e = window.experience
    this.sizes = e.sizes
    this.scene = e.scene

    this.instance = new THREE.PerspectiveCamera(
      55,
      this.sizes.width / this.sizes.height,
      0.1,
      500
    )
    this.instance.position.set(0, 18, 35)
    this.instance.lookAt(0, 0, 0)
    this.scene.add(this.instance)

    this._targetPos  = new THREE.Vector3()
    this._camPos     = new THREE.Vector3(0, 18, 35)
    this._lookAt     = new THREE.Vector3()
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

    this._targetPos.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), 0.1)

    const q = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w)
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(q)

    const desiredCamPos = new THREE.Vector3(
      this._targetPos.x - forward.x * 22,
      this._targetPos.y + 12,
      this._targetPos.z - forward.z * 22
    )

    desiredCamPos.y = Math.max(5, desiredCamPos.y)

    this._camPos.lerp(desiredCamPos, 0.06)
    this.instance.position.copy(this._camPos)

    this._lookAt.lerp(
      new THREE.Vector3(this._targetPos.x, this._targetPos.y + 1, this._targetPos.z),
      0.1
    )
    this.instance.lookAt(this._lookAt)
  }
}
