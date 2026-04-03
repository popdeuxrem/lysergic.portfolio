import * as THREE from 'three'

export default class Particles {
  constructor() {
    const scene = window.experience.scene
    this._createGlitchParticles(scene)
  }

  _createGlitchParticles(scene) {
    const count = 500
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorPalette = [
      new THREE.Color(0xff00ff),
      new THREE.Color(0x00ffff),
      new THREE.Color(0xcc88ff),
      new THREE.Color(0x6644aa)
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = Math.random() * 30 + 2
      positions[i3 + 2] = (Math.random() - 0.5) * 100

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 2 + 0.5
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    this.particles = new THREE.Points(geometry, material)
    this.particles.userData.initialPositions = positions.slice()
    scene.add(this.particles)
  }

  update(time) {
    if (!this.particles) return

    const positions = this.particles.geometry.attributes.position.array
    const initial = this.particles.userData.initialPositions

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] = initial[i + 1] + Math.sin(time * 0.001 + i) * 2

      if (Math.random() < 0.001) {
        positions[i] = (Math.random() - 0.5) * 100
        positions[i + 2] = (Math.random() - 0.5) * 100
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true
    this.particles.rotation.y += 0.0002
  }
}
