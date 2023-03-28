function throttle(func, wait) {
  let timerId

  function throttled(...args) {
    if (timerId) return

    func(...args)
    timeId = setTimeout(() => {
      timerId = null
    }, wait)
  }

  return throttled
}
