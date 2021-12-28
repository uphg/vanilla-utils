// Function.prototype.bind 实现
function bind(atThis, ...args) {
  const func = this
  const result = function (...fnArgs) {
    const self = this instanceof result ? this : atThis
    return func.call(self, ...args, ...fnArgs)
  }
  result.prototype = func.prototype
  return result
}

module.exports = bind
