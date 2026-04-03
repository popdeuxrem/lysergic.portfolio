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
