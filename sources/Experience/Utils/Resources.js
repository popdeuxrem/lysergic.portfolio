import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventEmitter {
  constructor(sources = []) {
    super()
    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.gltfLoader = new GLTFLoader()

    if (this.toLoad === 0) {
      this.trigger('ready')
    } else {
      this._load()
    }
  }

  async _load() {
    const promises = this.sources.map(source => this._loadSource(source))
    await Promise.all(promises)
    this.trigger('ready')
  }

  async _loadSource(source) {
    if (source.type === 'texture') {
      const texture = await new THREE.TextureLoader().loadAsync(source.path)
      texture.colorSpace = THREE.SRGBColorSpace
      this.items[source.name] = texture
    } else if (source.type === 'CubeTexture') {
      const texture = await new THREE.CubeTextureLoader().loadAsync(source.path)
      this.items[source.name] = texture
    } else if (source.type === 'glb' || source.type === 'gltf') {
      const gltf = await this.gltfLoader.loadAsync(source.path)
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
