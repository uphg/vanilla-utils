function isObject(value: unknown) {
  return value !== null && typeof value === 'object'
}

export default isObject