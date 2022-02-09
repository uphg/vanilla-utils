function nextTick(fn: () => void) {
  if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
    return process.nextTick(fn)
  }
  let textNode = document.createTextNode('')
  const observer = new MutationObserver(() => {
    fn()
    observer.disconnect()
    textNode = null
  })
  observer.observe(textNode, {
    characterData: true
  })
  textNode.data = '0'
}

export default nextTick