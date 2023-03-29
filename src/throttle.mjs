function throttle(func, wait) {
  let prev = 0

  return function (...args) {
    const now = Date.now()
    const remain = wait - (now - prev)

    if (remain <= 0) {
      prev = now
      func(...args)
    }
  }
}

export default throttle
