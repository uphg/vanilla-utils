function now() {
  return new Date().getTime()
}

module.exports = Date.now || now
