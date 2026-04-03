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

    console.log('[Experience] booting...')

    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()

    console.log('[Experience] scene created, loading resources...')
    this.resources = new Resources(sources)

    this.camera = new Camera()
    this.renderer = new Renderer()

    console.log('[Experience] camera + renderer ready, building world...')
    this.world = new World()
    this.interface = new Interface()

    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())

    console.log('[Experience] boot complete ✓')
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.world.update()
    this.camera.update()
    this.renderer.update()
  }
}

const canvas = document.querySelector('canvas.webgl')
console.log('[Experience] canvas found:', canvas)
new Experience(canvas)
