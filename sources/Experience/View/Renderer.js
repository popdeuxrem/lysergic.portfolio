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
      powerPreference: 'high-performance'
    })
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1.2
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}
