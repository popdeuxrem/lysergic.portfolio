import * as THREE from 'three'

export default class Map {
  constructor() {
    const e = window.experience
    this.scene = e.scene

    const terrainModel = e.resources.items['terrainModel']
    if (terrainModel) {
      const terrain = terrainModel.scene
      terrain.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          if (child.material?.map) {
            child.material.map.colorSpace = THREE.SRGBColorSpace
          }
        }
      })
      terrain.scale.setScalar(1)
      terrain.position.set(0, 0, 0)
      this.scene.add(terrain)
      console.log('[Map] terrain GLB loaded ✓')
    } else {
      console.warn('[Map] No terrain GLB, using procedural fallback')
      this._buildProceduralMap()
    }

    this._addZoneMarkers()
  }

  _addZoneMarkers() {
    const zones = [
      { pos: [-25, 0, -25], color: 0xcc44ff, emissive: 0x880066, label: 'about' },
      { pos: [ 25, 0, -25], color: 0x44ccff, emissive: 0x006688, label: 'projects' },
      { pos: [-25, 0,  25], color: 0xff44aa, emissive: 0x880044, label: 'skills' },
      { pos: [ 25, 0,  25], color: 0x44ffaa, emissive: 0x006644, label: 'contact' },
    ]

    this.zones = []

    zones.forEach(({ pos, color, emissive, label }) => {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 10, 8),
        new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 1.5 })
      )
      pillar.position.set(pos[0], 5, pos[2])
      this.scene.add(pillar)

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3, 0.15, 8, 32),
        new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 2 })
      )
      ring.position.set(pos[0], 3, pos[2])
      ring.rotation.x = Math.PI / 2
      this.scene.add(ring)

      this.zones.push({
        label,
        position: new THREE.Vector3(pos[0], 0, pos[2]),
        radius: 8
      })
    })
  }

  _buildProceduralMap() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 300),
      new THREE.MeshStandardMaterial({ color: 0x221133, roughness: 0.9 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.scene.add(ground)

    const grid = new THREE.GridHelper(300, 60, 0x6633aa, 0x331155)
    grid.position.y = 0.01
    this.scene.add(grid)
  }

  getZones() {
    return this.zones || []
  }
}
