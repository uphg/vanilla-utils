function uniq(value) {
  const length = value?.length
  if (!length) return []

  const result = []
  let index = -1
  while (++index < length) {
    const item = value[index]
		if (result.includes(item)) continue
    result.push(item)
  }
  return result
}

export default uniq
