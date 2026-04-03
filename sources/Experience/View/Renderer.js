import * as THREE from 'three'

export default class Renderer {
  constructor() {
    const e = window.experience
    this.sizes = e.sizes
    this.scene = e.scene
    this.camera = e.camera

    this.instance = new THREE.WebGLRenderer({
      canvas: e.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    })

    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.instance.setClearColor(0x1a0a3a, 1)
    this.instance.toneMapping = THREE.NoToneMapping
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap

    console.log('[Renderer] initialized ✓')
  }

  resize() {
    const e = window.experience
    this.instance.setSize(e.sizes.width, e.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}
