import RAPIER from '@dimforge/rapier3d-compat'

export default class PhysicalVehicle {
  constructor(physicsWorld) {
    this.physics = physicsWorld
    this.ready = false
    this.waitForPhysics()
  }

  waitForPhysics() {
    const check = setInterval(() => {
      if (this.physics.ready) {
        clearInterval(check)
        this.createVehicle()
      }
    }, 100)
  }

  createVehicle() {
    const { world } = this.physics

    const chassisDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 2, 0)
    this.chassis = world.createRigidBody(chassisDesc)
    const chassisCollider = RAPIER.ColliderDesc.cuboid(1, 0.5, 2).setMass(1200)
    world.createCollider(chassisCollider, this.chassis)

    this.controller = world.createVehicleController(this.chassis)

    const wheelPositions = [
      { x: -1, y: -0.3, z: 1.5 },
      { x:  1, y: -0.3, z: 1.5 },
      { x: -1, y: -0.3, z: -1.5 },
      { x:  1, y: -0.3, z: -1.5 },
    ]

    wheelPositions.forEach(pos => {
      this.controller.addWheel(
        { x: pos.x, y: pos.y, z: pos.z },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 0, z: 1 },
        0.4,
        0.35
      )
    })

    this.controller.setWheelSuspensionStiffness(0, 20)
    this.controller.setWheelMaxSuspensionTravel(0, 0.3)
    this.ready = true
  }

  update(inputs) {
    if (!this.ready) return

    const engineForce = inputs.forward ? 800 : inputs.backward ? -400 : 0
    const steerAngle = inputs.left ? 0.5 : inputs.right ? -0.5 : 0
    const brakeForce = inputs.brake ? 200 : 0

    this.controller.setWheelSteering(0, steerAngle)
    this.controller.setWheelSteering(1, steerAngle)
    this.controller.setWheelEngineForce(2, engineForce)
    this.controller.setWheelEngineForce(3, engineForce)

    for (let i = 0; i < 4; i++) {
      this.controller.setWheelBrake(i, brakeForce)
    }

    this.controller.updateVehicle(window.experience.time.delta / 1000)
  }

  getPosition() {
    if (!this.ready) return { x: 0, y: 0, z: 0 }
    return this.chassis.translation()
  }

  getRotation() {
    if (!this.ready) return { x: 0, y: 0, z: 0, w: 1 }
    return this.chassis.rotation()
  }

  getSpeed() {
    if (!this.ready) return 0
    const vel = this.chassis.linvel()
    return Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z)
  }
}
