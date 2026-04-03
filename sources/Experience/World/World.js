import * as THREE from 'three'
import PhysicsWorld from './PhysicsWorld.js'
import PhysicalVehicle from './PhysicalVehicle.js'
import Car from './Car.js'
import Environment from './Environment.js'
import Map from './Map.js'
import Inputs from '../Player/Inputs.js'

export default class World {
  constructor() {
    const e = window.experience
    this.scene = e.scene
    this.resources = e.resources

    this.resources.on('ready', () => {
      console.log('[World] resources ready, building scene')
      this._build()
    })
  }

  _build() {
    this.physics = new PhysicsWorld()
    this.inputs = new Inputs()
    this.physicalVehicle = new PhysicalVehicle(this.physics)
    this.car = new Car()
    this.environment = new Environment()
    this.map = new Map()
  }

  update() {
    if (!this.inputs) return
    this.inputs.update()
    if (this.physics) this.physics.update()
    if (this.physicalVehicle) this.physicalVehicle.update(this.inputs.keys)
    if (this.car) this.car.update(this.physicalVehicle)
    this._checkZones()
  }

  _checkZones() {
    if (!this.physicalVehicle?.ready) return
    const pos = this.physicalVehicle.getPosition()

    const zones = {
      about:    { x: -25, z: -25 },
      projects: { x:  25, z: -25 },
      skills:   { x: -25, z:  25 },
      contact:  { x:  25, z:  25 },
    }

    Object.entries(zones).forEach(([key, zone]) => {
      const dx = pos.x - zone.x
      const dz = pos.z - zone.z
      if (Math.sqrt(dx*dx + dz*dz) < 8) {
        window.experience.interface?.openPanel(key)
      }
    })
  }
}
