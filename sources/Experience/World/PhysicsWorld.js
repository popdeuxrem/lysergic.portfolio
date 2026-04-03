export default class PhysicsWorld {
  constructor() {
    this.ready = false
    this.world = null
    this._init()
  }

  async _init() {
    try {
      const RAPIER = await import('@dimforge/rapier3d-compat')
      await RAPIER.init()
      this.RAPIER = RAPIER
      this.gravity = { x: 0, y: -9.81, z: 0 }
      this.world = new RAPIER.World(this.gravity)

      const groundDesc = RAPIER.RigidBodyDesc.fixed()
      const ground = this.world.createRigidBody(groundDesc)
      const groundCollider = RAPIER.ColliderDesc.cuboid(50, 0.1, 50)
      this.world.createCollider(groundCollider, ground)

      this.ready = true
      console.log('[PhysicsWorld] Rapier initialized ✓')
    } catch (err) {
      console.warn('[PhysicsWorld] Rapier failed, running without physics:', err)
      this.ready = true
    }
  }

  update() {
    if (this.world) this.world.step()
  }
}
