function delay(func, wait, ...args) {
  return setTimeout(func, +wait || 0, ...args)
}

module.exports = delay
