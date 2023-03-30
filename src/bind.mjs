function bind(atThis, ...args) {
  const func = this
  const result = function(..._args) {
    const _this = this instanceof result ? this : atThis
    return func.apply(_this, args.concat(_args))
  }
  result.prototype = func.prototype
  return result
}

export default bind
