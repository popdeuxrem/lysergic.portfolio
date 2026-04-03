import EventEmitter from './EventEmitter.js'

export default class Debug extends EventEmitter {
  constructor() {
    super()
    this.active = false
    this.params = {}
  }
}
