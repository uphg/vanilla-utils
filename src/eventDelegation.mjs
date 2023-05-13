function on(el, eventName, selector, callback) {
  if (!el || !eventName) return

  el.addEventListener(eventName, (e) => {
    let current = e.target
    while (!current.matches(selector)) {
      if (el === current) {
        el = null
        break
      }
      current = current.parentNode
    }
    
    current && callback?.call(current, e, current)
  })
  return el
}

export default on