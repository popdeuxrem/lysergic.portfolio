export default class PhysicalVehicle {
  constructor(physicsWorld) {
    this.physics = physicsWorld
    this.ready = false
    this.hasRapier = false

    this.x = 0
    this.y = 1
    this.z = 0
    this.rotY = 0
    this.speed = 0

    this._waitForPhysics()
  }

  _waitForPhysics() {
    const check = setInterval(() => {
      if (this.physics.ready) {
        clearInterval(check)
        if (this.physics.world && this.physics.RAPIER) {
          this._createRapierVehicle()
        } else {
          this.ready = true
          console.log('[PhysicalVehicle] Using kinematic fallback')
        }
      }
    }, 100)
  }

  _createRapierVehicle() {
    try {
      const { world, RAPIER } = this.physics

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
          0.4, 0.35
        )
      })

      this.hasRapier = true
      this.ready = true
      console.log('[PhysicalVehicle] Rapier vehicle created ✓')
    } catch (err) {
      console.warn('[PhysicalVehicle] Vehicle controller failed, using fallback:', err)
      this.ready = true
    }
  }

  update(inputs) {
    if (!this.ready) return

    if (this.hasRapier && this.controller) {
      const engineForce = inputs.forward ? 800 : inputs.backward ? -400 : 0
      const steerAngle  = inputs.left ? 0.5 : inputs.right ? -0.5 : 0
      const brakeForce  = inputs.brake ? 200 : 0

      this.controller.setWheelSteering(0, steerAngle)
      this.controller.setWheelSteering(1, steerAngle)
      this.controller.setWheelEngineForce(2, engineForce)
      this.controller.setWheelEngineForce(3, engineForce)
      for (let i = 0; i < 4; i++) this.controller.setWheelBrake(i, brakeForce)
      this.controller.updateVehicle(window.experience.time.delta / 1000)

    } else {
      const dt = (window.experience.time.delta || 16) / 1000
      const accel  = inputs.forward ? 1 : inputs.backward ? -0.5 : 0
      const steer  = inputs.left ? 1 : inputs.right ? -1 : 0

      this.speed += accel * 10 * dt
      this.speed *= inputs.brake ? 0.85 : 0.97
      this.speed = Math.max(-8, Math.min(20, this.speed))

      if (Math.abs(this.speed) > 0.05) {
        this.rotY += steer * 1.5 * dt * Math.sign(this.speed)
      }

      this.x += Math.sin(this.rotY) * this.speed * dt
      this.z += Math.cos(this.rotY) * this.speed * dt
    }
  }

  getPosition() {
    if (this.hasRapier && this.chassis) return this.chassis.translation()
    return { x: this.x, y: this.y, z: this.z }
  }

  getRotation() {
    if (this.hasRapier && this.chassis) return this.chassis.rotation()
    const half = this.rotY / 2
    return { x: 0, y: Math.sin(half), z: 0, w: Math.cos(half) }
  }

  getSpeed() {
    return Math.abs(this.speed)
  }
}
