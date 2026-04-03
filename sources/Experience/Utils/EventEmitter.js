export default class EventEmitter {
  constructor() { this.callbacks = { base: {} } }

  on(names, callback) {
    names.split(' ').forEach(name => {
      if (!this.callbacks[name]) this.callbacks[name] = []
      this.callbacks[name].push(callback)
    })
    return this
  }

  trigger(name, args = []) {
    (this.callbacks[name] || []).forEach(cb => cb(...args))
    return this
  }

  off(names) {
    names.split(' ').forEach(name => { delete this.callbacks[name] })
    return this
  }
}
