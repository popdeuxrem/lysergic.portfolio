import RAPIER from '@dimforge/rapier3d-compat'

export default class PhysicsWorld {
  constructor() {
    this.ready = false
    this.init()
  }

  async init() {
    await RAPIER.init()
    this.gravity = { x: 0, y: -9.81, z: 0 }
    this.world = new RAPIER.World(this.gravity)
    this.ready = true

    const groundDesc = RAPIER.RigidBodyDesc.fixed()
    const ground = this.world.createRigidBody(groundDesc)
    const groundCollider = RAPIER.ColliderDesc.cuboid(100, 0.1, 100)
    this.world.createCollider(groundCollider, ground)
  }

  update() {
    if (this.ready) this.world.step()
  }
}
