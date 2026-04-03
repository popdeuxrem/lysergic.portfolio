import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

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

    this._initPostProcessing()
  }

  _initPostProcessing() {
    this.composer = new EffectComposer(this.instance)

    const renderPass = new RenderPass(this.scene, this.camera.instance)
    this.composer.addPass(renderPass)

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      0.4,
      0.4,
      0.85
    )
    this.composer.addPass(this.bloomPass)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    this.composer.setSize(this.sizes.width, this.sizes.height)
  }

  update() {
    this.composer.render()
  }
}
