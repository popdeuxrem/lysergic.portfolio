import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Renderer from './View/Renderer.js'
import Camera from './View/Camera.js'
import World from './World/World.js'
import Interface from './UI/Interface.js'
import sources from './sources.js'

let instance = null

export default class Experience {
  constructor(canvas) {
    if (instance) return instance
    instance = this

    window.experience = this
    window.THREE = THREE
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    this.interface = new Interface()

    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    if (!this.world._ready) return
    
    this.world.update()
    this.camera.update()
    this.renderer.update()

    if (this.world.physicalVehicle?.ready) {
      const speed = this.world.physicalVehicle.getSpeed()
      this.interface.updateSpeed(speed)
    }
  }
}

const canvas = document.querySelector('canvas.webgl')
new Experience(canvas)
