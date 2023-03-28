function now() {
  return new Date().getTime()
}

export default Date.now ?? now
