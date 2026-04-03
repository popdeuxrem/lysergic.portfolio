export default class Inputs {
  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      brake: false,
      boost: false,
      jump: false,
    }
    this._bindKeyboard()
    this._bindGamepad()
    this._bindTouch()
  }

  _bindKeyboard() {
    const map = {
      KeyW: 'forward', ArrowUp: 'forward',
      KeyS: 'backward', ArrowDown: 'backward',
      KeyA: 'left', ArrowLeft: 'left',
      KeyD: 'right', ArrowRight: 'right',
      ControlLeft: 'brake', KeyB: 'brake',
      ShiftLeft: 'boost', ShiftRight: 'boost',
      Space: 'jump',
    }

    window.addEventListener('keydown', e => {
      if (map[e.code]) this.keys[map[e.code]] = true
    })

    window.addEventListener('keyup', e => {
      if (map[e.code]) this.keys[map[e.code]] = false
    })
  }

  _bindGamepad() {
    // Gamepad API - handled in update()
  }

  _bindTouch() {
    this._touchStart = null

    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('#ui')) return
      this._touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }, { passive: true })

    window.addEventListener('touchmove', (e) => {
      if (!this._touchStart) return
      const dx = e.touches[0].clientX - this._touchStart.x
      const dy = e.touches[0].clientY - this._touchStart.y

      const deadzone = 15
      this.keys.forward = dy < -deadzone
      this.keys.backward = dy > deadzone
      this.keys.left = dx < -deadzone
      this.keys.right = dx > deadzone
    }, { passive: true })

    window.addEventListener('touchend', () => {
      this._touchStart = null
      this.keys.forward = this.keys.backward = this.keys.left = this.keys.right = false
    })
  }

  update() {
    const gp = navigator.getGamepads?.()?.[0]
    if (gp) {
      this.keys.forward = gp.buttons[6]?.value > 0.1
      this.keys.backward = gp.buttons[7]?.value > 0.1
      this.keys.left = gp.axes[0] < -0.2
      this.keys.right = gp.axes[0] > 0.2
      this.keys.brake = gp.buttons[1]?.pressed
      this.keys.boost = gp.buttons[3]?.pressed
    }
  }
}
