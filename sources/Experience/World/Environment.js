import * as THREE from 'three'

export default class Environment {
  constructor() {
    const e = window.experience
    const scene = e.scene
    const renderer = e.renderer.instance

    renderer.toneMapping = THREE.NoToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace

    scene.background = new THREE.Color(0x1a0a3a)
    scene.fog = new THREE.FogExp2(0x1a0a3a, 0.012)

    const hemi = new THREE.HemisphereLight(0x8866cc, 0x221133, 1.2)
    scene.add(hemi)

    const sun = new THREE.DirectionalLight(0xffffff, 3.0)
    sun.position.set(30, 50, 20)
    sun.castShadow = true
    sun.shadow.camera.far = 300
    sun.shadow.camera.left  = -80
    sun.shadow.camera.right =  80
    sun.shadow.camera.top   =  80
    sun.shadow.camera.bottom = -80
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.bias = -0.001
    scene.add(sun)

    const fill = new THREE.DirectionalLight(0x9966ff, 1.0)
    fill.position.set(-20, 20, -20)
    scene.add(fill)

    const neons = [
      { color: 0xcc44ff, pos: [-25, 6, -25] },
      { color: 0x44ccff, pos: [ 25, 6, -25] },
      { color: 0xff44aa, pos: [-25, 6,  25] },
      { color: 0x44ffaa, pos: [ 25, 6,  25] },
    ]
    neons.forEach(({ color, pos }) => {
      const light = new THREE.PointLight(color, 6, 50)
      light.position.set(...pos)
      scene.add(light)
    })

    console.log('[Environment] lighting configured ✓')
  }
}
