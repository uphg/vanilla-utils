function nextTick(fn: () => void) {
  if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
    return process.nextTick(fn)
  }
  const observer = new MutationObserver(fn)
  const textNode = document.createTextNode('')
  observer.observe(textNode, {
    characterData: true
  })
  textNode.data = '0'
}

export default nextTick