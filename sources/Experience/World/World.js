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

    this.physics = new PhysicsWorld()
    this.inputs = new Inputs()
    this.physicalVehicle = new PhysicalVehicle(this.physics)
    this.car = new Car()
    this.environment = new Environment()
    this.map = new Map()

    this.zones = this.map.getZones()
    this.lastZone = null
  }

  update() {
    this.inputs.update()
    this.physics.update()
    this.physicalVehicle.update(this.inputs.keys)
    this.car.update(this.physicalVehicle)
    this._checkZones()
  }

  _checkZones() {
    const pos = this.physicalVehicle.getPosition()
    if (!pos) return

    const carVec = new THREE.Vector3(pos.x, pos.y, pos.z)

    for (const zone of this.zones) {
      if (carVec.distanceTo(zone.position) < zone.radius) {
        if (this.lastZone !== zone.label) {
          this.lastZone = zone.label
          window.experience.interface?.openPanel(zone.label)
        }
        return
      }
    }

    this.lastZone = null
  }
}
