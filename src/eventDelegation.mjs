function on(el, eventName, selector, callback) {
  if (!el || !eventName) return

  el.addEventListener(eventName, (e) => {
    let current = e.target
    while (current.matches(selector)) {
      if (el === current) break
      current = current.parentNode
    }
    
    current?.call(current, e, current)
  })
}

export default on