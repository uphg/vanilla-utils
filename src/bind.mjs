function bind(atThis, ...prevArgs) {
  const fn = this
  const result = function(..._args) {
    const _this = this instanceof result ? this : atThis
    return fn.apply(_this, prevArgs.concat(_args))
  }
  result.prototype = fn.prototype
  return result
}

export default bind
