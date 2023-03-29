function cloneDeep(value) {
  const cache = new WeakMap()
  return baseCloneDeep(value, cache)
}

function baseCloneDeep(value, cache) {
  if (value instanceof Object) {
    if (cache.has(value)) return cache.get(value)
    let result
    if (value instanceof Function) {
      result = value.prototype
        ? function(...args) {
            return value.apply(this, args)
          }
        : (...args) => value.apply(void 0, args)
    } else if (value instanceof Array) {
      result = []
    } else if (value instanceof Date) {
      result = new Date(value - 0)
    } else if (value instanceof RegExp) {
      result = new RegExp(value)
    } else {
      result = {}
    }
    cache.set(value, result)
    for (const key in value) {
      if (key && value.hasOwnProperty(key)) {
        const item = value[key]
        result[key] = baseCloneDeep(item, cache)
      }
    }

    return result
  } else {
    return value
  }
}

export default cloneDeep