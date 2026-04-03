import * as THREE from 'three'

export default class Environment {
  constructor() {
    const scene = window.experience.scene

    scene.background = new THREE.Color(0x0a0a1a)
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.015)

    const ambient = new THREE.AmbientLight(0x6644aa, 0.5)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight(0xffffff, 2)
    sun.position.set(20, 40, 20)
    sun.castShadow = true
    sun.shadow.camera.far = 200
    sun.shadow.mapSize.set(2048, 2048)
    scene.add(sun)

    const colors = [0xff00ff, 0x00ffff, 0xffff00]
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 3, 30)
      light.position.set(
        Math.cos(i * 2.1) * 15, 
        5, 
        Math.sin(i * 2.1) * 15
      )
      scene.add(light)
    })

    this._createStars(scene)
  }

  _createStars(scene) {
    const starsGeo = new THREE.BufferGeometry()
    const starsCount = 2000
    const positions = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 400
      positions[i + 1] = Math.random() * 100 + 10
      positions[i + 2] = (Math.random() - 0.5) * 400
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starsMat = new THREE.PointsMaterial({
      color: 0xcc88ff,
      size: 0.5,
      sizeAttenuation: true
    })

    const stars = new THREE.Points(starsGeo, starsMat)
    scene.add(stars)
  }
}
