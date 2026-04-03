import * as THREE from 'three'

export default class Camera {
  constructor() {
    const e = window.experience
    this.sizes = e.sizes
    this.scene = e.scene

    this.instance = new THREE.PerspectiveCamera(60, this.sizes.width / this.sizes.height, 0.1, 1000)
    this.instance.position.set(0, 8, 20)
    this.scene.add(this.instance)

    this.target = new THREE.Vector3()
    this.currentPosition = new THREE.Vector3()
    this.currentLookAt = new THREE.Vector3()
  }

  resize() {
    this.instance.aspect = window.experience.sizes.width / window.experience.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    const world = window.experience.world
    if (!world || !world.physicalVehicle || !world.physicalVehicle.ready) return

    const carPos = world.physicalVehicle.getPosition()
    const carRot = world.physicalVehicle.getRotation()

    const carVec = new THREE.Vector3(carPos.x, carPos.y, carPos.z)
    const carQuat = new THREE.Quaternion(carRot.x, carRot.y, carRot.z, carRot.w)

    const offset = new THREE.Vector3(0, 6, 12)
    offset.applyQuaternion(carQuat)
    const desiredPosition = carVec.clone().add(offset)

    this.instance.position.lerp(desiredPosition, 0.05)
    this.target.lerp(carVec, 0.1)
    this.instance.lookAt(this.target)
  }
}
