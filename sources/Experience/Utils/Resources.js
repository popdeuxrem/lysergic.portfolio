import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()
    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoadingLabel()
  }

  setLoadingLabel() {
    const label = document.createElement('div')
    label.id = 'loading'
    label.textContent = 'Loading...'
    label.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #cc88ff;
      font-size: 1.5rem;
      font-family: 'Nunito', sans-serif;
      z-index: 1000;
    `
    document.body.appendChild(label)
  }

  async load() {
    for (const source of this.sources) {
      await this.loadSource(source)
    }
    this.trigger('ready')
    
    const label = document.getElementById('loading')
    if (label) label.remove()
  }

  async loadSource(source) {
    if (source.type === 'texture') {
      const texture = await new THREE.TextureLoader().loadAsync(source.path)
      texture.colorSpace = THREE.SRGBColorSpace
      this.items[source.name] = texture
    } else if (source.type === 'CubeTexture') {
      const texture = await new THREE.CubeTextureLoader().loadAsync(source.path)
      this.items[source.name] = texture
    } else if (source.type === 'glb') {
      const gltf = await new THREE.GLTFLoader().loadAsync(source.path)
      this.items[source.name] = gltf
    } else if (source.type === 'gltf') {
      const gltf = await new THREE.GLTFLoader().loadAsync(source.path)
      this.items[source.name] = gltf
    } else if (source.type === 'audio') {
      const audio = new Audio(source.path)
      this.items[source.name] = audio
    }

    this.loaded++
  }

  get(name) {
    return this.items[name]
  }
}
