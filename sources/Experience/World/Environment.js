import * as THREE from 'three'

export default class Environment {
  constructor() {
    const scene = window.experience.scene

    scene.background = new THREE.Color(0x0a0518)
    scene.fog = new THREE.FogExp2(0x0a0518, 0.008)

    const ambient = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight(0xffffff, 3)
    sun.position.set(30, 50, 30)
    sun.castShadow = true
    sun.shadow.camera.far = 300
    sun.shadow.camera.left = -100
    sun.shadow.camera.right = 100
    sun.shadow.camera.top = 100
    sun.shadow.camera.bottom = -100
    sun.shadow.mapSize.set(2048, 2048)
    scene.add(sun)

    const neons = [
      { color: 0xcc44ff, pos: [15, 8, 0] },
      { color: 0x44ccff, pos: [-15, 8, 0] },
      { color: 0xff44aa, pos: [0, 8, 15] },
    ]
    neons.forEach(({ color, pos }) => {
      const light = new THREE.PointLight(color, 5, 60)
      light.position.set(...pos)
      scene.add(light)
    })

    console.log('[Environment] lights added')
  }
}
