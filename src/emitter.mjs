class Emitter {
  #events = {}
  on(name, func) {
    const e = this.#events
    if (!e[name]) {
      e[name] = []
    }
    e[name].push(func)
  }
  emit(name, ...args) {
    const e = this.#events
    if (!e[name]) return
    e[name].forEach(func => func(...args))
  }
  off(name, func) {
    const e = this.#events
    if (!e[name]) return
    e[name] = e[name].filter(fn => fn !== func)
  }
}

export default Emitter
