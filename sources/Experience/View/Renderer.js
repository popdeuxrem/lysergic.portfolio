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

    this.instance.setClearColor(0x0a0518, 1)
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1.5
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap

    console.log('[Renderer] WebGL initialized, size:', this.sizes.width, 'x', this.sizes.height)
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
