import * as THREE from 'three'

export default class Map {
  constructor() {
    const scene = window.experience.scene

    const groundGeo = new THREE.PlaneGeometry(300, 300)
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x110a22,
      roughness: 0.9,
      metalness: 0.1
    })
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    const grid = new THREE.GridHelper(300, 60, 0x6633aa, 0x331155)
    grid.position.y = 0.01
    scene.add(grid)

    const zones = [
      { pos: [-25, 0, -25], color: 0xcc44ff, emissive: 0x660088, label: 'about' },
      { pos: [ 25, 0, -25], color: 0x44ccff, emissive: 0x006688, label: 'projects' },
      { pos: [-25, 0,  25], color: 0xff44aa, emissive: 0x880044, label: 'skills' },
      { pos: [ 25, 0,  25], color: 0x44ffaa, emissive: 0x006644, label: 'contact' },
    ]

    this.zones = []

    zones.forEach(({ pos, color, emissive, label }) => {
      const h = 12
      const geo = new THREE.BoxGeometry(8, h, 8)
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.6
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(pos[0], h / 2, pos[2])
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.userData.label = label
      mesh.userData.interactive = true
      scene.add(mesh)

      this.zones.push({
        label,
        position: new THREE.Vector3(pos[0], 0, pos[2]),
        radius: 8
      })
    })

    const markerGeo = new THREE.SphereGeometry(1.5, 16, 16)
    const markerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1
    })
    const marker = new THREE.Mesh(markerGeo, markerMat)
    marker.position.set(0, 1.5, 0)
    scene.add(marker)

    console.log('[Map] ground, grid, buildings added')
  }

  getZones() {
    return this.zones
  }
}
