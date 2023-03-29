function debounce(func, wait) {
  let timerId, prev, args
  
  function later() {
    const passed = Date.now() - prev
    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    } else {
      func(...args)
      timerId = prev = args = null
    }
  }

  return function(..._args) {
    prev = Date.now()
    args = _args

    if (!timerId) {
      timerId = setTimeout(later, wait)
    }
  }
}

export default debounce
