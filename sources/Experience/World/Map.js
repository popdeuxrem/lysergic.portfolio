import * as THREE from 'three'

export default class Map {
  constructor() {
    const scene = window.experience.scene
    this.zones = []

    const geo = new THREE.PlaneGeometry(200, 200, 50, 50)
    const mat = new THREE.MeshStandardMaterial({ 
      color: 0x111122, 
      roughness: 0.9 
    })
    const ground = new THREE.Mesh(geo, mat)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    const grid = new THREE.GridHelper(200, 100, 0x6644aa, 0x331166)
    grid.material.opacity = 0.3
    grid.material.transparent = true
    scene.add(grid)

    this._addBuildings(scene)
    this._addObstacles(scene)
  }

  _addBuildings(scene) {
    const buildings = [
      { pos: [-20, 0, -20], label: 'about', height: 8 },
      { pos: [20, 0, -20], label: 'projects', height: 12 },
      { pos: [-20, 0, 20], label: 'skills', height: 6 },
      { pos: [20, 0, 20], label: 'contact', height: 10 },
      { pos: [0, 0, -30], label: 'work', height: 14 },
    ]

    buildings.forEach(({ pos, label, height }) => {
      const geo = new THREE.BoxGeometry(5, height, 5)
      const mat = new THREE.MeshStandardMaterial({
        color: 0x1a0a33,
        emissive: 0x330066,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.7
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(pos[0], height / 2, pos[2])
      mesh.castShadow = true
      mesh.userData.label = label
      mesh.userData.interactive = true
      scene.add(mesh)

      this.zones.push({
        label,
        position: new THREE.Vector3(pos[0], 0, pos[2]),
        radius: 6
      })

      const labelCanvas = this._createLabelCanvas(label)
      const labelTexture = new THREE.CanvasTexture(labelCanvas)
      const labelMat = new THREE.SpriteMaterial({ 
        map: labelTexture, 
        transparent: true 
      })
      const labelSprite = new THREE.Sprite(labelMat)
      labelSprite.position.set(pos[0], height + 2, pos[2])
      labelSprite.scale.set(4, 2, 1)
      scene.add(labelSprite)
    })
  }

  _createLabelCanvas(text) {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(10, 5, 30, 0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#6644aa'
    ctx.lineWidth = 4
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.font = 'bold 48px Nunito, sans-serif'
    ctx.fillStyle = '#cc88ff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2)
    return canvas
  }

  _addObstacles(scene) {
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 80
      const z = (Math.random() - 0.5) * 80

      if (Math.abs(x) < 15 && Math.abs(z) < 15) continue

      const height = 1 + Math.random() * 3
      const geo = new THREE.BoxGeometry(2, height, 2)
      const mat = new THREE.MeshStandardMaterial({ 
        color: 0x221133,
        emissive: 0x440066,
        emissiveIntensity: 0.2,
        roughness: 0.5 
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, height / 2, z)
      mesh.castShadow = true
      scene.add(mesh)
    }
  }

  getZones() {
    return this.zones
  }
}
